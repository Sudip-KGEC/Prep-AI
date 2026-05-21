"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  TrendingUp,
  MessageSquare,
  Brain,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { GrayTitle } from "@/components/reusables";
import { RATING_CONFIG } from "@/lib/data";
import { StarsBackgroundDemo } from "./landingPage-sections/demo-components-backgrounds-stars";

export function FeedbackModal({
  open,
  onOpenChange,
  feedback,
  intervieweeName,
}) {
  if (!feedback) return null;

  const rating = RATING_CONFIG[feedback.overallRating];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#09090f] border border-violet-500/15 text-stone-100 sm:max-w-3xl max-h-[85vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <StarsBackgroundDemo />

        <DialogHeader className="relative">
          <DialogTitle className="font-serif text-2xl tracking-tight">
            <GrayTitle>AI Feedback Report</GrayTitle>
          </DialogTitle>
          {intervieweeName && (
            <p className="text-xs text-stone-500 font-light mt-1">
              Performance analysis for {intervieweeName}
            </p>
          )}
        </DialogHeader>

        <div className="relative flex flex-col gap-4 mt-2">

          <div
            className={`rounded-2xl border ${rating.className} bg-gradient-to-br ${rating.bg} to-transparent p-5 flex items-center justify-between`}
          >
            <div>
              <p className="text-[10px] uppercase tracking-widest opacity-60 mb-1">
                Overall rating
              </p>
              <p className="font-serif text-3xl">{rating.label}</p>
            </div>
            <span className="text-4xl">{rating.emoji}</span>
          </div>

          <div className="bg-[#0f0f11] border border-violet-500/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={12} className="text-violet-400" />
              <p className="text-[10px] uppercase tracking-widest text-stone-600">
                Summary
              </p>
            </div>
            <p className="text-sm text-stone-300 font-light leading-relaxed">{feedback.summary}</p>
          </div>

          <div className="bg-[#0f0f11] border border-violet-500/10 rounded-xl p-4">
            <p className="text-[10px] uppercase tracking-widest text-stone-600 mb-2">
              Recommendation
            </p>
            <p className="text-sm text-stone-300 font-light leading-relaxed">{feedback.recommendation}</p>
          </div>

          <div className="grid gap-2.5">
            {[
              {
                icon: <Brain size={13} className="text-violet-400" />,
                label: "Technical",
                value: feedback.technical,
              },
              {
                icon: <MessageSquare size={13} className="text-violet-400" />,
                label: "Communication",
                value: feedback.communication,
              },
              {
                icon: <TrendingUp size={13} className="text-violet-400" />,
                label: "Problem Solving",
                value: feedback.problemSolving,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-[#0f0f11] border border-violet-500/10 rounded-xl p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  {item.icon}
                  <p className="text-[10px] uppercase tracking-widest text-stone-600">
                    {item.label}
                  </p>
                </div>
                <p className="text-sm text-stone-300 font-light leading-relaxed">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-[#0f0f11] border border-violet-500/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 size={12} className="text-green-400" />
                <p className="text-[10px] uppercase tracking-widest text-stone-600">
                  Strengths
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                {feedback.strengths?.map((s, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="justify-start border-green-500/20 bg-green-500/[0.04] text-green-400 whitespace-normal font-light"
                  >
                    ✓ {s}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="bg-[#0f0f11] border border-violet-500/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle size={12} className="text-violet-400" />
                <p className="text-[10px] uppercase tracking-widest text-stone-600">
                  To improve
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                {feedback.improvements?.map((imp, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="justify-start border-red-500/20 bg-red-500/[0.04] text-red-400 whitespace-normal font-light"
                  >
                    ↑ {imp}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}