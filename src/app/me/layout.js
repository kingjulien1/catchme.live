import { Separator } from "@/components/ui/separator";
import { getSessionUser } from "@/lib/db";
import { Dot, Link2 } from "lucide-react";
import Link from "next/link";
import ConnectInstagramSection from "./connect-instagram";

export const dynamic = "force-dynamic";

export default async function CreateNewVisitLayout({ children }) {
  const user = await getSessionUser();

  return (
    <div className="min-h-screen pt-28 bg-gray-50 dark:bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.12),_transparent_55%),radial-gradient(circle_at_20%_20%,_rgba(99,102,241,0.14),_transparent_50%),linear-gradient(180deg,_rgba(255,255,255,0.9),_rgba(255,255,255,0))] pointer-events-none dark:bg-[radial-gradient(circle_at_top,_rgba(217,70,239,0.16),_transparent_55%),radial-gradient(circle_at_20%_20%,_rgba(59,130,246,0.2),_transparent_50%),linear-gradient(180deg,_rgba(15,23,42,0.95),_rgba(15,23,42,0))]" />
      <div className="relative w-full max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="grid gap-8">
          <div className="w-full pb-24 mx-auto sm:px-6 sm:pb-2 lg:px-8">
            <div className="w-full max-w-6xl mx-auto">
              <div className="grid gap-6">
                <ConnectInstagramSection />
                {user ? null : null}
              </div>
            </div>
            <div className="relative my-6">
              <Separator id="me-start" className="w-full scroll-mt-6 dark:bg-slate-800/80 sm:scroll-mt-8" />
              <div className="pointer-events-none absolute left-1/2 top-1/2 inline-flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                <Link2 className="h-4 w-4" />
              </div>
            </div>
            <div className="w-full max-w-6xl mx-auto">{children}</div>
          </div>
          {/* <aside className="hidden lg:block">
            <div className="sticky space-y-6 top-24">
              <div className="p-5 text-white shadow-lg rounded-2xl bg-gradient-to-br from-violet-500/80 via-fuchsia-500/80 to-pink-500/80">
                <div className="flex items-center gap-2 text-sm font-bold">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/15">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  Quick Tips
                </div>
                <ul className="mt-4 space-y-3 text-sm font-medium">
                  {[
                    "Connect Instagram first to auto-populate your profile details",
                    "Announce visits at least 2-4 weeks in advance for best engagement",
                    "Enable direct booking to streamline your scheduling process",
                    "Tag the studio's Instagram to increase visibility",
                  ].map((tip) => (
                    <li key={tip} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                      <span className="leading-snug">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 bg-white border border-gray-200 shadow-sm rounded-2xl dark:border-slate-800/80 dark:bg-slate-900/70">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-gray-900 dark:text-slate-100">Recent Visits</div>
                  <button type="button" className="text-xs font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-300">
                    View all
                  </button>
                </div>
                <div className="mt-4 space-y-3">
                  {[
                    { city: "New York City", date: "Dec 15-22, 2024", tag: "NY", tone: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-200" },
                    { city: "Los Angeles", date: "Nov 8-14, 2024", tag: "LA", tone: "bg-amber-500/10 text-amber-700 dark:text-amber-200" },
                    { city: "Miami", date: "Oct 20-25, 2024", tag: "MI", tone: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-200" },
                  ].map((visit) => (
                    <div key={visit.city} className="flex items-center gap-3 px-3 py-2 border border-gray-200 rounded-xl bg-white/70 dark:border-slate-800/80 dark:bg-slate-900/50">
                      <span className={`flex h-10 w-10 items-center justify-center rounded-xl text-xs font-bold uppercase ${visit.tone}`}>{visit.tag}</span>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-gray-900 dark:text-slate-100">{visit.city}</div>
                        <div className="text-xs text-gray-500 dark:text-slate-400">{visit.date}</div>
                      </div>
                      <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-200">Completed</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 bg-white border border-gray-200 shadow-sm rounded-2xl dark:border-slate-800/80 dark:bg-slate-900/70">
                <div className="text-sm font-semibold text-gray-900 dark:text-slate-100">Your Visit Statistics</div>
                <div className="grid gap-3 mt-4">
                  {[
                    { label: "Total Visits", value: "24", tone: "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-200", icon: Telescope },
                    { label: "Upcoming", value: "3", tone: "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-200", icon: CalendarDays },
                    { label: "Cities Visited", value: "18", tone: "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-200", icon: MapPin },
                  ].map((stat) => {
                    const Icon = stat.icon;
                    return (
                      <div key={stat.label} className={`flex items-center justify-between rounded-xl px-4 py-3 ${stat.tone}`}>
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center justify-center w-8 h-8 text-current rounded-lg bg-white/70 dark:bg-white/10">
                            <Icon className="w-4 h-4" />
                          </span>
                          <span className="text-xs font-semibold tracking-wide uppercase">{stat.label}</span>
                        </div>
                        <span className="text-lg font-semibold">{stat.value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-5 bg-white border border-gray-200 shadow-sm rounded-2xl dark:border-slate-800/80 dark:bg-slate-900/70">
                <div className="text-sm font-semibold text-gray-900 dark:text-slate-100">Need Help?</div>
                <div className="mt-4 space-y-3 text-sm text-gray-600 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-violet-500" />
                    View Documentation
                  </div>
                  <div className="flex items-center gap-2">
                    <PlayCircle className="w-4 h-4 text-violet-500" />
                    Watch Tutorial
                  </div>
                  <div className="flex items-center gap-2">
                    <LifeBuoy className="w-4 h-4 text-violet-500" />
                    Contact Support
                  </div>
                </div>
              </div>
            </div>
          </aside> */}
        </div>
      </div>
    </div>
  );
}
