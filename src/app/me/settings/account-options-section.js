"use client";

import * as React from "react";
import { Bell, CalendarClock, Eye, Globe2, Mail, ShieldCheck, Sparkles, UserCog } from "lucide-react";

import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

function SettingsOptionCard({ id, name, title, description, icon, checked, onCheckedChange }) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-white p-4 shadow-sm transition sm:p-5 dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-none",
        checked ? "border-violet-300 bg-violet-50/30 dark:border-violet-400/60 dark:bg-violet-500/10" : "border-gray-200 hover:bg-gray-50 dark:hover:bg-slate-900/90",
      )}
    >
      <input type="hidden" name={name} value={checked ? "true" : "false"} />
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="shrink-0 pt-0.5">
          <Checkbox id={id} name={name} checked={checked} onCheckedChange={onCheckedChange} />
        </div>
        <label htmlFor={id} className="flex w-full min-w-0 flex-1 cursor-pointer items-start gap-3">
          <div className="shrink-0">{icon}</div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-slate-100 sm:text-base">{title}</p>
            <p className="mt-1 text-xs text-gray-600 dark:text-slate-300 sm:text-sm">{description}</p>
          </div>
        </label>
      </div>
    </div>
  );
}

export default function AccountOptionsSection({ options }) {
  const [state, setState] = React.useState(() => ({
    publicProfile: options?.public_profile ?? true,
    showAvailability: options?.show_availability ?? true,
    showCounts: options?.show_counts ?? true,
    emailUpdates: options?.email_updates ?? false,
    dmRequests: options?.dm_requests ?? true,
    bookingIntros: options?.booking_intros ?? true,
    weeklyDigest: options?.weekly_digest ?? false,
    analyticsSharing: options?.analytics_sharing ?? false,
  }));

  const setOption = (key) => (value) => {
    const next = value === true;
    setState((prev) => ({ ...prev, [key]: next }));
  };

  return (
    <Section title="Account Settings" subtitle="Control how your profile appears and how people can reach you." icon={<UserCog className="h-5 w-5" />} iconClassName="bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">
      <div className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4">
        <SettingsOptionCard
          id="settings-public-profile"
          name="settings_public_profile"
          title="Public profile"
          description="Make your profile visible on the artist directory."
          checked={state.publicProfile}
          onCheckedChange={setOption("publicProfile")}
          icon={
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200 sm:h-10 sm:w-10">
              <Globe2 className="h-5 w-5" />
            </div>
          }
        />

        <SettingsOptionCard
          id="settings-show-availability"
          name="settings_show_availability"
          title="Show availability"
          description="Display if you are currently open for bookings."
          checked={state.showAvailability}
          onCheckedChange={setOption("showAvailability")}
          icon={
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200 sm:h-10 sm:w-10">
              <CalendarClock className="h-5 w-5" />
            </div>
          }
        />

        <SettingsOptionCard
          id="settings-show-counts"
          name="settings_show_counts"
          title="Show follower counts"
          description="Display your follower and media counts on profile."
          checked={state.showCounts}
          onCheckedChange={setOption("showCounts")}
          icon={
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-200 sm:h-10 sm:w-10">
              <Eye className="h-5 w-5" />
            </div>
          }
        />

        <SettingsOptionCard
          id="settings-dm-requests"
          name="settings_dm_requests"
          title="Direct booking requests"
          description="Allow clients to request bookings from your profile."
          checked={state.dmRequests}
          onCheckedChange={setOption("dmRequests")}
          icon={
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-200 sm:h-10 sm:w-10">
              <Sparkles className="h-5 w-5" />
            </div>
          }
        />

        <SettingsOptionCard
          id="settings-booking-intros"
          name="settings_booking_intros"
          title="Booking introductions"
          description="Let studios introduce you to their client list."
          checked={state.bookingIntros}
          onCheckedChange={setOption("bookingIntros")}
          icon={
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200 sm:h-10 sm:w-10">
              <ShieldCheck className="h-5 w-5" />
            </div>
          }
        />

        <SettingsOptionCard
          id="settings-email-updates"
          name="settings_email_updates"
          title="Email updates"
          description="Receive important updates about bookings and changes."
          checked={state.emailUpdates}
          onCheckedChange={setOption("emailUpdates")}
          icon={
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-200 sm:h-10 sm:w-10">
              <Mail className="h-5 w-5" />
            </div>
          }
        />

        <SettingsOptionCard
          id="settings-weekly-digest"
          name="settings_weekly_digest"
          title="Weekly digest"
          description="Get a weekly summary of profile performance."
          checked={state.weeklyDigest}
          onCheckedChange={setOption("weeklyDigest")}
          icon={
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-200 sm:h-10 sm:w-10">
              <Bell className="h-5 w-5" />
            </div>
          }
        />

        <SettingsOptionCard
          id="settings-analytics"
          name="settings_analytics"
          title="Share anonymized analytics"
          description="Help improve recommendations with anonymous usage data."
          checked={state.analyticsSharing}
          onCheckedChange={setOption("analyticsSharing")}
          icon={
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200 sm:h-10 sm:w-10">
              <UserCog className="h-5 w-5" />
            </div>
          }
        />

        <div className="sm:col-span-2 flex justify-end pt-2">
          <Button className="ml-auto rounded-full bg-slate-900 px-6 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white">Save Account Preferences</Button>
        </div>
      </div>
    </Section>
  );
}
