import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { getProfileByUsername, sql } from "@/lib/db";
import { formatFollowers } from "@/lib/utils";
import { Instagram, MapPin, MoreHorizontal, Share2, Star, Tag, User } from "lucide-react";
import AccountHandle from "@/components/account-handle";

export default async function ArtistProfileLayout({ children, params }) {
  const { slug } = await params;
  const handle = typeof slug === "string" ? slug.replace(/^@/, "") : "";

  if (!handle) notFound();

  const profile = await getProfileByUsername(handle);
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
      <div className="w-full lg:flex">
        <section className="w-full bg-white py-20 text-slate-900 lg:sticky lg:top-0 lg:h-screen lg:w-1/2 lg:overflow-hidden dark:bg-slate-950 dark:text-slate-100">
          <div className="w-full h-full px-4 pt-0 pb-12 sm:px-6 lg:px-8 lg:pt-0 lg:pb-10">
            <div className="flex h-full flex-col gap-6">
              <div className="relative flex-1 overflow-hidden rounded-[28px] border border-slate-200 bg-slate-100 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                {bannerUrl ? (
                  <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${bannerUrl})` }} />
                ) : (
                  <div className="h-full w-full bg-linear-to-br from-slate-200 via-slate-100 to-slate-300 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900" />
                )}
                <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-black/10 via-transparent to-black/5 dark:from-black/30 dark:to-black/20" />
                <Badge className="absolute left-4 top-4 border border-slate-200 bg-white/90 text-xs font-semibold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200">Featured artist</Badge>
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <Badge className="border capitalize border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900">
                      <Tag className="h-3.5 w-3.5" />
                      {accountTypeLabel}
                    </Badge>
                    {profile.location ? (
                      <Badge className="border border-slate-900 bg-slate-900 text-white dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900">
                        <MapPin className="h-3.5 w-3.5" />
                        Based in {profile.location}
                      </Badge>
                    ) : null}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Share profile"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      aria-label="Open Instagram"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
                    >
                      <Instagram className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      aria-label="More options"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <h1 className="text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl dark:text-slate-100">"{displayName}"</h1>
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                      {profile.profile_picture_url ? (
                        <img src={profile.profile_picture_url} alt={displayName} className="h-full w-full object-cover" />
                      ) : (
                        <div className="grid h-full w-full place-items-center text-slate-500 dark:text-slate-400">
                          <User className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                    <AccountHandle username={profile.username} className="text-base font-semibold" />
                  </div>
                </div>

                {profile.specialisations?.length ? (
                  <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                    {profile.specialisations.map((specialisation) => (
                      <Badge key={specialisation} className="gap-2 border border-fuchsia-200 bg-fuchsia-50 px-3 py-1 text-sm text-fuchsia-700 dark:border-fuchsia-500/30 dark:bg-fuchsia-500/10 dark:text-fuchsia-200">
                        <Tag className="h-4 w-4" />
                        {specialisation}
                      </Badge>
                    ))}
                  </div>
                ) : null}

                {profile.bio ? <p className="line-clamp-4 text-sm text-slate-600 sm:text-base dark:text-slate-300">{profile.bio}</p> : null}

                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
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
              </div>
            </div>
          </div>
        </section>
        <div className="w-full bg-white lg:w-1/2 dark:bg-slate-950">{children}</div>
      </div>
    </div>
  );
}
