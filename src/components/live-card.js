"use client";

import HandleBadge from "@/components/handle-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { formatVisitDateRange, formatVisitType } from "@/lib/utils";
import Link from "next/link";

const UNSPLASH_AVATARS = [
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
];

const hashSeed = (value) =>
  String(value || "")
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

const pickImage = (list, seed) => {
  const hash = Math.abs(hashSeed(seed));
  const index = hash % list.length;
  return `${list[index]}&sig=${hash % 1000}`;
};

function coerceVisitDate(value) {
  if (!value) return null;
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
  if (typeof value === "string" && value.includes(" ") && !value.includes("T")) {
    const normalized = value.replace(" ", "T");
    const normalizedDate = new Date(normalized);
    if (!Number.isNaN(normalizedDate.getTime())) return normalizedDate;
  }
  const asDate = new Date(value);
  if (!Number.isNaN(asDate.getTime())) return asDate;
  const asNumber = typeof value === "string" ? Number(value) : value;
  if (Number.isNaN(asNumber)) return null;
  const numericMs = asNumber < 10_000_000_000 ? asNumber * 1000 : asNumber;
  const numericDate = new Date(numericMs);
  return Number.isNaN(numericDate.getTime()) ? null : numericDate;
}

export default function LiveCard({ visit, artistSlug, onOpen }) {
  const startSource = visit.visit_start_time ?? visit.start_time ?? visit.start_date ?? visit.start;
  const endSource = visit.visit_end_time ?? visit.end_time ?? visit.end_date ?? visit.end;
  const start = coerceVisitDate(startSource);
  const end = coerceVisitDate(endSource);
  const handleBase = visit.destination_username || visit.destination_instagram_handle || "artist";
  const title = `@${String(handleBase).replace(/^@/, "")}`;
  const seedBase = `${visit.id || title}`;
  const avatarUrl = pickImage(UNSPLASH_AVATARS, seedBase);
  const timeLabel = formatVisitType(visit.visit_type);
  const durationLabel = start ? formatVisitDateRange(start, end) : "TBD";
  const destinationAvatarUrl = visit.destination_profile_picture_url || null;
  const rawLinkedAccounts = Array.isArray(visit.linked_accounts) ? visit.linked_accounts : Array.isArray(visit.partner_accounts) ? visit.partner_accounts : Array.isArray(visit.linkedAccounts) ? visit.linkedAccounts : [];
  const secondaryAccount = rawLinkedAccounts
    .map((account) => ({
      handle: account.account_handle || account.username || account.handle || null,
      image: account.profile_picture_url || account.avatar_url || account.image || null,
    }))
    .find((account) => account.handle || account.image);
  const secondaryHandle = secondaryAccount?.handle ? `@${secondaryAccount.handle.replace(/^@/, "")}` : title;
  const secondaryAvatar = secondaryAccount?.image || pickImage(UNSPLASH_AVATARS, `${seedBase}-secondary`);
  const bannerImage = visit.destination_banner_image_url || visit.banner_image_url || visit.cover_image_url || pickImage(UNSPLASH_AVATARS, `${seedBase}-banner`);
  const baseSlug = artistSlug || String(handleBase).replace(/^@/, "");

  return (
    <div className="flex w-full flex-col gap-2">
      <Link
        href={`/artists/${baseSlug}/${visit.id}`}
        className="w-full"
        onClick={(e) => {
          e.preventDefault();
          onOpen(visit);
        }}
      >
        <Card className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-white text-slate-900 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-gray-950 dark:text-white">
          <div className="relative h-80 w-full bg-black">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${bannerImage})` }} />
            <div className="absolute inset-0 bg-black/35" />
            <div className="relative z-10 flex h-full flex-col justify-between p-5">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 border border-white/30 bg-white/10">
                  <AvatarImage src={destinationAvatarUrl || avatarUrl} alt={title} className="object-cover" />
                  <AvatarFallback className="text-[10px] font-semibold text-white/80">@</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-lg font-semibold text-white">{visit.visit_title || visit.title || visit.visit_name || timeLabel}</p>
                </div>
              </div>
              <div className="text-left">
                <p className="text-3xl font-semibold text-white">{durationLabel}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-6 px-5 py-4">
            <div className="flex items-center gap-3 text-slate-600 dark:text-white/70">
              <Avatar className="h-8 w-8 border border-slate-200 bg-slate-50 dark:border-white/15 dark:bg-white/10">
                <AvatarImage src={destinationAvatarUrl || avatarUrl} alt={title} className="object-cover" />
                <AvatarFallback className="text-[9px] font-semibold text-slate-500 dark:text-white/80">@</AvatarFallback>
              </Avatar>
              <HandleBadge
                href={`/artists/${String(handleBase).replace(/^@/, "")}`}
                avatarUrl={destinationAvatarUrl || avatarUrl}
                alt={title}
                handle={`@${String(handleBase).replace(/^@/, "")}`}
                className="bg-transparent border-0 px-0 py-0 text-xs font-semibold text-slate-700 shadow-none dark:text-white/80"
              />
            </div>
            <div className="flex items-center gap-3 text-slate-500 dark:text-white/60">
              <Avatar className="h-8 w-8 border border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-white/10">
                <AvatarImage src={secondaryAvatar} alt={secondaryHandle} className="object-cover" />
                <AvatarFallback className="text-[9px] font-semibold text-slate-500 dark:text-white/80">@</AvatarFallback>
              </Avatar>
              <HandleBadge
                href={`/artists/${secondaryHandle.replace(/^@/, "")}`}
                avatarUrl={secondaryAvatar}
                alt={secondaryHandle}
                handle={secondaryHandle}
                className="bg-transparent border-0 px-0 py-0 text-xs font-semibold text-slate-600 shadow-none dark:text-white/60"
              />
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
}
