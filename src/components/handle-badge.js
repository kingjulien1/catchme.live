import Link from "next/link";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function HandleBadge({ href, avatarUrl, alt, handle, className, variant = "card" }) {
  const isHeader = variant === "header";
  const baseHover = "transition duration-300 ease-out sm:hover:-translate-y-1 sm:hover:shadow-lg sm:hover:shadow-black/15 sm:hover:backdrop-blur-2xl";
  const badgeClasses = isHeader
    ? `inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur ${baseHover} dark:border-slate-800/80 dark:bg-slate-950/70 dark:text-slate-100`
    : `inline-flex w-fit items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-sm font-semibold text-white/90 backdrop-blur ${baseHover}`;
  const avatarClasses = isHeader ? "h-6 w-6 border border-slate-200" : "h-6 w-6 border border-white/20";
  const fallbackClasses = isHeader ? "text-[9px] font-semibold text-slate-500 dark:text-slate-200" : "text-[9px] font-semibold text-slate-200";

  return (
    <Link href={href} className={cn(badgeClasses, className)}>
      <Avatar className={avatarClasses}>
        <AvatarImage src={avatarUrl || undefined} alt={alt} className="object-cover" />
        <AvatarFallback className={fallbackClasses}>@</AvatarFallback>
      </Avatar>
      {handle}
    </Link>
  );
}
