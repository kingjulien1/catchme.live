import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { getProfileByUsername, getUserVisits } from "@/lib/db";
import { formatShortDate, formatVisitDateRange, formatVisitTimeRange, formatVisitType } from "@/lib/utils";
import { CalendarDays, Clock, MapPin, Tag, User } from "lucide-react";
import AccountHandle from "@/components/account-handle";
import VisitDatetime from "@/components/visit-datetime";

export default async function ArtistProfilePage({ params }) {
  const { slug } = await params;
  const handle = typeof slug === "string" ? slug.replace(/^@/, "") : "";

  if (!handle) {
    notFound();
  }

  const profile = await getProfileByUsername(handle);

  if (!profile) {
    notFound();
  }

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
      <div key={visit.id} className="space-y-2">
        <VisitDatetime start={start} end={end} isLive={isLive} />
        <article className={`p-5 border rounded-2xl ${isLive ? "border-slate-200 bg-emerald-50/50 backdrop-blur-md dark:border-slate-800 dark:bg-emerald-500/10" : "border-slate-200 bg-white/90 dark:border-slate-800 dark:bg-slate-900/70"}`}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 overflow-hidden border rounded-full border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800">
                {visit.destination_profile_picture_url ? (
                  <img src={visit.destination_profile_picture_url} alt={destinationName} className="object-cover w-full h-full" />
                ) : (
                  <div className="grid w-full h-full place-items-center text-slate-400 dark:text-slate-500">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{destinationName}</p>
                <AccountHandle username={destinationHandle} name={destinationName} profilePictureUrl={visit.destination_profile_picture_url} followersCount={null} accountType={null} mediaCount={null} className="text-xs" />
              </div>
            </div>
            <Badge className="text-purple-700 border border-purple-200 bg-purple-50 dark:border-purple-500/40 dark:bg-purple-500/10 dark:text-purple-200">
              <Tag className="w-3 h-3" />
              {formatVisitType(visit.visit_type)}
            </Badge>
          </div>
          <div className="flex items-start justify-between gap-3 mt-3">
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {visit.visit_location}
              </span>
              <span className="hidden w-1 h-1 rounded-full bg-slate-300 md:inline-block dark:bg-slate-600" />
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />
                {formatVisitDateRange(start, end)}
              </span>
              <span className="hidden w-1 h-1 rounded-full bg-slate-300 md:inline-block dark:bg-slate-600" />
              <span className="inline-flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formatVisitTimeRange(start, end)}
              </span>
            </div>
          </div>

          {visit.description ? <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{visit.description}</p> : null}

          <div className="mt-3 text-xs text-slate-400 dark:text-slate-500">Updated {formatShortDate(visit.visit_start_time ? new Date(visit.visit_start_time) : null)}</div>
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
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">Live visits</div>
                <div className="w-full max-w-4xl mx-auto space-y-6">{liveVisits.map((visit) => renderVisit(visit, true))}</div>
              </section>
            ) : null}
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
