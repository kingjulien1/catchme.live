"use client";

import { useEffect, useRef, useState } from "react";

export function useCountdown(target, { active = true } = {}) {
  const [now, setNow] = useState(() => new Date());
  const [pulse, setPulse] = useState({ days: false, hours: false, mins: false, secs: false });
  const prevRef = useRef(null);

  useEffect(() => {
    if (!active) return undefined;
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [active]);

  const formatCountdown = (value) => {
    if (!value) return null;
    const diffSeconds = Math.max(0, Math.floor((value.getTime() - now.getTime()) / 1000));
    const days = Math.floor(diffSeconds / 86400);
    const hours = Math.floor((diffSeconds % 86400) / 3600);
    const mins = Math.floor((diffSeconds % 3600) / 60);
    const secs = diffSeconds % 60;
    const pad = (num) => String(num).padStart(2, "0");
    return { days: pad(days), hours: pad(hours), mins: pad(mins), secs: pad(secs) };
  };

  const countdown = formatCountdown(target);

  useEffect(() => {
    if (!countdown) return undefined;
    const prev = prevRef.current;
    prevRef.current = countdown;
    if (!prev) return undefined;

    const nextPulse = { days: false, hours: false, mins: false, secs: false };
    ["days", "hours", "mins", "secs"].forEach((key) => {
      if (prev[key] !== countdown[key]) nextPulse[key] = true;
    });

    if (!nextPulse.days && !nextPulse.hours && !nextPulse.mins && !nextPulse.secs) return undefined;

    const timeout = setTimeout(() => {
      setPulse(nextPulse);
      const resetTimeout = setTimeout(() => {
        setPulse({ days: false, hours: false, mins: false, secs: false });
      }, 300);
      return () => clearTimeout(resetTimeout);
    }, 0);

    return () => clearTimeout(timeout);
  }, [countdown]);

  return { countdown, pulse };
}
