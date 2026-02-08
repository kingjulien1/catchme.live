import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getProfileByUsername, getUserVisits, sql } from "@/lib/db";
import { formatFollowers, formatVisitDateRange } from "@/lib/utils";
import { CalendarDays, Link2, Share2 } from "lucide-react";

export default async function ArtistResidenciesPage({ params }) {
  const { slug } = await params;
  const handle = typeof slug === "string" ? slug.replace(/^@/, "") : "";

  if (!handle) notFound();

  const profile = await getProfileByUsername(handle);
  if (!profile) notFound();

  const visits = await getUserVisits(profile.id, 50);
  const residencies = visits.filter((visit) => visit.visit_type === "residency");
  const now = new Date();
  const linkedAccountsByVisit = new Map();

  if (residencies.length) {
    const partnerRows = await Promise.all(
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
    );

    for (const [visitId, partners] of partnerRows) {
      linkedAccountsByVisit.set(visitId, partners);
    }
  }

  return (
    <div className="px-6 pb-16 pt-6 sm:px-8 lg:px-10">
      {residencies.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 text-sm text-slate-600 shadow-xs dark:border-slate-800/80 dark:bg-slate-950/70 dark:text-slate-300">No residencies yet. Check back soon for upcoming long-term stays.</div>
      ) : (
        <div className="grid gap-5">
          {residencies.map((visit) => {
            const start = visit.visit_start_time ? new Date(visit.visit_start_time) : null;
            const end = visit.visit_end_time ? new Date(visit.visit_end_time) : null;
            const destinationHandle = visit.destination_username || visit.destination_instagram_handle || profile.username || "artist";
            const avatarUrl = visit.destination_profile_picture_url || profile.profile_picture_url || null;
            const accountTypeLabel = (visit.destination_account_type || profile.account_type || "Artist").replace(/_/g, " ");
            const followersLabel = visit.destination_followers_count ? `${formatFollowers(visit.destination_followers_count)} followers` : null;
            const bioSnippet = visit.destination_bio || profile.bio || null;
            const partnerAccounts = linkedAccountsByVisit.get(visit.id) || [];
            const primaryPartner = partnerAccounts[0];
            const partnerAvatar = primaryPartner?.profile_picture_url || null;
            const partnerHandle = primaryPartner?.username || primaryPartner?.account_handle || null;

            return (
              <Card key={visit.id} className="group border-gray-200 bg-white shadow-sm transition-transform duration-300 ease-out hover:translate-x-2 dark:border-slate-800/80 dark:bg-slate-900/60">
                <div className="relative aspect-[4/3] w-full max-h-44 bg-gradient-to-br from-fuchsia-100 via-white to-indigo-100 dark:from-fuchsia-900/25 dark:via-slate-950 dark:to-indigo-900/25">
                  {visit.destination_banner_image_url ? (
                    <div className="absolute inset-0 overflow-hidden">
                      <img
                        src={visit.destination_banner_image_url}
                        alt={`${destinationHandle} banner`}
                        className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                      />
                    </div>
                  ) : null}
                  <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/80 px-2 py-1 text-xs text-gray-900 ring-1 ring-gray-200 backdrop-blur dark:bg-slate-950/70 dark:text-slate-100 dark:ring-slate-800/80">
                    <CalendarDays className="h-3.5 w-3.5" />
                    Residency
                  </div>
                  <button
                    type="button"
                    aria-label="Share residency"
                    className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-600 shadow-sm backdrop-blur transition hover:text-slate-900 dark:border-slate-800/80 dark:bg-slate-950/70 dark:text-slate-300 dark:hover:text-slate-100"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                  <div className="absolute bottom-0 left-4 flex items-center gap-2 translate-y-1/2">
                    <Avatar className="h-12 w-12 border-2 border-white bg-white shadow-sm dark:border-slate-900 dark:bg-slate-950">
                      <AvatarImage src={avatarUrl || undefined} alt={destinationHandle} className="object-cover" />
                      <AvatarFallback className="text-xs font-semibold text-slate-500 dark:text-slate-300">@</AvatarFallback>
                    </Avatar>
                    {partnerHandle ? (
                      <>
                        <span className="grid h-8 w-8 place-items-center rounded-full border border-white/80 bg-white/80 text-fuchsia-600 shadow-sm backdrop-blur dark:border-slate-900/80 dark:bg-slate-950/70 dark:text-fuchsia-300">
                          <Link2 className="h-4 w-4" />
                        </span>
                        <Avatar className="h-12 w-12 border-2 border-white bg-white shadow-sm dark:border-slate-900 dark:bg-slate-950">
                          <AvatarImage src={partnerAvatar || undefined} alt={partnerHandle} className="object-cover" />
                          <AvatarFallback className="text-xs font-semibold text-slate-500 dark:text-slate-300">@</AvatarFallback>
                        </Avatar>
                      </>
                    ) : null}
                  </div>
                </div>
                <CardContent className="px-4 pb-4 pt-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-fuchsia-600 dark:text-fuchsia-300">@{destinationHandle.replace(/^@/, "")}</div>
                      <div className="mt-1 text-xs text-gray-500 dark:text-slate-400">{formatVisitDateRange(start, end)}</div>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                        <span className="capitalize">{accountTypeLabel}</span>
                        {followersLabel ? <span className="text-slate-400 dark:text-slate-500">• {followersLabel}</span> : null}
                      </div>
                      {bioSnippet ? <p className="mt-2 line-clamp-2 text-xs text-slate-600 dark:text-slate-300">{bioSnippet}</p> : null}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
