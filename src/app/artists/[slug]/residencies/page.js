import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getProfileByUsername, getUserVisits, sql } from "@/lib/db";
import { formatFollowers, formatVisitDateRange } from "@/lib/utils";
import { CalendarDays, Share2, Tag } from "lucide-react";
import Link from "next/link";
import VisitCard from "@/components/live-card";

export default async function ArtistResidenciesPage({ params }) {
  const { slug } = await params;
  const handle = typeof slug === "string" ? slug.replace(/^@/, "") : "";

  if (!handle) notFound();

  const profile = await getProfileByUsername(handle);
  if (!profile) notFound();

  const visits = await getUserVisits(profile.id, 50);
  const residencies = visits.filter((visit) => visit.visit_type === "residency");
  const linkedAccountsByVisit = residencies.length
    ? new Map(
        await Promise.all(
          residencies.map(async (visit) => {
            const partners = await sql`
              select
                visit_linked_accounts.account_handle,
                users.username,
                users.profile_picture_url
              from visit_linked_accounts
              left join users on users.id = visit_linked_accounts.account_user_id
              where visit_linked_accounts.visit_id = ${visit.id}
                and visit_linked_accounts.account_type = 'partner'
              order by visit_linked_accounts.created_at asc
            `;
            return [visit.id, partners];
          }),
        ),
      )
    : new Map();

  return (
    <div className="px-8 pb-16 pt-8 ">
      {residencies.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 text-sm text-slate-600 shadow-xs dark:border-slate-800/80 dark:bg-slate-950/70 dark:text-slate-300">No residencies yet. Check back soon for upcoming long-term stays.</div>
      ) : (
        <div className="grid space-y-6">
          {residencies.map((visit) => (
            <VisitCard key={visit.id} visit={visit} profile={profile} linkedAccountsByVisit={linkedAccountsByVisit} />
          ))}
        </div>
      )}
    </div>
  );
}
