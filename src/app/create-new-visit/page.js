"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeftIcon, ChevronRightIcon, Link2 } from "lucide-react";
import ConnectInstagramSection from "./connect-instagram";
import VisitDetailsSection from "./details";
import VisitOptionsSection from "./options";
import VisitPreviewSection from "./preview";

export default function NewVisitPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Centered content column */}
      <div className="mx-auto w-full max-w-3xl px-4 pb-40 pt-6 sm:px-6 sm:pb-28 sm:pt-8 lg:px-8">
        <div className="my-4 flex flex-col gap-2 pb-6 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <p className="text-xs leading-relaxed text-gray-500">Dashboard &nbsp;/&nbsp; My Visits &nbsp;/&nbsp; Create New Visit</p>
            <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0 sm:text-3xl">Create New Visit</h1>
            <p className="mt-1 text-sm leading-relaxed text-gray-600 sm:text-base">Announce your upcoming travel plans and connect with your audience at new locations.</p>
          </div>
        </div>
        {/* Connect Instagram */}
        <ConnectInstagramSection />
        {/* Divider */}
        <div className="my-6 flex items-center gap-3 sm:my-8">
          <Separator className="flex-1" />
          <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm sm:h-8 sm:w-8">
            <Link2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </div>
          <Separator className="flex-1" />
        </div>
        {/* Visit Details */}
        <VisitDetailsSection />
        {/* Additional Options */}
        <VisitOptionsSection />
        {/* Preview */}
        <VisitPreviewSection />
      </div>

      {/* Bottom action bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-6 lg:px-8">
          <Button type="button" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gray-100 px-3 py-2 text-sm font-semibold text-black hover:bg-gray-200 sm:w-auto">
            <ChevronRightIcon className="rotate-180 h-4 w-4" />
            Cancel
          </Button>
          <Button disabled type="button" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 sm:w-auto">
            Save & Continue
            <ChevronLeftIcon className="rotate-180 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
