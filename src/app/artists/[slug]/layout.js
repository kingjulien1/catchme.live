import HandleBadge from "@/components/handle-badge";
import ScrollRestorer from "@/components/scroll-restorer";
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@/components/ui/avatar";
import { getProfileByUsername, getUserVisits } from "@/lib/db";
import { BadgeCheck, Compass, Instagram, MoreHorizontal, Sparkles, Tag, User } from "lucide-react";
import ShareDialog from "@/components/share-dialog";
import Link from "next/link";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import ArtistVisits from "./artist-visits";

export default async function ArtistProfileLayout({ children, modal, params }) {
  const { slug } = await params;
  const handle = typeof slug === "string" ? slug.replace(/^@/, "") : "";

  if (!handle) notFound();

  const profile = await getProfileByUsername(handle);
  if (!profile) notFound();

  const visits = await getUserVisits(profile.id, 50);
  const accountTypeLabel = profile.account_type
    ? profile.account_type
        .replace(/_/g, " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "Instagram account";
  const joinedDate = profile.created_at ? new Date(profile.created_at).toLocaleString("en-US", { month: "short", year: "numeric" }) : null;
  const now = new Date();
  const liveVisits = visits.filter((visit) => {
    const start = visit.visit_start_time ? new Date(visit.visit_start_time) : null;
    const end = visit.visit_end_time ? new Date(visit.visit_end_time) : null;
    return start && start <= now && (!end || end >= now);
  });
  const residentVisits = liveVisits.filter((visit) => visit.visit_type === "residency");
  const connectedAccounts = Array.from(new Set([...liveVisits, ...residentVisits].map((visit) => visit.destination_username || visit.destination_instagram_handle || visit.id))).length;

  const displayName = profile.name || profile.username || "Artist";
  const bannerUrl = "https://images.unsplash.com/photo-1771694583804-485942f4447e?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const avatarUrl = "https://images.unsplash.com/photo-1760782064749-471cc414d7d9?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const galleriesCount = Math.max(1, visits.length);
  const followersCount = typeof profile.followers_count === "number" ? profile.followers_count : 0;
  const followingCount = typeof profile.media_count === "number" ? profile.media_count : 0;

  const headerList = await headers();
  const forwardedProto = headerList.get("x-forwarded-proto");
  const forwardedHost = headerList.get("x-forwarded-host");
  const host = forwardedHost || headerList.get("host");
  const protocol = forwardedProto || "https";
  const baseUrl = host ? `${protocol}://${host}` : "https://catchme.live";
  const profileUrl = `${baseUrl}/artists/${handle}`;

  return (
    <div className="relative w-full bg-white pb-0 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <section className="w-full border-b border-slate-200/70 bg-white dark:border-slate-800/80 dark:bg-slate-950">
        <div className="relative h-48 w-full overflow-hidden sm:h-56">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${bannerUrl})` }} />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-white dark:to-slate-950" />
        </div>
        <div className="mx-auto w-full max-w-6xl px-4 pb-10 pt-6 sm:px-8">
          <div className="flex flex-col gap-6 sm:gap-8">
            <div className="-mt-16 flex items-end justify-between gap-4 sm:-mt-20">
              <div className="relative rounded-[28px] bg-white shadow-md dark:bg-slate-950 header-pop" style={{ animationDelay: "40ms" }}>
                <Avatar className="h-24 w-24 rounded-2xl border-4 border-slate-300 bg-slate-100 sm:h-28 sm:w-28 dark:border-slate-700 dark:bg-slate-900">
                  <AvatarImage src={avatarUrl} alt={displayName} className="object-cover" />
                  <AvatarFallback className="text-lg font-semibold text-slate-600 dark:text-slate-200">{displayName.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                {profile.username ? (
                  <Link
                    href={`https://instagram.com/${profile.username}`}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute -bottom-2 -right-2 inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-black text-white shadow-md transition hover:scale-105 dark:border-slate-950 dark:bg-white dark:text-slate-900"
                    aria-label={`Open @${profile.username} on Instagram`}
                  >
                    <Instagram className="h-3.5 w-3.5" />
                  </Link>
                ) : null}
              </div>
              <div className="flex items-center gap-2 self-end">
                <div className="header-fade-rise" style={{ animationDelay: "160ms" }}>
                  <ShareDialog url={profileUrl} />
                </div>
                <div className="header-fade-rise" style={{ animationDelay: "220ms" }}>
                  <button
                    type="button"
                    aria-label="More options"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-2xl">
                <h1
                  className="flex flex-wrap items-end gap-2 text-4xl font-semibold text-slate-900 sm:text-4xl dark:text-white header-fade-rise"
                  style={{ animationDelay: "90ms" }}
                >
                  {displayName}
                  <span className="mb-0.5 text-sm font-semibold text-slate-400 dark:text-slate-500">/ {accountTypeLabel}</span>
                </h1>
                {profile.username ? (
                  <div className="mt-3 header-fade-rise" style={{ animationDelay: "140ms" }}>
                    <HandleBadge
                      href={`/artists/${profile.username}`}
                      avatarUrl={profile.profile_picture_url || avatarUrl}
                      alt={displayName}
                      handle={`@${profile.username}`}
                      size="md"
                      variant="header"
                      className="border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                    />
                  </div>
                ) : null}
                {profile.bio ? (
                  <p
                    className="text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300 my-4 line-clamp-3 lg:line-clamp-4 header-fade-rise"
                    style={{ animationDelay: "200ms" }}
                  >
                    {profile.bio}
                  </p>
                ) : null}
                {profile.location || joinedDate ? (
                  <div className="flex w-full flex-nowrap items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
                    {profile.location ? (
                      <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 header-fade-rise" style={{ animationDelay: "260ms" }}>
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                          <Compass className="h-3.5 w-3.5" />
                        </span>
                        {profile.location}
                      </span>
                    ) : null}
                    {joinedDate ? (
                      <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 header-fade-rise" style={{ animationDelay: "320ms" }}>
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                          <Sparkles className="h-3.5 w-3.5" />
                        </span>
                        Joined {joinedDate}
                      </span>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-6xl px-4 pt-10 sm:px-8 overflow-visible">
        <ScrollRestorer storageKey={`artist-scroll-${handle}`} />
        <ArtistVisits visits={visits} artistSlug={handle} />
        {children}
        {modal}
      </section>
    </div>
  );
}

function LiveConnectionAvatars({ liveVisits, residentVisits }) {
  const allAvatarSources = Array.from(
    new Set(
      [...liveVisits, ...residentVisits].map((visit) => ({
        url: visit.destination_profile_picture_url || null,
        key: visit.destination_username || visit.destination_instagram_handle || visit.id,
        slug: (visit.destination_username || visit.destination_instagram_handle || "").replace(/^@/, ""),
      })),
    ),
  ).filter((source) => source.slug);
  const avatarSources = allAvatarSources.slice(0, 3);
  const remainingAvatars = Math.max(0, allAvatarSources.length - avatarSources.length);

  return avatarSources.length ? (
    <div className="flex items-center gap-2">
      <AvatarGroup className="-space-x-4">
        {avatarSources.map((source, index) => (
          <Link key={`${source.key}-${index}`} href={`/artists/${source.slug}`} aria-label={`Open ${source.slug} profile`} className="transition hover:scale-[1.03]">
            <Avatar className="h-8 w-8 border-2 border-white bg-slate-100 text-slate-400 shadow-sm dark:border-slate-950 dark:bg-slate-900 dark:text-slate-500">
              <AvatarImage src={source.url || undefined} alt="Resident profile" className="object-cover" />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </Link>
        ))}
        {remainingAvatars > 0 ? <AvatarGroupCount>+{remainingAvatars}</AvatarGroupCount> : null}
      </AvatarGroup>
    </div>
  ) : null;
}
