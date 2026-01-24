import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getProfileByUsername, getUserVisits } from "@/lib/db";
import { formatShortDate, formatVisitDateRange, formatVisitTimeRange, formatVisitType } from "@/lib/utils";
import { BadgeCheck, CalendarCheck2, Clock, Clock3, CreditCard, HandCoins, MapPin, Sparkles, Tag, User } from "lucide-react";
import AccountHandle from "@/components/account-handle";
import VisitCountdown from "@/components/visit-countdown";
import VisitDatetime from "@/components/visit-datetime";

export default async function ArtistProfilePage({ params }) {
  const { slug } = await params;
  const handle = typeof slug === "string" ? slug.replace(/^@/, "") : "";
  if (!handle) notFound();

  const profile = await getProfileByUsername(handle);
  if (!profile) notFound();

  const visits = await getUserVisits(profile.id, 25);

  const now = new Date();
  const liveVisits = visits.filter((visit) => {
    const start = visit.visit_start_time ? new Date(visit.visit_start_time) : null;
    const end = visit.visit_end_time ? new Date(visit.visit_end_time) : null;
    return start && start <= now && (!end || end >= now);
  });
  const liveVisitIds = new Set(liveVisits.map((visit) => visit.id));
  const upcomingVisits = visits.filter((visit) => !liveVisitIds.has(visit.id));

  const renderVisit = (visit, isLive) => {
    const start = visit.visit_start_time ? new Date(visit.visit_start_time) : null;
    const end = visit.visit_end_time ? new Date(visit.visit_end_time) : null;
    const destinationName = visit.destination_name || visit.destination_username || "Destination studio";
    const destinationHandleRaw = visit.destination_username || visit.destination_instagram_handle || "unknown";
    const destinationHandle = destinationHandleRaw.startsWith("@") ? destinationHandleRaw : `@${destinationHandleRaw}`;

    return (
      <div key={visit.id} className="group space-y-2">
        <div className="flex items-end justify-between gap-4">
          <VisitDatetime start={start} end={end} isLive={isLive} className="origin-left transition-transform duration-300 group-[&:has(article:hover)]:scale-[1.12] group-[&:has(article:hover)]:translate-x-1" />
          <VisitCountdown start={start} end={end} isLive={isLive} />
        </div>
        <article
          className={`relative overflow-hidden p-5 border rounded-2xl transition duration-300 ease-out hover:translate-x-1 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-100/60 dark:hover:shadow-emerald-500/10 ${
            isLive
              ? "border-slate-200 bg-linear-to-br from-emerald-50 via-white to-emerald-100/60 backdrop-blur-md dark:border-slate-800 dark:from-emerald-500/10 dark:via-slate-950/60 dark:to-emerald-500/20"
              : "border-slate-200 bg-white/90 dark:border-slate-800 dark:bg-slate-900/70"
          }`}
        >
          <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
            <div className="absolute inset-0 bg-linear-to-br from-emerald-100/60 via-white/60 to-fuchsia-100/60 dark:from-emerald-500/20 dark:via-slate-950/30 dark:to-fuchsia-500/20" />
            <div className="absolute -top-24 left-10 h-48 w-48 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-400/10" />
            <div className="absolute -bottom-24 right-8 h-56 w-56 rounded-full bg-fuchsia-200/20 blur-3xl dark:bg-fuchsia-400/10" />
          </div>
          <div className="relative z-10">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <AccountHandle username={destinationHandle} className="text-base font-semibold sm:text-lg" />
              </div>
              <Badge className="text-purple-700 border border-purple-200 bg-purple-50 dark:border-purple-500/40 dark:bg-purple-500/10 dark:text-purple-200">
                <Tag className="w-3 h-3" />
                {formatVisitType(visit.visit_type)}
              </Badge>
            </div>

            {visit.visit_location ? (
              <div className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
                <span className="truncate">{visit.visit_location}</span>
              </div>
            ) : null}

            {visit.description ? <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{visit.description}</p> : null}

            <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-400 dark:text-slate-300">
              {visit.bookings_open ? (
                <Badge className="gap-1 border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200">
                  <CalendarCheck2 className="h-3 w-3" />
                  Bookings open
                </Badge>
              ) : null}
              {visit.appointment_only ? (
                <Badge className="gap-1 border border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                  <Clock3 className="h-3 w-3" />
                  Appointment only
                </Badge>
              ) : null}
              {visit.age_18_plus ? (
                <Badge className="gap-1 border border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                  <BadgeCheck className="h-3 w-3" />
                  18+ only
                </Badge>
              ) : null}
              {visit.deposit_required ? (
                <Badge className="gap-1 border border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                  <HandCoins className="h-3 w-3" />
                  Deposit required
                </Badge>
              ) : null}
              {visit.digital_payments ? (
                <Badge className="gap-1 border border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                  <CreditCard className="h-3 w-3" />
                  Digital payments
                </Badge>
              ) : null}
              {visit.custom_requests ? (
                <Badge className="gap-1 border border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                  <Sparkles className="h-3 w-3" />
                  Custom requests
                </Badge>
              ) : null}
            </div>

            <div className="mt-3 text-xs text-slate-400 opacity-0 transition duration-200 group-hover:opacity-100 dark:text-slate-500">Updated {formatShortDate(visit.visit_start_time ? new Date(visit.visit_start_time) : null)}</div>
            <Link
              href={`/artists/${destinationHandleRaw.startsWith("@") ? destinationHandleRaw.slice(1) : destinationHandleRaw}`}
              className="absolute bottom-4 right-4 h-9 w-9 overflow-hidden rounded-full border border-slate-200 bg-slate-100 transition hover:scale-[1.02] hover:shadow-sm dark:border-slate-700 dark:bg-slate-800"
            >
              {visit.destination_profile_picture_url ? (
                <img src={visit.destination_profile_picture_url} alt={destinationHandle} className="h-full w-full object-cover" />
              ) : (
                <div className="grid h-full w-full place-items-center text-slate-400 dark:text-slate-500">
                  <User className="h-4 w-4" />
                </div>
              )}
            </Link>
          </div>
        </article>
      </div>
    );
  };

  return (
    <div className="w-full max-w-5xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
      <div className="space-y-6">
        {visits.length === 0 ? (
          <div className="p-8 text-sm border border-dashed rounded-2xl border-slate-200 bg-white/80 text-slate-500 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">No visits have been published yet.</div>
        ) : (
          <div className="space-y-10">
            {liveVisits.length > 0 ? (
              <section className="space-y-4">
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">Live visits in progress</div>
                <div className="w-full max-w-4xl mx-auto space-y-6">{liveVisits.map((visit) => renderVisit(visit, true))}</div>
              </section>
            ) : null}
            {liveVisits.length > 0 && upcomingVisits.length > 0 ? <Separator className="my-8" /> : null}
            {upcomingVisits.length > 0 ? (
              <section className="mt-16 space-y-4">
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">Upcoming visits</div>
                <div className="w-full max-w-4xl mx-auto space-y-6">{upcomingVisits.map((visit) => renderVisit(visit, false))}</div>
              </section>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
