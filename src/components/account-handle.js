"use client";

import Link from "next/link";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { formatFollowers } from "@/lib/utils";
import { ExternalLink, User } from "lucide-react";

export default function AccountHandle({ username, name, profilePictureUrl, followersCount, accountType, mediaCount, className = "" }) {
  const normalized = username ? username.replace(/^@/, "") : "";
  const handle = normalized ? `@${normalized}` : "@unknown";
  const displayName = name || normalized || "Instagram account - not registered on catchme.live yet";
  const accountLabel = accountType ? accountType.replace(/_/g, " ").toLowerCase() : "Instagram account";
  const mediaLabel = typeof mediaCount === "number" ? `${mediaCount} posts` : "Posts hidden";

  const profileHref = normalized ? `/artists/${normalized}` : "/artists";

  return (
    <HoverCard openDelay={120}>
      <HoverCardTrigger asChild>
        <button type="button" className={`inline-flex items-center gap-1 text-lg font-semibold text-fuchsia-500 transition hover:text-fuchsia-600 dark:text-fuchsia-400 dark:hover:text-fuchsia-300 ${className}`}>
          {handle}
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="relative z-50 p-4 bg-white border border-gray-200 shadow-lg w-72 rounded-2xl dark:border-slate-800/80 dark:bg-slate-900/90">
        <Link
          href={profileHref}
          aria-label={`Open ${handle} profile`}
          className="absolute inline-flex items-center justify-center text-gray-500 transition bg-white border border-gray-200 rounded-full right-3 top-3 h-7 w-7 hover:text-gray-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
        >
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 overflow-hidden bg-gray-100 border border-gray-200 rounded-full dark:border-slate-700 dark:bg-slate-800">
            {profilePictureUrl ? (
              <img src={profilePictureUrl} alt={handle} className="object-cover w-full h-full" />
            ) : (
              <div className="grid w-full h-full text-gray-400 place-items-center dark:text-slate-400">
                <User className="w-5 h-5" />
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-slate-100">{displayName}</p>
            <p className="text-xs text-gray-500 dark:text-slate-400">{handle}</p>
            <p className="mt-2 text-xs text-gray-500 dark:text-slate-400">{formatFollowers(followersCount)}</p>
          </div>
        </div>
        <div className="grid gap-1 mt-3 text-xs text-gray-600 dark:text-slate-300">
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
