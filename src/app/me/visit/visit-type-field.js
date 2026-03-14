"use client";

import { Label } from "@radix-ui/react-label";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { Building2Icon, CalendarClockIcon, HandshakeIcon, Tag, TruckIcon, UsersIcon } from "lucide-react";
import { StarIcon, UserStarIcon } from "lucide-react";

import VisitTypeRadioCard from "./visit-type-radio-card";
import { Stars } from "lucide-react";

export default function VisitTypeField({ errors = {}, onFieldChange }) {
  return (
    <div className="w-full py-4 space-y-3">
      <div className="flex w-full flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 sm:h-7 sm:w-7">
            <Tag className="h-4 w-4 sm:h-4 sm:w-4" />
          </span>
          <div>
            <Label className="inline-flex text-sm font-medium">Visit Type</Label>
            <p className="mt-0.5 text-xs text-gray-500 dark:text-slate-400 sm:hidden">Select the kind of visit</p>
          </div>
        </div>
        <p className="hidden text-xs text-gray-500 dark:text-slate-400 sm:block">Select the kind of visit</p>
      </div>
      {errors.visit_type ? <p className="text-xs text-red-600 dark:text-red-400">{errors.visit_type}</p> : null}

      <div
        className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-none ${
          errors.visit_type ? "border-red-300/70" : ""
        }`}
      >
        <RadioGroup
          name="visit_type"
          defaultValue="guest"
          aria-invalid={Boolean(errors.visit_type)}
          className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          onValueChange={() => onFieldChange?.("visit_type")}
        >
          <VisitTypeRadioCard value="guest" id="visit-guest" title="Guest Spot" subtitle="Temporary visit" icon={<UserStarIcon className="w-5 h-5" />} iconWrapClassName="bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900" />
          <VisitTypeRadioCard value="tour_stop" id="visit-tour-stop" title="Tour Stop" subtitle="Traveling stop" icon={<TruckIcon className="w-5 h-5" />} iconWrapClassName="bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900" />
          <VisitTypeRadioCard value="residency" id="visit-residency" title="Residency" subtitle="Extended stay" icon={<Building2Icon className="w-5 h-5" />} iconWrapClassName="bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900" />
          <VisitTypeRadioCard
            value="seasonal_residency"
            id="visit-seasonal-residency"
            title="Seasonal Residency"
            subtitle="Seasonal stay"
            icon={<CalendarClockIcon className="w-5 h-5" />}
            iconWrapClassName="bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
          />
          <VisitTypeRadioCard value="workshop" id="visit-workshop" title="Workshop" subtitle="Teaching event" icon={<UsersIcon className="w-5 h-5" />} iconWrapClassName="bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900" />
          <VisitTypeRadioCard value="popup" id="visit-popup" title="Pop-up" subtitle="Short-term event" icon={<StarIcon className="w-5 h-5" />} iconWrapClassName="bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900" />
          <VisitTypeRadioCard
            value="collab_session"
            id="visit-collab-session"
            title="Collab Session"
            subtitle="Partnered visit"
            icon={<HandshakeIcon className="w-5 h-5" />}
            iconWrapClassName="bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
          />
          <VisitTypeRadioCard value="custom" id="visit-custom" title="Other" subtitle="Something else" icon={<Stars className="w-5 h-5" />} iconWrapClassName="bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900" />
        </RadioGroup>
      </div>
    </div>
  );
}
