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
  const hasAnyTime = Boolean(startTimeLabel || endTimeLabel);
  const sameDay = Boolean(
    start &&
      end &&
      start.getFullYear() === end.getFullYear() &&
      start.getMonth() === end.getMonth() &&
      start.getDate() === end.getDate(),
  );
  const showEndDate = !sameDay || !hasAnyTime;
  const endTimeText = sameDay ? endTimeLabel : endTimeDisplay;
  const timeMarginClass = hasAnyTime ? "ml-2" : "";
  const rangeGapClass = hasAnyTime ? "md:gap-3" : "md:gap-1";

  return (
    <div className={`font-mono text-base font-semibold tracking-tight text-slate-600 dark:text-slate-300 md:text-lg lg:text-xl ${className}`}>
      <div className="flex flex-col items-start gap-2">
        {isLive ? (
          <span className="mt-0.5 inline-flex w-fit items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-200">
            <span className="relative mr-1 flex h-2 w-2 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/70 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            live
          </span>
        ) : null}
        <div>
          <div className={`space-y-1 md:space-y-0 md:flex md:items-center ${rangeGapClass}`}>
            <span className={isLive ? "text-slate-500 dark:text-slate-400" : ""}>
              {startDateLabel}
              {hasAnyTime && <span className={`${timeMarginClass} inline-block ${startTimeClass}`}>{startTimeDisplay}</span>}
            </span>
            <span className="">to</span>
            <span className={isLive ? "text-slate-700 dark:text-slate-200" : "text-slate-500 dark:text-slate-400"}>
              {showEndDate ? endDateLabel : null}
              {hasAnyTime && endTimeText ? (
                <span className={`${showEndDate ? timeMarginClass : ""} inline-block ${endTimeClass}`}>{endTimeText}</span>
              ) : null}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
