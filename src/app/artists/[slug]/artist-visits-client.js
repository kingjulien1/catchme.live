"use client";

import { useEffect, useMemo, useState } from "react";
import VisitDialogOverlay from "@/components/visit-dialog-overlay";
import { formatShortDate, formatVisitDateRange, formatVisitType, getVisitParam, resolveVisitById, setVisitParam } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const BANNER_IMAGES = [
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1458966480358-a0ac42de0a7a?auto=format&fit=crop&w=600&q=80",
];

const PROFILE_IMAGES = [
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
];

const hashSeed = (value) =>
  String(value || "")
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

const pickRandom = (list, seed) => {
  const hash = Math.abs(hashSeed(seed));
  return list[hash % list.length];
};

function coerceVisitDate(value) {
  if (!value) return null;
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
  if (typeof value === "string" && value.includes(" ") && !value.includes("T")) {
    const normalized = value.replace(" ", "T");
    const normalizedDate = new Date(normalized);
    if (!Number.isNaN(normalizedDate.getTime())) return normalizedDate;
  }
  const asDate = new Date(value);
  if (!Number.isNaN(asDate.getTime())) return asDate;
  const asNumber = typeof value === "string" ? Number(value) : value;
  if (Number.isNaN(asNumber)) return null;
  const numericMs = asNumber < 10_000_000_000 ? asNumber * 1000 : asNumber;
  const numericDate = new Date(numericMs);
  return Number.isNaN(numericDate.getTime()) ? null : numericDate;
}

export default function ArtistVisitsClient({ visitsCount, liveVisits, upcomingVisits, pastVisits, artistSlug }) {
  const allVisits = useMemo(() => [...liveVisits, ...upcomingVisits, ...pastVisits], [liveVisits, upcomingVisits, pastVisits]);
  const [activeVisit, setActiveVisit] = useState(null);

  const openVisit = (visit) => {
    if (!visit) return;
    setActiveVisit(visit);
    setVisitParam(visit.id);
  };

  const closeVisit = () => {
    setActiveVisit(null);
    setVisitParam(null);
  };

  useEffect(() => {
    if (!allVisits.length) return;
    const current = resolveVisitById(allVisits, getVisitParam());
    if (current) {
      setActiveVisit(current);
    }
  }, [allVisits]);

  useEffect(() => {
    const handlePopState = () => {
      const current = resolveVisitById(allVisits, getVisitParam());
      setActiveVisit(current);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [allVisits]);

  return (
    <div className="relative mx-auto w-full pb-12 sm:pt-4">
      <div className="relative z-10 space-y-6">
        {visitsCount === 0 || allVisits.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white/80 py-4 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">No visits have been published yet.</div>
        ) : (
          <div className="mx-auto w-full space-y-5 sm:space-y-5">
            {allVisits.map((visit) => {
              const start = coerceVisitDate(visit.visit_start_time ?? visit.start_time ?? visit.start_date ?? visit.start);
              const end = coerceVisitDate(visit.visit_end_time ?? visit.end_time ?? visit.end_date ?? visit.end);
              const title = visit.visit_title || visit.title || visit.destination_name || formatVisitType(visit.visit_type);
              const location = visit.visit_location || visit.destination_name || visit.destination_instagram_handle || "Location TBA";
              const visitTypeLabel = formatVisitType(visit.visit_type);
              const dateRange = formatVisitDateRange(start, end);
              const dayLabel = start ? String(start.getDate()) : "—";
              const monthLabel = start ? start.toLocaleString("en-US", { month: "short" }) : "";
              const yearLabel = start ? start.toLocaleString("en-US", { year: "numeric" }) : "";
              const now = new Date();
              const isLive = start && start <= now && (!end || end >= now);
              const cardTone = isLive ? "bg-green-400 dark:bg-green-600" : "bg-white/90 dark:bg-slate-950/80";
              const liveTone = "text-slate-900 dark:text-slate-100";
              const badgeTone = isLive ? "border-white/20 bg-white/10 text-white/80 dark:border-slate-200 dark:bg-slate-100 dark:text-slate-900" : "border-slate-200 bg-slate-50 text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-white/70";
              const bannerImage = pickRandom(BANNER_IMAGES, `banner-${visit.id}`);
              const profileImage = pickRandom(PROFILE_IMAGES, `profile-${visit.id}`);
              const handleBase = visit.destination_username || visit.destination_instagram_handle || "artist";
              const handle = `@${String(handleBase).replace(/^@/, "")}`;
              return (
                <button key={visit.id} type="button" onClick={() => openVisit(visit)} className="group flex w-full flex-row items-center gap-3 text-left sm:gap-6">
                  <div className="w-fit px-1 text-base font-semibold text-center text-slate-900 sm:min-w-[110px] sm:text-lg dark:text-slate-100">
                    <div className="text-3xl font-semibold leading-none sm:text-4xl text-slate-900 text-center dark:text-slate-100">{dayLabel}</div>
                    {monthLabel ? <div className="text-xs font-medium text-slate-900 text-center dark:text-slate-100">{monthLabel}</div> : null}
                    {yearLabel ? <div className="text-[10px] font-medium text-slate-400 text-center dark:text-slate-500">{yearLabel}</div> : null}
                  </div>
                  <div className="relative flex flex-1 flex-col gap-3 rounded-3xl border border-slate-200/80 bg-white/90 px-2.5 py-2 transition hover:-translate-y-0.5 hover:shadow-md sm:gap-4 sm:px-5 sm:py-4 dark:border-white/10 dark:bg-slate-950/80">
                    <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-20 sm:w-20">
                        <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${bannerImage})` }} />
                      </div>
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex min-w-0 items-center gap-2 ml-2">
                          <div className="min-w-0 truncate text-lg font-semibold text-slate-900 sm:text-xl dark:text-white">
                            <span>{title}</span>
                            <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500"> / {location}</span>
                          </div>
                        </div>
                        <div className="flex min-w-0 items-center gap-1.5 pl-2">
                          <Avatar className="h-7 w-7 border border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-white/5">
                            <AvatarImage src={profileImage} alt={handle} />
                            <AvatarFallback className="text-[10px] font-semibold text-slate-500 dark:text-slate-300">AR</AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 truncate text-sm font-semibold text-slate-900 dark:text-white">
                            <span>{handle}</span>
                            <span className="text-[11px] font-semibold"> • {visitTypeLabel}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
      <VisitDialogOverlay visit={activeVisit} open={Boolean(activeVisit)} onOpenChange={(nextOpen) => (nextOpen ? null : closeVisit())} />
    </div>
  );
}
