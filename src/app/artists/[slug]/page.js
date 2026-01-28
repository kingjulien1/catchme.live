import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { getProfileByUsername, getUserVisits } from "@/lib/db";
import { formatShortDate, formatVisitDateRange, formatVisitTimeRange, formatVisitType } from "@/lib/utils";
import { BadgeCheck, CalendarCheck2, Clock, Clock3, CreditCard, HandCoins, Hourglass, MapPin, Sparkles, Tag, User } from "lucide-react";
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
  const nextUpcomingStart =
    upcomingVisits
      .map((visit) => (visit.visit_start_time ? new Date(visit.visit_start_time) : null))
      .filter((date) => date && date > now)
      .sort((a, b) => a.getTime() - b.getTime())[0] || null;

  const renderVisit = (visit, isLive) => {
    const start = visit.visit_start_time ? new Date(visit.visit_start_time) : null;
    const end = visit.visit_end_time ? new Date(visit.visit_end_time) : null;
    const destinationName = visit.destination_name || visit.destination_username || "Destination studio";
    const destinationHandleRaw = visit.destination_username || visit.destination_instagram_handle || "unknown";
    const destinationHandle = destinationHandleRaw.startsWith("@") ? destinationHandleRaw : `@${destinationHandleRaw}`;

    const progressValue = isLive && start && end ? Math.min(100, Math.max(0, ((Date.now() - start.getTime()) / (end.getTime() - start.getTime())) * 100)) : null;

    return (
      <div key={visit.id} className="group space-y-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <VisitCountdown start={start} end={end} isLive={isLive} className={`order-1 w-full sm:order-2 sm:w-auto sm:opacity-0 sm:transition sm:duration-200 sm:group-hover:opacity-100 ${isLive ? "hidden sm:block" : ""}`} />
          <VisitDatetime
            start={start}
            end={end}
            isLive={isLive}
            liveAccessory={isLive ? <VisitCountdown start={start} end={end} isLive={isLive} className="text-left" /> : null}
            className="order-2 origin-left transition-transform duration-300 sm:order-1 sm:group-hover:scale-[1.12] sm:group-hover:translate-x-1"
          />
        </div>
        <article
          className={`relative overflow-hidden rounded-2xl border p-5 pb-2 transition duration-300 ease-out sm:group-hover:-translate-y-0.5 sm:group-hover:translate-x-1 sm:group-hover:shadow-xl sm:group-hover:shadow-fuchsia-100/60 dark:sm:group-hover:shadow-fuchsia-500/10 ${
            isLive
              ? "border-slate-200 bg-linear-to-br from-fuchsia-50 via-white to-fuchsia-100/60 backdrop-blur-md dark:border-slate-800 dark:from-fuchsia-500/10 dark:via-slate-950/60 dark:to-fuchsia-500/20"
              : "border-slate-200 bg-white/90 dark:border-slate-800 dark:bg-slate-900/70"
          }`}
        >
          {typeof progressValue === "number" ? (
            <div className="absolute left-4 right-4 top-0">
              <Progress value={progressValue} className="h-1 bg-slate-200/80 dark:bg-slate-800/80" />
            </div>
          ) : null}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 scale-100 opacity-75 transition duration-300 sm:group-hover:scale-110 sm:group-hover:opacity-95"
            style={{
              backgroundImage: visit.destination_banner_image_url ? `url(${visit.destination_banner_image_url})` : "linear-gradient(135deg, rgba(148,163,184,0.25) 0%, rgba(226,232,240,0.35) 40%, rgba(148,163,184,0.15) 100%)",
              backgroundPosition: "center",
              backgroundSize: "cover",
              WebkitMaskImage: "linear-gradient(135deg, transparent 0%, rgba(0,0,0,0.08) 40%, rgba(0,0,0,0.85) 100%)",
              maskImage: "linear-gradient(135deg, transparent 0%, rgba(0,0,0,0.08) 40%, rgba(0,0,0,0.85) 100%)",
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/70 via-white/20 to-transparent transition duration-300 sm:group-hover:opacity-30 dark:from-slate-950/70 dark:via-slate-950/30" />
          <div className="relative z-10">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <AccountHandle username={destinationHandle} className="font-semibold sm:text-lg" />
              </div>
              <Badge className="text-sm text-purple-700 border border-purple-200 bg-purple-50 px-3 py-1 dark:border-purple-500/40 dark:bg-purple-500/10 dark:text-purple-200">
                <Tag className="w-3 h-3" />
                {formatVisitType(visit.visit_type)}
              </Badge>
            </div>

            {visit.visit_location ? (
              <div className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl">
                <span className="truncate">{visit.visit_location}</span>
              </div>
            ) : null}

            {visit.description ? <p className="mt-3 text-sm text-slate-600 line-clamp-3 dark:text-slate-300">{visit.description}</p> : null}

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

            <div className="mt-3 flex items-end justify-between gap-3 text-xs text-slate-400 dark:text-slate-500">
              <span className="opacity-0 transition duration-200 group-hover:opacity-100">Updated {formatShortDate(visit.visit_start_time ? new Date(visit.visit_start_time) : null)}</span>
              <Link
                href={`/artists/${destinationHandleRaw.startsWith("@") ? destinationHandleRaw.slice(1) : destinationHandleRaw}`}
                className="transition hover:scale-[1.02] hover:shadow-sm"
              >
                <Avatar className="h-9 w-9 border border-slate-200 bg-slate-100 text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500">
                  <AvatarImage src={visit.destination_profile_picture_url || undefined} alt={destinationHandle} className="object-cover" />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Link>
            </div>
          </div>
        </article>
      </div>
    );
  };

  return (
    <div className="w-full max-w-5xl px-4 py-20 mx-auto sm:px-6 lg:px-8">
      <div className="space-y-6">
        {visits.length === 0 ? (
          <div className="p-8 text-sm border border-dashed rounded-2xl border-slate-200 bg-white/80 text-slate-500 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">No visits have been published yet.</div>
        ) : (
          <div className="space-y-10">
            {liveVisits.length > 0 ? (
              <section className="space-y-4">
                <div className="w-full max-w-4xl mx-auto space-y-6">{liveVisits.map((visit) => renderVisit(visit, true))}</div>
              </section>
            ) : null}
            {liveVisits.length > 0 && upcomingVisits.length > 0 ? (
              <div className="relative my-8">
                <Separator />
                {nextUpcomingStart ? (
                  <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-300">
                    <Hourglass className="h-3 w-3" />
                    Next visit starts in
                    <VisitCountdown start={nextUpcomingStart} end={null} isLive={false} className="text-center sm:text-center" />
                  </div>
                ) : null}
              </div>
            ) : null}
            {upcomingVisits.length > 0 ? (
              <section className="mt-16 space-y-4">
                <div className="w-full max-w-4xl mx-auto space-y-6">{upcomingVisits.map((visit) => renderVisit(visit, false))}</div>
              </section>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
