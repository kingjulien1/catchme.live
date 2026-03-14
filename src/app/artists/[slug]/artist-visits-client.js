"use client";

import { useEffect, useMemo, useState } from "react";
import VisitDialogOverlay from "@/components/visit-dialog-overlay";
import { formatShortDate, formatVisitDateRange, formatVisitType, getVisitParam, resolveVisitById, setVisitParam } from "@/lib/utils";
import HandleBadge from "@/components/handle-badge";
import { useCountdown } from "@/lib/hooks/use-countdown";
import { motion } from "motion/react";
import { ArrowDown, ArrowUp, ChevronDown, Tag } from "lucide-react";

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
  const [isMounted, setIsMounted] = useState(true);
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
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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
    const diffMs = latest.end.getTime() - now.getTime();
    if (diffMs <= 0) return "Ending now";
    const totalMinutes = Math.ceil(diffMs / (1000 * 60));
    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    if (days > 0 && hours > 0) return `${days}d ${hours}h`;
    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    return `${totalMinutes}m`;
  }, [liveOnlyVisits, now]);
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

  const VisitCard = ({ visit }) => {
    const start = coerceVisitDate(visit.visit_start_time ?? visit.start_time ?? visit.start_date ?? visit.start);
    const end = coerceVisitDate(visit.visit_end_time ?? visit.end_time ?? visit.end_date ?? visit.end);
    const now = new Date();
    const isLive = start && start <= now && (!end || end >= now);
    const isUpcoming = !isLive && Boolean(start && start > now);
    const isActive = false;
    const isResidency = visit.visit_type === "residency";
    const accountName = visit.destination_name || visit.destination_username || visit.destination_instagram_handle || "Artist";
    const title = visit.visit_title || visit.title || accountName;
    const location = visit.visit_location || visit.destination_name || visit.destination_instagram_handle || "Location TBA";
    const visitTypeLabel = formatVisitType(visit.visit_type);
    const dayLabel = start ? String(start.getDate()).padStart(2, "0") : "—";
    const monthLabel = start ? start.toLocaleString("en-US", { month: "short" }) : "";
    const yearLabel = start ? start.toLocaleString("en-US", { year: "numeric" }) : "";
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

    const titleClasses = isActive
      ? "min-w-0 overflow-hidden whitespace-nowrap text-base font-semibold text-slate-900 [text-overflow:clip] sm:text-lg dark:text-white"
      : "min-w-0 overflow-hidden whitespace-nowrap text-base font-semibold text-slate-900 [text-overflow:clip] sm:text-lg dark:text-white";
    const titleMetaClasses = isActive ? "text-[11px] font-semibold text-slate-500 lg:hidden dark:text-slate-400" : "text-[11px] font-semibold text-slate-400 dark:text-slate-500 lg:hidden";
    const titleMetaLgClasses = isActive ? "hidden lg:inline text-sm font-semibold text-slate-600 dark:text-slate-300" : "hidden lg:inline text-sm font-semibold text-slate-500 dark:text-slate-300";
    const cardClasses = isActive
      ? "relative flex flex-1 flex-col gap-3 rounded-3xl border border-slate-200/80 bg-white/70 px-3 py-3 shadow-sm transition lg:group-hover:ring-2 lg:group-hover:ring-fuchsia-300/40 sm:gap-4 sm:px-5 sm:py-4 dark:border-white/15 dark:bg-black/20"
      : "relative flex flex-1 flex-col gap-3 rounded-3xl border border-slate-200/80 bg-transparent px-3 py-3 transition lg:group-hover:ring-2 lg:group-hover:ring-fuchsia-300/40 sm:gap-4 sm:px-5 sm:py-4 dark:border-white/10";
    const dateClasses = isActive ? "text-slate-900 dark:text-slate-100" : "text-slate-900 dark:text-slate-100";
    const monthClasses = isActive ? "text-slate-700 dark:text-slate-100" : "text-slate-900 dark:text-slate-100";
    const yearClasses = isActive ? "text-slate-400 dark:text-slate-500" : "text-slate-400 dark:text-slate-500";
    const handleBadgeClasses = isActive
      ? "border border-slate-200/80 bg-white/80 text-[11px] text-slate-700 dark:border-white/15 dark:bg-white/10 dark:text-white/90 sm:text-xs lg:px-3 lg:py-2 lg:text-xs"
      : "border border-slate-200/80 bg-white/90 text-[11px] text-slate-700 dark:border-white/15 dark:bg-white/10 dark:text-white/90 sm:text-xs lg:px-3 lg:py-2 lg:text-xs";
    const dotClasses = isActive ? "text-slate-400 dark:text-white/60" : "text-slate-400 dark:text-white/60";
    const visitTypeBadgeClasses = isActive
      ? "inline-flex items-center rounded-full border border-slate-200/80 bg-white/80 px-1.5 py-0.5 text-[10px] font-semibold text-slate-700 dark:border-white/15 dark:bg-white/10 dark:text-white/90 sm:px-2.5 sm:py-1 sm:text-[10px] lg:px-3 lg:py-1.5 lg:text-xs"
      : "inline-flex items-center rounded-full border border-slate-200/80 bg-white/80 px-1.5 py-0.5 text-[10px] font-semibold text-slate-700 dark:border-white/15 dark:bg-white/10 dark:text-white/90 sm:px-2.5 sm:py-1 sm:text-[10px] lg:px-3 lg:py-1.5 lg:text-xs";
    const durationLabelClasses = isActive ? "text-slate-900 dark:text-slate-100" : "text-slate-900 dark:text-slate-100";
    const durationMetaClasses = isActive ? "text-slate-500 dark:text-slate-500" : "text-slate-400 dark:text-slate-500";

    return (
      <motion.div className="relative group" initial={{ opacity: 0, y: 18, filter: "blur(8px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, ease: "easeOut" }}>
        {!isResidency && isUpcoming ? <UpcomingCountdownBadge target={start} isMounted={isMounted} /> : null}
        {!isResidency && isLive ? <LiveCountdownBadge target={end} isMounted={isMounted} /> : null}
        <motion.button type="button" onClick={() => openVisit(visit)} className="flex w-full cursor-pointer flex-row items-center gap-3 text-left transition-transform lg:hover:translate-x-2 sm:gap-6">
          <div className={`w-[45px] px-1 text-[15px] font-semibold text-center sm:w-auto sm:min-w-[110px] sm:text-base ${dateClasses}`}>
            <div className={`text-[26px] font-bold leading-none sm:text-[34px] text-center ${dateClasses}`}>{dayLabel}</div>
            {monthLabel ? <div className={`text-[11px] font-medium text-center ${monthClasses}`}>{monthLabel}</div> : null}
            {yearLabel ? <div className={`text-[9px] font-medium text-center ${yearClasses}`}>{yearLabel}</div> : null}
          </div>
          <div className={cardClasses}>
            <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100 sm:h-20 sm:w-20">
                <div className="h-full w-full bg-cover bg-center transition-transform duration-300 lg:group-hover:scale-110" style={{ backgroundImage: `url(${bannerImage})` }} />
              </div>
              <div className="min-w-0 flex-1 space-y-1.5 lg:space-y-2.5">
                <div className="flex min-w-0 items-center gap-2 ml-2">
                  <div className={titleClasses}>
                    <span>{title}</span>
                    <span className={titleMetaClasses}> / {location}</span>
                    <span className={titleMetaLgClasses}>
                      {" "}
                      / {visitTypeLabel} / {location}
                    </span>
                  </div>
                </div>
                <div className="pl-2 flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
                  <HandleBadge href={`/artists/${handleBase}`} avatarUrl={profileImage} alt={handle} handle={handle} size="sm" className={handleBadgeClasses} />
                  <span className="inline-flex items-center gap-2">
                    <span className={`text-[10px] ${dotClasses}`}>•</span>
                    <span className={visitTypeBadgeClasses}>{visitTypeLabel}</span>
                  </span>
                </div>
              </div>
              {!isResidency ? (
                <div className="ml-auto hidden min-w-[110px] flex-col items-end gap-1 text-right sm:flex">
                  <span className={`text-xs font-semibold ${durationMetaClasses}`}>Duration</span>
                  <span className={`text-sm font-semibold ${durationLabelClasses}`}>{durationLabel}</span>
                </div>
              ) : null}
            </div>
          </div>
        </motion.button>
      </motion.div>
    );
  };

  useEffect(() => {
    if (!allVisits.length) return;
    const current = resolveVisitById(allVisits, getVisitParam());
    if (current) {
      Promise.resolve().then(() => setActiveVisit(current));
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
                    <motion.div
                      className="-mx-4 rounded-2xl overflow-hidden bg-transparent px-4 pt-4 pb-8 sm:mx-0 sm:p-6"
                      initial={{ opacity: 0, scale: 0.96, y: 18 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="mb-4 flex items-center justify-between pt-2 pb-3 border-b border-white/10">
                        <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Now Live</h2>
                        <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">{liveResidencyVisits.length + liveOnlyVisits.length}</div>
                      </div>
                      <div className="space-y-5 sm:space-y-5">
                        {[...liveResidencyVisits, ...liveOnlyVisits].map((visit) => (
                          <VisitCard key={visit.id} visit={visit} />
                        ))}
                      </div>
                    </motion.div>
                  ) : null}
                  {section.key === "upcoming" ? (
                    <motion.div
                      className="-mx-4 rounded-2xl overflow-hidden bg-transparent px-4 pt-4 pb-6 sm:mx-0 sm:p-6"
                      initial={{ opacity: 0, scale: 0.96, y: 18 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="mb-4 flex items-center justify-between pt-2 pb-3 border-b border-white/10">
                        <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Next Up</h2>
                      </div>
                      <div className="relative mt-5 space-y-5 sm:space-y-5">
                        {section.visits.map((visit) => (
                          <VisitCard key={visit.id} visit={visit} />
                        ))}
                      </div>
                    </motion.div>
                  ) : null}
                  {section.key === "past" ? (
                    <motion.div
                      className="-mx-4 rounded-2xl overflow-hidden bg-transparent px-4 pt-4 pb-6 sm:mx-0 sm:p-6"
                      initial={{ opacity: 0, scale: 0.96, y: 18 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="mb-4 flex items-center justify-between pt-2 pb-3 border-b border-white/10">
                        <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Past Visits</h2>
                        <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">{section.visits.length}</div>
                      </div>
                      <div className="space-y-5 sm:space-y-5">
                        {section.visits.map((visit) => (
                          <VisitCard key={visit.id} visit={visit} />
                        ))}
                        <div className="pt-6 flex justify-center">
                          <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
                          >
                            <ChevronDown className="h-4 w-4" />
                            Load more
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                  {section.key !== "live" && section.key !== "upcoming" && section.key !== "past" ? (
                    <div className="space-y-5 sm:space-y-5">
                      {section.visits.map((visit) => (
                        <VisitCard key={visit.id} visit={visit} />
                      ))}
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
