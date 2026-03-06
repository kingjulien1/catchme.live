"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import VisitDialogOverlay from "@/components/visit-dialog-overlay";
import { formatShortDate, formatVisitDateRange, formatVisitType, getVisitParam, resolveVisitById, setVisitParam } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";

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

function StickyHeading({ children, offset = 64, className = "" }) {
  const placeholderRef = useRef(null);
  const headerRef = useRef(null);
  const [metrics, setMetrics] = useState({ height: 0, pinned: false, left: 0, width: 0 });

  useLayoutEffect(() => {
    if (!headerRef.current) return;
    const element = headerRef.current;
    const updateHeight = () => {
      const height = element.offsetHeight;
      setMetrics((prev) => (prev.height === height ? prev : { ...prev, height }));
    };
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        if (!placeholderRef.current) return;
        const rect = placeholderRef.current.getBoundingClientRect();
        const shouldPin = rect.top <= offset;
        setMetrics((prev) => {
          if (prev.pinned === shouldPin) return prev;
          if (!shouldPin) return { ...prev, pinned: false };
          return { ...prev, pinned: true, left: rect.left, width: rect.width };
        });
      });
    };
    const updatePinnedPosition = () => {
      if (!placeholderRef.current) return;
      const rect = placeholderRef.current.getBoundingClientRect();
      setMetrics((prev) => (prev.pinned ? { ...prev, left: rect.left, width: rect.width } : prev));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", updatePinnedPosition);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", updatePinnedPosition);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [offset]);

  return (
    <div ref={placeholderRef} style={{ height: metrics.height || undefined }}>
      <div
        ref={headerRef}
        className={`${metrics.pinned ? "fixed" : "relative"} ${className}`}
        style={metrics.pinned ? { top: offset, left: metrics.left, width: metrics.width, zIndex: 40 } : undefined}
      >
        {children}
      </div>
    </div>
  );
}

export default function ArtistVisitsClient({ visitsCount, liveVisits, upcomingVisits, pastVisits, artistSlug }) {
  const residencyVisits = useMemo(() => [...liveVisits, ...upcomingVisits, ...pastVisits].filter((visit) => visit.visit_type === "residency"), [liveVisits, upcomingVisits, pastVisits]);
  const liveOnlyVisits = useMemo(() => liveVisits.filter((visit) => visit.visit_type !== "residency"), [liveVisits]);
  const upcomingOnlyVisits = useMemo(() => upcomingVisits.filter((visit) => visit.visit_type !== "residency"), [upcomingVisits]);
  const pastOnlyVisits = useMemo(() => pastVisits.filter((visit) => visit.visit_type !== "residency"), [pastVisits]);

  const orderedSections = useMemo(
    () => [
      { key: "residencies", visits: residencyVisits },
      { key: "live", visits: liveOnlyVisits },
      { key: "upcoming", visits: upcomingOnlyVisits },
      { key: "past", visits: pastOnlyVisits },
    ],
    [residencyVisits, liveOnlyVisits, upcomingOnlyVisits, pastOnlyVisits],
  );
  const nextUpCountdown = useMemo(() => {
    if (!upcomingOnlyVisits.length) return "No upcoming";
    const sorted = [...upcomingOnlyVisits].sort((a, b) => {
      const aStart = coerceVisitDate(a.visit_start_time ?? a.start_time ?? a.start_date ?? a.start);
      const bStart = coerceVisitDate(b.visit_start_time ?? b.start_time ?? b.start_date ?? b.start);
      return (aStart?.getTime() || 0) - (bStart?.getTime() || 0);
    });
    const next = sorted[0];
    const nextStart = coerceVisitDate(next.visit_start_time ?? next.start_time ?? next.start_date ?? next.start);
    if (!nextStart) return "TBD";
    const diffMs = nextStart.getTime() - Date.now();
    if (diffMs <= 0) return "Starting now";
    const totalMinutes = Math.ceil(diffMs / (1000 * 60));
    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    if (days > 0 && hours > 0) return `${days}d ${hours}h`;
    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    return `${totalMinutes}m`;
  }, [upcomingOnlyVisits]);
  const latestLiveCountdown = useMemo(() => {
    if (!liveOnlyVisits.length) return "No live visits";
    const withEnd = [...liveOnlyVisits]
      .map((visit) => ({
        visit,
        end: coerceVisitDate(visit.visit_end_time ?? visit.end_time ?? visit.end_date ?? visit.end),
      }))
      .filter((item) => item.end);
    if (!withEnd.length) return "Ongoing";
    const latest = withEnd.sort((a, b) => b.end.getTime() - a.end.getTime())[0];
    const diffMs = latest.end.getTime() - Date.now();
    if (diffMs <= 0) return "Ending now";
    const totalMinutes = Math.ceil(diffMs / (1000 * 60));
    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    if (days > 0 && hours > 0) return `${days}d ${hours}h`;
    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    return `${totalMinutes}m`;
  }, [liveOnlyVisits]);
  const allVisits = useMemo(() => orderedSections.flatMap((section) => section.visits), [orderedSections]);
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
    <div className="relative mx-auto w-full pb-12 sm:pt-4 overflow-visible">
      <div className="relative z-10 space-y-6 overflow-visible">
        {visitsCount === 0 || allVisits.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white/80 py-4 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">No visits have been published yet.</div>
        ) : (
          <div className="mx-auto w-full space-y-5 sm:space-y-5">
            <StickyHeading className="z-30 -mx-4 flex items-center justify-between border-b border-slate-200/70 bg-white/95 py-3 backdrop-blur sm:mx-0 sm:rounded-2xl sm:border dark:border-slate-800/80 dark:bg-slate-950/90">
              <div>
                <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Now Live</h2>
              </div>
              <ChevronDown className="h-7 w-7 text-slate-900 dark:text-white" />
            </StickyHeading>
            {orderedSections
              .filter((section) => section.visits.length)
              .map((section, sectionIndex) => (
                <div key={section.key} className={section.key === "upcoming" || section.key === "past" ? "mt-10 sm:mt-12" : sectionIndex ? "mt-6" : ""}>
                  {section.key === "upcoming" ? (
                    <StickyHeading className="z-30 -mx-4 mb-6 flex items-center justify-between border-b border-slate-200/70 bg-white/95 py-3 backdrop-blur sm:mx-0 sm:rounded-2xl sm:border dark:border-slate-800/80 dark:bg-slate-950/90">
                      <div>
                        <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Next Up</h2>
                      </div>
                      <ChevronDown className="h-7 w-7 text-slate-900 dark:text-white" />
                    </StickyHeading>
                  ) : null}
                  <div className="space-y-5 sm:space-y-5">
                    {section.visits.map((visit, visitIndex) => {
                      const start = coerceVisitDate(visit.visit_start_time ?? visit.start_time ?? visit.start_date ?? visit.start);
                      const end = coerceVisitDate(visit.visit_end_time ?? visit.end_time ?? visit.end_date ?? visit.end);
                      const accountName = visit.destination_name || visit.destination_username || visit.destination_instagram_handle || "Artist";
                      const title = visit.visit_title || visit.title || accountName;
                      const location = visit.visit_location || visit.destination_name || visit.destination_instagram_handle || "Location TBA";
                      const visitTypeLabel = formatVisitType(visit.visit_type);
                      const dateRange = formatVisitDateRange(start, end);
                      const isResidency = visit.visit_type === "residency";
                      const dayLabel = isResidency ? `#${visitIndex + 1}` : start ? String(start.getDate()) : "—";
                      const residencyRoles = ["owner", "co owner", "trainee"];
                      const residencyRole = isResidency ? residencyRoles[visitIndex % residencyRoles.length] : "";
                      const monthLabel = isResidency ? residencyRole : start ? start.toLocaleString("en-US", { month: "short" }) : "";
                      const yearLabel = isResidency ? "" : start ? start.toLocaleString("en-US", { year: "numeric" }) : "";
                      const now = new Date();
                      const isLive = start && start <= now && (!end || end >= now);
                      const durationLabel =
                        start && end
                          ? (() => {
                              const totalMinutes = Math.max(1, Math.round((end - start) / (1000 * 60)));
                              const days = Math.floor(totalMinutes / (60 * 24));
                              const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
                              if (days > 0 && hours > 0) return `${days}d ${hours}h`;
                              if (days > 0) return `${days}d`;
                              if (hours > 0) return `${hours}h`;
                              return `${totalMinutes}m`;
                            })()
                          : "Ongoing";
                      const cardTone = isLive ? "bg-green-400 dark:bg-green-600" : "bg-white/90 dark:bg-slate-950/80";
                      const liveTone = "text-slate-900 dark:text-slate-100";
                      const badgeTone = isLive
                        ? "border-white/20 bg-white/10 text-white/80 dark:border-slate-200 dark:bg-slate-100 dark:text-slate-900"
                        : "border-slate-200 bg-slate-50 text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-white/70";
                      const bannerImage = pickRandom(BANNER_IMAGES, `banner-${visit.id}`);
                      const profileImage = pickRandom(PROFILE_IMAGES, `profile-${visit.id}`);
                      const handleBase = visit.destination_username || visit.destination_instagram_handle || "artist";
                      const handle = `@${String(handleBase).replace(/^@/, "")}`;
                      return (
                        <button key={visit.id} type="button" onClick={() => openVisit(visit)} className="group flex w-full flex-row items-center gap-3 text-left sm:gap-6">
                          <div className="w-[45px] px-1 text-base font-semibold text-center text-slate-900 sm:w-auto sm:min-w-[110px] sm:text-lg dark:text-slate-100">
                            <div className="text-3xl font-bold leading-none sm:text-4xl text-center text-slate-900 dark:text-slate-100">{dayLabel}</div>
                            {monthLabel ? <div className="text-xs font-medium text-slate-900 text-center dark:text-slate-100">{monthLabel}</div> : null}
                            {yearLabel ? <div className="text-[10px] font-medium text-slate-400 text-center dark:text-slate-500">{yearLabel}</div> : null}
                          </div>
                          <div className="relative flex flex-1 flex-col gap-3 rounded-3xl border border-slate-200/80 bg-white/90 px-2.5 py-2 transition hover:-translate-y-0.5 hover:shadow-md sm:gap-4 sm:px-5 sm:py-4 dark:border-white/10 dark:bg-slate-950/80">
                            <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
                              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100 sm:h-20 sm:w-20">
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
                                    <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500"> • {visitTypeLabel}</span>
                                  </div>
                                </div>
                              </div>
                              {!isResidency ? (
                                <div className="ml-auto hidden min-w-[110px] flex-col items-end gap-1 text-right sm:flex">
                                  <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">Duration</span>
                                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{durationLabel}</span>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
      <VisitDialogOverlay visit={activeVisit} open={Boolean(activeVisit)} onOpenChange={(nextOpen) => (nextOpen ? null : closeVisit())} />
    </div>
  );
}
