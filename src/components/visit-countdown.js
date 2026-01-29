"use client";

import { useEffect, useMemo, useState } from "react";

function formatCountdown(ms) {
  if (ms <= 0) return "0s";

  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}

export default function VisitCountdown({ start, end, isLive = false, className = "" }) {
  const target = useMemo(() => {
    if (isLive && end) return end;
    if (!isLive && start) return start;
    return null;
  }, [start, end, isLive]);

  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    if (!target) return undefined;
    const intervalId = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(intervalId);
  }, [target]);

  if (!target) return null;

  const remainingMs = target.getTime() - now.getTime();
  const label = isLive ? "Ends in" : "Starts in";

  return (
    <div className={`text-left font-mono text-xs font-semibold tracking-tight text-slate-500 md:text-sm sm:text-right ${className}`}>
      {label} {formatCountdown(remainingMs)}
    </div>
  );
}
