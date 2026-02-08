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
      <TabsList className="w-full justify-start gap-1 rounded-full border border-slate-200/70 bg-white/80 p-1.5 text-slate-500 shadow-xs dark:border-slate-800/70 dark:bg-slate-950/70 dark:text-slate-400">
        <TabsTrigger
          value="visits"
          className="rounded-full px-5 py-4 text-sm font-semibold text-slate-500 transition data-[state=active]:bg-slate-900 data-[state=active]:text-white dark:text-slate-400 dark:data-[state=active]:bg-white/90 dark:data-[state=active]:text-slate-900"
        >
          Visits
        </TabsTrigger>
        <TabsTrigger
          value="residencies"
          className="rounded-full px-5 py-4 text-sm font-semibold text-slate-500 transition data-[state=active]:bg-slate-900 data-[state=active]:text-white dark:text-slate-400 dark:data-[state=active]:bg-white/90 dark:data-[state=active]:text-slate-900"
        >
          Residencies
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
