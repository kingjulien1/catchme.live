"use client";

import { useActionState } from "react";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { Building2, Check, Info, Paintbrush } from "lucide-react";

import Section from "@/components/Section";
import SettingsSubmitButton from "@/components/settings-submit-button";

function AccountTypeCard({ value, id, title, description, points, icon, iconClassName }) {
  return (
    <div className="relative">
      <RadioGroupItem value={value} id={id} className="peer sr-only" />
      <Label
        htmlFor={id}
        className="flex cursor-pointer items-start gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-violet-300 hover:bg-violet-50/30 peer-data-[state=checked]:border-violet-400 peer-data-[state=checked]:bg-violet-50/50 dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-none dark:hover:bg-slate-900/90 dark:peer-data-[state=checked]:border-violet-400/70 dark:peer-data-[state=checked]:bg-violet-500/10"
      >
        <div className={`grid place-items-center rounded-full ${iconClassName}`}>{icon}</div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 sm:text-base">{title}</p>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 sm:text-sm">{description}</p>
          <ul className="mt-3 space-y-1 text-xs text-slate-500 dark:text-slate-400">
            {points.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-200">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </Label>
      <span className="pointer-events-none absolute right-4 top-4 grid h-5 w-5 place-items-center rounded-full border border-gray-300 bg-white text-transparent transition peer-data-[state=checked]:border-violet-500 peer-data-[state=checked]:text-violet-500 dark:border-slate-700 dark:bg-slate-950">
        <Check className="h-3.5 w-3.5" />
      </span>
    </div>
  );
}

const initialState = { ok: false, message: "" };

export default function AccountTypeSection({ user, action }) {
  const defaultAccountType = user?.account_type === "studio" ? "studio" : "artist";
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <Section title="Account Type" subtitle="Choose the account type that best matches how you use catchme.live." icon={<Paintbrush className="h-5 w-5" />} iconClassName="bg-violet-600 text-white">
      <form action={formAction} className="mt-6 space-y-6">
        <RadioGroup name="account_type" defaultValue={defaultAccountType} className="grid gap-4 lg:grid-cols-2">
          <AccountTypeCard
            value="artist"
            id="account-type-artist"
            title="Artist Account"
            description="Perfect for tattoo artists, musicians, painters, and other creative professionals who travel for their craft."
            points={["Announce travel plans", "Accept bookings", "Showcase portfolio"]}
            icon={<Paintbrush className="h-6 w-6" />}
            iconClassName="bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-200"
          />
          <AccountTypeCard
            value="studio"
            id="account-type-studio"
            title="Studio / Venue Account"
            description="Ideal for tattoo studios, galleries, music venues, and other establishments hosting visiting artists."
            points={["Host guest artists", "Manage calendar", "Promote events"]}
            icon={<Building2 className="h-6 w-6" />}
            iconClassName="bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-500/20 dark:text-fuchsia-200"
          />
        </RadioGroup>

        <div className="flex items-start gap-3 rounded-2xl border border-blue-200 bg-blue-50/60 p-4 text-sm text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-200">
          <span className="mt-0.5 grid h-7 w-7 place-items-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-200">
            <Info className="h-4 w-4" />
          </span>
          <div>
            <p className="font-semibold">Account Type Information</p>
            <p className="mt-1 text-xs text-blue-700/80 dark:text-blue-200/80">Your account type determines the features available to you. You can change this later, but some data may need to be reconfigured.</p>
            {state.message ? <p className="mt-2 text-xs text-red-600 dark:text-red-300">{state.message}</p> : null}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <span>Last updated: 2 days ago</span>
          <SettingsSubmitButton isPending={isPending} label="Save Account Type" className="ml-auto bg-violet-600 text-white hover:bg-violet-500" />
        </div>
      </form>
    </Section>
  );
}
