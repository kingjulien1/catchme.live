import { cn } from "@/lib/utils";

const radioCardBase =
  "border border-gray-200 bg-transparent shadow-sm transition dark:border-slate-800/80 dark:bg-transparent dark:shadow-none";
const radioCardHover = "hover:border-slate-300 dark:hover:border-slate-700/80";
const radioCardSelected =
  "border-slate-300 bg-gradient-to-br from-slate-100/90 via-purple-100/60 to-purple-50/30 dark:border-slate-600/70 dark:from-slate-900/90 dark:via-purple-400/20 dark:to-purple-500/10";
const radioCardSelectedHover =
  "hover:border-slate-400 hover:from-slate-100/95 hover:via-purple-100/70 hover:to-purple-50/30 dark:hover:border-slate-500/70 dark:hover:from-slate-900/95 dark:hover:via-purple-400/22 dark:hover:to-purple-500/12";

export function getRadioCardClasses({ selected = false } = {}) {
  return cn(radioCardBase, radioCardHover, selected && radioCardSelected, selected && radioCardSelectedHover);
}

export const radioCardStyles = {
  base: radioCardBase,
  hover: radioCardHover,
  selected: radioCardSelected,
  selectedHover: radioCardSelectedHover,
};
