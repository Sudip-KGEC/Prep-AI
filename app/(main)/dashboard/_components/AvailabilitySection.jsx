/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { GrayTitle } from "@/components/reusables";
import { setAvailability } from "@/actions/dashboard";
import useFetch from "@/hooks/use-fetch";
import { Clock } from "lucide-react";

export default function AvailabilitySection({ initial }) {
  const [startTime, setStartTime] = useState(
    initial?.startTime
      ? new Date(initial.startTime).toTimeString().slice(0, 5)
      : ""
  );

  const [endTime, setEndTime] = useState(
    initial?.endTime
      ? new Date(initial.endTime).toTimeString().slice(0, 5)
      : ""
  );

  const [saved, setSaved] = useState(false);
  const [validationError, setValidationError] = useState("");

  const { data, loading, error, fn: saveFn } = useFetch(setAvailability);

  useEffect(() => {
    if (data?.success) {
      setSaved(true);
      const t = setTimeout(() => setSaved(false), 3000);
      return () => clearTimeout(t);
    }
  }, [data]);

  // When start time changes, clear end time if it's now invalid
  const handleStartChange = (val) => {
    setStartTime(val);
    setValidationError("");

    if (endTime && endTime <= val) {
      setEndTime("");
      setValidationError("End time must be after start time. Please select again.");
    }
  };

  // End time must be after start time
  const handleEndChange = (val) => {
    setValidationError("");

    if (startTime && val <= startTime) {
      setValidationError("End time must be after start time.");
      setEndTime("");
      return;
    }

    setEndTime(val);
  };

  // Generate time options in 30-min slots
  const timeSlots = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      const hh = String(h).padStart(2, "0");
      const mm = String(m).padStart(2, "0");
      timeSlots.push(`${hh}:${mm}`);
    }
  }

  // Min end time = 30 mins after start
  const minEndTime = (() => {
    if (!startTime) return "";
    const [h, m] = startTime.split(":").map(Number);
    const total = h * 60 + m + 30;
    const eh = Math.floor(total / 60) % 24;
    const em = total % 60;
    return `${String(eh).padStart(2, "0")}:${String(em).padStart(2, "0")}`;
  })();

  const toISO = (time) => {
    const [h, m] = time.split(":").map(Number);
    const d = new Date();
    d.setHours(h, m, 0, 0);
    return d.toISOString();
  };

  const handleSave = () => {
    if (!startTime || !endTime) {
      setValidationError("Please select both start and end time.");
      return;
    }

    if (endTime <= startTime) {
      setValidationError("End time must be after start time.");
      return;
    }

    setValidationError("");
    saveFn({
      startTime: toISO(startTime),
      endTime: toISO(endTime),
    });
  };

  const hasWindow = startTime && endTime;

  const duration = hasWindow
    ? (() => {
        const [sh, sm] = startTime.split(":").map(Number);
        const [eh, em] = endTime.split(":").map(Number);
        const diff = eh * 60 + em - (sh * 60 + sm);
        if (diff <= 0) return null;
        const h = Math.floor(diff / 60);
        const m = diff % 60;
        return h > 0 ? `${h}h ${m > 0 ? `${m}m` : ""}`.trim() : `${m}m`;
      })()
    : null;

  return (
    <section className="bg-[#0f0f11] border border-purple-500/10 rounded-2xl p-8 flex flex-col gap-7 shadow-[0_0_40px_rgba(168,85,247,0.05)]">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-lg mb-4">
            <Clock size={18} className="text-purple-400" />
          </span>
          <h2 className="font-serif text-xl tracking-tight">
            <GrayTitle>Daily availability window</GrayTitle>
          </h2>
          <p className="text-xs text-stone-500 font-light mt-1">
            Interviewees can book within this window every day.
          </p>
        </div>

        {initial && (
          <Badge
            variant="outline"
            className="shrink-0 border-purple-500/20 bg-purple-500/10 text-purple-400"
          >
            Active
          </Badge>
        )}
      </div>

      <div className="h-px bg-purple-500/10" />

      {/* Time inputs */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label className="text-stone-400 text-xs">Start time</Label>
          <Input
            type="time"
            value={startTime}
            onChange={(e) => handleStartChange(e.target.value)}
            className="bg-[#141417] border-purple-500/10 text-stone-100 focus-visible:ring-purple-500/30"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-stone-400 text-xs">
            End time{" "}
            {!startTime && (
              <span className="text-stone-600 ml-1">(select start first)</span>
            )}
            {startTime && (
              <span className="text-stone-600 ml-1">
                (min {minEndTime})
              </span>
            )}
          </Label>
          <Input
            type="time"
            value={endTime}
            min={minEndTime}
            onChange={(e) => handleEndChange(e.target.value)}
            disabled={!startTime}
            className={`bg-[#141417] border-purple-500/10 text-stone-100 focus-visible:ring-purple-500/30 ${
              !startTime ? "opacity-40 cursor-not-allowed" : ""
            }`}
          />
        </div>
      </div>

      {/* Hint when start is selected but end isn't */}
      {startTime && !endTime && !validationError && (
        <p className="text-xs text-stone-500">
          Select an end time after <span className="text-purple-400">{startTime}</span>
        </p>
      )}

      {/* Validation error */}
      {validationError && (
        <p className="text-xs text-amber-400 flex items-center gap-1">
          ⚠ {validationError}
        </p>
      )}

      {/* Duration */}
      {duration && (
        <div className="flex items-center gap-3">
          <Badge
            variant="outline"
            className="border-purple-500/20 bg-purple-500/5 text-purple-400"
          >
            {duration} window
          </Badge>
          <span className="text-xs text-stone-600">
            Interviewees see this as your open booking range
          </span>
        </div>
      )}

      {/* Server error */}
      {error && (
        <p className="text-xs text-red-400">
          ⚠ {error?.message || error}
        </p>
      )}

      {/* Save */}
      <Button
        variant="purple"
        disabled={!hasWindow || loading || !!validationError}
        onClick={handleSave}
        className="self-start"
      >
        {loading ? "Saving…" : saved ? "✓ Saved" : initial ? "Update window" : "Set availability"}
      </Button>
    </section>
  );
}