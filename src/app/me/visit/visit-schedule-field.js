"use client";

import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { CalendarDays, Clock } from "lucide-react";

export default function VisitScheduleField({ errors = {}, onFieldChange }) {
  const [startDate, setStartDate] = useState("");
  const [startClock, setStartClock] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endClock, setEndClock] = useState("");
  const [startClockFocused, setStartClockFocused] = useState(false);
  const [endClockFocused, setEndClockFocused] = useState(false);

  const combineDateTime = (dateValue, timeValue, fallbackTime = "") => {
    if (!dateValue) return "";
    const resolvedTime = timeValue || fallbackTime;
    if (!resolvedTime) return "";
    return `${dateValue}T${resolvedTime}`;
  };

  const startDateTime = startClock ? combineDateTime(startDate, startClock) : "";
  const endDateTime = endClock ? combineDateTime(endDate, endClock) : "";

  return (
    <>
      <div className="flex flex-col w-full gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="grid items-start w-full gap-3">
          <div className="flex w-full flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 sm:h-7 sm:w-7">
                <CalendarDays className="h-4 w-4 sm:h-4 sm:w-4" />
              </span>
              <div>
                <Label className="inline-flex text-sm font-medium" htmlFor="start-time">
                  Start Date & Time
                </Label>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 sm:hidden">When the visit begins</p>
              </div>
            </div>
            <p className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">When the visit begins</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-none">
            <input type="hidden" name="visit_start_time" value={startDateTime} />
            <div className="grid w-full gap-4 grid-cols-3">
              <div className="relative col-span-2 overflow-visible">
                {!startDate ? <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 dark:text-slate-500">Select date</span> : null}
                <Input
                  id="start-date"
                  name="visit_start_date"
                  type="date"
                  className={`w-full h-11 rounded-xl border-slate-200 shadow-none dark:border-slate-800 focus:border-ring focus:ring-[3px] focus:ring-ring/50 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [appearance:none] [-webkit-appearance:none] ${
                    startDate ? "text-slate-900 dark:text-slate-100" : "text-transparent"
                  } ${errors.visit_start_time ? "border-red-400 bg-rose-50/40 focus-visible:ring-red-300/40 dark:bg-rose-500/10 dark:border-red-400" : ""}`}
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
              </div>
              <div className="relative col-span-1 overflow-visible">
                <Input
                  id="start-time"
                  name="visit_start_clock"
                  type="time"
                  className={`w-full h-11 rounded-xl border-slate-200 shadow-none dark:border-slate-800 focus:border-ring focus:ring-[3px] focus:ring-ring/50 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [appearance:none] [-webkit-appearance:none] ${
                    startClock ? "text-slate-900 dark:text-slate-100" : "text-transparent"
                  } ${errors.visit_start_time ? "border-red-400 bg-rose-50/40 focus-visible:ring-red-300/40 dark:bg-rose-500/10 dark:border-red-400" : ""}`}
                  value={startClock}
                  aria-invalid={Boolean(errors.visit_start_time)}
                  onFocus={() => setStartClockFocused(true)}
                  onBlur={() => setStartClockFocused(false)}
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
            </div>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">Only the date is required — time is optional.</p>
          </div>
          <p className="min-h-[1rem] text-xs text-red-600 dark:text-red-400">{errors.visit_start_time || ""}</p>
        </div>
        <div className="grid items-center w-full gap-3">
          <div className="flex w-full flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 sm:h-7 sm:w-7">
                <Clock className="h-4 w-4 sm:h-4 sm:w-4" />
              </span>
              <div>
                <Label className="inline-flex text-sm font-medium" htmlFor="end-time">
                  End Date & Time
                </Label>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 sm:hidden">When the visit ends</p>
              </div>
            </div>
            <p className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">When the visit ends</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-none">
            <input type="hidden" name="visit_end_time" value={endDateTime} />
            <div className="grid w-full gap-4 grid-cols-3">
              <div className="relative col-span-2 overflow-visible">
                {!endDate ? <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 dark:text-slate-500">Select date</span> : null}
                <Input
                  id="end-date"
                  name="visit_end_date"
                  type="date"
                  className={`w-full h-11 rounded-xl border-slate-200 shadow-none dark:border-slate-800 focus:border-ring focus:ring-[3px] focus:ring-ring/50 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [appearance:none] [-webkit-appearance:none] ${
                    endDate ? "text-slate-900 dark:text-slate-100" : "text-transparent"
                  } ${errors.visit_end_time ? "border-red-400 bg-rose-50/40 focus-visible:ring-red-300/40 dark:bg-rose-500/10 dark:border-red-400" : ""}`}
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
              </div>
              <div className="relative col-span-1 overflow-visible">
                <Input
                  id="end-time"
                  name="visit_end_clock"
                  type="time"
                  className={`w-full h-11 rounded-xl border-slate-200 shadow-none dark:border-slate-800 focus:border-ring focus:ring-[3px] focus:ring-ring/50 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [appearance:none] [-webkit-appearance:none] ${
                    endClock ? "text-slate-900 dark:text-slate-100" : "text-transparent"
                  } ${errors.visit_end_time ? "border-red-400 bg-rose-50/40 focus-visible:ring-red-300/40 dark:bg-rose-500/10 dark:border-red-400" : ""}`}
                  value={endClock}
                  aria-invalid={Boolean(errors.visit_end_time)}
                  onFocus={() => setEndClockFocused(true)}
                  onBlur={() => setEndClockFocused(false)}
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
            </div>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">Only the date is required — time is optional.</p>
          </div>
          <div className="min-h-[1rem] text-xs text-red-600 dark:text-red-400">{errors.visit_end_time || errors.visit_time_range || ""}</div>
        </div>
      </div>
      {null}
      {null}
    </>
  );
}
