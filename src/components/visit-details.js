"use client";

import * as React from "react";
import { differenceInMinutes, format } from "date-fns";
import { ArrowRight, BadgeDollarSign, CalendarCheck, Check, ExternalLink, MapPin, ShieldAlert, Tag, Link, Share2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { pickAvatarImage } from "@/lib/visit-media";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDurationMinutes, formatVisitType } from "@/lib/utils";

function formatDate(value) {
  if (!value) return "TBD";
  return format(new Date(value), "MMM d, yyyy");
}

function formatTime(value) {
  if (!value) return "TBD";
  return format(new Date(value), "h:mm a");
}

function formatRange(start, end) {
  if (start && end) {
    return `${format(start, "MMM d")} \u2013 ${format(end, "MMM d")}`;
  }
  if (start) return format(start, "MMM d");
  return "Dates TBA";
}

function formatYearLine(start, end) {
  if (start && end) {
    const startYear = format(start, "yyyy");
    const endYear = format(end, "yyyy");
    return startYear === endYear ? startYear : `${startYear} \u2013 ${endYear}`;
  }
  if (start) return format(start, "yyyy");
  return "";
}

function formatTimeOnly(value) {
  if (!value) return "TBD";
  return format(new Date(value), "h:mm");
}

function formatDateTime(value) {
  if (!value) return "TBD";
  return format(new Date(value), "MMM d, h:mm a");
}

function formatTimeRange(start, end) {
  if (!start) return "TBD";
  if (!end) return `${format(start, "h:mm")} - Open end`;
  return `${format(start, "h:mm")} - ${format(end, "h:mm")}`;
}

function formatRemainingLabel(minutes) {
  if (minutes <= 0) return "Ending soon";
  const days = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);
  const mins = minutes % 60;
  const parts = [];
  if (days) parts.push(`${days}d`);
  if (hours) parts.push(`${hours}h`);
  if (!days && !hours) parts.push(`${Math.max(1, mins)}m`);
  return `Ends in ${parts.join(" ")}`;
}

export default function VisitDetails({ visit }) {
  const start = visit.visit_start_time ? new Date(visit.visit_start_time) : null;
  const end = visit.visit_end_time ? new Date(visit.visit_end_time) : null;
  const now = new Date();
  const rangeLabel = formatRange(start, end);
  const yearLine = formatYearLine(start, end);
  const isSameDay = Boolean(start && end && start.toDateString() === end.toDateString());
  const timeRangeLine = isSameDay ? formatTimeRange(start, end) : null;
  const isLive = Boolean(start && end && start <= now && end >= now);
  const totalMinutes = start && end ? differenceInMinutes(end, start) : null;
  const elapsedMinutes = start ? differenceInMinutes(now, start) : null;
  const remainingMinutes = end ? differenceInMinutes(end, now) : null;
  const progressValue = totalMinutes && elapsedMinutes != null ? Math.min(100, Math.max(0, (elapsedMinutes / totalMinutes) * 100)) : 0;
  const remainingLabel = remainingMinutes != null ? formatRemainingLabel(remainingMinutes) : null;
  const descriptionText =
    (visit.description || "").trim() ||
    "This visit highlights a curated body of work that explores story, place, and mood. Expect a focused selection of pieces with rich detail and a strong sense of atmosphere. The collection is designed to feel cohesive while still leaving room for surprise. Each session is intended to be personal, precise, and memorable.";
  const [isExpanded, setIsExpanded] = React.useState(false);

  const dedupeAccounts = (accounts) =>
    accounts
      .filter((account) => account.handle || account.image)
      .filter((account, index, array) => {
        const signature = `${account.handle}-${account.image || ""}`;
        return array.findIndex((item) => `${item.handle}-${item.image || ""}` === signature) === index;
      });

  const seedBase = visit.id || "visit";
  const destinationHandle = visit.destination_username || visit.destination_instagram_handle || "destination";
  const destinationAccounts = [
    {
      handle: destinationHandle,
      image: pickAvatarImage(`${seedBase}-destination-${destinationHandle}`),
    },
  ];

  const partnerAccounts = (Array.isArray(visit.linked_accounts) ? visit.linked_accounts : []).map((account, index) => {
    const handle = account.account_handle || account.username || account.handle || "account";
    return {
      handle,
      image: pickAvatarImage(`${seedBase}-partner-${handle}-${index}`),
    };
  });

  const authorHandle = visit.author_username || visit.author_name || "author";
  const authorAccount = {
    handle: authorHandle,
    image: pickAvatarImage(`${seedBase}-author-${authorHandle}`),
  };

  const leftAccounts = dedupeAccounts(destinationAccounts);
  const rightAccounts = dedupeAccounts([authorAccount, ...partnerAccounts]);
  const allAccounts = dedupeAccounts([...leftAccounts, ...rightAccounts]);
  const visitTypeLabel = formatVisitType(visit.visit_type || "visit");
  const locationLabel = visit.visit_location || "Location TBA";
  const bookingStatus = typeof visit.booking_status === "string" ? visit.booking_status : visit.booking_status != null ? String(visit.booking_status) : null;
  const bookingLabel = bookingStatus
    ? bookingStatus.toLowerCase().includes("open")
      ? "Bookings Open"
      : bookingStatus.toLowerCase().includes("closed")
        ? "Bookings Closed"
        : bookingStatus.toLowerCase().includes("available")
          ? "Bookings Open"
          : bookingStatus.toLowerCase().includes("unavailable")
            ? "Bookings Closed"
            : "Bookings Open"
    : null;
  const baseDepositLabel = visit.deposit_amount ? `$${Number(visit.deposit_amount).toFixed(2)} Deposit` : visit.deposit_required ? "Deposit Required" : null;
  const agePolicyLabel = visit.age_policy || null;
  const appointmentLabel = visit.appointment_only ? "Appt. Only" : null;
  const depositLabel = baseDepositLabel || (appointmentLabel ? "Deposit TBD" : null);
  const paymentModeLabel = visit.digital_payments ? "Digital Payments Accepted" : "Cash Only";

  return (
    <div className="text-center">
      <div className="flex flex-col items-center gap-4 pb-10 pt-6">
        <button type="button" aria-label="Share visit" className="h-12 w-12 rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:text-slate-900 dark:border-white/15 dark:bg-slate-950 dark:text-white/80">
          <Share2 className="h-5 w-5 mx-auto" />
        </button>
        <div className="flex items-center -space-x-5">
          {[...leftAccounts.slice(0, 1), ...rightAccounts].map((account, index, array) => (
            <Avatar key={`${account.handle}-${index}`} className="h-12 w-12 border border-slate-200 bg-slate-50 dark:border-white/15 dark:bg-white/10" style={{ zIndex: array.length - index }}>
              <AvatarImage src={account.image || undefined} alt={account.handle} className="object-cover" />
              <AvatarFallback className="text-xs font-semibold text-slate-600 dark:text-white/80">{(account.handle || "?").replace(/^@/, "").slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </div>

      <div className="grid gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white/90 px-6 py-4 text-left dark:border-slate-800 dark:bg-slate-950/80">
          <div className="text-center">
            {isSameDay ? (
              <>
                <p className="text-3xl font-semibold text-slate-900 dark:text-slate-100">{timeRangeLine}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{formatDate(start)}</p>
              </>
            ) : (
              <>
                <p className="text-3xl font-semibold text-slate-900 dark:text-slate-100">{rangeLabel}</p>
                {yearLine ? <p className="text-sm text-slate-500 dark:text-slate-400">{yearLine}</p> : null}
              </>
            )}
          </div>
          <div className="mt-4">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Start</p>
                <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">{isSameDay ? formatTimeOnly(visit.visit_start_time) : formatDateTime(visit.visit_start_time)}</p>
              </div>
              <span className="justify-self-center text-sm font-semibold text-slate-400 dark:text-slate-500">-</span>
              <div className="text-right">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">End</p>
                <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">{visit.visit_end_time ? (isSameDay ? formatTimeOnly(visit.visit_end_time) : formatDateTime(visit.visit_end_time)) : "Open end"}</p>
              </div>
            </div>
            {isLive ? (
              <div className="mt-4">
                {remainingLabel ? <div className="mt-5 flex items-center justify-center text-sm font-semibold text-fuchsia-600 dark:text-fuchsia-400">{remainingLabel}</div> : null}
                <Progress className="mt-2 h-2 bg-slate-200 dark:bg-slate-800" indicatorClassName="bg-fuchsia-500" value={progressValue} />
              </div>
            ) : null}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white/90 px-6 py-4 text-left dark:border-slate-800 dark:bg-slate-950/80">
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Description</p>
          <p
            className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300"
            style={
              isExpanded
                ? undefined
                : {
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }
            }
          >
            {descriptionText}
          </p>
          <button type="button" className="mt-3 text-sm font-semibold text-slate-900 hover:text-slate-700 dark:text-slate-100 dark:hover:text-slate-200" onClick={() => setIsExpanded((prev) => !prev)}>
            {isExpanded ? "Read less" : "Read more"}
          </button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white/90 px-5 py-4 text-left dark:border-slate-800 dark:bg-slate-950/80">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full rounded-full bg-slate-100/80 p-1 dark:bg-slate-900/60">
              <TabsTrigger value="details" className="flex-1 rounded-full text-sm font-semibold">
                Details
              </TabsTrigger>
              <TabsTrigger value="booking" className="flex-1 rounded-full text-sm font-semibold">
                Booking
              </TabsTrigger>
              <TabsTrigger value="connected" className="flex-1 rounded-full text-sm font-semibold">
                Connected
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-4">
              <div className="grid grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-300">
                <div className="relative rounded-2xl border border-slate-200 bg-slate-50/80 px-4 pb-5 pt-4 text-left dark:border-slate-800 dark:bg-slate-950/60">
                  <span className="absolute left-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                    <Tag className="h-3.5 w-3.5" />
                  </span>
                  <div className="pt-8">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Type</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">{visitTypeLabel}</p>
                  </div>
                </div>

                <div className="relative rounded-2xl border border-slate-200 bg-slate-50/80 px-4 pb-5 pt-4 text-left dark:border-slate-800 dark:bg-slate-950/60">
                  <span className="absolute left-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                    <MapPin className="h-3.5 w-3.5" />
                  </span>
                  <div className="pt-8">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Location</p>
                    <p className="mt-1 truncate text-sm font-semibold text-slate-900 dark:text-slate-100">{locationLabel}</p>
                  </div>
                </div>

                {bookingLabel ? (
                  <div className="relative rounded-2xl border border-slate-200 bg-slate-50/80 px-4 pb-5 pt-4 text-left dark:border-slate-800 dark:bg-slate-950/60">
                    <span className="absolute left-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <div className="pt-8">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Bookings</p>
                      <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">{bookingLabel}</p>
                    </div>
                  </div>
                ) : null}

                {depositLabel ? (
                  <div className="relative rounded-2xl border border-slate-200 bg-slate-50/80 px-4 pb-5 pt-4 text-left dark:border-slate-800 dark:bg-slate-950/60">
                    <span className="absolute left-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                      <BadgeDollarSign className="h-3.5 w-3.5" />
                    </span>
                    <div className="pt-8">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Deposit</p>
                      <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">{depositLabel}</p>
                    </div>
                  </div>
                ) : null}

                {agePolicyLabel ? (
                  <div className="relative rounded-2xl border border-slate-200 bg-slate-50/80 px-4 pb-5 pt-4 text-left dark:border-slate-800 dark:bg-slate-950/60">
                    <span className="absolute left-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                      <ShieldAlert className="h-3.5 w-3.5" />
                    </span>
                    <div className="pt-8">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Age Policy</p>
                      <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">{agePolicyLabel}</p>
                    </div>
                  </div>
                ) : null}

                {appointmentLabel ? (
                  <div className="relative rounded-2xl border border-slate-200 bg-slate-50/80 px-4 pb-5 pt-4 text-left dark:border-slate-800 dark:bg-slate-950/60">
                    <span className="absolute left-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                      <CalendarCheck className="h-3.5 w-3.5" />
                    </span>
                    <div className="pt-8">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Appointment</p>
                      <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">{appointmentLabel}</p>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-800">
                <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                  <span>Payment Methods</span>
                  <span>{paymentModeLabel}</span>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="booking" className="mt-4">
              <p className="text-sm text-slate-600 dark:text-slate-300">Booking details will appear here once this visit publishes appointment or booking settings.</p>
            </TabsContent>
            <TabsContent value="connected" className="mt-4">
              <div className="grid gap-3">
                {leftAccounts.map((account, index) => (
                  <div key={`destination-${account.handle}-${index}`} className="flex w-full items-center justify-between gap-3 rounded-full border border-slate-200 bg-slate-50/90 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/60">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border border-slate-200 bg-slate-50 dark:border-white/15 dark:bg-white/10">
                        <AvatarImage src={account.image || undefined} alt={account.handle} className="object-cover" />
                        <AvatarFallback className="text-[10px] font-semibold text-slate-600 dark:text-white/80">{(account.handle || "?").replace(/^@/, "").slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">@{(account.handle || "account").replace(/^@/, "")}</p>
                        <p className="text-sm text-slate-500 dark:text-white/60">Destination</p>
                      </div>
                    </div>
                    {isLive ? (
                      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.7)]" />
                        <span>Live</span>
                      </div>
                    ) : null}
                  </div>
                ))}
                <div className="flex w-full items-center justify-between gap-3 rounded-full border border-slate-200 bg-slate-50/90 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/60">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-slate-200 bg-slate-50 dark:border-white/15 dark:bg-white/10">
                      <AvatarImage src={authorAccount.image || undefined} alt={authorAccount.handle} className="object-cover" />
                      <AvatarFallback className="text-[10px] font-semibold text-slate-600 dark:text-white/80">{(authorAccount.handle || "?").replace(/^@/, "").slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">@{(authorAccount.handle || "author").replace(/^@/, "")}</p>
                      <p className="text-sm text-slate-500 dark:text-white/60">Author</p>
                    </div>
                  </div>
                  {isLive ? (
                    <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.7)]" />
                      <span>Live</span>
                    </div>
                  ) : null}
                </div>
                {partnerAccounts.map((account, index) => (
                  <div key={`partner-${account.handle}-${index}`} className="flex w-full items-center justify-between gap-3 rounded-full border border-slate-200 bg-slate-50/90 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/60">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border border-slate-200 bg-slate-50 dark:border-white/15 dark:bg-white/10">
                        <AvatarImage src={account.image || undefined} alt={account.handle} className="object-cover" />
                        <AvatarFallback className="text-[10px] font-semibold text-slate-600 dark:text-white/80">{(account.handle || "?").replace(/^@/, "").slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">@{(account.handle || "account").replace(/^@/, "")}</p>
                        <p className="text-sm text-slate-500 dark:text-white/60">Partner</p>
                      </div>
                    </div>
                    {isLive ? (
                      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-fuchisa-500 shadow-[0_0_8px_rgba(239,68,68,0.7)]" />
                        <span>Live</span>
                      </div>
                    ) : null}
                  </div>
                ))}
                <div className="mt-3 border-t border-slate-200 pt-3 text-center text-xs font-semibold dark:border-slate-800 text-slate-400">{allAccounts.length} Connected Accounts</div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
