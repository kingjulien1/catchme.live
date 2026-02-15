"use client";

import Link from "next/link";

export default function VisitLink({ href, className, storageKey, children }) {
  const handleClick = () => {
    if (!storageKey) return;
    try {
      if (typeof history !== "undefined" && "scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
      const scrollY = window.scrollY;
      sessionStorage.setItem(storageKey, String(scrollY));
      sessionStorage.setItem(`${storageKey}-lock`, "1");
      document.body.style.top = `-${scrollY}px`;
      document.body.classList.add("artist-body-lock");
    } catch (error) {
      console.error("Failed to store scroll position", error);
    }
  };

  return (
    <Link href={href} scroll={false} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
