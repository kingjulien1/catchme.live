import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import AccountHandle from "@/components/account-handle";
import VisitCountdown from "@/components/visit-countdown";
import { formatVisitDateRange, formatVisitType } from "@/lib/utils";
import { User } from "lucide-react";
import { format } from "date-fns";

export default function VisitCard({ visit, isLive = false }) {
  const start = visit.visit_start_time ? new Date(visit.visit_start_time) : null;
  const end = visit.visit_end_time ? new Date(visit.visit_end_time) : null;
  const now = new Date();
  const destinationHandleRaw = visit.destination_username || visit.destination_instagram_handle || "unknown";
  const visitLocation = visit.visit_location || visit.destination_name || visit.destination_username || "Visit location";
  const progressValue = isLive && start && end ? Math.min(100, Math.max(0, ((now.getTime() - start.getTime()) / (end.getTime() - start.getTime())) * 100)) : null;

  return (
    <div className="group space-y-2">
      <article
        className={`relative overflow-hidden rounded-3xl border p-5 transition duration-300 ease-out sm:group-hover:translate-x-3 sm:group-hover:shadow-xl sm:group-hover:shadow-slate-100/60 dark:sm:group-hover:shadow-slate-900/20 ${
          isLive ? "border-transparent bg-black text-white dark:bg-white dark:text-slate-900 dark:shadow-sm dark:shadow-black/5" : "border-slate-200 bg-white/90 text-slate-900 dark:border-slate-800 dark:bg-black dark:text-slate-100"
        }`}
      >
        {visitLocation ? <div className={`absolute right-5 top-4 text-[10px] font-semibold uppercase tracking-[0.3em] ${isLive ? "text-white/50 dark:text-slate-500" : "text-slate-500 dark:text-slate-400"}`}>{visitLocation}</div> : null}
        <div className="flex items-center gap-3">
          <Avatar className={`h-11 w-11 border ${isLive ? "border-white/15 bg-white/10 dark:border-slate-200/80 dark:bg-slate-100" : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"} text-slate-400`}>
            <AvatarImage src={visit.destination_profile_picture_url || undefined} alt={destinationHandleRaw} className="object-cover" />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <AccountHandle
              username={destinationHandleRaw}
              className={`text-base font-semibold ${isLive ? "text-white hover:text-white dark:text-slate-900 dark:hover:text-slate-900" : "text-slate-900 hover:text-slate-900 dark:text-slate-100 dark:hover:text-slate-100"}`}
            />
            <div className={`text-sm ${isLive ? "text-white/60 dark:text-slate-500" : "text-slate-500 dark:text-slate-400"}`}>{formatVisitType(visit.visit_type)}</div>
          </div>
        </div>

        <div className={`my-4 h-px ${isLive ? "bg-white/10 dark:bg-slate-200/70" : "bg-slate-200/70 dark:bg-slate-800/70"}`} />

        <div className="text-center">
          <div className={`text-xs font-semibold tracking-[0.3em] ${isLive ? "text-white/50 dark:text-slate-500" : "text-slate-500 dark:text-slate-400"}`}>VISIT DURATION</div>
          <div className={`mt-3 text-3xl font-medium tracking-tight sm:text-4xl ${isLive ? "text-white dark:text-slate-900" : "text-slate-900 dark:text-slate-100"}`}>{formatVisitDateRange(start, end)}</div>
          {start ? <div className={`mt-2 text-sm ${isLive ? "text-white/50 dark:text-slate-500" : "text-slate-500 dark:text-slate-400"}`}>{start.getFullYear()}</div> : null}
        </div>

        <div className={`my-4 h-px ${isLive ? "bg-white/10 dark:bg-slate-200/70" : "bg-slate-200/70 dark:bg-slate-800/70"}`} />

        <div className={`grid gap-6 ${end ? "sm:grid-cols-2" : ""}`}>
          <div>
            <div className={`text-xs font-semibold tracking-[0.2em] ${isLive ? "text-white/50 dark:text-slate-500" : "text-slate-500 dark:text-slate-400"}`}>STARTED</div>
            <div className={`mt-2 text-lg font-semibold ${isLive ? "text-white dark:text-slate-900" : "text-slate-900 dark:text-slate-100"}`}>{start ? format(start, "MMM d, h:mm a") : "TBD"}</div>
          </div>
          {end ? (
            <div className="sm:text-right">
              <div className={`text-xs font-semibold tracking-[0.2em] ${isLive ? "text-white/50 dark:text-slate-500" : "text-slate-500 dark:text-slate-400"}`}>ENDS</div>
              <div className={`mt-2 text-lg font-semibold ${isLive ? "text-white dark:text-slate-900" : "text-slate-900 dark:text-slate-100"}`}>{format(end, "MMM d, h:mm a")}</div>
            </div>
          ) : null}
        </div>

        {typeof progressValue === "number" ? (
          <div className="mt-4">
            <div className={`mb-2 flex items-center justify-between text-xs ${isLive ? "text-white/50 dark:text-slate-500" : "text-slate-500 dark:text-slate-400"}`}>
              <span>Progress</span>
              <VisitCountdown start={start} end={end} isLive />
            </div>
            <Progress value={progressValue} className={`h-2 ${isLive ? "bg-white/15 [&_[data-slot=progress-indicator]]:bg-white dark:bg-slate-200/70 dark:[&_[data-slot=progress-indicator]]:bg-slate-900" : "bg-slate-200/80 dark:bg-slate-800/80"}`} />
          </div>
        ) : null}
      </article>
    </div>
  );
}
