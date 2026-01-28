"use client";

import { useState } from "react";

export default function ExpandableText({ text, className = "", clampLines = 3 }) {
  const [expanded, setExpanded] = useState(false);
  if (!text) return null;

  const shouldToggle = text.length > 140;
  const clampClass = !expanded ? `line-clamp-${clampLines}` : "";

  return (
    <div className={`relative ${className}`}>
      <p className={`${clampClass} ${shouldToggle ? "pr-16" : ""}`}>{text}</p>
      {shouldToggle ? (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="absolute right-0 bottom-0 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-300 dark:hover:text-slate-100"
        >
          {expanded ? "Less" : "More"}
        </button>
      ) : null}
    </div>
  );
}
