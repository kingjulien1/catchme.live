"use client";

import { Label } from "@radix-ui/react-label";
import { RadioGroupItem } from "@radix-ui/react-radio-group";
import { CheckIcon } from "lucide-react";

export default function VisitTypeRadioCard({ value, id, title, subtitle, icon, iconWrapClassName }) {
  return (
    <div className="relative">
      <RadioGroupItem value={value} id={id} className="sr-only peer" />

      <Label
        htmlFor={id}
        className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 pr-12 shadow-sm transition hover:bg-gray-50 peer-data-[state=checked]:border-violet-300 peer-data-[state=checked]:bg-violet-50/40 dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-none dark:hover:bg-slate-900/90 dark:peer-data-[state=checked]:border-violet-400/60 dark:peer-data-[state=checked]:bg-violet-500/10"
      >
        <div className={`grid h-10 w-10 place-items-center rounded-lg ${iconWrapClassName}`}>{icon}</div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900 dark:text-slate-100">{title}</p>
          <p className="text-xs text-gray-500 dark:text-slate-400">{subtitle}</p>
        </div>
      </Label>

      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 grid h-4 w-4 place-items-center rounded-full border border-gray-200 bg-white text-gray-400 opacity-0 transition peer-data-[state=checked]:opacity-100 peer-data-[state=checked]:border-violet-600 peer-data-[state=checked]:bg-violet-600 peer-data-[state=checked]:text-white dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400 dark:peer-data-[state=checked]:border-violet-400 dark:peer-data-[state=checked]:bg-violet-500">
        <CheckIcon className="w-3 h-3" />
      </span>
    </div>
  );
}
