"use client";

import { format } from "date-fns";

/**
 * VisitDatetime renders a formatted start/end datetime block for a visit.
 */
export default function VisitDatetime({ start, end, isLive = false, className = "", liveAccessory = null }) {
  const startMonth = start ? format(start, "MMM") : "TBD";
  const startDay = start ? format(start, "d") : "--";
  const endMonth = end ? format(end, "MMM") : "";
  const endDay = end ? format(end, "d") : "";

  const startIsMidnight = start ? start.getHours() === 0 && start.getMinutes() === 0 : false;
  const endIsMidnight = end ? end.getHours() === 0 && end.getMinutes() === 0 : false;
  const hideTime = startIsMidnight && endIsMidnight;
  const startTimeLabel = !hideTime && start ? format(start, "h:mm a") : "";
  const endTimeLabel = !hideTime && end ? format(end, "h:mm a") : "";

  return (
    <div className={`w-full ${className}`}>
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        {isLive && liveAccessory ? <span className="sm:hidden">{liveAccessory}</span> : null}

        <div className="flex items-center gap-3">
          <div
            className={`flex h-16 w-16 flex-col items-center justify-center rounded-xl shadow-sm ${
              isLive
                ? "bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-300"
                : "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
            }`}
          >
            <span className="text-[11px] font-semibold tracking-widest">{startMonth.toUpperCase()}</span>
            <span className="text-2xl font-semibold leading-none">{startDay}</span>
          </div>

          {end ? (
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">to</span>
              <div
                className={`flex h-16 w-16 flex-col items-center justify-center rounded-xl border shadow-sm ${
                  isLive
                    ? "border-slate-200 bg-slate-900 text-white dark:border-slate-700 dark:bg-slate-100 dark:text-slate-900"
                    : "border-slate-200 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                }`}
              >
                <span className="text-[11px] font-semibold tracking-widest">{endMonth.toUpperCase()}</span>
                <span className="text-2xl font-semibold leading-none">{endDay}</span>
              </div>
            </div>
          ) : null}

          <div className="text-xs font-semibold text-slate-500 dark:text-slate-300">
            {startTimeLabel ? (
              <div className={`text-sm font-semibold ${isLive ? "text-slate-500 dark:text-slate-400" : "text-slate-900 dark:text-slate-100"}`}>
                {startTimeLabel}
              </div>
            ) : null}
            {endTimeLabel ? (
              <div className={`mt-1 text-xs ${isLive ? "text-slate-900 dark:text-slate-100" : "text-slate-500 dark:text-slate-400"}`}>
                Ends {endTimeLabel}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
