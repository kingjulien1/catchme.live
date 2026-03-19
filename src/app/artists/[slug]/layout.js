import HandleBadge from "@/components/handle-badge";
import ScrollRestorer from "@/components/scroll-restorer";
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@/components/ui/avatar";
import { getProfileByUsername, getUserVisits } from "@/lib/db";
import { toTitleCase } from "@/lib/utils";
import { ArrowDownRight, Backpack, BadgeCheck, BusFront, Clock, Compass, Eye, Instagram, MoreHorizontal, ShieldCheck, Sparkles, Tag, User, X } from "lucide-react";
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
  const accountTypeLabel = profile.account_type ? toTitleCase(profile.account_type.replace(/_/g, " ")) : "Instagram account";
  const joinedDate = profile.created_at ? new Date(profile.created_at).toLocaleString("en-US", { month: "short", year: "numeric" }) : null;
  const now = new Date();
  const liveVisits = visits.filter((visit) => {
    const start = visit.visit_start_time ? new Date(visit.visit_start_time) : null;
    const end = visit.visit_end_time ? new Date(visit.visit_end_time) : null;
    return start && start <= now && (!end || end >= now);
  });
  const residentVisits = liveVisits.filter((visit) => visit.visit_type === "residency");
  const connectedAccounts = Array.from(new Set([...liveVisits, ...residentVisits].map((visit) => visit.destination_username || visit.destination_instagram_handle || visit.id))).length;
  const latestLiveEnd = liveVisits
    .map((visit) => (visit.visit_end_time ? new Date(visit.visit_end_time) : null))
    .filter(Boolean)
    .sort((a, b) => b.getTime() - a.getTime())[0];
  const remainingLabel = (() => {
    if (!latestLiveEnd) return "Ending soon";
    const diffMs = Math.max(0, latestLiveEnd.getTime() - now.getTime());
    const totalMinutes = Math.max(1, Math.round(diffMs / (1000 * 60)));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (hours >= 24) {
      const days = Math.floor(hours / 24);
      const remHours = hours % 24;
      return `${days}d ${remHours}h remaining`;
    }
    if (hours > 0) return `${hours}h ${minutes}m remaining`;
    return `${minutes}m remaining`;
  })();

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
    <div className="relative w-full bg-gray-50 pb-0 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <section className="relative w-full bg-gray-50 dark:bg-slate-900 pt-14">
        <div className="mx-auto w-full max-w-6xl px-3 pt-6 sm:px-4 sm:pt-5">
          <div className="rounded-2xl border border-fuchsia-300/80 bg-gradient-to-r from-fuchsia-500/45 via-violet-500/45 to-pink-500/45 px-3 py-3 text-[11px] font-semibold text-fuchsia-700 shadow-sm backdrop-blur dark:border-fuchsia-500/50 dark:from-fuchsia-500/35 dark:via-violet-500/35 dark:to-pink-500/35 dark:text-fuchsia-100 sm:px-4 sm:py-4 sm:text-sm">
            <div className="grid gap-2 sm:gap-3" style={{ gridTemplateColumns: "auto 1fr" }}>
              <span className="relative row-span-2 inline-flex h-13 w-13 items-center justify-center rounded-full bg-white/80 text-fuchsia-700 shadow-sm dark:bg-white/10 dark:text-fuchsia-100 sm:h-16 sm:w-16">
                <BusFront className="h-6.5 w-6.5 sm:h-7.5 sm:w-7.5" />
              </span>
              <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-600 dark:text-slate-200 sm:text-xs">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-200/60 bg-white/70 px-3 py-1 text-[10px] font-semibold text-fuchsia-700 dark:border-fuchsia-400/30 dark:bg-white/10 dark:text-fuchsia-100 sm:text-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    <span className="sm:hidden">Live</span>
                    <span className="hidden sm:inline">Live Now</span>
                  </span>
                  {liveVisits.length > 1 ? (
                    <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-200/60 bg-white/70 px-3 py-1 text-[10px] font-semibold text-fuchsia-700 dark:border-fuchsia-400/30 dark:bg-white/10 dark:text-fuchsia-100 sm:text-xs">
                      <span className="sm:hidden">+{Math.max(0, liveVisits.length - 1)} more live</span>
                      <span className="hidden sm:inline">+{Math.max(0, liveVisits.length - 1)} more live artists</span>
                    </span>
                  ) : null}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-600 dark:text-slate-200 sm:text-xs">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/30 px-3 py-1 font-semibold dark:border-white/20 dark:bg-white/10">
                    <Eye className="h-3.5 w-3.5" />
                    1.2k
                  </span>
                  <button
                    type="button"
                    className="inline-flex h-[26px] w-[26px] items-center justify-center rounded-full border border-white/40 bg-white/30 text-fuchsia-700 transition hover:bg-white/60 dark:border-white/20 dark:bg-white/10 dark:text-fuchsia-100 dark:hover:bg-white/20"
                    aria-label="Close live banner"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-600 dark:text-slate-200 sm:text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold">{profile.location || "Location TBA"}</span>
                  <span className="text-slate-400">•</span>
                  <span className="font-semibold">12 more stops</span>
                </div>
                <div className="flex items-center gap-2 font-semibold">
                  <span className="text-slate-500 dark:text-slate-300">ends in</span>
                  <span className="sm:hidden">{remainingLabel.replace(/\s*remaining$/i, "")}</span>
                  <span className="hidden sm:inline">{remainingLabel}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto w-full max-w-6xl px-3 pb-10 pt-14 sm:px-4 sm:pt-16">
          <div className="pt-4 sm:pt-6">
            <div className="flex flex-col gap-6 sm:gap-8">
              <div className="-mt-12 flex items-end justify-between gap-4 sm:-mt-16">
                <div className="flex items-end gap-2">
                  <div className="relative header-pop" style={{ animationDelay: "40ms" }}>
                    <Avatar className="h-24 w-24 rounded-2xl border-4 border-slate-200 bg-slate-100 sm:h-28 sm:w-28 dark:border-slate-800 dark:bg-slate-900">
                      <AvatarImage src={avatarUrl} alt={displayName} className="object-cover" />
                      <AvatarFallback className="text-lg font-semibold text-slate-600 dark:text-slate-200">{displayName.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-end">
                  <div className="header-fade-rise" style={{ animationDelay: "160ms" }}>
                    <ShareDialog url={profileUrl} className="shadow-none" />
                  </div>
                  <div className="header-fade-rise" style={{ animationDelay: "190ms" }}>
                    <button
                      type="button"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
                      aria-label="More actions"
                    >
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-2xl">
                  <div className="flex w-full flex-nowrap items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide header-fade-rise sm:justify-between" style={{ animationDelay: "90ms" }}>
                    <div className="flex flex-nowrap items-center gap-2">
                      <span className="text-[1.75rem] font-semibold text-slate-900 sm:text-[1.75rem] dark:text-white">{displayName}</span>
                      {accountTypeLabel ? <span className="text-slate-400">•</span> : null}
                      {accountTypeLabel ? (
                        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
                          <BadgeCheck className="h-3.5 w-3.5 text-slate-500 dark:text-slate-300" />
                          {accountTypeLabel}
                        </span>
                      ) : null}
                      {profile.location ? (
                        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-gradient-to-r from-slate-50/80 via-white to-slate-100/60 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:from-slate-900/60 dark:via-slate-950/40 dark:to-slate-900/60 dark:text-slate-200 sm:hidden">
                          <Backpack className="h-3.5 w-3.5 text-slate-600 dark:text-slate-300" />
                          <span>based in {profile.location}</span>
                        </span>
                      ) : null}
                    </div>
                    {profile.location ? (
                      <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-slate-200 bg-gradient-to-r from-slate-50/80 via-white to-slate-100/60 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:from-slate-900/60 dark:via-slate-950/40 dark:to-slate-900/60 dark:text-slate-200">
                        <Backpack className="h-3.5 w-3.5 text-slate-600 dark:text-slate-300" />
                        <span>based in {profile.location}</span>
                      </span>
                    ) : null}
                  </div>
                  {profile.username ? (
                    <div className="mt-3 header-fade-rise flex flex-nowrap items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide" style={{ animationDelay: "140ms" }}>
                      <HandleBadge
                        href={`/artists/${profile.username}`}
                        avatarUrl={profile.profile_picture_url || avatarUrl}
                        alt={displayName}
                        handle={`@${profile.username}`}
                        size="md"
                        variant="header"
                        className="border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                      />
                      <span className="text-slate-400">•</span>
                        {profile.username ? (
                          <Link
                            href={`https://instagram.com/${profile.username}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-slate-100/70 px-2.5 py-1.5 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 dark:border-slate-800/70 dark:bg-slate-900/60 dark:text-slate-400 dark:hover:bg-slate-900"
                            aria-label={`Open @${profile.username} on Instagram`}
                          >
                            <Instagram className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                            <span>Synced via Instagram</span>
                          </Link>
                        ) : null}
                    </div>
                  ) : null}
                  {profile.bio ? (
                    <p className="text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300 my-4 line-clamp-3 lg:line-clamp-4 header-fade-rise" style={{ animationDelay: "200ms" }}>
                      {profile.bio}
                    </p>
                  ) : null}
                </div>
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
