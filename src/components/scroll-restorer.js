"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRestorer({ storageKey }) {
  const pathname = usePathname();
  const rafId = useRef(null);

  useLayoutEffect(() => {
    if (!storageKey) return;
    const stored = sessionStorage.getItem(storageKey);
    if (!stored) {
      document.documentElement.classList.remove("artist-scroll-restore-pending");
      return;
    }
    const top = Number(stored);
    if (Number.isNaN(top)) {
      document.documentElement.classList.remove("artist-scroll-restore-pending");
      return;
    }
    window.scrollTo({ top, left: 0, behavior: "auto" });
    document.documentElement.classList.remove("artist-scroll-restore-pending");
  }, [pathname, storageKey]);

  useEffect(() => {
    if (!storageKey) return;
    if (typeof history !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const savePosition = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        sessionStorage.setItem(storageKey, String(window.scrollY));
      });
    };

    const handlePageHide = () => {
      sessionStorage.setItem(storageKey, String(window.scrollY));
    };

    window.addEventListener("scroll", savePosition, { passive: true });
    window.addEventListener("pagehide", handlePageHide);
    return () => {
      window.removeEventListener("scroll", savePosition);
      window.removeEventListener("pagehide", handlePageHide);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [storageKey]);

  return null;
}
