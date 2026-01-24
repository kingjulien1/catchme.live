import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { getProfileByUsername, sql } from "@/lib/db";
import { formatFollowers } from "@/lib/utils";
import { CalendarDays, ImageIcon, Instagram, MoreHorizontal, Share2, User } from "lucide-react";

export default async function ArtistProfileLayout({ children, params }) {
  const { slug } = await params;
  const handle = typeof slug === "string" ? slug.replace(/^@/, "") : "";

  if (!handle) {
    notFound();
  }

  const profile = await getProfileByUsername(handle);

  if (!profile) {
    notFound();
  }

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

  return (
    <div className="w-full pb-16">
      <section className="relative w-full min-h-[50vh] overflow-hidden bg-gradient-to-br from-fuchsia-100 via-white to-indigo-100 text-slate-900 dark:bg-gradient-to-br dark:from-fuchsia-900/30 dark:via-slate-950 dark:to-indigo-900/30 dark:text-slate-100">
        <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_top,_rgba(244,114,182,0.18),_transparent_55%),radial-gradient(circle_at_20%_20%,_rgba(129,140,248,0.16),_transparent_50%)] dark:opacity-70 dark:bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.2),_transparent_55%),radial-gradient(circle_at_20%_20%,_rgba(99,102,241,0.2),_transparent_50%)]" />
        <div className="absolute inset-0 opacity-30 bg-[linear-gradient(120deg,_rgba(15,23,42,0.04),_transparent_60%)] dark:opacity-50 dark:bg-[linear-gradient(120deg,_rgba(15,23,42,0.6),_transparent_60%)]" />
        <div className="absolute z-10 flex items-center gap-2 bottom-6 right-6">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold transition border rounded-full shadow-sm border-slate-200 bg-white/80 text-slate-700 hover:bg-white dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:hover:bg-slate-900"
          >
            <Share2 className="w-4 h-4" />
            Share
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
            <p className="mt-2 text-lg font-semibold text-fuchsia-600 dark:text-fuchsia-300">@{profile.username}</p>

            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-slate-600 dark:text-slate-300">
              <Badge className="text-purple-700 border border-purple-200 bg-purple-50 dark:border-purple-500/40 dark:bg-purple-500/10 dark:text-purple-200">{accountTypeLabel}</Badge>
              <Badge className="text-purple-700 border border-purple-200 bg-purple-50 dark:border-purple-500/40 dark:bg-purple-500/10 dark:text-purple-200">{formatFollowers(profile.followers_count)}</Badge>
            </div>

            <div className="grid w-full max-w-xl grid-cols-2 gap-3 px-4 py-4 mx-auto mt-8 text-sm border sm:grid-cols-3 rounded-2xl border-slate-200/70 bg-white/70 backdrop-blur dark:border-slate-800/70 dark:bg-slate-900/60">
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs tracking-wide uppercase text-slate-500 dark:text-slate-400">Visits</span>
                <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">{total_visits}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs tracking-wide uppercase text-slate-500 dark:text-slate-400">Upcoming</span>
                <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">{upcoming_visits}</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs tracking-wide uppercase text-slate-500 dark:text-slate-400">Portfolio</span>
                <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">{typeof profile.media_count === "number" ? profile.media_count : "—"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {children}
    </div>
  );
}
