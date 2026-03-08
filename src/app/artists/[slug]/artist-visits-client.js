"use client";

import { useEffect, useMemo, useState } from "react";
import VisitDialogOverlay from "@/components/visit-dialog-overlay";
import { formatShortDate, formatVisitDateRange, formatVisitType, getVisitParam, resolveVisitById, setVisitParam } from "@/lib/utils";
import HandleBadge from "@/components/handle-badge";
import { useCountdown } from "@/lib/hooks/use-countdown";
import { ArrowDown, ArrowUp, ChevronDown } from "lucide-react";

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

function UpcomingCountdownBadge({ target, isMounted }) {
  const { countdown } = useCountdown(target, { active: isMounted && Boolean(target) });
  const label = useMemo(() => {
    if (!isMounted) return "—";
    if (!target || !countdown) return "TBD";
    const isZero = countdown.days === "00" && countdown.hours === "00" && countdown.mins === "00" && countdown.secs === "00";
    if (isZero) return "Starting now";
    const daysValue = Number(countdown.days);
    if (daysValue > 0) return `${daysValue}d ${countdown.hours}:${countdown.mins}:${countdown.secs}`;
    return `${countdown.hours}:${countdown.mins}:${countdown.secs}`;
  }, [countdown, isMounted, target]);

  return (
    <div className="absolute -top-3 right-4 z-10 hidden lg:block">
      <div className="inline-flex w-[160px] items-center justify-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[11px] font-semibold text-white shadow-[0_8px_20px_rgba(236,72,153,0.25)] backdrop-blur-xl transition sm:text-xs dark:border-white/20 dark:bg-black/30">
        <ArrowUp className="h-3.5 w-3.5 text-white/80 transition lg:group-hover:animate-bounce" />
        {label}
        <ArrowUp className="h-3.5 w-3.5 text-white/80 transition lg:group-hover:animate-bounce" />
      </div>
    </div>
  );
}

function LiveCountdownBadge({ target, isMounted }) {
  const { countdown } = useCountdown(target, { active: isMounted && Boolean(target) });
  const label = useMemo(() => {
    if (!isMounted) return "—";
    if (!target || !countdown) return "TBD";
    const isZero = countdown.days === "00" && countdown.hours === "00" && countdown.mins === "00" && countdown.secs === "00";
    if (isZero) return "Ending now";
    const daysValue = Number(countdown.days);
    if (daysValue > 0) return `${daysValue}d ${countdown.hours}:${countdown.mins}:${countdown.secs}`;
    return `${countdown.hours}:${countdown.mins}:${countdown.secs}`;
  }, [countdown, isMounted, target]);

  return (
    <div className="absolute -top-3 right-4 z-10 hidden lg:block">
      <div className="inline-flex w-[160px] items-center justify-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[11px] font-semibold text-white shadow-[0_8px_20px_rgba(236,72,153,0.25)] backdrop-blur-xl transition sm:text-xs dark:border-white/20 dark:bg-black/30">
        <ArrowDown className="h-3.5 w-3.5 text-white/80 transition lg:group-hover:animate-bounce" />
        {label}
        <ArrowDown className="h-3.5 w-3.5 text-white/80 transition lg:group-hover:animate-bounce" />
      </div>
    </div>
  );
}

export default function ArtistVisitsClient({ visitsCount, liveVisits, upcomingVisits, pastVisits, artistSlug }) {
  const [isMounted, setIsMounted] = useState(false);
  const residencyVisits = useMemo(() => [...liveVisits, ...upcomingVisits, ...pastVisits].filter((visit) => visit.visit_type === "residency"), [liveVisits, upcomingVisits, pastVisits]);
  const liveOnlyVisits = useMemo(() => liveVisits.filter((visit) => visit.visit_type !== "residency"), [liveVisits]);
  const liveResidencyVisits = useMemo(() => liveVisits.filter((visit) => visit.visit_type === "residency"), [liveVisits]);
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
    setIsMounted(true);
    const handlePopState = () => {
      const current = resolveVisitById(allVisits, getVisitParam());
      setActiveVisit(current);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [allVisits]);

  return (
    <div className="relative mx-auto w-full pb-12 sm:pt-4 px-0.5 overflow-visible">
      <div className="relative z-10 space-y-6 overflow-visible">
        {visitsCount === 0 || allVisits.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white/80 py-4 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">No visits have been published yet.</div>
        ) : (
          <div className="mx-auto w-full space-y-5 sm:space-y-5">
            {orderedSections
              .filter((section) => section.visits.length && section.key !== "residencies")
              .map((section, sectionIndex) => (
                <div key={section.key} className={section.key === "upcoming" || section.key === "past" ? "mt-10 sm:mt-12" : sectionIndex ? "mt-6" : ""}>
                  {section.key === "live" ? (
                    <div className="-mx-4 rounded-2xl overflow-hidden border border-fuchsia-400/70 bg-[radial-gradient(140%_140%_at_12%_88%,rgba(236,72,153,0.55)_0%,rgba(236,72,153,0.2)_35%,rgba(109,40,217,0.15)_62%,rgba(49,20,78,0.6)_100%),radial-gradient(120%_120%_at_90%_12%,rgba(244,114,182,0.55)_0%,rgba(219,39,119,0.3)_30%,rgba(147,51,234,0.2)_65%,rgba(49,20,78,0.6)_100%),linear-gradient(135deg,#7b2b7a_0%,#b12b6d_38%,#8a2a69_62%,#3a2852_100%)] px-4 pt-4 pb-8 shadow-[0_0_32px_rgba(236,72,153,0.48),0_0_75px_rgba(236,72,153,0.26),0_22px_54px_rgba(88,28,135,0.32)] sm:mx-0 sm:p-6">
                      <div className="mb-4 flex items-center justify-between pt-2 pb-3 border-b border-white/10">
                        <h2 className="text-3xl font-semibold text-white">Now Live</h2>
                        <div className="text-sm font-semibold text-white/70">{liveResidencyVisits.length + liveOnlyVisits.length}</div>
                      </div>
                      <div className="space-y-5 sm:space-y-5">
                        {[...liveResidencyVisits, ...liveOnlyVisits].map((visit, visitIndex) => {
                          const start = coerceVisitDate(visit.visit_start_time ?? visit.start_time ?? visit.start_date ?? visit.start);
                          const end = coerceVisitDate(visit.visit_end_time ?? visit.end_time ?? visit.end_date ?? visit.end);
                          const accountName = visit.destination_name || visit.destination_username || visit.destination_instagram_handle || "Artist";
                          const title = visit.visit_title || visit.title || accountName;
                          const location = visit.visit_location || visit.destination_name || visit.destination_instagram_handle || "Location TBA";
                          const visitTypeLabel = formatVisitType(visit.visit_type);
                          const isResidency = visit.visit_type === "residency";
                          const dayLabel = isResidency ? `#${visitIndex + 1}` : start ? String(start.getDate()).padStart(2, "0") : "—";
                          const residencyRoles = ["owner", "co owner", "trainee"];
                          const residencyRole = isResidency ? residencyRoles[visitIndex % residencyRoles.length] : "";
                          const monthLabel = isResidency ? residencyRole : start ? start.toLocaleString("en-US", { month: "short" }) : "";
                          const yearLabel = isResidency ? "" : start ? start.toLocaleString("en-US", { year: "numeric" }) : "";
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
                          const bannerImage = pickRandom(BANNER_IMAGES, `banner-${visit.id}`);
                          const profileImage = pickRandom(PROFILE_IMAGES, `profile-${visit.id}`);
                          const handleBase = visit.destination_username || visit.destination_instagram_handle || "artist";
                          const handle = `@${String(handleBase).replace(/^@/, "")}`;
                          return (
                            <div key={visit.id} className="relative group">
                              {!isResidency ? <LiveCountdownBadge target={end} isMounted={isMounted} /> : null}
                              <button type="button" onClick={() => openVisit(visit)} className="flex w-full flex-row items-center gap-3 text-left transition-transform lg:hover:translate-x-2 sm:gap-6">
                              <div className="w-[45px] px-1 text-[15px] font-semibold text-center text-white/90 sm:w-auto sm:min-w-[110px] sm:text-base">
                                <div className="text-[26px] font-bold leading-none sm:text-[34px] text-center text-white">{dayLabel}</div>
                                {monthLabel ? <div className="text-[11px] font-medium text-white/80 text-center">{monthLabel}</div> : null}
                                {yearLabel ? <div className="text-[9px] font-medium text-white/50 text-center">{yearLabel}</div> : null}
                              </div>
                                <div className="relative flex flex-1 flex-col gap-3 rounded-3xl border border-white/25 bg-white/15 backdrop-blur-xl px-3 py-3 shadow-[0_14px_28px_rgba(236,72,153,0.18)] transition lg:group-hover:ring-2 lg:group-hover:ring-fuchsia-300/70 sm:gap-4 sm:px-5 sm:py-4 dark:border-white/20 dark:bg-black/20">
                                  <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
                                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100 sm:h-20 sm:w-20">
                                      <div className="h-full w-full bg-cover bg-center transition-transform duration-300 lg:group-hover:scale-110" style={{ backgroundImage: `url(${bannerImage})` }} />
                                    </div>
                                    <div className="min-w-0 flex-1 space-y-1.5 lg:space-y-2.5">
                                      <div className="flex min-w-0 items-center gap-2 ml-2">
                                        <div className="min-w-0 overflow-hidden whitespace-nowrap text-base font-semibold text-white [text-overflow:clip] sm:text-lg">
                                          <span>{title}</span>
                                          <span className="text-[11px] font-semibold text-white/60 lg:hidden"> / {location}</span>
                                          <span className="hidden lg:inline text-sm font-semibold text-white/80">
                                            {" "}
                                            / {visitTypeLabel} / {location}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="pl-2 flex items-center gap-2 lg:gap-0">
                                        <HandleBadge
                                          href={`/artists/${handleBase}`}
                                          avatarUrl={profileImage}
                                          alt={handle}
                                          handle={handle}
                                          size="sm"
                                          className="border border-white/15 bg-white/10 text-[11px] text-white/90 sm:text-xs lg:px-3 lg:py-2 lg:text-xs"
                                        />
                                        <span className="inline-flex items-center gap-2 lg:hidden">
                                          <span className="text-[10px] text-white/60">•</span>
                                          <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-1.5 py-0.5 text-[10px] font-semibold text-white/90">{visitTypeLabel}</span>
                                        </span>
                                      </div>
                                    </div>
                                    {!isResidency ? (
                                      <div className="ml-auto hidden min-w-[110px] flex-col items-end gap-1 text-right sm:flex">
                                        <span className="text-xs font-semibold text-white/60">Duration</span>
                                        <span className="text-sm font-semibold text-white">{durationLabel}</span>
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                  {section.key === "upcoming" ? (
                    <div className="-mx-4 rounded-2xl overflow-hidden border border-fuchsia-400/70 bg-[radial-gradient(140%_140%_at_12%_88%,rgba(99,102,241,0.55)_0%,rgba(99,102,241,0.2)_35%,rgba(79,70,229,0.15)_62%,rgba(30,27,75,0.6)_100%),radial-gradient(120%_120%_at_90%_12%,rgba(129,140,248,0.55)_0%,rgba(79,70,229,0.3)_30%,rgba(67,56,202,0.2)_65%,rgba(30,27,75,0.6)_100%),linear-gradient(135deg,#2f1f4f_0%,#3b2a70_38%,#2b1b4a_62%,#1a112d_100%)] px-4 pt-4 pb-6 shadow-[0_0_32px_rgba(99,102,241,0.48),0_0_75px_rgba(99,102,241,0.26),0_22px_54px_rgba(88,28,135,0.32)] sm:mx-0 sm:p-6">
                      <div className="mb-4 flex items-center justify-between pt-2 pb-3 border-b border-white/10">
                        <h2 className="text-3xl font-semibold text-white">Next Up</h2>
                      </div>
                      <div className="relative mt-5 space-y-5 sm:space-y-5">
                        {section.visits.map((visit, visitIndex) => {
                          const start = coerceVisitDate(visit.visit_start_time ?? visit.start_time ?? visit.start_date ?? visit.start);
                          const end = coerceVisitDate(visit.visit_end_time ?? visit.end_time ?? visit.end_date ?? visit.end);
                          const accountName = visit.destination_name || visit.destination_username || visit.destination_instagram_handle || "Artist";
                          const title = visit.visit_title || visit.title || accountName;
                          const location = visit.visit_location || visit.destination_name || visit.destination_instagram_handle || "Location TBA";
                          const visitTypeLabel = formatVisitType(visit.visit_type);
                          const isResidency = visit.visit_type === "residency";
                          const dayLabel = isResidency ? `#${visitIndex + 1}` : start ? String(start.getDate()).padStart(2, "0") : "—";
                          const residencyRoles = ["owner", "co owner", "trainee"];
                          const residencyRole = isResidency ? residencyRoles[visitIndex % residencyRoles.length] : "";
                          const monthLabel = isResidency ? residencyRole : start ? start.toLocaleString("en-US", { month: "short" }) : "";
                          const yearLabel = isResidency ? "" : start ? start.toLocaleString("en-US", { year: "numeric" }) : "";
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
                          const bannerImage = pickRandom(BANNER_IMAGES, `banner-${visit.id}`);
                          const profileImage = pickRandom(PROFILE_IMAGES, `profile-${visit.id}`);
                          const handleBase = visit.destination_username || visit.destination_instagram_handle || "artist";
                          const handle = `@${String(handleBase).replace(/^@/, "")}`;
                          return (
                            <div key={visit.id} className="relative group">
                              <UpcomingCountdownBadge target={start} isMounted={isMounted} />
                              <button type="button" onClick={() => openVisit(visit)} className="flex w-full flex-row items-center gap-3 text-left transition-transform lg:hover:translate-x-2 sm:gap-6">
                                <div className="w-[45px] px-1 text-[15px] font-semibold text-center text-white/90 sm:w-auto sm:min-w-[110px] sm:text-base">
                                  <div className="text-[26px] font-bold leading-none sm:text-[34px] text-center text-white">{dayLabel}</div>
                                  {monthLabel ? <div className="text-[11px] font-medium text-white/80 text-center">{monthLabel}</div> : null}
                                  {yearLabel ? <div className="text-[9px] font-medium text-white/50 text-center">{yearLabel}</div> : null}
                                </div>
                                <div className="relative flex flex-1 flex-col gap-3 rounded-3xl border border-white/25 bg-white/15 backdrop-blur-xl px-3 py-3 shadow-[0_14px_28px_rgba(236,72,153,0.18)] transition lg:group-hover:ring-2 lg:group-hover:ring-fuchsia-300/70 sm:gap-4 sm:px-5 sm:py-4 dark:border-white/20 dark:bg-black/20">
                                  <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
                                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100 sm:h-20 sm:w-20">
                                      <div className="h-full w-full bg-cover bg-center transition-transform duration-300 lg:group-hover:scale-110" style={{ backgroundImage: `url(${bannerImage})` }} />
                                    </div>
                                  <div className="min-w-0 flex-1 space-y-1.5 lg:space-y-2.5">
                                      <div className="flex min-w-0 items-center gap-2 ml-2">
                                      <div className="min-w-0 overflow-hidden whitespace-nowrap text-base font-semibold text-white [text-overflow:clip] sm:text-lg">
                                          <span>{title}</span>
                                          <span className="text-[11px] font-semibold text-white/60 lg:hidden"> / {location}</span>
                                          <span className="hidden lg:inline text-sm font-semibold text-white/80">
                                            {" "}
                                            / {visitTypeLabel} / {location}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="pl-2 flex items-center gap-2 lg:gap-0">
                                        <HandleBadge
                                          href={`/artists/${handleBase}`}
                                          avatarUrl={profileImage}
                                          alt={handle}
                                          handle={handle}
                                          size="sm"
                                          className="border border-white/15 bg-white/10 text-[11px] text-white/90 sm:text-xs lg:px-3 lg:py-2 lg:text-xs"
                                        />
                                        <span className="inline-flex items-center gap-2 lg:hidden">
                                          <span className="text-[10px] text-white/60">•</span>
                                          <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-1.5 py-0.5 text-[10px] font-semibold text-white/90">{visitTypeLabel}</span>
                                        </span>
                                      </div>
                                    </div>
                                    {!isResidency ? (
                                      <div className="ml-auto hidden min-w-[110px] flex-col items-end gap-1 text-right sm:flex">
                                        <span className="text-xs font-semibold text-white/60">Duration</span>
                                        <span className="text-sm font-semibold text-white">{durationLabel}</span>
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                  {section.key === "past" ? (
                    <div className="mb-6 flex items-center justify-between py-3">
                      <div>
                        <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Past Visits</h2>
                      </div>
                      <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">{section.visits.length}</div>
                    </div>
                  ) : null}
                  {section.key !== "live" && section.key !== "upcoming" ? (
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
                        const dayLabel = isResidency ? `#${visitIndex + 1}` : start ? String(start.getDate()).padStart(2, "0") : "—";
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
                          <button key={visit.id} type="button" onClick={() => openVisit(visit)} className="group flex w-full flex-row items-center gap-3 text-left transition-transform lg:hover:translate-x-2 sm:gap-6">
                            <div className="w-[45px] px-1 text-[15px] font-semibold text-center text-slate-900 sm:w-auto sm:min-w-[110px] sm:text-base dark:text-slate-100">
                              <div className="text-[26px] font-bold leading-none sm:text-[34px] text-center text-slate-900 dark:text-slate-100">{dayLabel}</div>
                              {monthLabel ? <div className="text-[11px] font-medium text-slate-900 text-center dark:text-slate-100">{monthLabel}</div> : null}
                              {yearLabel ? <div className="text-[9px] font-medium text-slate-400 text-center dark:text-slate-500">{yearLabel}</div> : null}
                            </div>
                            <div className="relative flex flex-1 flex-col gap-3 rounded-3xl border border-slate-200/80 bg-transparent px-3 py-3 transition lg:group-hover:ring-2 lg:group-hover:ring-fuchsia-300/70 sm:gap-4 sm:px-5 sm:py-4 dark:border-white/10">
                              <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
                                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100 sm:h-20 sm:w-20">
                                  <div className="h-full w-full bg-cover bg-center transition-transform duration-300 lg:group-hover:scale-110" style={{ backgroundImage: `url(${bannerImage})` }} />
                                </div>
                                <div className="min-w-0 flex-1 space-y-1.5 lg:space-y-2.5">
                                  <div className="flex min-w-0 items-center gap-2 ml-2">
                                    <div className="min-w-0 overflow-hidden whitespace-nowrap text-base font-semibold text-slate-900 [text-overflow:clip] sm:text-lg dark:text-white">
                                      <span>{title}</span>
                                      <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 lg:hidden"> / {location}</span>
                                      <span className="hidden lg:inline text-sm font-semibold text-slate-500 dark:text-slate-300">
                                        {" "}
                                        / {visitTypeLabel} / {location}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="pl-2 flex items-center gap-2 lg:gap-0">
                                    <HandleBadge
                                      href={`/artists/${handleBase}`}
                                      avatarUrl={profileImage}
                                      alt={handle}
                                      handle={handle}
                                      size="sm"
                                      className="border border-slate-200/80 bg-white/90 text-[11px] text-slate-700 dark:border-white/15 dark:bg-white/10 dark:text-white/90 sm:text-xs lg:px-3 lg:py-2 lg:text-xs"
                                    />
                                    <span className="inline-flex items-center gap-2 lg:hidden">
                                      <span className="text-[10px] text-slate-400 dark:text-white/60">•</span>
                                      <span className="inline-flex items-center rounded-full border border-slate-200/80 bg-white/90 px-1.5 py-0.5 text-[10px] font-semibold text-slate-700 dark:border-white/15 dark:bg-white/10 dark:text-white/90">
                                        {visitTypeLabel}
                                      </span>
                                    </span>
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
                      {section.key === "past" ? (
                        <div className="pt-6 flex justify-center">
                          <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
                          >
                            <ChevronDown className="h-4 w-4" />
                            Load more
                          </button>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              ))}
          </div>
        )}
      </div>
      <VisitDialogOverlay visit={activeVisit} open={Boolean(activeVisit)} onOpenChange={(nextOpen) => (nextOpen ? null : closeVisit())} />
    </div>
  );
}
