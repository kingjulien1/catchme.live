import Link from "next/link";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function HandleBadge({ href, avatarUrl, alt, handle, className, variant = "card", size = "md", isLive = false }) {
  const isHeader = variant === "header";
  const isSmall = size === "sm";
  const baseHover = "transition duration-300 ease-out sm:hover:-translate-y-1 sm:hover:shadow-lg sm:hover:shadow-black/15 sm:hover:backdrop-blur-2xl";
  const badgeSizeClasses = isSmall ? "gap-1.5 px-2 py-1 text-[10px]" : "gap-2 px-4 py-2 text-sm";
  const badgeClasses = isHeader
    ? `inline-flex w-fit items-center rounded-full border border-slate-200 bg-white/90 font-semibold text-slate-900 shadow-sm backdrop-blur ${badgeSizeClasses} ${baseHover}`
    : `inline-flex w-fit items-center rounded-full bg-white/20 font-semibold text-white/90 backdrop-blur ${badgeSizeClasses} ${baseHover}`;
  const avatarClasses = isHeader ? (isSmall ? "h-4 w-4 border border-slate-200" : "h-6 w-6 border border-slate-200") : isSmall ? "h-4 w-4 border border-white/20" : "h-6 w-6 border border-white/20";
  const fallbackClasses = isHeader ? (isSmall ? "text-[7px] font-semibold text-slate-500 dark:text-slate-200" : "text-[9px] font-semibold text-slate-500 dark:text-slate-200") : isSmall ? "text-[7px] font-semibold text-slate-200" : "text-[9px] font-semibold text-slate-200";
  const liveDotClasses = isHeader
    ? "border-slate-200 bg-rose-500"
    : "border-white/60 bg-rose-400";

  return (
    <Link href={href} className={cn(badgeClasses, className)}>
      {isLive ? <span className={`h-2.5 w-2.5 rounded-full border ${liveDotClasses} animate-pulse`} /> : null}
      <Avatar className={avatarClasses}>
        <AvatarImage src={avatarUrl || undefined} alt={alt} className="object-cover" />
        <AvatarFallback className={fallbackClasses}>@</AvatarFallback>
      </Avatar>
      {handle}
    </Link>
  );
}
