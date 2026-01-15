"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export default function BottomActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white/95 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/80">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-6 lg:px-8">
        <Button
          type="button"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gray-100 px-3 py-2 text-sm font-semibold text-black hover:bg-gray-200 dark:bg-slate-800/70 dark:text-slate-100 dark:hover:bg-slate-700 sm:w-auto"
        >
          <ChevronRightIcon className="rotate-180 h-4 w-4" />
          Cancel
        </Button>
        <Button
          disabled
          type="button"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 dark:bg-fuchsia-500/40 dark:text-white dark:hover:bg-fuchsia-500/50 sm:w-auto"
        >
          Save & Continue
          <ChevronLeftIcon className="rotate-180 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
