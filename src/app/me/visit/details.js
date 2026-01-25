"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { CheckIcon, InfoIcon, PinIcon } from "lucide-react";

import Section from "@/components/Section";
import DestinationAccountField from "./destination-account-field";
import VisitScheduleField from "./visit-schedule-field";
import VisitTypeField from "./visit-type-field";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

/**
 * VisitDetailsSection component renders a section for entering visit details including
 * destination Instagram handle, destination location, date & time, visit type, and description.
 * This section includes various input fields, radio buttons for visit type selection.
 *
 * @returns {JSX.Element} The rendered VisitDetailsSection component.
 */
export default function VisitDetailsSection({ errors = {}, onFieldChange }) {
  const [locationValue, setLocationValue] = useState("");

  return (
    <Section title="Visit Details" icon={<PinIcon className="w-4 h-4" />} subtitle="Provide information about your upcoming visit location and schedule.">
      {/* Instagram Handle Input Group */}
      <article className="pt-6 my-4 space-y-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          <DestinationAccountField onLocationChange={setLocationValue} error={errors.destination_instagram_handle} onFieldChange={onFieldChange} />

          {/* Location Details Input Group */}
          <div className="grid items-center self-start w-full gap-3">
            <div className="flex flex-col w-full gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <Label className="text-sm font-medium" htmlFor="location">
                Visit Location
              </Label>
              <p className="text-xs text-gray-500 dark:text-slate-400">Instagram Username</p>
            </div>
            <Input
              id="location"
              name="visit_location"
              placeholder="Vienna, Austria (or full address)"
              value={locationValue}
              aria-invalid={Boolean(errors.visit_location)}
              className={errors.visit_location ? "border-red-400 focus-visible:ring-red-300/40" : ""}
              onChange={(event) => {
                setLocationValue(event.target.value);
                onFieldChange?.("visit_location");
              }}
            />
            {errors.visit_location ? <p className="text-xs text-red-600 dark:text-red-400">{errors.visit_location}</p> : null}
          </div>
        </div>
      </article>
      <div className="w-full space-y-4">
        <VisitTypeField errors={errors} onFieldChange={onFieldChange} />
        <VisitScheduleField errors={errors} onFieldChange={onFieldChange} />
        <div className="w-full pt-4 space-y-3">
          <div className="flex flex-col w-full gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <Label className="text-sm font-medium" htmlFor="description">
              Visit Description <span className="text-xs text-gray-400">(Optional)</span>
            </Label>
          </div>

          <Textarea
            id="description"
            name="description"
            maxLength={500}
            placeholder="Add any additional details about your visit, special offerings, or what clients can expect…"
            className={`bg-white min-h-32 dark:bg-slate-950 ${errors.description ? "border-red-400 focus-visible:ring-red-300/40" : ""}`}
            aria-invalid={Boolean(errors.description)}
            onChange={() => onFieldChange?.("description")}
          />
          {errors.description ? <p className="text-xs text-red-600 dark:text-red-400">{errors.description}</p> : null}

          <div className="flex flex-col gap-1 text-xs text-gray-500 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <span>Share details about your availability, pricing, or booking process</span>
            <span>0 / 500</span>
          </div>

          <Alert className="py-3 bg-sky-50 dark:bg-sky-500/10" variant="default">
            <InfoIcon className="text-sky-700 dark:text-sky-200" />
            <AlertTitle className="text-sm text-gray-800 dark:text-slate-100">Best Practices for Visit Descriptions</AlertTitle>
            <AlertDescription className="mt-3">
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-slate-300">
                  <CheckIcon className="mt-0.5 h-4 w-4 text-emerald-500 dark:text-emerald-300" />
                  <span>How to book (Instagram DMs, etc.)</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-slate-300">
                  <CheckIcon className="mt-0.5 h-4 w-4 text-emerald-500 dark:text-emerald-300" />
                  <span>Age policy (18+, all ages welcome)</span>
                </div>

                <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-slate-300">
                  <CheckIcon className="mt-0.5 h-4 w-4 text-emerald-500 dark:text-emerald-300" />
                  <span>Deposit requirements and amount</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-slate-300">
                  <CheckIcon className="mt-0.5 h-4 w-4 text-emerald-500 dark:text-emerald-300" />
                  <span>Languages spoken</span>
                </div>

                <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-slate-300">
                  <CheckIcon className="mt-0.5 h-4 w-4 text-emerald-500 dark:text-emerald-300" />
                  <span>Pricing range or minimum</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-slate-300">
                  <CheckIcon className="mt-0.5 h-4 w-4 text-emerald-500 dark:text-emerald-300" />
                  <span>Specialties or style preferences</span>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </Section>
  );
}
