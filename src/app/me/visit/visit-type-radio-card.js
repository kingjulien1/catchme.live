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
        className="flex cursor-pointer items-start gap-2 rounded-xl border border-gray-200 bg-transparent p-3 pr-10 shadow-sm transition hover:border-slate-300 sm:gap-3 sm:p-4 sm:pr-12 peer-data-[state=checked]:border-slate-300 peer-data-[state=checked]:bg-gradient-to-br peer-data-[state=checked]:from-slate-100/90 peer-data-[state=checked]:via-purple-100/60 peer-data-[state=checked]:to-purple-50/30 peer-data-[state=checked]:hover:border-slate-400 peer-data-[state=checked]:hover:from-slate-100/95 peer-data-[state=checked]:hover:via-purple-100/70 peer-data-[state=checked]:hover:to-purple-50/30 dark:border-slate-800/80 dark:bg-transparent dark:shadow-none dark:hover:border-slate-700/80 dark:peer-data-[state=checked]:border-slate-600/70 dark:peer-data-[state=checked]:bg-gradient-to-br dark:peer-data-[state=checked]:from-slate-900/90 dark:peer-data-[state=checked]:via-purple-400/20 dark:peer-data-[state=checked]:to-purple-500/10 dark:peer-data-[state=checked]:hover:border-slate-500/70 dark:peer-data-[state=checked]:hover:from-slate-900/95 dark:peer-data-[state=checked]:hover:via-purple-400/22 dark:peer-data-[state=checked]:hover:to-purple-500/12"
      >
        <div className={`grid h-10 w-10 place-items-center rounded-lg ${iconWrapClassName}`}>{icon}</div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900 dark:text-slate-100">{title}</p>
          <p className="text-xs text-gray-500 dark:text-slate-400">{subtitle}</p>
        </div>
      </Label>

      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 grid h-4 w-4 place-items-center rounded-full border border-gray-200 bg-white text-gray-400 opacity-0 transition peer-data-[state=checked]:opacity-100 peer-data-[state=checked]:border-slate-900 peer-data-[state=checked]:bg-slate-900 peer-data-[state=checked]:text-white dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400 dark:peer-data-[state=checked]:border-slate-100 dark:peer-data-[state=checked]:bg-slate-100 dark:peer-data-[state=checked]:text-slate-900">
        <CheckIcon className="w-3 h-3" />
      </span>
    </div>
  );
}
