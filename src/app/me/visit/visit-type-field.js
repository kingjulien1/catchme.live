"use client";

import { Label } from "@radix-ui/react-label";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { Building2Icon, GraduationCapIcon, PencilIcon, UsersIcon } from "lucide-react";
import { StarIcon, UserStarIcon } from "lucide-react";

import VisitTypeRadioCard from "./visit-type-radio-card";

export default function VisitTypeField() {
  return (
    <div className="w-full py-4 space-y-4">
      <Label className="text-sm font-medium">Visit Type</Label>

      <RadioGroup defaultValue="guest" className="grid gap-3 mt-2 sm:grid-cols-2 lg:grid-cols-3">
        <VisitTypeRadioCard value="guest" id="visit-guest" title="Guest Spot" subtitle="Temporary visit" icon={<UserStarIcon className="w-5 h-5" />} iconWrapClassName="bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-200" />
        <VisitTypeRadioCard value="residency" id="visit-residency" title="Residency" subtitle="Extended stay" icon={<Building2Icon className="w-5 h-5" />} iconWrapClassName="bg-pink-100 text-pink-700 dark:bg-pink-500/20 dark:text-pink-200" />
        <VisitTypeRadioCard
          value="convention"
          id="visit-convention"
          title="Convention"
          subtitle="Event appearance"
          icon={<UsersIcon className="w-5 h-5" />}
          iconWrapClassName="bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200"
        />
        <VisitTypeRadioCard
          value="workshop"
          id="visit-workshop"
          title="Workshop"
          subtitle="Teaching event"
          icon={<GraduationCapIcon className="w-5 h-5" />}
          iconWrapClassName="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200"
        />
        <VisitTypeRadioCard value="popup" id="visit-popup" title="Pop-up" subtitle="Short-term event" icon={<StarIcon className="w-5 h-5" />} iconWrapClassName="bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200" />
        <VisitTypeRadioCard value="custom" id="visit-custom" title="Custom" subtitle="Create your own" icon={<PencilIcon className="w-5 h-5" />} iconWrapClassName="bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-200" />
      </RadioGroup>
    </div>
  );
}
