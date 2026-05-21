"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, Sparkles } from "lucide-react";
import { FeedbackModal } from "./FeedbackModal";
import { formatDate, formatDuration, formatTime } from "@/lib/helpers";
import { RATING_LABEL, RATING_STYLES, STATUS_STYLES } from "@/lib/data";

export function AppointmentCard({ booking, mode, isPast = false }) {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const { has } = useAuth();

  const {
    startTime,
    endTime,
    status,
    creditsCharged,
    streamCallId,
    recordingUrl,
    feedback,
  } = booking;

  const person =
    mode === "interviewer" ? booking.interviewee : booking.interviewer;

  const creditsLabel =
    mode === "interviewer"
      ? `+${creditsCharged} credits earned`
      : `−${creditsCharged} credits`;

  const creditsStyle =
    mode === "interviewer"
      ? "border-green-500/20 bg-green-500/10 text-green-400"
      : "border-violet-500/20 bg-violet-500/[0.06] text-violet-400";

  const isUpcoming = status === "SCHEDULED";

  return (
    <>
      <FeedbackModal
        open={feedbackOpen}
        onOpenChange={setFeedbackOpen}
        feedback={feedback}
        intervieweeName={
          mode === "interviewer" ? booking.interviewee?.name : undefined
        }
      />

      <article className="group relative bg-[#0f0f11] border border-violet-500/10 hover:border-violet-500/25 transition-all duration-300 hover:-translate-y-0.5 rounded-2xl bg-gradient-to-t from-transparent via-transparent to-violet-500/[0.04] p-6 flex flex-col gap-5 self-start">

        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <Avatar className="w-12 h-12 border border-violet-500/15 rounded-xl shrink-0">
              <AvatarImage
                src={person?.imageUrl}
                alt={person?.name}
                className="rounded-xl"
              />
              <AvatarFallback className="rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 text-base font-medium">
                {person?.name?.[0] ?? "?"}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-1 min-w-0">
              <p className="text-sm font-medium text-stone-200 leading-tight truncate">
                {person?.name ?? "—"}
              </p>
              {person?.title && person?.company ? (
                <p className="text-xs text-stone-500 truncate">
                  {person.title}
                  <span className="text-stone-700 mx-1.5">·</span>
                  {person.company}
                </p>
              ) : (
                <p className="text-xs text-stone-600 truncate">
                  {person?.email}
                </p>
              )}
              {mode === "interviewee" && person?.categories?.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {person.categories.slice(0, 3).map((cat) => (
                    <span
                      key={cat}
                      className="text-[10px] px-2 py-0.5 rounded-md border border-violet-500/20 bg-violet-500/[0.06] text-violet-400 leading-tight"
                    >
                      {cat.replace("_", " ")}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <Badge variant="outline" className={STATUS_STYLES[status]}>
              {status.charAt(0) + status.slice(1).toLowerCase()}
            </Badge>
            <Badge variant="outline" className={creditsStyle}>
              {creditsLabel}
            </Badge>
          </div>
        </div>

        <div className="h-px bg-violet-500/8" />

        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 text-stone-600">
              <Calendar size={11} />
              <span className="text-[10px] font-semibold tracking-widest uppercase">
                Date
              </span>
            </div>
            <p className="text-xs text-stone-300">{formatDate(startTime)}</p>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 text-stone-600">
              <Clock size={11} />
              <span className="text-[10px] font-semibold tracking-widest uppercase">
                Time
              </span>
            </div>
            <p className="text-xs text-stone-300">
              {formatTime(startTime)}
              <span className="text-stone-600 mx-1">–</span>
              {formatTime(endTime)}
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 text-stone-600">
              <Video size={11} />
              <span className="text-[10px] font-semibold tracking-widest uppercase">
                Duration
              </span>
            </div>
            <p className="text-xs text-stone-300">
              {formatDuration(startTime, endTime)}
            </p>
          </div>
        </div>

        {feedback?.summary && (
          <div className="rounded-xl border border-violet-500/10 bg-[#141417] px-4 py-3 flex flex-col gap-1.5">
            <p className="text-[10px] font-semibold text-stone-600 tracking-widest uppercase">
              AI Feedback
            </p>
            <p className="text-xs text-stone-400 font-light leading-relaxed line-clamp-2">
              {feedback.summary}
            </p>
          </div>
        )}

        {(streamCallId || recordingUrl || feedback) && (
          <div className="flex items-center gap-2 flex-wrap pt-0.5">
            {!isPast && streamCallId && isUpcoming && (
              <Button
                variant="purple"
                size="sm"
                className="gap-1.5 rounded-full px-4 shadow-[0_0_14px_rgba(139,92,246,0.25)] hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-300"
                asChild
              >
                <Link href={`/call/${streamCallId}`}>
                  <Video size={12} />
                  Join call
                </Link>
              </Button>
            )}

            {recordingUrl && has?.({ plan: "pro" }) && (
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 rounded-full px-4 border-violet-500/20 text-purple-200/60 hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-purple-100 transition-all duration-300 bg-transparent"
                asChild
              >
                <a href={recordingUrl} target="_blank" rel="noopener noreferrer">
                  📹 Recording
                </a>
              </Button>
            )}

            {feedback &&
              (has?.({ plan: "starter" }) || has?.({ plan: "pro" })) && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 rounded-full px-4 border-violet-500/20 text-violet-400 hover:bg-violet-500/10 hover:border-violet-500/40 transition-all duration-300 bg-transparent"
                    onClick={() => setFeedbackOpen(true)}
                  >
                    <Sparkles size={12} />
                    Full Feedback
                  </Button>
                  <Badge
                    variant="outline"
                    className={RATING_STYLES[feedback.overallRating]}
                  >
                    ✦ {RATING_LABEL[feedback.overallRating]} performance
                  </Badge>
                </>
              )}
          </div>
        )}
      </article>
    </>
  );
}