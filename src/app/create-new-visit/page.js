import { Separator } from "@/components/ui/separator";
import { Link2 } from "lucide-react";
import BottomActionBar from "./bottom-action-bar";
import ConnectInstagramSection from "./connect-instagram";
import VisitDetailsSection from "./details";
import VisitOptionsSection from "./options";
import VisitPreviewSection from "./preview";

export default function NewVisitPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      {/* Centered content column */}
      <div className="mx-auto w-full max-w-3xl px-4 pb-40 sm:px-6 sm:pb-28 pt-2 sm:pt-4 lg:px-8">
        <div className="my-4 flex flex-col gap-2 pb-6 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight text-gray-900 first:mt-0 dark:text-slate-100 sm:text-3xl">Create New Visit</h1>
            <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-slate-300 sm:text-base">Announce your upcoming travel plans and connect with your audience at new locations.</p>
          </div>
        </div>
        {/* Connect Instagram */}
        <ConnectInstagramSection />
        {/* Divider */}
        <div className="my-6 flex items-center gap-3 sm:my-8">
          <Separator className="flex-1 dark:bg-slate-800/80" />
          <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/70 dark:text-slate-300 dark:shadow-none sm:h-8 sm:w-8">
            <Link2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </div>
          <Separator className="flex-1 dark:bg-slate-800/80" />
        </div>
        {/* Visit Details */}
        <VisitDetailsSection />
        {/* Additional Options */}
        <VisitOptionsSection />
        {/* Preview */}
        <VisitPreviewSection />
      </div>

      {/* Bottom action bar */}
      <BottomActionBar />
    </div>
  );
}
