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
      <div className="w-full px-4 pt-2 mx-auto sm:px-6 sm:pt-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center gap-2 pb-6 my-4 text-center sm:gap-4">
            <div className="min-w-0">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-gray-900 scroll-m-20 first:mt-0 dark:text-slate-100 sm:text-5xl">Make a Live Stay</h1>
              <p className="max-w-3xl mt-2 text-base leading-relaxed text-gray-500 dark:text-slate-500 sm:text-lg">Announce your upcoming travel plans and connect with your audience at new locations.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Centered content column */}
      <div className="w-full max-w-3xl px-4 pb-40 mx-auto sm:px-6 sm:pb-28 lg:px-8">
        {/* Connect Instagram */}
        <ConnectInstagramSection />
        {/* Divider */}
        <div className="flex items-center gap-3 my-6 sm:my-8">
          <Separator className="flex-1 dark:bg-slate-800/80" />
          <div className="grid text-gray-600 bg-white border border-gray-200 rounded-full shadow-sm h-7 w-7 shrink-0 place-items-center dark:border-slate-800/80 dark:bg-slate-900/70 dark:text-slate-300 dark:shadow-none sm:h-8 sm:w-8">
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
