"use client";

import AccountHandle from "@/components/account-handle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import VisitCountdown from "@/components/visit-countdown";
import { cn, formatVisitDateRange, formatVisitType } from "@/lib/utils";
import { format } from "date-fns";
import { Banknote, ChevronDown, CircleDashed, CircleFadingArrowUp, CreditCard, HandCoins, Pin, Radio, Tag, User } from "lucide-react";
import { useState } from "react";

export default function VisitCard({ visit, isLive = false, isPast = false, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const start = visit.visit_start_time ? new Date(visit.visit_start_time) : null;
  const end = visit.visit_end_time ? new Date(visit.visit_end_time) : null;
  const destinationHandleRaw = visit.destination_username || visit.destination_instagram_handle || "unknown";
  const visitLocation = visit.visit_location || visit.destination_name || visit.destination_username || "Visit location";
  const progressValue = isLive && start && end ? Math.min(100, Math.max(0, ((new Date().getTime() - start.getTime()) / (end.getTime() - start.getTime())) * 100)) : null;
  const isSameDay = start && end ? start.toDateString() === end.toDateString() : false;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <VisitStatusBadge isLive={isLive} isPast={isPast} visitType={visit.visit_type} />
        <ExpandButton isLive={isLive} isOpen={isOpen} onToggle={() => setIsOpen((value) => !value)} />
      </div>
      <div
        className={`group rounded-3xl transition-shadow ${
          isOpen
            ? "ring-2 ring-fuchsia-400/55 ring-offset-2 ring-offset-white shadow-[0_0_0_1px_rgba(217,70,239,0.18),0_10px_26px_rgba(217,70,239,0.18),0_0_20px_rgba(217,70,239,0.16)] dark:ring-fuchsia-400/45 dark:ring-offset-slate-950 dark:shadow-[0_0_0_1px_rgba(217,70,239,0.24),0_10px_26px_rgba(217,70,239,0.24),0_0_22px_rgba(217,70,239,0.18)]"
            : "ring-0 shadow-none group-hover:ring-2 group-hover:ring-fuchsia-400/80 group-hover:ring-offset-2 group-hover:ring-offset-white group-hover:shadow-[0_0_0_1px_rgba(217,70,239,0.28),0_12px_28px_rgba(217,70,239,0.25),0_0_22px_rgba(217,70,239,0.2)] dark:group-hover:ring-fuchsia-400/70 dark:group-hover:ring-offset-slate-950 dark:group-hover:shadow-[0_0_0_1px_rgba(217,70,239,0.35),0_12px_28px_rgba(217,70,239,0.32),0_0_26px_rgba(217,70,239,0.25)]"
        }`}
      >
        <article
          className={`relative overflow-hidden rounded-3xl border transition duration-300 ease-out ${isOpen ? "p-5" : "px-5 pt-5 pb-5 sm:group-hover:shadow-xl sm:group-hover:shadow-slate-100/60 dark:sm:group-hover:shadow-slate-900/20"} ${
            isLive
              ? "border-transparent bg-black text-white shadow-[0_0_22px_rgba(16,185,129,0.12)] dark:bg-white dark:text-slate-900 dark:shadow-[0_0_18px_rgba(16,185,129,0.18)]"
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
          <VisitTopContent isOpen={isOpen} isLive={isLive} visit={visit} destinationHandleRaw={destinationHandleRaw} />
          <VisitDuration isLive={isLive} isOpen={isOpen} start={start} end={end} isSameDay={isSameDay} visitLocation={visitLocation} />

          <div className={`h-px transition-all duration-300 ${isOpen ? "my-4 opacity-100" : "my-0 opacity-0"} ${isLive ? "bg-white/10 dark:bg-slate-200/70" : "bg-slate-200/70 dark:bg-slate-800/70"} sm:group-hover:my-4 sm:group-hover:opacity-100`} />

          <VisitDateDetails isLive={isLive} isOpen={isOpen} start={start} end={end} />
          <div className={`h-px transition-all duration-300 ${isOpen ? "my-4 opacity-100" : "my-0 opacity-0"} ${isLive ? "bg-white/10 dark:bg-slate-200/70" : "bg-slate-200/70 dark:bg-slate-800/70"} sm:group-hover:my-4 sm:group-hover:opacity-100`} />
          <VisitOptions isOpen={isOpen} visit={visit} isLive={isLive} />

          <VisitProgress isLive={isLive} isOpen={isOpen} progressValue={progressValue} start={start} end={end} />
        </article>
      </div>
    </div>
  );
}

function VisitStatusBadge({ isLive, isPast, visitType }) {
  const status = isLive ? "live" : isPast ? "expired" : "upcoming";
  const StatusIcon = isLive ? Radio : isPast ? CircleDashed : CircleFadingArrowUp;
  const statusClass = isLive
    ? "border-slate-900 bg-black text-white dark:border-white dark:bg-white dark:text-slate-900"
    : isPast
      ? "border-slate-400 bg-slate-100/80 text-slate-600 dark:border-slate-600 dark:bg-slate-900/80 dark:text-slate-300"
      : "border-slate-400 bg-slate-100/80 text-slate-700 dark:border-slate-600 dark:bg-slate-900/80 dark:text-slate-300";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className={`mt-1.5 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase leading-none tracking-[0.25em] ${statusClass}`}>
        {StatusIcon ? <StatusIcon className={cn("h-3.5 w-3.5 shrink-0", isLive && "text-rose-500")} /> : null}
        {status}
      </span>
      {visitType ? (
        <span className="mt-1.5 inline-flex items-center gap-2 rounded-full border border-slate-400 bg-slate-100/80 px-3 py-1 text-[10px] font-semibold uppercase leading-none tracking-[0.25em] text-slate-700 dark:border-slate-600 dark:bg-slate-900/80 dark:text-slate-200">
          <Tag className="h-3.5 w-3.5 shrink-0" />
          {formatVisitType(visitType)}
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

function VisitTopContent({ isOpen, visit, destinationHandleRaw, isLive }) {
  return (
    <div className="flex flex-col items-center pb-2 text-center">
      <Avatar className={`h-8 w-8 rounded-xl border ${isLive ? "border-white/15 bg-white/10 dark:border-slate-200/80 dark:bg-slate-100" : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"} text-slate-400`}>
        <AvatarImage src={visit.destination_profile_picture_url || undefined} alt={destinationHandleRaw} className="object-cover" />
        <AvatarFallback>
          <User className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
      <AccountHandle
        username={destinationHandleRaw}
        name={visit.destination_name || null}
        profilePictureUrl={visit.destination_profile_picture_url || null}
        followersCount={visit.destination_followers_count ?? null}
        accountType={visit.destination_account_type || null}
        mediaCount={visit.destination_media_count ?? null}
        bio={visit.destination_bio || null}
        className={`text-base font-semibold ${isLive ? "text-white hover:text-white dark:text-slate-900 dark:hover:text-slate-900" : "text-slate-900 hover:text-slate-900 dark:text-slate-100 dark:hover:text-slate-100"}`}
      />
    </div>
  );
}

function VisitDuration({ visitLocation, isLive, isOpen, start, end, isSameDay }) {
  return (
    <div className="text-center">
      {visitLocation ? (
        <Badge className="inline-flex items-center gap-1.5 border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-[9px] font-semibold tracking-[0.18em] text-slate-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-500" aria-hidden="true" />
          {visitLocation}
        </Badge>
      ) : null}
      <div
        className={`font-medium tracking-tight transition-all duration-300 ${
          isOpen ? "text-[1.6rem] sm:text-3xl" : "text-[1.3rem] sm:text-2xl"
        } ${isLive ? "text-white dark:text-slate-900" : "text-slate-900 dark:text-slate-100"} mt-0.5 group-hover:text-[1.6rem] group-hover:sm:text-3xl`}
      >
        {formatVisitDateRange(start, end)}
      </div>
      {start ? (
        <div
          className={`transition-all duration-300 ${
            isOpen ? "mt-2 max-h-6 opacity-100 text-sm" : "mt-0 max-h-0 opacity-0 text-xs"
          } ${isLive ? "text-gray-500" : "text-gray-500"} group-hover:mt-2 group-hover:max-h-6 group-hover:opacity-100 group-hover:text-sm`}
        >
          {isSameDay ? format(start, "MMM d") : start.getFullYear()}
        </div>
      ) : null}
    </div>
  );
}

function VisitDateDetails({ isLive, isOpen, start, end }) {
  return (
    <div
      className={`grid items-center gap-4 overflow-hidden transition-all duration-300 ${end ? "grid-cols-[1fr_auto]" : ""} ${isOpen ? "max-h-40 opacity-100" : "max-h-4 opacity-0"} sm:group-hover:max-h-40 sm:group-hover:opacity-100`}
    >
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
      className={`rounded-xl border p-3 ${
        isLive
          ? "border-white/20 bg-white/10 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)] dark:border-slate-200 dark:bg-slate-100 dark:text-slate-900"
          : "border-slate-200/70 bg-slate-100/70 text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:border-transparent dark:bg-slate-900/70 dark:text-slate-100 dark:shadow-[0_0_0_1px_rgba(148,163,184,0.12)]"
      }`}
    >
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
      <div className={`mb-2 flex items-center justify-between ${isOpen ? "text-xs" : "text-[9px]"} ${isLive ? "text-white dark:text-slate-900" : "text-slate-100 dark:text-slate-900"} group-hover:text-xs`}>
        <CircleDashed className={`h-4 w-4 ${isOpen ? "animate-[spin_4s_linear_infinite]" : "animate-none"} group-hover:animate-[spin_4s_linear_infinite]`} />
        <VisitCountdown start={start} end={end} isLive className={`${isOpen ? "text-white dark:text-gray-900" : "text-white/80 dark:text-gray-800"} group-hover:text-white dark:group-hover:text-gray-900`} />
      </div>
      <Progress value={progressValue} className={`h-2 ${isLive ? "bg-white/15 [&_[data-slot=progress-indicator]]:bg-white dark:bg-slate-200/70 dark:[&_[data-slot=progress-indicator]]:bg-slate-900" : "bg-slate-200/80 dark:bg-slate-800/80"}`} />
    </div>
  );
}
