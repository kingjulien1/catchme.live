import VisitDetailsSection from "./details";
import VisitOptionsSection from "./options";
import VisitPreviewSection from "./preview";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function NewVisitPage() {
  return (
    <>
      <VisitDetailsSection />
      <VisitOptionsSection />
      <VisitPreviewSection />
      <div className="mt-10">
        <Button className="flex items-center justify-center w-full gap-2 px-6 py-6 text-base font-semibold text-white bg-black shadow-sm rounded-2xl transition hover:-translate-y-0.5 hover:bg-gray-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/30 dark:bg-fuchsia-500/50 dark:hover:bg-fuchsia-500/70 dark:hover:shadow-fuchsia-500/30 dark:focus-visible:ring-fuchsia-300/40">
          Save & Continue
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </>
  );
}
