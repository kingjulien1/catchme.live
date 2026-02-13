import { Avatar, AvatarFallback, AvatarGroupCount, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { formatVisitType } from "@/lib/utils";

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
  const index = Math.abs(hashSeed(seed)) % list.length;
  return `${list[index]}&sig=${Math.floor(Math.random() * 10000)}`;
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

function formatShortTime(value) {
  if (!value) return "--";
  return format(value, "h:mm a").replace(" ", "\u202F");
}

function formatShortDay(value) {
  if (!value) return "--";
  return format(value, "MMM d");
}

export default function LiveCard({ visit, linkedAccountsByVisit }) {
  const startSource = visit.visit_start_time ?? visit.start_time ?? visit.start_date ?? visit.start;
  const endSource = visit.visit_end_time ?? visit.end_time ?? visit.end_date ?? visit.end;
  const start = coerceVisitDate(startSource);
  const end = coerceVisitDate(endSource);
  const now = new Date();
  const isLive = Boolean(start && start <= now && (!end || end >= now));
  const handleBase = visit.destination_username || visit.destination_instagram_handle || "artist";
  const title = `@${String(handleBase).replace(/^@/, "")}`;
  const location = visit.visit_location || "Location TBA";
  const seedBase = `${visit.id || title}-${Date.now()}`;
  const avatarUrl = pickImage(UNSPLASH_AVATARS, seedBase);
  const timeLabel = formatVisitType(visit.visit_type);
  const destinationAvatarUrl = visit.destination_profile_picture_url || null;
  const mapLinkedAccounts = linkedAccountsByVisit?.get?.(visit.id) || [];
  const rawLinkedAccounts = Array.isArray(visit.linked_accounts) ? visit.linked_accounts : Array.isArray(visit.partner_accounts) ? visit.partner_accounts : Array.isArray(visit.linkedAccounts) ? visit.linkedAccounts : [];
  const linkedAccounts = [...rawLinkedAccounts, ...mapLinkedAccounts]
    .map((account) => ({
      handle: account.account_handle || account.username || account.handle || "account",
      image: account.profile_picture_url || account.avatar_url || account.image || null,
    }))
    .filter((account) => account.handle || account.image);
  const stackAccounts = [{ handle: handleBase, image: destinationAvatarUrl }, ...linkedAccounts]
    .map((account, index) => ({
      ...account,
      image: account.image || pickImage(UNSPLASH_AVATARS, `${seedBase}-stack-${account.handle}-${index}`),
    }))
    .filter((account, index, array) => {
      const signature = `${account.handle}-${account.image || ""}`;
      return array.findIndex((item) => `${item.handle}-${item.image || ""}` === signature) === index;
    });
  const visibleStackAccounts = stackAccounts.slice(0, 2);
  const remainingStackCount = Math.max(0, stackAccounts.length - visibleStackAccounts.length);

  return (
    <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
      <div className="flex w-full items-start justify-between gap-4 text-base font-medium tracking-[0.04em] text-slate-500 dark:text-white/60 sm:w-auto sm:flex-col sm:items-start sm:justify-start sm:gap-1 sm:text-[13px]">
        <div className="font-semibold text-slate-700 dark:text-white/90 whitespace-nowrap">
          {formatShortDay(start)} {formatShortTime(start)}
        </div>
        {end ? (
          <div className="text-right text-sm font-medium text-slate-400 dark:text-white/50 whitespace-nowrap sm:text-left">
            {formatShortDay(end)} {formatShortTime(end)}
          </div>
        ) : null}
      </div>
      <Card className="flex w-full flex-row items-center gap-3 rounded-full border border-slate-200 bg-white py-4 pl-4 pr-5 text-slate-900 shadow-sm dark:border-white/15 dark:bg-black dark:text-white">
        <div className="flex items-center flex-row-reverse -space-x-4 space-x-reverse">
          {remainingStackCount > 0 ? (
            <AvatarGroupCount className="h-9 w-9 text-[10px] dark:border-white/15 dark:bg-white/10">
              +{remainingStackCount}
            </AvatarGroupCount>
          ) : null}
          {visibleStackAccounts.map((account, index) => (
            <Avatar key={`${account.handle}-${index}`} className="h-9 w-9 border border-slate-200 bg-slate-50 dark:border-white/15 dark:bg-white/10">
              <AvatarImage src={account.image || undefined} alt={account.handle} className="object-cover" />
              <AvatarFallback className="text-[9px] font-semibold text-slate-500 dark:text-white/80">@</AvatarFallback>
            </Avatar>
          ))}
          <Avatar className="h-12 w-12 border border-slate-200 bg-slate-50 dark:border-white/15 dark:bg-white/10 relative z-10">
            <AvatarImage src={avatarUrl} alt={title} className="object-cover" />
            <AvatarFallback className="text-[11px] font-semibold text-slate-500 dark:text-white/80">@</AvatarFallback>
          </Avatar>
        </div>
        <div className="min-w-0">
          <p className="truncate text-base font-semibold text-slate-900 dark:text-white">{title}</p>
          <p className="truncate text-sm text-slate-500 dark:text-white/60">
            {timeLabel} · {location}
          </p>
        </div>
        {isLive ? (
          <div className="ml-auto flex items-center">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500/70" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
            </span>
          </div>
        ) : null}
      </Card>
    </div>
  );
}
