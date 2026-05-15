import { auth, currentUser } from "@clerk/nextjs/server"
import { db } from "./prisma";


const getCurrentPlan = async () =>{
    const {has} = await auth();

    if(has({plan: "pro"})) return "pro";
    if(has({plan: "starter"})) return "starter";
    return "free";
}

const shouldAllocateCredits = (user, plan) => {
   if(user.currentPlan !== plan) return true;

   if(!user.creditsLastAllocatedAt) return true;

    const now = new Date();
    const lastAllocated = new Date(user.creditsLastAllocatedAt);

    const isNewMonth = now.getMonth() !== lastAllocated.getMonth() || now.getFullYear() !== lastAllocated.getFullYear();
    return isNewMonth;
}

const PLAN_CREDITS = {
    free: 1,
    starter: 5,
    pro: 15
}

export const checkUser = async () => {
    const user = await currentUser();
    if (!user) return null;

    try {
   
        const plan = await getCurrentPlan();
        const credits = PLAN_CREDITS[plan]

        const loggedInUser = await db.user.findUnique({
            where : { clerkUserId : user.id },
        });

        if(loggedInUser){

            if(loggedInUser.role === "INTERVIEWER") return loggedInUser;

            if(shouldAllocateCredits(loggedInUser, plan)){
                await db.user.update({
                    where : { clerkUserId : user.id },
                    data : {
                        credits,
                        currentPlan : plan,
                        creditsLastAllocatedAt : new Date(),
                    }
                })
            }

            return loggedInUser;
        }


        const name = `${user.firstName} ${user.lastName}`;

        const newUser = await db.user.create({
            data : {
                clerkUserId : user.id,
                name,
                imageUrl: user.imageUrl,
                email : user.emailAddresses[0].emailAddress,
                currentPlan : plan,
                credits,
                creditsLastAllocatedAt : new Date(),
            }
        });

        return newUser;
        
    } catch (error) {
        console.error("Error in checkUser:", error);
        return null;
    }
}