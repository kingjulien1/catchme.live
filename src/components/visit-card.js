"use client";

import AccountHandle from "@/components/account-handle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import VisitCountdown from "@/components/visit-countdown";
import { formatVisitDateRange, formatVisitType } from "@/lib/utils";
import { format } from "date-fns";
import { Banknote, ChevronDown, CircleDashed, CircleFadingArrowUp, CreditCard, HandCoins, Pin, Radio, Tag, User } from "lucide-react";
import { useState } from "react";

export default function VisitCard({ visit, author = null, isLive = false, isPast = false, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const start = visit.visit_start_time ? new Date(visit.visit_start_time) : null;
  const end = visit.visit_end_time ? new Date(visit.visit_end_time) : null;
  const destinationHandleRaw = visit.destination_username || visit.destination_instagram_handle || "unknown";
  const authorHandleRaw = author?.username || visit.author_username || "unknown";
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
          className={`relative overflow-hidden rounded-3xl border p-5 transition duration-300 ease-out ${isOpen ? "" : "sm:group-hover:shadow-xl sm:group-hover:shadow-slate-100/60 dark:sm:group-hover:shadow-slate-900/20"} ${
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
          <VisitTopContent isOpen={isOpen} isLive={isLive} visit={visit} author={author} authorHandleRaw={authorHandleRaw} destinationHandleRaw={destinationHandleRaw} />
          <VisitDuration isLive={isLive} isOpen={isOpen} start={start} end={end} isSameDay={isSameDay} visitLocation={visitLocation} />

          <div className={`h-px transition-all duration-300 ${isOpen ? "my-4 opacity-100" : "my-0 opacity-0"} ${isLive ? "bg-white/10 dark:bg-slate-200/70" : "bg-slate-200/70 dark:bg-slate-800/70"} sm:group-hover:my-4 sm:group-hover:opacity-100`} />

          <VisitDateDetails isLive={isLive} isOpen={isOpen} start={start} end={end} />
          <div className={`h-px transition-all duration-300 ${isOpen ? "my-4 opacity-100" : "my-0 opacity-0"} ${isLive ? "bg-white/10 dark:bg-slate-200/70" : "bg-slate-200/70 dark:bg-slate-800/70"} sm:group-hover:my-4 sm:group-hover:opacity-100`} />
          <VisitOptions isOpen={isOpen} visit={visit} />

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
        {StatusIcon ? <StatusIcon className="h-3.5 w-3.5 shrink-0" /> : null}
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

function VisitTopContent({ isOpen, visit, destinationHandleRaw, author, authorHandleRaw, isLive }) {
  return (
    <div className="grid items-start gap-6 lg:gap-8 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
      {author ? (
        <div className={`flex min-w-0 items-start gap-3 justify-self-start transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-10"} sm:group-hover:opacity-100`}>
          <Avatar className={`order-1 h-8 w-8 rounded-xl border ${isLive ? "border-white/15 bg-white/10 dark:border-slate-200/80 dark:bg-slate-100" : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"} text-slate-400`}>
            <AvatarImage src={author.profile_picture_url || undefined} alt={authorHandleRaw} className="object-cover" />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <AccountHandle
            username={authorHandleRaw}
            name={author.name || null}
            profilePictureUrl={author.profile_picture_url || null}
            followersCount={author.followers_count ?? null}
            accountType={author.account_type || null}
            mediaCount={author.media_count ?? null}
            bio={author.bio || null}
            className={`order-2 text-base font-semibold ${isLive ? "text-white hover:text-white dark:text-slate-900 dark:hover:text-slate-900" : "text-slate-900 hover:text-slate-900 dark:text-slate-100 dark:hover:text-slate-100"}`}
          />
        </div>
      ) : (
        <div className="min-w-0 justify-self-start" />
      )}

      <div className="min-w-0 justify-self-center" />

      <div className="flex min-w-0 items-start justify-end gap-3 text-right justify-self-end">
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
        <Avatar className={`h-8 w-8 rounded-xl border ${isLive ? "border-white/15 bg-white/10 dark:border-slate-200/80 dark:bg-slate-100" : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"} text-slate-400`}>
          <AvatarImage src={visit.destination_profile_picture_url || undefined} alt={destinationHandleRaw} className="object-cover" />
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

function VisitDuration({ visitLocation, isLive, isOpen, start, end, isSameDay }) {
  return (
    <div className="text-center">
      {visitLocation ? <div className={`uppercase text-[10px] tracking-[0.22em] ${isLive ? "text-gray-400 dark:text-gray-600" : "text-gray-600 dark:text-gray-400"}`}>Based in {visitLocation}</div> : null}
      <div
        className={`font-medium tracking-tight transition-all duration-300 ${
          isOpen ? "mt-3 text-[1.6rem] sm:text-3xl" : "mt-2 text-[1.3rem] sm:text-2xl"
        } ${isLive ? "text-white dark:text-slate-900" : "text-slate-900 dark:text-slate-100"} group-hover:mt-3 group-hover:text-[1.6rem] group-hover:sm:text-3xl`}
      >
        {formatVisitDateRange(start, end)}
      </div>
      {start ? (
        <div className={`transition-all duration-300 ${isOpen ? "mt-2 text-sm" : "mt-1 text-xs"} ${isLive ? "text-gray-500" : "text-gray-500"} group-hover:mt-2 group-hover:text-sm`}>{isSameDay ? format(start, "MMM d") : start.getFullYear()}</div>
      ) : null}
    </div>
  );
}

function VisitDateDetails({ isLive, isOpen, start, end }) {
  return (
    <div className={`grid gap-6 overflow-hidden transition-all duration-300 ${end ? "sm:grid-cols-2" : ""} ${isOpen ? "max-h-40 opacity-100" : "max-h-4 opacity-0"} sm:group-hover:max-h-40 sm:group-hover:opacity-100`}>
      <div>
        <div className="text-xs uppercase font-semibold tracking-[0.2em] text-gray-500">started</div>
        <div className={`mt-2 text-lg font-semibold ${isLive ? "text-white dark:text-slate-900" : "text-slate-900 dark:text-slate-100"}`}>{start ? format(start, "MMM d, h:mm a") : "TBD"}</div>
      </div>
      {end ? (
        <div className="sm:text-right">
          <div className="text-xs uppercase font-semibold tracking-[0.2em] text-gray-500">ends</div>
          <div className={`mt-2 text-lg font-semibold ${isLive ? "text-white dark:text-slate-900" : "text-slate-900 dark:text-slate-100"}`}>{format(end, "MMM d, h:mm a")}</div>
        </div>
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
function VisitOption({ name, value, icon }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="inline-flex items-center gap-2">
        {icon}
        {name}
      </span>
      {value}
    </div>
  );
}

function YesOption({ condition }) {
  return <span className={`text-sm font-semibold ${condition ? "text-emerald-500" : " text-gray-700 dark:text-gray-300"}`} children={condition ? "Yes" : "No"} />;
}

function AcceptedOption({ condition }) {
  return <span className="text-sm font-semibold text-gray-700 dark:text-gray-300" children={condition ? "Accepted" : "Unavailable"} />;
}

function VisitOptions({ visit, isOpen }) {
  return (
    <div className={`grid grid-cols-1 text-gray-500 gap-3 sm:gap-x-8 overflow-hidden transition-all duration-300 sm:grid-cols-2 ${isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"} sm:group-hover:max-h-48 sm:group-hover:opacity-100`}>
      <VisitOption name="Deposit Required" icon={<Banknote className="h-4 w-4" />} value={<YesOption condition={visit.deposit_required} />} />
      <VisitOption name="Age Policy" icon={<Banknote className="h-4 w-4" />} value={<span className="text-sm font-semibold text-gray-700 dark:text-gray-300" children={visit.age_18_plus ? "18+" : "All ages"} />} />
      <VisitOption name="Custom Requests" icon={<Tag className="h-4 w-4" />} value={<AcceptedOption condition={visit.custom_requests} />} />
      <VisitOption name="Bookings Open" icon={<HandCoins className="h-4 w-4" />} value={<YesOption condition={visit.bookings_open} />} />
      <VisitOption name="Appointment Only" icon={<Pin className="h-4 w-4" />} value={<YesOption condition={visit.appointment_only} />} />
      <VisitOption name="Digital Payments" icon={<CreditCard className="h-4 w-4" />} value={<AcceptedOption condition={visit.digital_payments} />} />
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
