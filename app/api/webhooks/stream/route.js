// app/api/webhooks/stream/route.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "@/lib/prisma";

export async function POST(request) {
  const body = await request.json();
  const eventType = body.type;

  console.log("[stream-webhook] event:", eventType);

  if (
    eventType !== "call.transcription_ready" &&
    eventType !== "call.recording_ready"
  ) {
    return Response.json({ ok: true });
  }

  const callCid = body.call_cid ?? "";
  const streamCallId = callCid.includes(":") ? callCid.split(":")[1] : callCid;

  console.log("[stream-webhook] streamCallId:", streamCallId);

  if (!streamCallId) return Response.json({ ok: true });

  try {
    const booking = await db.booking.findUnique({
      where: { streamCallId },
      include: {
        interviewer: {
          select: { id: true, clerkUserId: true, name: true, categories: true },
        },
        interviewee: {
          select: { id: true, clerkUserId: true, name: true },
        },
        feedback: { select: { id: true } },
      },
    });

    console.log("[stream-webhook] booking found:", !!booking);

    if (!booking) return Response.json({ ok: true });

    if (eventType === "call.recording_ready") {
      const recordingUrl =
        body.call_recording?.url ??
        body.call_recording?.filename ??
        body.recording_url ??
        null;

      console.log("[stream-webhook] recordingUrl:", recordingUrl);

      if (!recordingUrl) return Response.json({ ok: true });

      await db.booking.update({
        where: { id: booking.id },
        data: { recordingUrl },
      });

      console.log("[stream-webhook] recording saved ✅");
      return Response.json({ ok: true });
    }

    if (eventType === "call.transcription_ready") {
      if (booking.feedback) {
        console.log("[stream-webhook] feedback already exists, skipping");
        return Response.json({ ok: true });
      }

      const transcriptUrl =
        body.call_transcription?.url ??
        body.call_transcription?.filename ??
        body.transcription_url ??
        null;

      console.log("[stream-webhook] transcriptUrl:", transcriptUrl);

      if (!transcriptUrl) return Response.json({ ok: true });

      const transcriptRes = await fetch(transcriptUrl);
      if (!transcriptRes.ok) return Response.json({ ok: true });

      const transcriptText = await transcriptRes.text();
      if (!transcriptText?.trim()) return Response.json({ ok: true });

      const lines = transcriptText
        .trim()
        .split("\n")
        .filter(Boolean)
        .map((line) => {
          try {
            return JSON.parse(line);
          } catch {
            return null;
          }
        })
        .filter((entry) => entry?.type === "speech");

      console.log("[stream-webhook] transcript lines:", lines.length);

      if (lines.length === 0) return Response.json({ ok: true });

      const speakerMap = {
        [booking.interviewer.clerkUserId]: booking.interviewer.name ?? "Interviewer",
        [booking.interviewee.clerkUserId]: booking.interviewee.name ?? "Interviewee",
      };

      const transcript = lines
        .map((l) => `${speakerMap[l.speaker_id] ?? l.speaker_id}: ${l.text}`)
        .join("\n");

      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

      const categories = booking.interviewer.categories?.join(", ") ?? "General";

      const prompt = `You are an expert technical interviewer evaluating a mock interview.

Interview categories: ${categories}
Interviewer: ${booking.interviewer.name}
Candidate: ${booking.interviewee.name}

TRANSCRIPT:
${transcript}

Analyze the candidate's performance. Respond ONLY with a valid JSON object, no markdown, no backticks, no explanation:
{
  "summary": "2-3 sentence overall summary of the session",
  "technical": "Assessment of technical knowledge and accuracy",
  "communication": "Assessment of clarity, structure, and communication style",
  "problemSolving": "Assessment of problem-solving approach and thought process",
  "recommendation": "HIRE / CONSIDER / NO_HIRE with a one-sentence reason",
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "improvements": ["improvement 1", "improvement 2", "improvement 3"],
  "overallRating": "POOR or AVERAGE or GOOD or EXCELLENT"
}`;

      const result = await model.generateContent(prompt);
      const raw = result.response
        .text()
        .trim()
        .replace(/^```json|^```|```$/gm, "")
        .trim();

      console.log("[stream-webhook] gemini raw:", raw.slice(0, 200));

      let feedbackData;
      try {
        feedbackData = JSON.parse(raw);
      } catch {
        console.error("[stream-webhook] JSON parse failed:", raw);
        return Response.json({ ok: true });
      }

      const requiredFields = [
        "summary", "technical", "communication",
        "problemSolving", "recommendation", "overallRating",
      ];
      const isValid = requiredFields.every(
        (f) => typeof feedbackData[f] === "string" && feedbackData[f].trim()
      );

      console.log("[stream-webhook] feedbackData valid:", isValid);

      if (!isValid) return Response.json({ ok: true });

      await db.$transaction([
        db.feedback.upsert({
          where: { bookingId: booking.id },
          create: {
            bookingId: booking.id,
            summary: feedbackData.summary,
            technical: feedbackData.technical,
            communication: feedbackData.communication,
            problemSolving: feedbackData.problemSolving,
            recommendation: feedbackData.recommendation,
            strengths: feedbackData.strengths ?? [],
            improvements: feedbackData.improvements ?? [],
            overallRating: feedbackData.overallRating,
          },
          update: {},
        }),
        db.booking.update({
          where: { id: booking.id },
          data: { status: "COMPLETED" },
        }),
      ]);

      console.log("[stream-webhook] feedback saved ✅");

      const earnExists = await db.creditTransaction.findFirst({
        where: { bookingId: booking.id, type: "BOOKING_EARNING" },
      });

      if (!earnExists) {
        await db.creditTransaction.create({
          data: {
            userId: booking.interviewer.id,
            amount: booking.creditsCharged,
            type: "BOOKING_EARNING",
            bookingId: booking.id,
          },
        });
        console.log("[stream-webhook] interviewer credited ✅");
      }
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[stream-webhook] error:", err);
    return Response.json({ ok: true });
  }
}