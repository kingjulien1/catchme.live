import HandleBadge from "@/components/handle-badge";
import ScrollRestorer from "@/components/scroll-restorer";
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getProfileByUsername, getUserVisits } from "@/lib/db";
import { MapPin, Share2, SquareArrowOutUpRight, Stars, Tag, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArtistVisits from "./artist-visits";

export default async function ArtistProfileLayout({ children, modal, params }) {
  const { slug } = await params;
  const handle = typeof slug === "string" ? slug.replace(/^@/, "") : "";

  if (!handle) notFound();

  const profile = await getProfileByUsername(handle);
  if (!profile) notFound();

  const visits = await getUserVisits(profile.id, 50);
  const now = new Date();
  const liveVisits = visits.filter((visit) => {
    const start = visit.visit_start_time ? new Date(visit.visit_start_time) : null;
    const end = visit.visit_end_time ? new Date(visit.visit_end_time) : null;
    return start && start <= now && (!end || end >= now);
  });
  const residentVisits = liveVisits.filter((visit) => visit.visit_type === "residency");

  const displayName = profile.name || profile.username || "Artist";
  const accountTypeLabel = profile.account_type ? profile.account_type.replace(/_/g, " ") : "Instagram account";
  const bannerUrl = profile.banner_image_url;
  const bookingStatus = visits.find((visit) => visit.bookings_open)?.bookings_open ? "Bookings open" : visits.find((visit) => visit.appointment_only)?.appointment_only ? "Appointment only" : visits.length > 0 ? "Bookings closed" : null;

  return (
    <div className="w-full pb-16">
      <div className="w-full lg:flex">
        <section className="w-full h-screen bg-white pt-20 text-slate-900 lg:sticky lg:top-0 lg:h-screen lg:w-[42rem] lg:flex-none lg:overflow-y-auto dark:bg-slate-950 dark:text-slate-100">
          <div className="mx-auto w-full max-w-2xl h-full px-6 sm:px-6 lg:px-8 lg:pt-0 lg:pb-10 flex flex-col gap-6">
            <BannerImage bannerUrl={bannerUrl} avatarUrl={profile.profile_picture_url} displayName={displayName} />

            <div className="flex flex1 flex-col gap-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <ProfileBanners bookingStatus={bookingStatus} location={profile.location} accountTypeLabel={accountTypeLabel} />
                {/* <ActionButtons className="hidden sm:flex" /> */}
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl dark:text-slate-100">&quot;{displayName}&quot;</h1>
                {profile.username ? <HandleBadge href={`/artists/${profile.username}`} avatarUrl={profile.profile_picture_url} alt={displayName} handle={`@${profile.username}`} variant="header" /> : null}
              </div>
              {/* <SpecialisationsBadges specialisations={profile.specialisations} /> */}
              {profile.bio ? <p className="line-clamp-4 text-sm text-slate-600 sm:text-base dark:text-slate-300">{profile.bio}</p> : null}
              <LiveConnectionAvatars liveVisits={liveVisits} residentVisits={residentVisits} />
            </div>
          </div>
        </section>
        <div className="relative w-full lg:flex-1 lg:pt-10">
          <div className="absolute inset-0 -z-20 bg-white dark:bg-slate-950" />
          <ScrollRestorer storageKey={`artist-scroll-${handle}`} />
          <div className="px-6 lg:pt-6 sm:px-8 lg:px-10">{/* <ArtistTabs basePath={`/artists/${handle}`} /> */}</div>
          <ArtistVisits visits={visits} artistSlug={handle} />
          {children}
          {modal}
        </div>
      </div>
    </div>
  );
}

function ActionButtons({ className = "" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button type="button" aria-label="Share profile" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/15 text-white/90 shadow-sm backdrop-blur transition hover:bg-white/25">
        <Share2 className="h-4 w-4" />
      </button>
      <button type="button" aria-label="Share Profile" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/15 text-white/90 shadow-sm backdrop-blur transition hover:bg-white/25">
        <SquareArrowOutUpRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function SpecialisationsBadges({ specialisations }) {
  return specialisations?.length ? (
    <div className="flex flex-nowrap items-center gap-2 overflow-x-auto whitespace-nowrap text-sm text-slate-600 scrollbar-hide dark:text-slate-300">
      {specialisations.map((specialisation) => (
        <Badge key={specialisation} className="gap-2 border border-fuchsia-200 bg-fuchsia-50 px-3 py-1 text-sm text-fuchsia-700 dark:border-fuchsia-500/30 dark:bg-fuchsia-500/10 dark:text-fuchsia-200">
          <Tag className="h-4 w-4" />
          {specialisation}
        </Badge>
      ))}
    </div>
  ) : null;
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
  const avatarSources = allAvatarSources.slice(0, 4);
  const remainingAvatars = Math.max(0, allAvatarSources.length - avatarSources.length);

  return avatarSources.length ? (
    <div className="flex items-center gap-3">
      <AvatarGroup>
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

function BannerImage({ bannerUrl, avatarUrl, displayName }) {
  return (
    <div className="relative h-[45%] min-h-[240px] overflow-hidden rounded-[28px] border border-slate-200 bg-slate-100 shadow-sm lg:h-auto lg:flex-1 dark:border-slate-800 dark:bg-slate-900">
      {bannerUrl ? (
        <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${bannerUrl})` }} />
      ) : (
        <div className="h-full w-full bg-linear-to-br from-slate-200 via-slate-100 to-slate-300 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900" />
      )}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-black/10 via-transparent to-black/5 dark:from-black/30 dark:to-black/20" />
      <Badge className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white/90 backdrop-blur">
        <Stars className="h-3 w-3 text-yellow-300" />
        Featured Instagram Posts
      </Badge>
      <ActionButtons className="absolute top-3 right-3" />
    </div>
  );
}

function ProfileBanners({ bookingStatus, location, accountTypeLabel }) {
  return (
    <div className="flex flex-nowrap items-center gap-2 overflow-x-auto whitespace-nowrap text-xs font-semibold text-slate-600 scrollbar-hide dark:text-slate-300 sm:flex-wrap sm:whitespace-normal">
      <Badge className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-100/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-700 shadow-sm dark:border-slate-700/70 dark:bg-slate-800/80 dark:text-slate-100">
        <Tag className="h-3 w-3" />
        {accountTypeLabel}
      </Badge>
      {location ? (
        <Badge className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-100/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-700 shadow-sm dark:border-slate-700/70 dark:bg-slate-800/80 dark:text-slate-100">
          <MapPin className="h-3 w-3" />
          Based in {location}
        </Badge>
      ) : null}
      {bookingStatus ? (
        <Badge className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-100/90 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-700 shadow-sm dark:border-slate-700/70 dark:bg-slate-800/80 dark:text-slate-100">
          {bookingStatus}
        </Badge>
      ) : null}
    </div>
  );
}
