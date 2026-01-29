import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { getProfileByUsername, getUserVisits } from "@/lib/db";
import { Hourglass } from "lucide-react";
import VisitCountdown from "@/components/visit-countdown";
import VisitCard from "@/components/visit-card";

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
  const nextUpcomingStart = new Date(upcomingVisits.sort((a, b) => new Date(a.visit_start_time).getTime() - new Date(b.visit_start_time).getTime())[0].visit_start_time) || null;

  console.log("START", nextUpcomingStart);

  return (
    <div className="w-full max-w-5xl px-4 pt-0 pb-20 mx-auto sm:px-6 sm:pt-8 lg:px-8">
      <div className="space-y-6">
        {visits.length === 0 ? (
          <div className="p-8 text-sm border border-dashed rounded-2xl border-slate-200 bg-white/80 text-slate-500 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">No visits have been published yet.</div>
        ) : (
          <div className="space-y-10">
            {liveVisits.length > 0 ? (
              <section className="group space-y-4">
                <div className="flex items-center">
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-900 bg-black px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white transition-transform duration-300 ease-out group-hover:translate-x-3 dark:border-white dark:bg-white dark:text-slate-900">
                    <span className="relative flex h-2 w-2 items-center justify-center">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70 opacity-70 dark:bg-slate-900/70" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-white dark:bg-slate-900" />
                    </span>
                    live
                  </span>
                </div>
                <div className="w-full max-w-4xl mx-auto space-y-6">
                  {liveVisits.map((visit) => (
                    <VisitCard key={visit.id} visit={visit} isLive />
                  ))}
                </div>
              </section>
            ) : null}
            {liveVisits.length > 0 && upcomingVisits.length > 0 ? (
              <div className="relative my-8">
                <Separator />
                {nextUpcomingStart ? (
                  <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-300">
                    <Hourglass className="h-3 w-3" />
                    <span className="uppercase tracking-[0.2em] text-[10px] text-slate-400 dark:text-slate-500">Starts in</span>
                    <VisitCountdown start={nextUpcomingStart} className="text-center sm:text-center" />
                  </div>
                ) : null}
              </div>
            ) : null}
            {upcomingVisits.length > 0 ? (
              <section className="mt-10 space-y-4">
                <div className="w-full max-w-4xl mx-auto space-y-6">
                  {upcomingVisits.map((visit) => (
                    <VisitCard key={visit.id} visit={visit} isLive={false} />
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
