"use client";

import { useMemo, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { ClockIcon } from "lucide-react";

export default function VisitScheduleField({ errors = {}, onFieldChange }) {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const durationLabel = useMemo(() => {
    if (!startTime || !endTime) return "";
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diffMs = end.getTime() - start.getTime();
    if (Number.isNaN(diffMs) || diffMs <= 0) return "";

    const totalMinutes = Math.floor(diffMs / 60000);
    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    const minutes = totalMinutes % 60;

    const parts = [];
    if (days) parts.push(`${days} day${days === 1 ? "" : "s"}`);
    if (hours) parts.push(`${hours} hour${hours === 1 ? "" : "s"}`);
    if (minutes || parts.length === 0) parts.push(`${minutes} minute${minutes === 1 ? "" : "s"}`);

    return parts.join(" and ");
  }, [startTime, endTime]);

  return (
    <>
      <div className="flex flex-col w-full gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="grid items-center w-full gap-3">
          <Label className="text-sm font-medium" htmlFor="start-time">
            Start Date & Time
          </Label>
          <Input
            id="start-time"
            name="visit_start_time"
            type="datetime-local"
            className={`w-full bg-white dark:bg-slate-950 ${errors.visit_start_time ? "border-red-400 focus-visible:ring-red-300/40" : ""}`}
            value={startTime}
            max={endTime || undefined}
            aria-invalid={Boolean(errors.visit_start_time)}
            onChange={(event) => {
              const next = event.target.value;
              setStartTime(next);
              if (endTime && next && next > endTime) {
                setEndTime("");
              }
              onFieldChange?.("visit_start_time");
              onFieldChange?.("visit_time_range");
            }}
          />
          {errors.visit_start_time ? <p className="text-xs text-red-600 dark:text-red-400">{errors.visit_start_time}</p> : null}
        </div>
        <div className="grid items-center w-full gap-3">
          <Label className="text-sm font-medium" htmlFor="end-time">
            End Date & Time
          </Label>
          <Input
            id="end-time"
            name="visit_end_time"
            type="datetime-local"
            className={`w-full bg-white dark:bg-slate-950 ${errors.visit_end_time ? "border-red-400 focus-visible:ring-red-300/40" : ""}`}
            value={endTime}
            min={startTime || undefined}
            aria-invalid={Boolean(errors.visit_end_time)}
            onChange={(event) => {
              const next = event.target.value;
              setEndTime(next);
              if (startTime && next && next < startTime) {
                setStartTime("");
              }
              onFieldChange?.("visit_end_time");
              onFieldChange?.("visit_time_range");
            }}
          />
          {errors.visit_end_time ? <p className="text-xs text-red-600 dark:text-red-400">{errors.visit_end_time}</p> : null}
        </div>
      </div>
      {errors.visit_time_range ? <p className="mt-2 text-xs text-red-600 dark:text-red-400">{errors.visit_time_range}</p> : null}
      {durationLabel ? (
        <Alert className="mt-4 bg-purple-50 dark:bg-purple-500/10" variant="info">
          <ClockIcon className="w-4 h-4 text-purple-700 dark:text-purple-200" />
          <AlertTitle className="text-sm font-semibold text-gray-900 dark:text-slate-100">Visit Duration</AlertTitle>
          <AlertDescription className="text-sm text-gray-600 dark:text-slate-300">{durationLabel}</AlertDescription>
        </Alert>
      ) : null}
    </>
  );
}
