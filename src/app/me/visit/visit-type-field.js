"use client";

import { Label } from "@radix-ui/react-label";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { Building2Icon, GraduationCapIcon, PencilIcon, Tag, UsersIcon } from "lucide-react";
import { StarIcon, UserStarIcon } from "lucide-react";

import VisitTypeRadioCard from "./visit-type-radio-card";
import { Stars } from "lucide-react";

export default function VisitTypeField({ errors = {}, onFieldChange }) {
  return (
    <div className="w-full py-4 space-y-3">
      <Label className="inline-flex items-center gap-2 text-sm font-medium">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200">
          <Tag className="h-4 w-4" />
        </span>
        Visit Type
      </Label>
      {errors.visit_type ? <p className="text-xs text-red-600 dark:text-red-400">{errors.visit_type}</p> : null}

      <div className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-none ${errors.visit_type ? "border-red-300/70" : ""}`}>
        <RadioGroup
          name="visit_type"
          defaultValue="guest"
          aria-invalid={Boolean(errors.visit_type)}
          className="grid gap-4 sm:grid-cols-2"
          onValueChange={() => onFieldChange?.("visit_type")}
        >
          <VisitTypeRadioCard value="guest" id="visit-guest" title="Guest Spot" subtitle="Temporary visit" icon={<UserStarIcon className="w-5 h-5" />} iconWrapClassName="bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-200" />
          <VisitTypeRadioCard value="residency" id="visit-residency" title="Residency" subtitle="Extended stay" icon={<Building2Icon className="w-5 h-5" />} iconWrapClassName="bg-pink-100 text-pink-700 dark:bg-pink-500/20 dark:text-pink-200" />
          <VisitTypeRadioCard
            value="workshop"
            id="visit-workshop"
            title="Workshop"
            subtitle="Teaching event"
            icon={<GraduationCapIcon className="w-5 h-5" />}
            iconWrapClassName="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200"
          />
          <VisitTypeRadioCard value="popup" id="visit-popup" title="Pop-up" subtitle="Short-term event" icon={<StarIcon className="w-5 h-5" />} iconWrapClassName="bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200" />
          <VisitTypeRadioCard
            value="convention"
            id="visit-convention"
            title="Convention"
            subtitle="Event appearance"
            icon={<UsersIcon className="w-5 h-5" />}
            iconWrapClassName="bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200"
          />
          <VisitTypeRadioCard value="custom" id="visit-custom" title="Other" subtitle="Create your own" icon={<Stars className="w-5 h-5" />} iconWrapClassName="bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-200" />
        </RadioGroup>
      </div>
    </div>
  );
}
