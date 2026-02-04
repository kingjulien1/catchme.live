"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import VisitCountdown from "@/components/visit-countdown";
import { cn, formatVisitDateRange, formatVisitType } from "@/lib/utils";
import { format } from "date-fns";
import { Banknote, ChevronDown, CircleDashed, CircleFadingArrowUp, CreditCard, HandCoins, Info, Link2, LinkIcon, MapPin, Pin, Radio, Tag, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function VisitCard({ visit, isLive = false, isPast = false, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const start = visit.visit_start_time ? new Date(visit.visit_start_time) : null;
  const end = visit.visit_end_time ? new Date(visit.visit_end_time) : null;
  const destinationHandleRaw = visit.destination_username || visit.destination_instagram_handle || "unknown";
  const authorHandleRaw = visit.author_username || visit.author_instagram_handle || "";
  const isUpcoming = !isLive && !isPast;
  const destinationSlug = destinationHandleRaw ? destinationHandleRaw.replace(/^@/, "") : "";
  const authorSlug = authorHandleRaw ? authorHandleRaw.replace(/^@/, "") : "";
  const visitLocation = visit.visit_location || visit.destination_name || visit.destination_username || "Visit location";
  const progressValue = isLive && start && end ? Math.min(100, Math.max(0, ((new Date().getTime() - start.getTime()) / (end.getTime() - start.getTime())) * 100)) : null;
  const isSameDay = start && end ? start.toDateString() === end.toDateString() : false;

  return (
    <div className="space-y-2">
      <div
        className={`group rounded-3xl transition-shadow ${
          isOpen
            ? "ring-2 ring-fuchsia-400/55 ring-offset-2 ring-offset-white shadow-[0_0_0_1px_rgba(217,70,239,0.18),0_10px_26px_rgba(217,70,239,0.18),0_0_20px_rgba(217,70,239,0.16)] dark:ring-fuchsia-400/45 dark:ring-offset-slate-950 dark:shadow-[0_0_0_1px_rgba(217,70,239,0.24),0_10px_26px_rgba(217,70,239,0.24),0_0_22px_rgba(217,70,239,0.18)]"
            : "ring-0 shadow-none hover:ring-2 hover:ring-fuchsia-400/80 hover:ring-offset-2 hover:ring-offset-white hover:shadow-[0_0_0_1px_rgba(217,70,239,0.28),0_12px_28px_rgba(217,70,239,0.25),0_0_22px_rgba(217,70,239,0.2)] group-hover:ring-2 group-hover:ring-fuchsia-400/80 group-hover:ring-offset-2 group-hover:ring-offset-white group-hover:shadow-[0_0_0_1px_rgba(217,70,239,0.28),0_12px_28px_rgba(217,70,239,0.25),0_0_22px_rgba(217,70,239,0.2)] dark:hover:ring-fuchsia-400/70 dark:hover:ring-offset-slate-950 dark:hover:shadow-[0_0_0_1px_rgba(217,70,239,0.35),0_12px_28px_rgba(217,70,239,0.32),0_0_26px_rgba(217,70,239,0.25)] dark:group-hover:ring-fuchsia-400/70 dark:group-hover:ring-offset-slate-950 dark:group-hover:shadow-[0_0_0_1px_rgba(217,70,239,0.35),0_12px_28px_rgba(217,70,239,0.32),0_0_26px_rgba(217,70,239,0.25)]"
        }`}
      >
        <article
          className={`relative overflow-hidden rounded-3xl border transition duration-300 ease-out ${isOpen ? "p-5" : "px-5 pt-5 pb-5 sm:group-hover:shadow-xl sm:group-hover:shadow-slate-100/60 dark:sm:group-hover:shadow-slate-900/20"} ${
            isLive
              ? "border-transparent bg-black text-white shadow-[0_0_22px_rgba(16,185,129,0.12)] dark:bg-white dark:text-slate-900 dark:shadow-[0_0_18px_rgba(16,185,129,0.18)]"
              : isUpcoming
                ? "border-slate-200 bg-white text-slate-900 dark:border-slate-800 dark:bg-black dark:text-slate-100"
                : "border-slate-200 bg-gray-400/20 text-slate-900 dark:border-slate-800 dark:bg-gray-700/40  dark:text-slate-100"
          } ${isPast ? "opacity-70 grayscale" : ""}`}
          role="button"
          tabIndex={0}
          onClick={() => setIsOpen((value) => !value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              setIsOpen((value) => !value);
            }
          }}
        >
          <VisitTopContent isOpen={isOpen} isLive={isLive} visit={visit} destinationHandleRaw={destinationHandleRaw} authorHandleRaw={authorHandleRaw} destinationSlug={destinationSlug} authorSlug={authorSlug} />
          <VisitDuration isLive={isLive} isOpen={isOpen} start={start} end={end} isSameDay={isSameDay} visitLocation={visitLocation} />

          <div className={`h-px transition-all duration-300 ${isOpen ? "my-3 opacity-100" : "my-0 opacity-0"} ${isLive ? "bg-white/10 dark:bg-slate-200/70" : "bg-slate-200/70 dark:bg-slate-800/70"} sm:group-hover:my-3 sm:group-hover:opacity-100`} />

          <VisitDateDetails isLive={isLive} isOpen={isOpen} start={start} end={end} />
          <div className={`h-px transition-all duration-300 ${isOpen ? "my-4 opacity-100" : "my-0 opacity-0"} ${isLive ? "bg-white/10 dark:bg-slate-200/70" : "bg-slate-200/70 dark:bg-slate-800/70"} sm:group-hover:my-4 sm:group-hover:opacity-100`} />
          <VisitOptions isOpen={isOpen} visit={visit} isLive={isLive} />

          <VisitProgress isLive={isLive} isOpen={isOpen} progressValue={progressValue} start={start} end={end} />
        </article>
      </div>
    </div>
  );
}

function VisitStatusBadge({ isLive, isPast, visitType, location }) {
  const status = isLive ? "live" : isPast ? "expired" : "upcoming";
  const StatusIcon = isLive ? Radio : isPast ? CircleDashed : CircleFadingArrowUp;
  const statusClass = isLive
    ? "border-transparent bg-black text-white dark:bg-white dark:text-slate-900"
    : isPast
      ? "border-transparent bg-slate-100/80 text-slate-600 dark:bg-slate-900/80 dark:text-slate-300"
      : "border-transparent bg-slate-100/80 text-slate-700 dark:bg-slate-900/80 dark:text-slate-300";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className={`mt-1.5 inline-flex items-center gap-1.5 rounded-full border-0 bg-transparent px-2.5 py-1 text-[9px] font-semibold tracking-[0.18em] ${statusClass}`}>
        {StatusIcon ? <StatusIcon className={cn("h-3 w-3 shrink-0", isLive && "text-rose-500")} /> : null}
        {status}
      </span>
      {visitType ? (
        <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border-0 bg-slate-100/80 px-2.5 py-1 text-[9px] font-semibold tracking-[0.18em] text-slate-700 dark:bg-slate-900/80 dark:text-slate-200">
          <Tag className="h-3 w-3 shrink-0" />
          {formatVisitType(visitType)}
        </span>
      ) : null}
      {location ? (
        <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full border-0 bg-slate-100 px-2.5 py-1 text-[9px] font-semibold tracking-[0.18em] text-slate-600 dark:bg-slate-900/70 dark:text-slate-300">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-500" aria-hidden="true" />
          {location}
        </span>
      ) : null}
    </div>
  );
}

function ExpandButton({ isLive, isOpen, onToggle }) {
  return (
    <button
      type="button"
      aria-label={isOpen ? "Collapse visit" : "Expand visit"}
      aria-expanded={isOpen}
      onClick={(event) => {
        event.stopPropagation();
        onToggle();
      }}
      className="mt-1.5 inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-xs text-gray-500 transition hover:text-slate-700 dark:border-slate-700 dark:text-slate-300 dark:hover:text-slate-100"
    >
      <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : "rotate-0"} sm:group-hover:rotate-180`} />
    </button>
  );
}

function VisitTopContent({ isOpen, visit, destinationHandleRaw, authorHandleRaw, destinationSlug, authorSlug, isLive }) {
  const hasAuthor = Boolean(authorHandleRaw);
  const destinationHref = destinationSlug ? `/artists/${destinationSlug}` : "/artists";
  const authorHref = authorSlug ? `/artists/${authorSlug}` : "/artists";

  return (
    <div className="flex flex-col items-center pb-2 text-center">
      <div className="mb-2 flex w-full items-center justify-between text-left">
        {visit.visit_type ? (
          <span
            className={`inline-flex items-center gap-2 rounded-lg px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] ${
              isLive ? "text-fuchsia-500/70 bg-fuchsia-500/40 dark:bg-fuchsia-500/15 dark:text-fuchsia-600" : "bg-fuchsia-100/80 text-fuchsia-700/90 dark:bg-fuchsia-500/25 dark:text-fuchsia-100"
            }`}
          >
            <span
              className={`inline-flex h-5 w-5 items-center justify-center rounded-md ${
                isLive ? "bg-fuchsia-500/10 text-fuchsia-600 dark:bg-fuchsia-500/20 dark:text-fuchsia-600" : "bg-fuchsia-500/20 text-fuchsia-600 dark:bg-fuchsia-500/35 dark:text-fuchsia-100"
              }`}
            >
              <Tag className="h-3 w-3" />
            </span>
            {formatVisitType(visit.visit_type)}
          </span>
        ) : (
          <span />
        )}
        {visit.visit_location ? (
          <span
            className={`inline-flex items-center gap-2 rounded-lg px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] ${
              isLive ? "text-slate-400 bg-slate-500/30 dark:bg-slate-500/15 dark:text-slate-600" : "bg-slate-100/80 text-slate-700/90 dark:bg-slate-500/25 dark:text-slate-100"
            }`}
          >
            <span
              className={`inline-flex h-5 w-5 items-center justify-center rounded-md ${isLive ? "bg-slate-500/10 text-slate-200 dark:bg-slate-500/20 dark:text-slate-600" : "bg-slate-500/20 text-slate-600 dark:bg-slate-500/35 dark:text-slate-100"}`}
            >
              <MapPin className="h-3 w-3" />
            </span>
            {visit.visit_location}
          </span>
        ) : (
          <span />
        )}
      </div>
      <div className="flex items-center justify-center gap-4">
        <Avatar className={`h-14 w-14 rounded-full border-0 ring-2 ring-fuchsia-500/70 ${isLive ? "bg-white/10 dark:bg-slate-100" : "bg-white dark:bg-slate-900"} text-slate-400`}>
          <AvatarImage src={visit.destination_profile_picture_url || undefined} alt={destinationHandleRaw} className="object-cover" />
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
        {hasAuthor ? (
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-fuchsia-500 text-white shadow-[0_0_24px_rgba(217,70,239,0.8),0_0_50px_rgba(217,70,239,0.7)]">
            <LinkIcon className="h-4 w-4" aria-hidden="true" />
          </span>
        ) : null}
        {hasAuthor ? (
          <Avatar className={`h-14 w-14 rounded-full border-0 ring-2 ring-fuchsia-500/70 ${isLive ? "bg-white/10 dark:bg-slate-100" : "bg-white dark:bg-slate-900"} text-slate-400`}>
            <AvatarImage src={visit.author_profile_picture_url || undefined} alt={authorHandleRaw} className="object-cover" />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        ) : null}
      </div>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "mt-2 max-h-16 opacity-100" : "mt-0 max-h-0 opacity-0"} group-hover:mt-2 group-hover:max-h-16 group-hover:opacity-100`}>
        <Link
          href={destinationHref}
          className={`block text-lg font-semibold ${isLive ? "text-white hover:text-white dark:text-slate-900 dark:hover:text-slate-900" : "text-slate-900 hover:text-slate-900 dark:text-slate-100 dark:hover:text-slate-100"}`}
        >
          {destinationHandleRaw ? destinationHandleRaw.replace(/^@/, "@") : "@unknown"}
        </Link>
        {hasAuthor ? (
          <Link href={authorHref} className={`block text-base font-medium leading-tight ${isLive ? "text-gray-300 dark:text-slate-700" : "text-slate-700 dark:text-slate-300"}`}>
            {authorHandleRaw ? authorHandleRaw.replace(/^@/, "@") : "@unknown"}
          </Link>
        ) : null}
      </div>
    </div>
  );
}

function VisitDuration({ visitLocation, isLive, isOpen, start, end, isSameDay }) {
  return (
    <div className="text-center">
      <div
        className={`font-extrabold tracking-tight transition-all duration-300 ${
          isOpen ? "text-[2rem] sm:text-4xl" : "text-[1.7rem] sm:text-3xl"
        } ${isLive ? "text-white dark:text-slate-900" : "text-slate-900 dark:text-slate-100"} mt-0.5 group-hover:text-[2rem] group-hover:sm:text-4xl`}
      >
        {formatVisitDateRange(start, end)}
      </div>
      {start ? (
        <div className={`h-0 font-medium transition-all duration-300 ${isOpen ? "h-3 opacity-100 text-sm" : "h-0 opacity-0 text-xs"} ${isLive ? "text-gray-500" : "text-gray-500"} group-hover:h-3 group-hover:opacity-100 group-hover:text-sm`}>
          {isSameDay ? format(start, "MMM d") : start.getFullYear()}
        </div>
      ) : null}
    </div>
  );
}

function VisitDateDetails({ isLive, isOpen, start, end }) {
  return (
    <div className={`grid items-center gap-4 overflow-hidden transition-all duration-300 ${end ? "grid-cols-[1fr_auto]" : ""} ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"} sm:group-hover:max-h-40 sm:group-hover:opacity-100`}>
      <div>
        <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-500 sm:text-[10px]">start</div>
        <div className={`mt-2 text-sm font-semibold sm:text-lg ${isLive ? "text-white dark:text-slate-900" : "text-slate-900 dark:text-slate-100"}`}>{start ? format(start, "MMM d, h:mm a") : "TBD"}</div>
      </div>
      {end ? (
        <>
          <div className="justify-self-end text-right">
            <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-500 sm:text-[10px]">end</div>
            <div className={`mt-2 text-sm font-semibold sm:text-lg ${isLive ? "text-white dark:text-slate-900" : "text-slate-900 dark:text-slate-100"}`}>{format(end, "MMM d, h:mm a")}</div>
          </div>
        </>
      ) : null}
    </div>
  );
}

/**
 * @param {props} props
 * @param {string} props.name
 * @param {React.ReactNode} props.icon
 * @param {string} props.value
 */
function OptionCard({ label, value, icon, tone = "slate", isLive }) {
  const toneMap = {
    emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/25 dark:text-emerald-100",
    blue: "bg-blue-100 text-blue-700 dark:bg-blue-500/25 dark:text-blue-100",
    violet: "bg-violet-100 text-violet-700 dark:bg-violet-500/25 dark:text-violet-100",
    teal: "bg-teal-100 text-teal-700 dark:bg-teal-500/25 dark:text-teal-100",
    slate: "bg-slate-200 text-slate-600 dark:bg-slate-500/25 dark:text-slate-100",
  };
  const liveToneMap = {
    emerald: "bg-emerald-500/15 text-emerald-500 dark:bg-emerald-500/20 dark:text-emerald-600",
    blue: "bg-blue-500/15 text-blue-500 dark:bg-blue-500/20 dark:text-blue-600",
    violet: "bg-violet-500/15 text-violet-500 dark:bg-violet-500/20 dark:text-violet-600",
    teal: "bg-teal-500/15 text-teal-500 dark:bg-teal-500/20 dark:text-teal-600",
    slate: "bg-slate-500/15 text-slate-500 dark:bg-slate-500/20 dark:text-slate-600",
  };
  return (
    <div
      className={`relative rounded-xl border p-3 ${
        isLive
          ? "border-white/20 bg-transparent text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)] dark:border-slate-200 dark:bg-transparent dark:text-slate-900"
          : "border-slate-200/70 bg-transparent text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:border-transparent dark:bg-transparent dark:text-slate-100 dark:shadow-[0_0_0_1px_rgba(148,163,184,0.12)]"
      }`}
    >
      <span className="pointer-events-none absolute right-3 top-3 opacity-60">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-transparent text-slate-500 dark:text-slate-300">
          <Info className="h-3 w-3" />
        </span>
      </span>
      <div className={`flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] ${isLive ? "text-white/75 dark:text-slate-500" : "text-slate-500"}`}>
        <span className={`inline-flex h-7 w-7 items-center justify-center rounded-lg ${(isLive ? liveToneMap : toneMap)[tone] || (isLive ? liveToneMap.slate : toneMap.slate)}`}>{icon}</span>
        {label}
      </div>
      <div className={`mt-2 text-sm font-semibold ${isLive ? "text-white dark:text-slate-900" : "text-slate-900 dark:text-slate-100"}`}>{value}</div>
    </div>
  );
}

function VisitOptions({ visit, isOpen, isLive }) {
  return (
    <div className={`space-y-4 overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"} sm:group-hover:max-h-[520px] sm:group-hover:opacity-100`}>
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-3">
        <OptionCard label="Deposit" value={visit.deposit_required ? "Required" : "Not required"} icon={<Banknote className="h-3.5 w-3.5" />} tone="emerald" isLive={isLive} />
        <OptionCard label="Age Policy" value={visit.age_18_plus ? "18+" : "All ages"} icon={<CreditCard className="h-3.5 w-3.5" />} tone="blue" isLive={isLive} />
        <OptionCard label="Requests" value={visit.custom_requests ? "Accepted" : "Unavailable"} icon={<Tag className="h-3.5 w-3.5" />} tone="violet" isLive={isLive} />
        <OptionCard label="Bookings" value={visit.bookings_open ? "Open" : "Closed"} icon={<HandCoins className="h-3.5 w-3.5" />} tone="teal" isLive={isLive} />
        <OptionCard label="Walk-ins" value={visit.appointment_only ? "No" : "Yes"} icon={<Pin className="h-3.5 w-3.5" />} tone="slate" isLive={isLive} />
        <OptionCard label="Payments" value={visit.digital_payments ? "Available" : "Unavailable"} icon={<CreditCard className="h-3.5 w-3.5" />} tone="slate" isLive={isLive} />
      </div>
    </div>
  );
}

function VisitProgress({ isLive, isOpen, progressValue, start, end }) {
  if (typeof progressValue !== "number") return null;

  return (
    <div className={`${isOpen ? "mt-4" : "mt-0"} transition-all duration-300 group-hover:mt-4`}>
      {isLive ? <div className={`h-px bg-white/10 transition-all duration-300 dark:bg-slate-200/70 ${isOpen ? "mb-4 opacity-100" : "mb-0 opacity-0"} group-hover:mb-4 group-hover:opacity-100`} /> : null}
      <div className={`mb-2 flex items-center justify-center ${isOpen ? "text-xs" : "text-[9px]"} text-fuchsia-400 transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0"} group-hover:opacity-100`}>
        <VisitCountdown start={start} end={end} isLive className="text-fuchsia-400" />
      </div>
      <Progress
        value={progressValue}
        className={`h-1.5 ${isLive ? "bg-white/15 [&_[data-slot=progress-indicator]]:bg-fuchsia-400 [&_[data-slot=progress-indicator]]:shadow-[0_0_12px_rgba(217,70,239,0.5)] dark:bg-slate-200/70 dark:[&_[data-slot=progress-indicator]]:bg-fuchsia-500 dark:[&_[data-slot=progress-indicator]]:shadow-[0_0_12px_rgba(217,70,239,0.45)]" : "bg-slate-200/80 [&_[data-slot=progress-indicator]]:bg-fuchsia-400 [&_[data-slot=progress-indicator]]:shadow-[0_0_12px_rgba(217,70,239,0.45)] dark:bg-slate-800/80 dark:[&_[data-slot=progress-indicator]]:bg-fuchsia-500 dark:[&_[data-slot=progress-indicator]]:shadow-[0_0_12px_rgba(217,70,239,0.45)]"}`}
      />
    </div>
  );
}
