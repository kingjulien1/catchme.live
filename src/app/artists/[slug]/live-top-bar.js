import { BusFront, Eye, X } from "lucide-react";

export default function LiveTopBar({ location, liveCount, remainingLabel }) {
  return (
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
            {liveCount > 1 ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-200/60 bg-white/70 px-3 py-1 text-[10px] font-semibold text-fuchsia-700 dark:border-fuchsia-400/30 dark:bg-white/10 dark:text-fuchsia-100 sm:text-xs">
                <span className="sm:hidden">+{Math.max(0, liveCount - 1)} more live</span>
                <span className="hidden sm:inline">+{Math.max(0, liveCount - 1)} more live artists</span>
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
            <span className="font-semibold">{location || "Location TBA"}</span>
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
  );
}
