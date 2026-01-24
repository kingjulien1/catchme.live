"use client";

import Link from "next/link";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { formatFollowers } from "@/lib/utils";
import { Instagram, User } from "lucide-react";

export default function AccountHandleClient({
  username,
  name,
  profilePictureUrl,
  followersCount,
  accountType,
  mediaCount,
  className = "",
}) {
  const normalized = username ? username.replace(/^@/, "") : "";
  const handle = normalized ? `@${normalized}` : "@unknown";
  const displayName = name || normalized || "Instagram account - not registered on catchme.live yet";
  const accountLabel = accountType ? accountType.replace(/_/g, " ").toLowerCase() : "Instagram account";
  const mediaLabel = typeof mediaCount === "number" ? `${mediaCount} posts` : "Posts hidden";
  const instagramHref = normalized ? `https://www.instagram.com/${normalized}/` : "https://www.instagram.com/";
  const profileHref = normalized ? `/artists/${normalized}` : "/artists";

  return (
    <HoverCard openDelay={120}>
      <HoverCardTrigger asChild>
        <button
          type="button"
          className={`inline-flex items-center gap-1 text-lg font-semibold text-fuchsia-500 transition hover:text-fuchsia-600 dark:text-fuchsia-400 dark:hover:text-fuchsia-300 ${className}`}
        >
          {handle}
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="relative z-50 w-72 rounded-2xl border border-gray-200 bg-white p-4 shadow-lg dark:border-slate-800/80 dark:bg-slate-900/90">
        <Link href={profileHref} aria-label={`Open ${handle} profile`} className="absolute inset-0 rounded-2xl" />
        <Link
          href={instagramHref}
          aria-label={`Open ${handle} on Instagram`}
          className="absolute right-3 bottom-3 z-20 inline-flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:text-gray-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
          rel="noreferrer"
          target="_blank"
        >
          <Instagram className="h-3.5 w-3.5" />
        </Link>
        <div className="relative z-10 flex items-start gap-3 pointer-events-none">
          <div className="h-12 w-12 overflow-hidden rounded-full border border-gray-200 bg-gray-100 dark:border-slate-700 dark:bg-slate-800">
            {profilePictureUrl ? (
              <img src={profilePictureUrl} alt={handle} className="h-full w-full object-cover" />
            ) : (
              <div className="grid h-full w-full place-items-center text-gray-400 dark:text-slate-400">
                <User className="h-5 w-5" />
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-slate-100">{displayName}</p>
            <p className="text-xs text-gray-500 dark:text-slate-400">{handle}</p>
            <p className="mt-2 text-xs text-gray-500 dark:text-slate-400">{formatFollowers(followersCount)}</p>
          </div>
        </div>
        <div className="relative z-10 mt-3 grid gap-1 text-xs text-gray-600 pointer-events-none dark:text-slate-300">
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500/70" />
            {accountLabel}
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500/70" />
            {mediaLabel}
          </span>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
