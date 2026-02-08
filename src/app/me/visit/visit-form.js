"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Label } from "@radix-ui/react-label";
import { ArrowRight, AtSignIcon, Building2, MapPin, PinIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import Section from "@/components/Section";
import SettingsSubmitButton from "@/components/settings-submit-button";
import LinkedAccountsInput from "./linked-accounts-input";
import VisitScheduleField from "./visit-schedule-field";
import VisitTypeField from "./visit-type-field";

const initialState = { errors: {}, message: "", values: null };

export default function VisitForm({ action, user }) {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const [localErrors, setLocalErrors] = useState(state.errors);
  const [localMessage, setLocalMessage] = useState(state.message);
  const formRef = useRef(null);
  const hasErrors = Boolean(localMessage) || (localErrors && Object.keys(localErrors).length > 0);
  const [locationValue, setLocationValue] = useState("");

  useEffect(() => {
    setLocalErrors(state.errors || {});
    setLocalMessage(state.message || "");
  }, [state.errors, state.message]);

  const clearError = (field) => {
    setLocalMessage("");
    setLocalErrors((prev) => {
      if (!prev || !prev[field]) return prev || {};
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleFieldChange = (field) => {
    clearError(field);
  };

  return (
    <form ref={formRef} className="w-full mx-auto pb-20" action={formAction}>
      <div className="mb-8">
        <h1 id="visit-start" className="text-3xl font-semibold tracking-tight text-gray-900 scroll-mt-20 dark:text-slate-100 sm:scroll-mt-24 sm:text-4xl">
          Create a Visit
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-slate-400 sm:text-base">Share your upcoming travel plans and connect with clients in new locations.</p>
        {localMessage ? <p className="mt-3 text-sm font-medium text-red-600 dark:text-red-400">{localMessage}</p> : null}
      </div>
      <Section
        title="Visit Details"
        icon={<PinIcon className="w-4 h-4" />}
        subtitle="Provide information about your upcoming visit location and schedule."
        headerRight={
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200">Step 1 of 3</span>
        }
      >
        <div className="w-full pt-6 space-y-4">
          <VisitTypeField errors={localErrors} onFieldChange={handleFieldChange} />
        </div>
        <article className="my-4 space-y-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
            <div className="grid items-center w-full gap-3">
              <div className="flex flex-col w-full gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <Label className="inline-flex items-center gap-2 text-sm font-medium" htmlFor="instagram-handle">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-200">
                    <AtSignIcon className="h-4 w-4" />
                  </span>
                  Destination Accounts
                </Label>
                <p className="text-xs text-gray-500 dark:text-slate-400">Instagram username</p>
              </div>
              <LinkedAccountsInput name="destination_accounts" description="Link the accounts where you'll be staying or performing during your live stop or residency." />
              {localErrors.destination_accounts ? <p className="text-xs text-red-600 dark:text-red-400">{localErrors.destination_accounts}</p> : null}
            </div>
            <div className="grid items-center w-full gap-3">
              <div className="flex flex-col w-full gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <Label className="inline-flex items-center gap-2 text-sm font-medium" htmlFor="linked-accounts">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200">
                    <AtSignIcon className="h-4 w-4" />
                  </span>
                  Linked Accounts
                </Label>
                <p className="text-xs text-gray-500 dark:text-slate-400">Instagram usernames</p>
              </div>
              <LinkedAccountsInput name="linked_accounts" />
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="grid items-center w-full gap-3">
              <div className="flex flex-col w-full gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <Label className="inline-flex items-center gap-2 text-sm font-medium" htmlFor="venue-event">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200">
                    <Building2 className="h-4 w-4" />
                  </span>
                  Venue / Event
                </Label>
                <p className="text-xs text-gray-500 dark:text-slate-400">Where it takes place</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-none">
                <Input id="venue-event" name="venue_event" placeholder="Black Bear Studio / Berlin Pop-up" className="h-11 rounded-xl border-slate-200 bg-white shadow-none dark:border-slate-800 dark:bg-slate-950" />
                <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">Add the venue, studio, or event name for this stop.</p>
              </div>
            </div>
            <div className="grid items-center self-start w-full gap-3">
              <div className="flex flex-col w-full gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <Label className="inline-flex items-center gap-2 text-sm font-medium" htmlFor="location">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-200">
                    <MapPin className="h-4 w-4" />
                  </span>
                  Visit Location
                </Label>
                <p className="text-xs text-gray-500 dark:text-slate-400">City & Country of the visit</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-none">
                <Input
                  id="location"
                  name="visit_location"
                  placeholder="Vienna, Austria (or full address)"
                  value={locationValue}
                  aria-invalid={Boolean(localErrors.visit_location)}
                  className={`h-11 rounded-xl border-slate-200 bg-white shadow-none dark:border-slate-800 dark:bg-slate-950 ${localErrors.visit_location ? "border-red-400 focus-visible:ring-red-300/40" : ""}`}
                  onChange={(event) => {
                    setLocationValue(event.target.value);
                    handleFieldChange("visit_location");
                  }}
                />
                <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">Use a city, studio name, or full address.</p>
              </div>
              {localErrors.visit_location ? <p className="text-xs text-red-600 dark:text-red-400">{localErrors.visit_location}</p> : null}
            </div>
          </div>
        </article>
        <div className="w-full space-y-4">
          <VisitScheduleField errors={localErrors} onFieldChange={handleFieldChange} />
        </div>
        <div className="mt-10 flex justify-end">
          <div>
            <SettingsSubmitButton isPending={isPending} label={<>Save Visit Details & Continue</>} />
            {hasErrors ? <p className="mt-3 text-sm font-medium text-red-600 dark:text-red-400">{localMessage || "Please fix the highlighted fields."}</p> : null}
          </div>
        </div>
      </Section>
    </form>
  );
}
