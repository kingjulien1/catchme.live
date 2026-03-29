import HandleBadge from "@/components/handle-badge";
import ScrollRestorer from "@/components/scroll-restorer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getProfileByUsername, getUserVisits } from "@/lib/db";
import { toTitleCase } from "@/lib/utils";
import { ArrowDownRight, ArrowRight, Backpack, BadgeCheck, Building2, Calendar, CheckCircle, Clock, Compass, Facebook, Globe, GraduationCap, Image, Info, Instagram, Languages, MoreHorizontal, Music2, ShieldCheck, Sparkles, SquareArrowOutUpRight, Tag, Twitter, Trophy, User, Youtube } from "lucide-react";
import ProfileShareDialog from "@/components/profile-share-dialog";
import ContactDialogTrigger from "@/components/contact-dialog-overlay";
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
        <div className="mx-auto w-full max-w-7xl px-2 pb-10 pt-10 sm:px-6 sm:pt-16">
          <div className="pt-4 sm:pt-6 flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
            <div className="min-w-0 flex-1 max-w-3xl rounded-2xl border border-slate-200 bg-white/80 p-3 dark:border-slate-800 dark:bg-slate-950/40 sm:p-5">
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
                      <ProfileShareDialog url={profileUrl} className="shadow-none" />
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
                  <div className="w-full">
                    <div className="flex w-full flex-nowrap items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide header-fade-rise sm:justify-between" style={{ animationDelay: "90ms" }}>
                      <div className="flex flex-nowrap items-center gap-3">
                        <span className="text-[1.75rem] font-semibold leading-none text-slate-900 sm:text-[1.75rem] dark:text-white">{displayName}</span>
                        <span className="inline-flex mt-1 items-center justify-center rounded-full bg-slate-900/10 text-slate-900 dark:bg-white/15 dark:text-white self-center">
                          <BadgeCheck className="h-5 w-5" />
                        </span>
                      </div>
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
                        {accountTypeLabel ? (
                          <>
                            <span className="text-slate-400">•</span>
                            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
                              {accountTypeLabel}
                            </span>
                          </>
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
            <aside className="w-full max-w-none flex-col gap-4 lg:flex lg:w-[420px] lg:max-w-[420px] lg:self-start">
              <div className="rounded-2xl border border-slate-200 bg-white/90 p-7 text-sm text-slate-700 shadow-[0_20px_50px_-40px_rgba(15,23,42,0.35)] sm:p-8 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-200">
                <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">Highlights</div>
                <div className="mt-3 rounded-2xl border border-slate-200/70 bg-gradient-to-br from-slate-100/70 via-purple-100/35 to-purple-50/20 p-4 text-sm text-slate-700 dark:border-slate-800/70 dark:from-slate-900/70 dark:via-purple-400/12 dark:to-purple-500/6 dark:text-slate-200">
                  <div className="flex items-center justify-between gap-3 text-sm font-semibold text-slate-900 dark:text-white">
                    <span className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-slate-900 dark:text-white" />
                      Account Details
                    </span>
                    {profile.username ? (
                      <span className="truncate text-xs font-semibold text-slate-500 dark:text-slate-400">@{profile.username}</span>
                    ) : null}
                  </div>
                  <div className="mt-3 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                      <span>Followers</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{followersCount.toLocaleString("en-US")}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                      <span>Location</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{profile.location || "Location TBA"}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                      <span>Account type</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">{accountTypeLabel}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                      <span>Media count</span>
                      <span className="font-semibold text-slate-900 dark:text-white">Posts {followingCount.toLocaleString("en-US")}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid gap-2.5">
                  <div className="rounded-xl border border-slate-200/70 bg-white/85 p-3.5 dark:border-slate-800/70 dark:bg-slate-900/80">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-4">
                        <Sparkles className="mt-0.5 h-7 w-7 text-slate-900 dark:text-white" />
                        <div>
                          <div className="text-sm font-semibold text-slate-900 dark:text-white">Style Specialties</div>
                          <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                            Fine line • Micro realism • Botanical
                          </div>
                          <div className="mt-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                            Healed work focus • Custom compositions
                          </div>
                        </div>
                      </div>
                      <Info className="h-4 w-4 text-slate-400" />
                    </div>
                  </div>
                  <div className="rounded-xl border border-slate-200/70 bg-white/85 p-3.5 dark:border-slate-800/70 dark:bg-slate-900/80">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-4">
                        <Building2 className="mt-0.5 h-7 w-7 text-slate-900 dark:text-white" />
                        <div>
                          <div className="text-sm font-semibold text-slate-900 dark:text-white">Studios &amp; Residencies</div>
                          <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                            Berlin • Vienna • Amsterdam
                          </div>
                          <div className="mt-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                            Guest spots • Convention lineup
                          </div>
                        </div>
                      </div>
                      <Info className="h-4 w-4 text-slate-400" />
                    </div>
                  </div>
                </div>
                <div className="mt-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">Specialisations &amp; Languages</div>
                <div className="mt-3 rounded-2xl border border-slate-200/70 bg-white/85 p-4 text-sm text-slate-700 dark:border-slate-800/70 dark:bg-slate-900/80 dark:text-slate-200">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                    <Tag className="h-4 w-4 text-slate-900 dark:text-white" />
                    Specialisations
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-purple-600/80 dark:text-purple-300/80">
                    <span className="inline-flex items-center gap-2 rounded-full border border-purple-200/80 bg-purple-50/70 px-3 py-1 dark:border-purple-500/20 dark:bg-purple-500/10">
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      Fine Line
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-purple-200/80 bg-purple-50/70 px-3 py-1 dark:border-purple-500/20 dark:bg-purple-500/10">
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      Micro Realism
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-purple-200/80 bg-purple-50/70 px-3 py-1 dark:border-purple-500/20 dark:bg-purple-500/10">
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      Botanical
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-purple-200/80 bg-purple-50/70 px-3 py-1 dark:border-purple-500/20 dark:bg-purple-500/10">
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      Script
                    </span>
                  </div>
                </div>
                <div className="mt-3 rounded-2xl border border-slate-200/70 bg-white/85 p-4 text-sm text-slate-700 dark:border-slate-800/70 dark:bg-slate-900/80 dark:text-slate-200">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                    <Languages className="h-4 w-4 text-slate-900 dark:text-white" />
                    Languages
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                    <span className="inline-flex items-center rounded-full border border-slate-200/70 bg-white px-3 py-1 dark:border-slate-800/70 dark:bg-slate-950/60">
                      German (Native)
                    </span>
                    <span className="inline-flex items-center rounded-full border border-slate-200/70 bg-white px-3 py-1 dark:border-slate-800/70 dark:bg-slate-950/60">
                      English (Fluent)
                    </span>
                    <span className="inline-flex items-center rounded-full border border-slate-200/70 bg-white px-3 py-1 dark:border-slate-800/70 dark:bg-slate-950/60">
                      Spanish (Basic)
                    </span>
                  </div>
                </div>
                <div className="mt-7 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">Social Media</div>
                <div className="mt-4 grid gap-2 grid-cols-2">
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3 dark:border-slate-800/70 dark:bg-slate-900/70">
                    <div className="flex items-center gap-3 min-w-0">
                      <Instagram className="h-4.5 w-4.5 text-slate-900 dark:text-white" />
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold text-slate-900 dark:text-white">Instagram</div>
                        <div className="truncate text-xs text-slate-500 dark:text-slate-400">@julian.ink</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3 dark:border-slate-800/70 dark:bg-slate-900/70">
                    <div className="flex items-center gap-3 min-w-0">
                      <User className="h-4.5 w-4.5 text-slate-900 dark:text-white" />
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold text-slate-900 dark:text-white">Website</div>
                        <div className="truncate text-xs text-slate-500 dark:text-slate-400">julianblaschke.com</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3 dark:border-slate-800/70 dark:bg-slate-900/70">
                    <div className="flex items-center gap-3 min-w-0">
                      <Twitter className="h-4.5 w-4.5 text-slate-900 dark:text-white" />
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold text-slate-900 dark:text-white">Twitter</div>
                        <div className="truncate text-xs text-slate-500 dark:text-slate-400">@julianb_ink</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3 dark:border-slate-800/70 dark:bg-slate-900/70">
                    <div className="flex items-center gap-3 min-w-0">
                      <Facebook className="h-4.5 w-4.5 text-slate-900 dark:text-white" />
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold text-slate-900 dark:text-white">Facebook</div>
                        <div className="truncate text-xs text-slate-500 dark:text-slate-400">Julian Blaschke</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <ContactDialogTrigger handle={profile.username} />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-7xl px-4 pt-10 sm:px-8 overflow-visible">
        <ScrollRestorer storageKey={`artist-scroll-${handle}`} />
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
          <div className="min-w-0 flex-1 max-w-3xl">
            <ArtistVisits visits={visits} artistSlug={handle} />
            {children}
            {modal}
          </div>
        </div>
      </section>
    </div>
  );
}
