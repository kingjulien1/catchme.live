import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatVisitDateRange, formatFollowers } from "@/lib/utils";
import { Share2, Tag } from "lucide-react";
import Link from "next/link";
import HandleBadge from "@/components/handle-badge";

const UNSPLASH_IMAGES = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1495567720989-cebdbdd97913?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
];

function hashString(value) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

export default function LiveCard({ visit, profile, linkedAccountsByVisit }) {
  const start = visit.visit_start_time ? new Date(visit.visit_start_time) : null;
  const end = visit.visit_end_time ? new Date(visit.visit_end_time) : null;
  const progressValue = (() => {
    if (!start || !end) return null;
    const total = end.getTime() - start.getTime();
    if (total <= 0) return 0;
    const elapsed = Date.now() - start.getTime();
    const raw = (elapsed / total) * 100;
    return Math.max(0, Math.min(100, raw));
  })();
  const destinationHandle = visit.destination_username || visit.destination_instagram_handle || profile.username || "artist";
  const avatarUrl = visit.destination_profile_picture_url || profile.profile_picture_url || null;
  const accountTypeLabel = (visit.destination_account_type || profile.account_type || "Artist").replace(/_/g, " ");
  const followersLabel = visit.destination_followers_count ? `${formatFollowers(visit.destination_followers_count)} followers` : null;
  const bioSnippet = visit.destination_bio || profile.bio || null;
  const destinationSlug = destinationHandle.replace(/^@/, "");
  const visitLocation = visit.visit_location || profile.location || null;
  const linkedAccounts = linkedAccountsByVisit.get(visit.id) || [];
  const partnerAvatars = linkedAccounts
    .map((account) => ({
      handle: account.account_handle || account.username || "partner",
      image: account.profile_picture_url || null,
      slug: (account.account_handle || account.username || "").replace(/^@/, ""),
    }))
    .filter((account) => account.slug);
  const avatarStack = [
    {
      handle: destinationHandle,
      image: avatarUrl,
      slug: destinationSlug,
    },
    ...partnerAvatars,
  ];
  const visibleAvatars = avatarStack.slice(0, 4);
  const remainingAvatars = Math.max(0, avatarStack.length - visibleAvatars.length);

  // const bannerImageUrl = visit.destination_banner_image_url || null;
  const bannerImageUrl = UNSPLASH_IMAGES[Math.abs(hashString(String(visit.id || destinationSlug))) % UNSPLASH_IMAGES.length];

  return (
    <Card key={visit.id} className="group/livecard max-h-[380px] overflow-hidden rounded-[28px] border-0 bg-slate-700/80 p-0 shadow-lg shadow-black/15 sm:max-h-[420px]">
      <div className="relative aspect-[3/4] h-full max-h-[380px] w-full bg-slate-700/70 dark:bg-slate-800/60 sm:max-h-[420px]">
        {bannerImageUrl ? (
          <div className="absolute inset-0 overflow-hidden">
            <img src={bannerImageUrl} alt={`${destinationHandle} banner`} className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover/livecard:scale-[1.18]" />
          </div>
        ) : null}
        {!bannerImageUrl ? (
          <div className="absolute inset-0 bg-linear-to-br from-slate-400 via-pink-400 to-slate-600 transition-all duration-500 ease-out group-hover/livecard:from-slate-300 group-hover/livecard:via-pink-300 group-hover/livecard:to-slate-700 dark:from-slate-800 dark:via-pink-700 dark:to-slate-800 dark:group-hover/livecard:from-slate-700 dark:group-hover/livecard:via-pink-600 dark:group-hover/livecard:to-slate-900" />
        ) : null}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute left-5 top-5 h-16 w-16 overflow-hidden rounded-2xl bg-white/15 p-1">
          <div className="h-full w-full overflow-hidden rounded-[18px] bg-white/95 ring-[3px] ring-white/90 shadow-md">
            <Link href={`/artists/${destinationSlug}`} aria-label={`Open ${destinationSlug}`} className="block h-full w-full">
              <Avatar className="h-full w-full rounded-[18px]">
                <AvatarImage src={avatarUrl || undefined} alt={destinationHandle} className="object-cover" />
                <AvatarFallback className="text-xs font-semibold text-slate-700">@</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
        <button
          type="button"
          aria-label="Share visit"
          className="absolute right-5 top-5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/15 text-white/90 shadow-sm backdrop-blur transition hover:bg-white/25"
        >
          <Share2 className="h-4 w-4" />
        </button>
        <div className="absolute left-5 right-5 top-24">
          <h3 className="block text-4xl font-semibold text-white drop-shadow-sm">"{visit.destination_name || destinationHandle}"</h3>
          <div className="mt-4 flex items-center justify-between gap-3">
            <HandleBadge href={`/artists/${destinationSlug}`} avatarUrl={avatarUrl} alt={destinationHandle} handle={`@${destinationSlug}`} />
            {visibleAvatars.length ? (
              <div className="flex items-center">
                {visibleAvatars.map((account, index) => (
                  <Link key={`${account.slug}-${index}`} href={`/artists/${account.slug}`} aria-label={`Open ${account.slug}`} className="-ml-2 first:ml-0">
                    <Avatar className="h-9 w-9 border-2 border-white/80 bg-slate-800 text-slate-200 shadow-md">
                      <AvatarImage src={account.image || undefined} alt={account.handle} className="object-cover" />
                      <AvatarFallback className="text-[10px] font-semibold text-slate-200">@</AvatarFallback>
                    </Avatar>
                  </Link>
                ))}
                {remainingAvatars > 0 ? <div className="-ml-2 flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/80 bg-slate-900/80 text-xs font-semibold text-white/90 shadow-md">+{remainingAvatars}</div> : null}
              </div>
            ) : null}
          </div>
          <div className="mt-3 flex items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white/90 backdrop-blur">
              <span className="inline-flex h-4 w-4 items-center justify-center text-white/90">
                <Tag className="h-3 w-3" />
              </span>
              {visit.visit_type || "Residency"}
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-5 text-white/85">
          <div className="text-[11px] font-semibold uppercase tracking-wide sm:text-base">Duration</div>
          <div className="text-lg font-semibold sm:text-2xl">{formatVisitDateRange(start, end)}</div>
        </div>
        {visitLocation ? (
          <div className="absolute bottom-8 right-5 text-right text-white/85">
            <div className="text-[11px] font-semibold uppercase tracking-wide sm:text-base">Location</div>
            <div className="text-lg font-semibold sm:text-2xl">{visitLocation}</div>
          </div>
        ) : null}
        {progressValue !== null ? (
          <div className="absolute bottom-4 left-4 mx-1 right-4">
            <Progress value={progressValue} className="h-2 rounded-full bg-white/15" indicatorClassName="bg-white/70" />
          </div>
        ) : null}
      </div>
      <CardContent className="hidden" />
    </Card>
  );
}
