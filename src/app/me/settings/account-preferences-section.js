"use client";

import { useActionState } from "react";
import { Label } from "@radix-ui/react-label";
import { Check, Info, Settings } from "lucide-react";

import Section from "@/components/Section";
import SettingsSubmitButton from "@/components/settings-submit-button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SpecialisationsInput from "./specialisations-input";

const initialState = { ok: false, message: "" };

export default function AccountPreferencesSection({ user, action }) {
  const usernameValue = user?.username ? `@${user.username}` : "";
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <Section title="General Account Details" subtitle="Update profile details that show up on your public page and booking flow." icon={<Settings className="h-5 w-5" />} iconClassName="bg-pink-500 text-white dark:bg-indigo-500 dark:text-white">
      <form action={formAction} className="mt-6 space-y-6">
        <div className="grid gap-6 lg:grid-cols-2 items-start">
          <div className="grid gap-2">
            <Label htmlFor="settings-name" className="text-sm font-medium">
              Name
            </Label>
            <Input id="settings-name" name="name" placeholder="Your display name" defaultValue={user?.name ?? ""} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="settings-location" className="text-sm font-medium">
              Location
            </Label>
            <Input id="settings-location" name="location" placeholder="City, Country" defaultValue={user?.location ?? ""} />
            <p className="text-xs text-slate-500 dark:text-slate-400">Shown on your public profile and visit cards.</p>
          </div>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="settings-username" className="text-sm font-medium">
              Username
            </Label>
            <Input id="settings-username" name="username" placeholder="@username" readOnly defaultValue={usernameValue} className="bg-slate-100 text-slate-500 dark:bg-slate-900/60" />
            <p className="text-xs text-slate-500 dark:text-slate-400">Your handle is linked to Instagram and can’t be edited.</p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="settings-email" className="text-sm font-medium">
              Email address
            </Label>
            <Input id="settings-email" name="email" type="email" placeholder="you@email.com" defaultValue={user?.email ?? ""} />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="settings-specialisation" className="text-sm font-medium">
            Specialisations
          </Label>
          <SpecialisationsInput defaultValue={user?.specialisations ?? ""} />
          <p className="text-xs text-slate-500 dark:text-slate-400">Comma-separated tags help clients find you.</p>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="settings-bio" className="text-sm font-medium">
            Biography
          </Label>
          <Textarea id="settings-bio" name="bio" placeholder="Share your style, experience, and what clients can expect." className="min-h-32" defaultValue={user?.bio ?? ""} />
          <p className="text-xs text-slate-500 dark:text-slate-400">Keep it short and focused on your craft.</p>
        </div>

        <Alert className="bg-sky-50 py-3 dark:bg-sky-500/10" variant="default">
          <Info className="text-sky-700 dark:text-sky-200" />
          <AlertTitle className="text-sm text-slate-900 dark:text-slate-100">Biography tips</AlertTitle>
          <AlertDescription className="mt-3">
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Mention your signature style or specialties",
                "Include years of experience or training",
                "Share what clients can expect from a session",
                "List preferred subjects or themes",
                "Keep it under 3-4 short sentences",
                "Add your availability or booking approach",
              ].map((tip) => (
                <div key={tip} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <Check className="mt-0.5 h-4 w-4 text-emerald-500 dark:text-emerald-300" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </AlertDescription>
        </Alert>

        {state.message ? <p className="text-xs text-red-600 dark:text-red-300">{state.message}</p> : null}

        <div className="flex justify-end">
          <SettingsSubmitButton
            isPending={isPending}
            label="Save Account Details"
            className="ml-auto bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
          />
        </div>
      </form>
    </Section>
  );
}
