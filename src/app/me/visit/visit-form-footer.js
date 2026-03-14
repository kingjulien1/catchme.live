"use client";

import Link from "next/link";
import { Download, Eye, HelpCircle, ShieldCheck } from "lucide-react";

export default function VisitFormFooter() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center py-2 sm:py-3">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
          >
            <HelpCircle className="h-4 w-4" />
            Cancel
          </button>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
          >
            <Download className="h-4 w-4" />
            Report Bug
          </button>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
          >
            <Eye className="h-4 w-4" />
            Preview
          </button>
        </div>
      </div>
      <div className="h-px w-full bg-slate-200/80 dark:bg-slate-800/80" />
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
        <span className="inline-flex items-center gap-2">
          <ShieldCheck className="h-4 w-4" />
          Secured by VisitCreation
        </span>
        <span className="text-slate-300 dark:text-slate-700">•</span>
        <Link href="/privacy" className="transition hover:text-slate-700 dark:hover:text-slate-200">
          Privacy Policy
        </Link>
        <span className="text-slate-300 dark:text-slate-700">•</span>
        <Link href="/terms" className="transition hover:text-slate-700 dark:hover:text-slate-200">
          Terms
        </Link>
      </div>
      <div className="text-center text-xs text-slate-400 dark:text-slate-500">
        Visit ID: e55352fc-cf5d-49fa-a402-d232cc305ae0
      </div>
    </div>
  );
}
