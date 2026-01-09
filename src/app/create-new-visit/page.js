"use client";

import { ChevronLeftIcon } from "lucide-react";
import ConnectInstagramSection from "./connect-instagram";
import VisitDetailsSection from "./details";
import VisitOptionsSection from "./options";
import VisitPreviewSection from "./preview";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";

export default function NewVisitPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Centered content column */}
      <div className="mx-auto w-full max-w-3xl px-4 pb-28 pt-8 sm:px-6">
        {/* Breadcrumb + Header */}
        <div className="my-4 pb-6 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs text-gray-500">Dashboard &nbsp;/&nbsp; My Visits &nbsp;/&nbsp; Create New Visit</p>
            <h1 className="scroll-m-20  text-3xl font-semibold tracking-tight first:mt-0">Create New Visit</h1>
            <p className="mt-1 text-sm text-gray-600">Announce your upcoming travel plans and connect with your audience at new locations.</p>
          </div>
        </div>

        {/* Connect Instagram */}
        <ConnectInstagramSection />

        {/* Visit Details */}
        <VisitDetailsSection />

        {/* Additional Options */}
        <VisitOptionsSection />

        {/* Preview */}
        <VisitPreviewSection />
      </div>

      {/* Bottom action bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Button type="button" className="inline-flex items-center gap-2 rounded-xl bg-gray-100 px-3 py-2 text-sm font-semibold text-black hover:bg-gray-200">
            <ChevronRightIcon className="rotate-180 h-4 w-4" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <Button type="button" className="rounded-xl px-3 py-2 bg-gray-100 text-sm font-semibold text-black hover:bg-gray-200">
              Cancel
            </Button>

            <Button type="button" className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700">
              Continue to Next Step
              <ChevronLeftIcon className="rotate-180 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
