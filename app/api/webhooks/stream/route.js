// app/api/webhooks/stream/route.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "@/lib/prisma";

export async function POST(request) {
  const body = await request.json();
  const eventType = body.type;

  if (
    eventType !== "call.transcription_ready" &&
    eventType !== "call.recording_ready"
  ) {
    return Response.json({ ok: true });
  }

  // Stream sends "default:mock_123_abc" — strip the prefix
  const callCid = body.call_cid ?? "";
  const streamCallId = callCid.includes(":") ? callCid.split(":")[1] : callCid;

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

    if (!booking) return Response.json({ ok: true });

    // ── Recording ready ───────────────────────────────────────────────────────
    if (eventType === "call.recording_ready") {
      const recordingUrl =
        body.call_recording?.url ??
        body.call_recording?.filename ??
        body.recording_url ??
        null;

      if (!recordingUrl) return Response.json({ ok: true });

      await db.booking.update({
        where: { id: booking.id },
        data: { recordingUrl },
      });

      return Response.json({ ok: true });
    }

    // ── Transcription ready ───────────────────────────────────────────────────
    if (eventType === "call.transcription_ready") {
      // Idempotency guard — Stream may retry the same webhook multiple times
      if (booking.feedback) return Response.json({ ok: true });

      // Try multiple payload shapes Stream uses across SDK versions
      const transcriptUrl =
        body.call_transcription?.url ??
        body.call_transcription?.filename ??
        body.transcription_url ??
        null;

      if (!transcriptUrl) return Response.json({ ok: true });

      // 1. Download JSONL transcript from Stream CDN
      const transcriptRes = await fetch(transcriptUrl);
      if (!transcriptRes.ok) return Response.json({ ok: true });

      const transcriptText = await transcriptRes.text();
      if (!transcriptText?.trim()) return Response.json({ ok: true });

      // 2. Parse JSONL — each line is a speech segment
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

      if (lines.length === 0) return Response.json({ ok: true });

      // Map clerkUserId → display name for readable transcript
      const speakerMap = {
        [booking.interviewer.clerkUserId]: booking.interviewer.name ?? "Interviewer",
        [booking.interviewee.clerkUserId]: booking.interviewee.name ?? "Interviewee",
      };

      const transcript = lines
        .map((l) => `${speakerMap[l.speaker_id] ?? l.speaker_id}: ${l.text}`)
        .join("\n");

      // 3. Generate structured feedback via Gemini
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

      let feedbackData;
      try {
        feedbackData = JSON.parse(raw);
      } catch {
        // Gemini returned malformed JSON — bail safely, Stream will retry
        return Response.json({ ok: true });
      }

      // Validate required fields before writing to DB
      const requiredFields = [
        "summary", "technical", "communication",
        "problemSolving", "recommendation", "overallRating"
      ];
      const isValid = requiredFields.every(
        (f) => typeof feedbackData[f] === "string" && feedbackData[f].trim()
      );
      if (!isValid) return Response.json({ ok: true });

      // 4. Atomic write — upsert feedback + mark booking COMPLETED
      // Upsert handles concurrent webhook retries without P2002 unique errors
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
          update: {}, // idempotent — never overwrite existing feedback
        }),
        db.booking.update({
          where: { id: booking.id },
          data: { status: "COMPLETED" },
        }),
      ]);

      // 5. Credit the interviewer — checked separately to avoid transaction conflicts
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
      }
    }

    return Response.json({ ok: true });
  } catch (err) {
    // Always return 200 — non-2xx triggers aggressive Stream retries
    // which can cause duplicate feedback writes
    console.error("[stream-webhook] error:", err);
    return Response.json({ ok: true });
  }
}