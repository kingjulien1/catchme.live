"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import AccountHandle from "@/components/account-handle";
import VisitCountdown from "@/components/visit-countdown";
import { formatVisitDateRange, formatVisitType } from "@/lib/utils";
import { Banknote, ChevronDown, CircleDashed, CreditCard, HandCoins, ShieldCheck, Tag, User } from "lucide-react";
import { format } from "date-fns";

export default function VisitCard({ visit, isLive = false, isPast = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const start = visit.visit_start_time ? new Date(visit.visit_start_time) : null;
  const end = visit.visit_end_time ? new Date(visit.visit_end_time) : null;
  const now = new Date();
  const destinationHandleRaw = visit.destination_username || visit.destination_instagram_handle || "unknown";
  const visitLocation = visit.visit_location || visit.destination_name || visit.destination_username || "Visit location";
  const progressValue = isLive && start && end ? Math.min(100, Math.max(0, ((now.getTime() - start.getTime()) / (end.getTime() - start.getTime())) * 100)) : null;
  const isSameDay = start && end ? start.toDateString() === end.toDateString() : false;

  return (
    <div className="group space-y-2">
      <article
        className={`relative overflow-hidden rounded-3xl border p-5 transition duration-300 ease-out sm:group-hover:shadow-xl sm:group-hover:shadow-slate-100/60 dark:sm:group-hover:shadow-slate-900/20 ${
          isLive
            ? "border-transparent bg-black text-white shadow-[0_0_22px_rgba(16,185,129,0.12)] dark:bg-white dark:text-slate-900 dark:shadow-[0_0_18px_rgba(16,185,129,0.18)]"
            : "border-slate-200 bg-white/90 text-slate-900 dark:border-slate-800 dark:bg-black dark:text-slate-100"
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
        <button
          type="button"
          aria-label={isOpen ? "Collapse visit" : "Expand visit"}
          aria-expanded={isOpen}
          onClick={(event) => {
            event.stopPropagation();
            setIsOpen((value) => !value);
          }}
          className={`absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs transition ${
            isLive
              ? "border-white/20 text-white/70 hover:text-white dark:border-slate-300 dark:text-slate-700 dark:hover:text-slate-900"
              : "border-slate-200 text-slate-400 hover:text-slate-700 dark:border-slate-700 dark:text-slate-500 dark:hover:text-slate-200"
          }`}
        >
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : "rotate-0"} sm:group-hover:rotate-180`} />
        </button>
        <div className="flex items-start gap-3">
          <Avatar className={`h-11 w-11 border ${isLive ? "border-white/15 bg-white/10 dark:border-slate-200/80 dark:bg-slate-100" : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"} text-slate-400`}>
            <AvatarImage src={visit.destination_profile_picture_url || undefined} alt={destinationHandleRaw} className="object-cover" />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex flex-1 flex-col items-start">
            <div className="flex w-full items-center justify-between gap-4 pr-10">
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
              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                  isLive ? "bg-white/10 text-white dark:bg-slate-200/80 dark:text-slate-900" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-200"
                }`}
              >
                <Tag className="h-3.5 w-3.5" />
                {formatVisitType(visit.visit_type)}
              </span>
            </div>
            <div className="text-[11px] font-normal text-slate-400 dark:text-slate-500">{(visit.destination_account_type || "Instagram account").replace(/_/g, " ")}</div>
          </div>
        </div>
        <div className="text-center">
          {visitLocation ? (
            <div
              className={`font-semibold uppercase text-[9px] tracking-[0.22em] ${
                isLive ? "text-white/50 dark:text-slate-500" : "text-slate-500 dark:text-slate-400"
              }`}
            >
              Based in {visitLocation}
            </div>
          ) : null}
          <div
            className={`font-medium tracking-tight transition-all duration-300 ${
              isOpen ? "mt-2 text-[1.6rem] sm:text-3xl" : "mt-1 text-[1.3rem] sm:text-2xl"
            } ${isLive ? "text-white dark:text-slate-900" : "text-slate-900 dark:text-slate-100"} group-hover:mt-2 group-hover:text-[1.6rem] group-hover:sm:text-3xl`}
          >
            {formatVisitDateRange(start, end)}
          </div>
          {start ? (
            <div className={`transition-all duration-300 ${isOpen ? "mt-2 text-sm" : "mt-1 text-xs"} ${isLive ? "text-white/50 dark:text-slate-500" : "text-slate-500 dark:text-slate-400"} group-hover:mt-2 group-hover:text-sm`}>
              {isSameDay ? format(start, "MMM d") : start.getFullYear()}
            </div>
          ) : null}
        </div>

        <div className={`h-px transition-all duration-300 ${isOpen ? "my-4 opacity-100" : "my-0 opacity-0"} ${isLive ? "bg-white/10 dark:bg-slate-200/70" : "bg-slate-200/70 dark:bg-slate-800/70"} sm:group-hover:my-4 sm:group-hover:opacity-100`} />

        <div className={`grid gap-6 overflow-hidden transition-all duration-300 ${end ? "sm:grid-cols-2" : ""} ${isOpen ? "max-h-40 opacity-100" : "max-h-4 opacity-0"} sm:group-hover:max-h-40 sm:group-hover:opacity-100`}>
          <div>
            <div className={`text-xs font-semibold tracking-[0.2em] ${isLive ? "text-white/50 dark:text-slate-500" : "text-slate-500 dark:text-slate-400"}`}>STARTED</div>
            <div className={`mt-2 text-lg font-semibold ${isLive ? "text-white dark:text-slate-900" : "text-slate-900 dark:text-slate-100"}`}>{start ? format(start, "MMM d, h:mm a") : "TBD"}</div>
          </div>
          {end ? (
            <div className="sm:text-right">
              <div className={`text-xs font-semibold tracking-[0.2em] ${isLive ? "text-white/50 dark:text-slate-500" : "text-slate-500 dark:text-slate-400"}`}>ENDS</div>
              <div className={`mt-2 text-lg font-semibold ${isLive ? "text-white dark:text-slate-900" : "text-slate-900 dark:text-slate-100"}`}>{format(end, "MMM d, h:mm a")}</div>
            </div>
          ) : null}
        </div>

        <div className={`h-px transition-all duration-300 ${isOpen ? "my-4 opacity-100" : "my-0 opacity-0"} ${isLive ? "bg-white/10 dark:bg-slate-200/70" : "bg-slate-200/70 dark:bg-slate-800/70"} sm:group-hover:my-4 sm:group-hover:opacity-100`} />

        <div className={`grid grid-cols-1 gap-3 sm:gap-x-6 overflow-hidden transition-all duration-300 sm:grid-cols-2 ${isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"} sm:group-hover:max-h-48 sm:group-hover:opacity-100`}>
          <div className="flex items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-2">
              <Banknote className="h-4 w-4" />
              Deposit Required
            </span>
            <span className={`font-semibold ${visit.deposit_required ? "text-emerald-500" : "text-slate-400"}`}>{visit.deposit_required ? "Yes" : "No"}</span>
          </div>
          <div className="flex items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              Age Policy
            </span>
            <span className="font-semibold">{visit.age_18_plus ? "18+" : "All ages"}</span>
          </div>
          <div className="flex items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Custom Requests
            </span>
            <span className="font-semibold">{visit.custom_requests ? "Accepted" : "Unavailable"}</span>
          </div>
          <div className="flex items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-2">
              <HandCoins className="h-4 w-4" />
              Bookings Open
            </span>
            <span className={`font-semibold ${visit.bookings_open ? "text-emerald-500" : "text-slate-400"}`}>{visit.bookings_open ? "Yes" : "No"}</span>
          </div>
          <div className="flex items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Appointment Only
            </span>
            <span className={`font-semibold ${visit.bookings_open ? "text-emerald-500" : "text-slate-400"}`}>{visit.bookings_open ? "Yes" : "No"}</span>
          </div>
          <div className="flex items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Digital Payments
            </span>
            <span className="font-semibold">{visit.digital_payments ? "Supported" : "Not supported"}</span>
          </div>
        </div>

        {typeof progressValue === "number" ? (
          <div className="mt-4">
            <div className={`mb-2 flex items-center justify-between text-xs ${isLive ? "text-white dark:text-slate-900" : "text-slate-100 dark:text-slate-900"}`}>
              <CircleDashed
                className={`h-3.5 w-3.5 ${isOpen ? "animate-[spin_4s_linear_infinite]" : "animate-none"} group-hover:animate-[spin_4s_linear_infinite]`}
              />
              <VisitCountdown start={start} end={end} isLive className="text-white dark:text-gray-900" />
            </div>
            <Progress value={progressValue} className={`h-2 ${isLive ? "bg-white/15 [&_[data-slot=progress-indicator]]:bg-white dark:bg-slate-200/70 dark:[&_[data-slot=progress-indicator]]:bg-slate-900" : "bg-slate-200/80 dark:bg-slate-800/80"}`} />
          </div>
        ) : null}
      </article>
    </div>
  );
}
