"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { formatFollowers } from "@/lib/utils";
import { Instagram, MapPin, Share2, SquareArrowOutUpRight, Tag, User } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function AccountHandleClient({
  username,
  name,
  profilePictureUrl,
  followersCount,
  accountType,
  mediaCount,
  bio,
  className = "",
}) {
  const [isTouch, setIsTouch] = useState(false);
  const [open, setOpen] = useState(false);
  const normalized = username ? username.replace(/^@/, "") : "";
  const handle = normalized ? `@${normalized}` : "@unknown";
  const displayName = name || normalized || "Instagram account - not registered on catchme.live yet";
  const accountLabel = accountType ? accountType.replace(/_/g, " ").toLowerCase() : "Instagram account";
  const mediaLabel = typeof mediaCount === "number" ? `${mediaCount} posts` : "Posts hidden";
  const instagramHref = normalized ? `https://www.instagram.com/${normalized}/` : "https://www.instagram.com/";
  const profileHref = normalized ? `/artists/${normalized}` : "/artists";
  const hoverCardProps = useMemo(() => (isTouch ? { open, onOpenChange: setOpen } : {}), [isTouch, open]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(hover: none), (pointer: coarse)");
    const handleChange = () => setIsTouch(media.matches);
    handleChange();
    if (media.addEventListener) {
      media.addEventListener("change", handleChange);
      return () => media.removeEventListener("change", handleChange);
    }
    media.addListener(handleChange);
    return () => media.removeListener(handleChange);
  }, []);

  return (
    <HoverCard openDelay={120} {...hoverCardProps}>
      <HoverCardTrigger asChild>
        <button
          type="button"
          onClick={isTouch ? () => setOpen((current) => !current) : undefined}
          className={`inline-flex items-center gap-1 text-lg font-semibold text-fuchsia-500 transition hover:text-fuchsia-600 dark:text-fuchsia-400 dark:hover:text-fuchsia-300 ${className}`}
        >
          {handle}
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="relative z-50 w-full max-w-[520px] overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/40">
        <Link href={profileHref} aria-label={`Open ${handle} profile`} className="absolute inset-0 rounded-[28px]" />
        <div className="relative z-10 flex items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold pointer-events-none">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-1.5 text-white dark:bg-slate-100 dark:text-slate-900">
              <Tag className="h-3.5 w-3.5" />
              {accountLabel}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-1.5 text-white dark:bg-slate-100 dark:text-slate-900">
              <MapPin className="h-3.5 w-3.5" />
              {mediaLabel}
            </span>
            {typeof followersCount === "number" ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-200">
                Bookings open
              </span>
            ) : null}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Share profile"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <Link
              href={instagramHref}
              aria-label={`Open ${handle} on Instagram`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-white"
              rel="noreferrer"
              target="_blank"
            >
              <SquareArrowOutUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="relative z-10 mt-6 text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          &quot;{displayName}&quot;
        </div>
        <div className="relative z-10 mt-5 flex items-center gap-4 pointer-events-none">
          <Avatar className="h-14 w-14 border border-slate-200 bg-white text-slate-400 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
            <AvatarImage src={profilePictureUrl || undefined} alt={handle} className="object-cover" />
            <AvatarFallback>
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div className="text-base font-semibold text-fuchsia-500 dark:text-fuchsia-400">{handle}</div>
        </div>
        {bio ? (
          <p className="relative z-10 mt-5 text-sm leading-relaxed text-slate-600 line-clamp-4 dark:text-slate-300">{bio}</p>
        ) : null}
      </HoverCardContent>
    </HoverCard>
  );
}
