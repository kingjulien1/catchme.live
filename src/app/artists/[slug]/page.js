import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { getProfileByUsername, getUserVisits, sql } from "@/lib/db";
import LiveCard from "@/components/live-card";

export default async function ArtistProfilePage({ params }) {
  const { slug } = await params;
  const handle = typeof slug === "string" ? slug.replace(/^@/, "") : "";
  if (!handle) notFound();

  const profile = await getProfileByUsername(handle);
  if (!profile) notFound();

  const visits = await getUserVisits(profile.id, 25);

  const visitIds = visits.map((visit) => visit.id);
  const linkedAccountsByVisit = visitIds.length
    ? new Map(
        Object.entries(
          (await sql`
            select
              visit_linked_accounts.visit_id,
              visit_linked_accounts.account_handle,
              users.username,
              users.profile_picture_url
            from visit_linked_accounts
            left join users on users.id = visit_linked_accounts.account_user_id
            where visit_linked_accounts.visit_id = any(${visitIds})
              and visit_linked_accounts.account_type = 'partner'
            order by visit_linked_accounts.created_at asc
          `).reduce((acc, row) => {
            acc[row.visit_id] ||= [];
            acc[row.visit_id].push(row);
            return acc;
          }, {})
        ),
      )
    : new Map();

  const now = new Date();
  const liveVisits = visits.filter((visit) => {
    const start = visit.visit_start_time ? new Date(visit.visit_start_time) : null;
    const end = visit.visit_end_time ? new Date(visit.visit_end_time) : null;
    return start && start <= now && (!end || end >= now);
  });
  const liveVisitIds = new Set(liveVisits.map((visit) => visit.id));
  const upcomingVisits = visits
    .filter((visit) => {
      if (liveVisitIds.has(visit.id)) return false;
      const start = visit.visit_start_time ? new Date(visit.visit_start_time) : null;
      return start && start.getTime() > now.getTime();
    })
    .sort((a, b) => new Date(a.visit_start_time).getTime() - new Date(b.visit_start_time).getTime());
  const pastVisits = visits
    .filter((visit) => {
      if (liveVisitIds.has(visit.id)) return false;
      const start = visit.visit_start_time ? new Date(visit.visit_start_time) : null;
      return start && start.getTime() < now.getTime();
    })
    .sort((a, b) => new Date(b.visit_start_time).getTime() - new Date(a.visit_start_time).getTime());
  return (
    <div className="relative w-full max-w-5xl px-6 pb-20 mx-auto sm:px-6 sm:pt-4 lg:px-8">
      <div className="relative z-10 space-y-6">
        {visits.length === 0 ? (
          <div className="text-sm border border-dashed rounded-2xl border-slate-200 bg-white/80 text-slate-500 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">No visits have been published yet.</div>
        ) : (
          <div className="space-y-24">
            {liveVisits.length > 0 ? (
              <section className="group space-y-4">
                <div className="w-full max-w-4xl mx-auto space-y-4">
                  <div className="grid gap-8 sm:gap-6">
                    {liveVisits.map((visit) => (
                      <LiveCard key={visit.id} visit={visit} linkedAccountsByVisit={linkedAccountsByVisit} />
                    ))}
                  </div>
                </div>
              </section>
            ) : null}
            {upcomingVisits.length > 0 ? (
              <section className="mt-20 space-y-4">
                <div className="w-full max-w-4xl mx-auto space-y-6">
                  <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Upcoming</h2>
                  <div className="grid gap-8 sm:gap-6">
                    {upcomingVisits.map((visit) => (
                      <LiveCard key={visit.id} visit={visit} linkedAccountsByVisit={linkedAccountsByVisit} />
                    ))}
                  </div>
                </div>
              </section>
            ) : null}
            {upcomingVisits.length > 0 && pastVisits.length > 0 ? (
              <div className="w-full max-w-4xl mx-auto py-10 md:py-20">
                <Separator className="" />
              </div>
            ) : null}
            {pastVisits.length > 0 ? (
              <section className="mt-8 space-y-4">
                <div className="w-full max-w-4xl mx-auto space-y-6">
                  <div className="grid gap-8 sm:gap-6">
                    {pastVisits.map((visit) => (
                      <LiveCard key={visit.id} visit={visit} linkedAccountsByVisit={linkedAccountsByVisit} />
                    ))}
                  </div>
                </div>
              </section>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
