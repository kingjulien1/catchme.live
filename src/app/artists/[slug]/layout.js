import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@/components/ui/avatar";
import { getProfileByUsername, getUserVisits } from "@/lib/db";
import { formatFollowers } from "@/lib/utils";
import { Instagram, MapPin, MoreHorizontal, Share2, Star, Tag, User } from "lucide-react";
import AccountHandle from "@/components/account-handle";
import { Stars } from "lucide-react";

export default async function ArtistProfileLayout({ children, params }) {
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

  const displayName = profile.name || profile.username || "Artist";
  const accountTypeLabel = profile.account_type ? profile.account_type.replace(/_/g, " ") : "Instagram account";
  const bannerUrl = profile.banner_image_url;
  const bookingStatus = visits.find((visit) => visit.bookings_open)?.bookings_open ? "Bookings open" : visits.find((visit) => visit.appointment_only)?.appointment_only ? "Appointment only" : visits.length > 0 ? "Bookings closed" : null;

  return (
    <div className="w-full pb-16">
      <div className="w-full lg:flex">
        <section className="w-full min-h-screen bg-white pt-20 text-slate-900 lg:sticky lg:top-0 lg:h-screen lg:w-1/2 lg:overflow-hidden dark:bg-slate-950 dark:text-slate-100">
          <div className="w-full h-screen px-6 sm:px-6 lg:px-8 lg:pt-0 lg:pb-10 flex flex-col gap-6">
            <div className="relative h-[45%] overflow-hidden rounded-[28px] border border-slate-200 bg-slate-100 shadow-sm lg:h-auto lg:flex-1 dark:border-slate-800 dark:bg-slate-900">
              {bannerUrl ? (
                <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${bannerUrl})` }} />
              ) : (
                <div className="h-full w-full bg-linear-to-br from-slate-200 via-slate-100 to-slate-300 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900" />
              )}
              <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-black/10 via-transparent to-black/5 dark:from-black/30 dark:to-black/20" />
              <Badge className="absolute left-4 top-4 border border-slate-200 bg-white/90 text-xs font-semibold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200">
                <Stars className="h-3.5 w-3.5 mr-1 text-yellow-500" />
                Featured Instagram Posts
              </Badge>
            </div>

            <div className="flex flex-1 flex-col gap-5">
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
                  {bookingStatus ? <Badge className="border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200">{bookingStatus}</Badge> : null}
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
                <h1 className="text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl dark:text-slate-100">&quot;{displayName}&quot;</h1>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 border border-slate-200 bg-white text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                    <AvatarImage src={profile.profile_picture_url || undefined} alt={displayName} className="object-cover" />
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
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

              {avatarSources.length ? (
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
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">connected lives</span>
                </div>
              ) : null}
            </div>
          </div>
        </section>
        <div className="w-full bg-white lg:w-1/2 dark:bg-slate-950">{children}</div>
      </div>
    </div>
  );
}
