"use client";

import { format } from "date-fns";

/**
 * VisitDatetime renders a formatted start/end datetime block for a visit.
 *
 * Behavior:
 * - Displays a start date and time on the first line.
 * - Displays an end date and time on the second line.
 * - Removes the year from the date (e.g., "Mar 12").
 * - Hides the time if both start and end are exactly at midnight (00:00).
 * - Preserves alignment by reserving a fixed width for the time segment.
 * - Uses a live-aware color swap when `isLive` is true:
 *   start line becomes secondary, end line becomes primary.
 *
 * @param {Object} props
 * @param {Date | null} props.start
 *   Start datetime of the visit. When null, "TBD" is shown.
 * @param {Date | null} props.end
 *   End datetime of the visit. When null, "Open end" is shown.
 * @param {boolean} [props.isLive=false]
 *   Whether the visit is currently live; when true, the start line is muted and the end line is emphasized.
 * @param {string} [props.className=""]
 *   Optional class names applied to the root container.
 * @returns {JSX.Element}
 *   A two-line datetime block suitable for placement above a visit card.
 */
export default function VisitDatetime({ start, end, isLive = false, className = "" }) {
  const startDateLabel = start ? format(start, "MMM d") : "TBD";
  const endDateLabel = end ? format(end, "MMM d") : "Open end";
  const startIsMidnight = start ? start.getHours() === 0 && start.getMinutes() === 0 : false;
  const endIsMidnight = end ? end.getHours() === 0 && end.getMinutes() === 0 : false;
  const hideTime = startIsMidnight && endIsMidnight;
  const startTimeLabel = !hideTime && start ? format(start, "h:mm a") : "";
  const endTimeLabel = !hideTime && end ? format(end, "h:mm a") : "";
  const startTimeDisplay = startTimeLabel || "00:00 AM";
  const endTimeDisplay = endTimeLabel || "00:00 AM";
  const startTimeClass = startTimeLabel ? "" : "opacity-0";
  const endTimeClass = endTimeLabel ? "" : "opacity-0";
  const timeGapClass = startTimeLabel || endTimeLabel ? "min-w-[72px]" : "min-w-[36px]";

  return (
    <div className={`font-mono text-xs font-semibold tracking-tight text-slate-600 dark:text-slate-300 md:text-sm ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="space-y-1 md:space-y-0 md:flex md:items-center md:gap-3">
            <span className={isLive ? "text-slate-500 dark:text-slate-400" : ""}>
              <span className="mr-2 text-slate-400 dark:text-slate-500 md:mr-3">from</span>
              {startDateLabel}
              <span className={`ml-2 inline-block ${timeGapClass} ${startTimeClass}`}>{startTimeDisplay}</span>
            </span>
            <span className={isLive ? "text-slate-700 dark:text-slate-200" : "text-slate-500 dark:text-slate-400"}>
              <span className="mr-2 text-slate-400 dark:text-slate-500 md:mr-3">to</span>
              {endDateLabel}
              <span className={`ml-2 inline-block ${timeGapClass} ${endTimeClass}`}>{endTimeDisplay}</span>
            </span>
          </div>
        </div>
        {isLive ? (
          <span className="mt-0.5 inline-flex w-fit items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-200">
            <span className="relative mr-1 flex h-2 w-2 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/70 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            live
          </span>
        ) : null}
      </div>
    </div>
  );
}
