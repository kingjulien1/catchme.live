"use client";

import { useRouter, useSelectedLayoutSegment } from "next/navigation";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ArtistTabs({ basePath }) {
  const router = useRouter();
  const segment = useSelectedLayoutSegment();
  const activeTab = segment === "residencies" ? "residencies" : "visits";

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => {
        if (value === "residencies") {
          router.push(`${basePath}/residencies`);
          return;
        }
        router.push(basePath);
      }}
      className="w-full"
    >
      <TabsList className="w-full justify-start gap-2 rounded-2xl border border-slate-200/70 bg-white/80 p-2 text-slate-500 shadow-xs dark:border-slate-800/70 dark:bg-slate-950/70 dark:text-slate-400">
        <TabsTrigger
          value="visits"
          className="rounded-xl px-6 py-4 text-base font-semibold text-slate-500 transition data-[state=active]:bg-black data-[state=active]:text-white dark:text-slate-400 dark:data-[state=active]:bg-white/90 dark:data-[state=active]:text-slate-900"
        >
          Visits
        </TabsTrigger>
        <TabsTrigger
          value="residencies"
          className="rounded-xl px-6 py-4 text-base font-semibold text-slate-500 transition data-[state=active]:bg-black data-[state=active]:text-white dark:text-slate-400 dark:data-[state=active]:bg-white/90 dark:data-[state=active]:text-slate-900"
        >
          Residencies
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
