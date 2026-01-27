import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { getProfileByUsername, sql } from "@/lib/db";
import { formatFollowers } from "@/lib/utils";
import { CalendarDays, ImageIcon, Instagram, MapPin, MoreHorizontal, Share2, Star, Tag, User } from "lucide-react";
import AccountHandle from "@/components/account-handle";

export default async function ArtistProfileLayout({ children, params }) {
  const { slug } = await params;
  const handle = typeof slug === "string" ? slug.replace(/^@/, "") : "";

  if (!handle) notFound();

  const profile = await getProfileByUsername(handle);
  console.log("PROFILE", profile);

  if (!profile) notFound();

  const [{ total_visits = 0 } = {}] = await sql`
    select count(*)::int as total_visits
    from visits
    where author_user_id = ${profile.id}
  `;

  const [{ upcoming_visits = 0 } = {}] = await sql`
    select count(*)::int as upcoming_visits
    from visits
    where author_user_id = ${profile.id}
      and visit_start_time >= now()
  `;

  const displayName = profile.name || profile.username || "Artist";
  const accountTypeLabel = profile.account_type ? profile.account_type.replace(/_/g, " ") : "Instagram account";
  const bannerUrl = profile.banner_image_url;

  return (
    <div className="w-full pb-16">
      <section className="relative w-full min-h-[50vh] overflow-hidden bg-linear-to-br from-emerald-100/60 via-white/60 to-fuchsia-100/60 text-slate-900 dark:from-emerald-500/20 dark:via-slate-950/30 dark:to-fuchsia-500/20 dark:text-slate-100">
        {bannerUrl ? <div className="absolute inset-0 bg-center bg-cover blur-[2px]" style={{ backgroundImage: `url(${bannerUrl})` }} /> : null}
        {bannerUrl ? <div className="absolute inset-0 bg-white/60 dark:bg-black/45" /> : null}
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 sm:left-auto sm:right-6 sm:translate-x-0">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold transition border rounded-full shadow-sm border-slate-200 bg-white/80 text-slate-700 hover:bg-white dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:bg-slate-900"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            aria-label="Open Instagram"
            className="inline-flex items-center justify-center transition border rounded-full shadow-sm h-9 w-9 border-slate-200 bg-white/80 text-slate-700 hover:bg-white dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:bg-slate-900"
          >
            <Instagram className="w-4 h-4" />
          </button>
          <button
            type="button"
            aria-label="More options"
            className="inline-flex items-center justify-center transition border rounded-full shadow-sm h-9 w-9 border-slate-200 bg-white/80 text-slate-700 hover:bg-white dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:bg-slate-900"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        <div className="relative flex flex-col items-center justify-center px-6 text-center py-14 sm:px-10 sm:py-16">
          <div className="w-full max-w-6xl mx-auto">
            <div className="relative w-16 h-16 mx-auto mb-4 overflow-hidden aspect-square rounded-2xl bg-white/70 sm:h-20 sm:w-20 dark:bg-slate-900/60">
              {profile.profile_picture_url ? (
                <img src={profile.profile_picture_url} alt={displayName} className="object-cover w-full h-full aspect-square" />
              ) : (
                <div className="grid w-full h-full place-items-center text-slate-500 dark:text-slate-400">
                  <User className="w-6 h-6" />
                </div>
              )}
            </div>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl dark:text-slate-100">{displayName}</h1>
            <div className="mt-2">
              <AccountHandle username={profile.username} className="text-lg font-semibold text-fuchsia-600 dark:text-fuchsia-300" />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-slate-600 dark:text-slate-300">
              <Badge className="gap-1.5 border border-slate-200 bg-white/80 text-slate-700 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 capitalize">
                <User className="h-3 w-3" />
                {accountTypeLabel}
              </Badge>
              <Badge className="gap-1.5 border border-slate-200 bg-white/80 text-slate-700 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200">
                <Star className="h-3 w-3" />
                {formatFollowers(profile.followers_count)}
              </Badge>
              {profile.location ? (
                <Badge className="gap-1.5 border border-slate-200 bg-white/80 text-slate-700 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200">
                  <MapPin className="h-3 w-3" />
                  {profile.location}
                </Badge>
              ) : null}
            </div>
            {profile.specialisations?.length ? (
              <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                {profile.specialisations.map((specialisation) => (
                  <Badge key={specialisation} className="gap-2 border border-fuchsia-200 bg-fuchsia-50 px-3 py-1 text-sm text-fuchsia-700 dark:border-fuchsia-500/30 dark:bg-fuchsia-500/10 dark:text-fuchsia-200">
                    <Tag className="h-4 w-4" />
                    {specialisation}
                  </Badge>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>
      {children}
    </div>
  );
}
