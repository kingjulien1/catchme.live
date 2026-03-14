"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { ArrowRight, AtSignIcon, Building2, CheckCircle2, Clock, Eye, FileText, HelpCircle, LayersPlus, MapPin, PinIcon, Sparkles } from "lucide-react";

import { Input } from "@/components/ui/input";
import Section from "@/components/Section";
import SettingsSubmitButton from "@/components/settings-submit-button";
import LinkedAccountsInput from "./linked-accounts-input";
import VisitScheduleField from "./visit-schedule-field";
import VisitTypeField from "./visit-type-field";
import VisitFormFooter from "./visit-form-footer";
import { MoveLeft } from "lucide-react";
import { ArchiveX } from "lucide-react";

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
      <Section
        title={null}
        icon={null}
        subtitle={null}
        headerRight={null}
        headerContent={
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-medium text-slate-500 dark:text-slate-400 sm:text-sm">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                <LayersPlus className="h-4 w-4 text-emerald-500" />
                Creating New Visit
              </span>
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 text-xs font-semibold">Step 1 of 3</span>
            </div>

            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-900 text-white shadow-sm dark:bg-slate-100 dark:text-slate-900 sm:h-14 sm:w-14">
                <MapPin className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 id="visit-start" className="text-2xl font-semibold tracking-tight text-gray-900 scroll-mt-20 dark:text-slate-100 sm:scroll-mt-24 sm:text-3xl">
                    Create New Visit
                  </h1>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold tracking-wide text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                    <Sparkles className="h-3.5 w-3.5 text-slate-500 dark:text-slate-300" />
                    Draft
                  </span>
                </div>
                <p className="line-clamp-4 sm:line-clamp-none text-sm text-gray-500 dark:text-slate-400 sm:text-base">
                  Set up your visit details including location, timing, and connected accounts so clients can discover and book you with confidence. We’ll use this information to personalize your visit page and keep everything consistent across your
                  profile. You can edit these details anytime before publishing.
                </p>
                <div className="flex flex-col gap-3 text-sm text-slate-500 dark:text-slate-400 sm:flex-row sm:items-center sm:gap-6">
                  <span className="inline-flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    ~3 minutes to complete
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Auto-saved as you type
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Eye className="h-4 w-4 text-blue-500" />
                    Preview before publishing
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-6 h-px w-full bg-slate-200/80 dark:bg-slate-800/80" />
          </div>
        }
      >
        <div className="w-full py-6 space-y-4">
          <VisitTypeField errors={localErrors} onFieldChange={handleFieldChange} />
        </div>
        <article className="my-4 space-y-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
            <div className="grid items-center w-full gap-3">
              <div className="flex w-full flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 sm:h-7 sm:w-7">
                    <AtSignIcon className="h-4 w-4 sm:h-4 sm:w-4" />
                  </span>
                  <div>
                    <Label className="inline-flex text-sm font-medium" htmlFor="instagram-handle">
                      Destination Accounts
                    </Label>
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-slate-400 sm:hidden">Instagram username</p>
                  </div>
                </div>
                <p className="hidden text-xs text-gray-500 dark:text-slate-400 sm:block">Instagram username</p>
              </div>
              <LinkedAccountsInput
                inputId="instagram-handle"
                name="destination_accounts"
                description="Link the accounts where you'll be staying or performing during your live stop or residency."
                error={Boolean(localErrors.destination_accounts)}
                onFieldChange={handleFieldChange}
              />
              <p className="min-h-[1rem] text-xs text-red-600 dark:text-red-400">{localErrors.destination_accounts || ""}</p>
            </div>
            <div className="grid items-center w-full gap-3">
              <div className="flex w-full flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 sm:h-7 sm:w-7">
                    <AtSignIcon className="h-4 w-4 sm:h-4 sm:w-4" />
                  </span>
                  <div>
                    <Label className="inline-flex text-sm font-medium" htmlFor="linked-accounts">
                      Linked Accounts
                    </Label>
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-slate-400 sm:hidden">Instagram usernames</p>
                  </div>
                </div>
                <p className="hidden text-xs text-gray-500 dark:text-slate-400 sm:block">Instagram usernames</p>
              </div>
              <LinkedAccountsInput inputId="linked-accounts" name="linked_accounts" onFieldChange={handleFieldChange} />
              <p className="min-h-[1rem] text-xs text-transparent">.</p>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="grid items-center w-full gap-3">
              <div className="flex w-full flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 sm:h-7 sm:w-7">
                    <Building2 className="h-4 w-4 sm:h-4 sm:w-4" />
                  </span>
                  <div>
                    <Label className="inline-flex text-sm font-medium" htmlFor="venue-event">
                      Venue / Event
                    </Label>
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-slate-400 sm:hidden">Where it takes place</p>
                  </div>
                </div>
                <p className="hidden text-xs text-gray-500 dark:text-slate-400 sm:block">Where it takes place</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-none">
                <Input id="venue-event" name="venue_event" placeholder="Black Bear Studio / Berlin Pop-up" className="h-11 rounded-xl border-slate-200 shadow-none dark:border-slate-800" />
                <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">Add the venue, studio, or event name for this stop.</p>
              </div>
              <p className="min-h-[1rem] text-xs text-transparent">.</p>
            </div>
            <div className="grid items-center self-start w-full gap-3">
              <div className="flex w-full flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 sm:h-7 sm:w-7">
                    <MapPin className="h-4 w-4 sm:h-4 sm:w-4" />
                  </span>
                  <div>
                    <Label className="inline-flex text-sm font-medium" htmlFor="location">
                      Visit Location
                    </Label>
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-slate-400 sm:hidden">City & Country of the visit</p>
                  </div>
                </div>
                <p className="hidden text-xs text-gray-500 dark:text-slate-400 sm:block">City & Country of the visit</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-none">
                <Input
                  id="location"
                  name="visit_location"
                  placeholder="Vienna, Austria (or full address)"
                  value={locationValue}
                  aria-invalid={Boolean(localErrors.visit_location)}
                  className={`h-11 rounded-xl border-slate-200 shadow-none dark:border-slate-800 ${localErrors.visit_location ? "border-red-400 bg-rose-50/40 focus-visible:ring-red-300/40 dark:bg-rose-500/10 dark:border-red-400" : ""}`}
                  onChange={(event) => {
                    setLocationValue(event.target.value);
                    handleFieldChange("visit_location");
                  }}
                />
                <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">Use a city, studio name, or full address.</p>
              </div>
              <p className="min-h-[1rem] text-xs text-red-600 dark:text-red-400">{localErrors.visit_location || ""}</p>
            </div>
          </div>
        </article>
        <div className="w-full space-y-4">
          <VisitScheduleField errors={localErrors} onFieldChange={handleFieldChange} />
        </div>
        <div className="mt-10 border-t border-slate-200 pt-6 dark:border-slate-800 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="order-2 flex w-full flex-col gap-3 sm:order-1 sm:w-auto">
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-slate-500 dark:text-slate-400 sm:justify-start sm:text-sm">
              <Link
                href="/help"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 transition hover:text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
              >
                <HelpCircle className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                Need Help?
              </Link>
              <Link
                href="/me/settings#autosave"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 transition hover:text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Auto-saved
              </Link>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                <FileText className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                Draft
              </span>
            </div>
          </div>
          <div className="order-1 w-full sm:order-2 sm:w-auto">
            <SettingsSubmitButton isPending={isPending} label={<>Save Visit Details & Continue</>} icon={<Sparkles className="h-4 w-4" />} />
            {hasErrors ? <p className="mt-3 text-sm font-medium text-red-600 dark:text-red-400">{localMessage || "Please fix the highlighted fields."}</p> : null}
          </div>
        </div>
      </Section>
      <Section
        title={null}
        icon={null}
        subtitle={null}
        headerRight={null}
        className="opacity-90"
        headerContent={<VisitFormFooter />}
      />
    </form>
  );
}
