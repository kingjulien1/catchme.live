"use client";

import { useActionState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import VisitDetailsSection from "./details";
import VisitOptionsSection from "./options";
import VisitPreviewSection from "./preview";
import { MapPinPlus } from "lucide-react";

const initialState = { errors: {}, message: "" };

export default function VisitForm({ action }) {
  const [state, formAction] = useActionState(action, initialState);
  const hasErrors = Boolean(state?.message) || (state?.errors && Object.keys(state.errors).length > 0);

  return (
    <form className="w-full mx-auto" action={formAction}>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-slate-100 sm:text-4xl">Create a Visit</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-slate-400 sm:text-base">Share your upcoming travel plans and connect with clients in new locations.</p>
        {state.message ? <p className="mt-3 text-sm font-medium text-red-600 dark:text-red-400">{state.message}</p> : null}
      </div>
      <VisitDetailsSection errors={state.errors} />
      <VisitOptionsSection />
      <VisitPreviewSection />
      <div className="flex mt-10">
        <Button className="flex items-center justify-center w-full gap-2 px-6 py-6 text-base font-semibold text-white bg-black shadow-sm rounded-2xl transition hover:-translate-y-0.5 hover:bg-gray-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/30 dark:bg-fuchsia-500/50 dark:hover:bg-fuchsia-500/70 dark:hover:shadow-fuchsia-500/30 dark:focus-visible:ring-fuchsia-300/40 md:ml-auto md:w-1/2">
          <MapPinPlus className="w-5 h-5" />
          Save & Continue
        </Button>
      </div>
    </form>
  );
}
