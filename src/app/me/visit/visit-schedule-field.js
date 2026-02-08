"use client";

import { useMemo, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { CalendarDays, Clock, ClockIcon } from "lucide-react";

export default function VisitScheduleField({ errors = {}, onFieldChange }) {
  const [startDate, setStartDate] = useState("");
  const [startClock, setStartClock] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endClock, setEndClock] = useState("");

  const combineDateTime = (dateValue, timeValue, fallbackTime = "") => {
    if (!dateValue) return "";
    const resolvedTime = timeValue || fallbackTime;
    if (!resolvedTime) return "";
    return `${dateValue}T${resolvedTime}`;
  };

  const startDateTime = combineDateTime(startDate, startClock, "00:00");
  const endDateTime = combineDateTime(endDate, endClock);

  const durationLabel = useMemo(() => {
    if (!startDateTime || !endDateTime) return "";
    const start = new Date(startDateTime);
    const end = new Date(endDateTime);
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
  }, [startDateTime, endDateTime]);

  return (
    <>
      <div className="flex flex-col w-full gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="grid items-start w-full gap-3">
          <Label className="inline-flex items-center gap-2 text-sm font-medium" htmlFor="start-time">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200">
              <CalendarDays className="h-4 w-4" />
            </span>
            Start Date & Time
          </Label>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-none">
            <input type="hidden" name="visit_start_time" value={startDateTime} />
            <div className="grid gap-3 sm:grid-cols-[2fr_1fr]">
              <Input
                id="start-date"
                name="visit_start_date"
                type="date"
                className={`w-full h-11 rounded-xl border-slate-200 bg-white shadow-none dark:border-slate-800 dark:bg-slate-950 ${
                  errors.visit_start_time ? "border-red-400 focus-visible:ring-red-300/40" : ""
                }`}
                value={startDate}
                aria-invalid={Boolean(errors.visit_start_time)}
                onChange={(event) => {
                  const next = event.target.value;
                  setStartDate(next);
                  if (endDateTime && next && startClock && combineDateTime(next, startClock) > endDateTime) {
                    setEndDate("");
                    setEndClock("");
                  }
                  onFieldChange?.("visit_start_time");
                  onFieldChange?.("visit_time_range");
                }}
              />
              <Input
                id="start-time"
                name="visit_start_clock"
                type="time"
                className={`w-full h-11 rounded-xl border-slate-200 bg-white shadow-none dark:border-slate-800 dark:bg-slate-950 ${
                  errors.visit_start_time ? "border-red-400 focus-visible:ring-red-300/40" : ""
                }`}
                value={startClock}
                aria-invalid={Boolean(errors.visit_start_time)}
                onChange={(event) => {
                  const next = event.target.value;
                  setStartClock(next);
                  if (endDateTime && startDate && next && combineDateTime(startDate, next) > endDateTime) {
                    setEndDate("");
                    setEndClock("");
                  }
                  onFieldChange?.("visit_start_time");
                  onFieldChange?.("visit_time_range");
                }}
              />
            </div>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">When the visit begins.</p>
          </div>
          {errors.visit_start_time ? <p className="text-xs text-red-600 dark:text-red-400">{errors.visit_start_time}</p> : null}
        </div>
        <div className="grid items-center w-full gap-3">
          <Label className="inline-flex items-center gap-2 text-sm font-medium" htmlFor="end-time">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200">
              <Clock className="h-4 w-4" />
            </span>
            End Date & Time
          </Label>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-none">
            <input type="hidden" name="visit_end_time" value={endDateTime} />
            <div className="grid gap-3 sm:grid-cols-[2fr_1fr]">
              <Input
                id="end-date"
                name="visit_end_date"
                type="date"
                className={`w-full h-11 rounded-xl border-slate-200 bg-white shadow-none dark:border-slate-800 dark:bg-slate-950 ${
                  errors.visit_end_time ? "border-red-400 focus-visible:ring-red-300/40" : ""
                }`}
                value={endDate}
                aria-invalid={Boolean(errors.visit_end_time)}
                onChange={(event) => {
                  const next = event.target.value;
                  setEndDate(next);
                  if (startDateTime && next && endClock && combineDateTime(next, endClock) < startDateTime) {
                    setStartDate("");
                    setStartClock("");
                  }
                  onFieldChange?.("visit_end_time");
                  onFieldChange?.("visit_time_range");
                }}
              />
              <Input
                id="end-time"
                name="visit_end_clock"
                type="time"
                className={`w-full h-11 rounded-xl border-slate-200 bg-white shadow-none dark:border-slate-800 dark:bg-slate-950 ${
                  errors.visit_end_time ? "border-red-400 focus-visible:ring-red-300/40" : ""
                }`}
                value={endClock}
                aria-invalid={Boolean(errors.visit_end_time)}
                onChange={(event) => {
                  const next = event.target.value;
                  setEndClock(next);
                  if (startDateTime && endDate && next && combineDateTime(endDate, next) < startDateTime) {
                    setStartDate("");
                    setStartClock("");
                  }
                  onFieldChange?.("visit_end_time");
                  onFieldChange?.("visit_time_range");
                }}
              />
            </div>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">When the visit ends.</p>
          </div>
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
