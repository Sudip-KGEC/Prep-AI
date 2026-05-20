"use server"

import { checkRateLimit, createRateLimiter } from "@/lib/arkjet";
import { db } from "@/lib/prisma";
import { request } from "@arcjet/next";
import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";
import { revalidatePath } from "next/cache";


const bookingLimiter = createRateLimiter({
    refillRate: 2,
    interval: "1h",
    capacity: 5
})

export const getInterviewerProfile = async ({ interviewerId }) => {

    try {

        const interviewer = await db.user.findFirst({
            where: { id: interviewerId, role: "INTERVIEWER" },
            select: {
                id: true,
                name: true,
                imageUrl: true,
                title: true,
                company: true,
                yearsExp: true,
                bio: true,
                categories: true,
                creditRate: true,
                availabilities: {
                    where: { status: "AVAILABLE" },
                    select: { startTime: true, endTime: true },
                    take: 1,
                },
                bookingsAsInterviewer: {
                    where: { status: "SCHEDULED" },
                    select: { startTime: true, endTime: true },
                },
            }
        });

        return interviewer ?? null


    } catch (error) {
        console.error("GetInterviewProfile ERROR", error);
        return null;

    }

}



// Booking Slot 

// Booking Slot 

export const bookSlot = async ({
    interviewerId,
    startTime,
    endTime,
    duration,
    creditsUsed,
}) => {

    const user = await currentUser();

    if(!user) throw new Error("unauthorized");

    // rate limit 

    const req = await request();

    const rateLimitError = await checkRateLimit(
        bookingLimiter,
        req,
        user.id
    );

    if(rateLimitError) throw new Error(rateLimitError);

    // find Interviewers and user  

    const [dbUser , interviewer] = await Promise.all([
        db.user.findUnique({
            where: {
                clerkUserId : user.id
            }
        }),

        db.user.findUnique({
            where: {
                id : interviewerId
            }
        })
    ]);

    if(!dbUser || dbUser.role !== "INTERVIEWEE") {
        throw new Error(
            "only interviewee can book session"
        );
    }

    if(!interviewer || interviewer.role !== "INTERVIEWER"){
        throw new Error("Interviewer not found!");
    }

    // validate credits

    const validCreditsMap = {
        20: 1,
        30: 2,
        45: 3,
        60: 4,
    };

    if(validCreditsMap[duration] !== creditsUsed){
        throw new Error("Invalid booking credits");
    }

    const credits = creditsUsed;

    if(dbUser.credits < credits){
        throw new Error(
            "Insuffcient credits. please upgrade your plan!!!"
        );
    }

    // check conflict data 

    const conflictDateTime = await db.booking.findFirst({
        where: {
            interviewerId,
            status: "SCHEDULED",

            startTime: {
                lt: new Date(endTime)
            },

            endTime: {
                gt: new Date(startTime)
            }
        }
    });

    if(conflictDateTime) {
        throw new Error(
            "This slot was booked , please pick another slot."
        );
    }

    // create StreamCall Id 
    
    let streamCallId;

    try {

        const streamClient = new StreamClient(
            process.env.NEXT_PUBLIC_STREAM_API_KEY,
            process.env.STREAM_SECRET_KEY
        );

        await streamClient.upsertUsers([
            {
                id: dbUser.clerkUserId,
                name: dbUser.name ?? "Interviewee",
                image: dbUser.imageUrl ?? "undifined",
                role: "user"
            },

            {
                id: interviewer.clerkUserId,
                name: interviewer.name ?? "Interviewer",
                image: interviewer.imageUrl ?? "undifined",
                role: "user"
            }
        ]);

        streamCallId = `mockInterview_${Date.now()}_${Math.random()
            .toString(36)
            .slice(2,7)}`;

        const call = streamClient.video.call(
            "default",
            streamCallId
        );

        await call.getOrCreate({
            data: {
                created_by_id: dbUser.clerkUserId,

                members : [
                    {
                        user_id: dbUser.clerkUserId,
                        role: "host"
                    },

                    {
                        user_id: interviewer.clerkUserId,
                        role: "host"
                    },
                ],

                settings_override : {
                    recording : {
                        mode: "available",
                        quality: "1080p"
                    },

                    screensharing: {
                        enabled: true
                    },

                    transcription: {
                        mode: "auto-on"
                    }
                }
            }
        });
        
    } catch (error) {

        console.error("BookingSlot Error" , error);

        throw new Error(
            "Failed to create video call. please try again !"
        );
    }

    // booking details to DB

    try {

        const booking = await db.$transaction(async (tx) => {

            // create new booking 

            const newBooking = await tx.booking.create({
                data: {
                    intervieweeId: dbUser.id,
                    interviewerId,

                    startTime: new Date(startTime),
                    endTime: new Date(endTime),

                    duration,

                    status: "SCHEDULED",

                    creditsCharged: credits,

                    streamCallId
                }
            });
        
            // create new credit transaction

            await tx.creditTransaction.create({
                data: {
                    userId: dbUser.id,

                    amount: -credits,

                    type: "BOOKING_DEDUCTION",

                    bookingId: newBooking.id
                }
            });

            // update interviewee credits

            await tx.user.update({
                where: {
                    id: dbUser.id
                },

                data : {
                    credits : {
                        decrement: credits
                    }
                }
            });

            // update interviewer balance 

            await tx.user.update({
                where: {
                    id: interviewerId
                },

                data : {
                    creditBalance : {
                        increment: credits
                    }
                }
            });

            return newBooking;

        });

        revalidatePath(`/interviewers/${interviewerId}`);
        revalidatePath("/dashboard");

        return {
            success : true,
            bookingId : booking.id,
            streamCallId
        };
        
    } catch (error) {

        console.error(
            "booking slot transaction error",
            error
        );

        throw new Error(
            "Booking failed. please try again!!"
        );
    }
}