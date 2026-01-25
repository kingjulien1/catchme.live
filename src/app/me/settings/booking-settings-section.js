"use client";

import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { CalendarClock, CheckCircle2, Clock3, Plus, XCircle } from "lucide-react";

import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";

function StatusCard({ id, value, title, subtitle, icon, tone }) {
  return (
    <div className="relative">
      <RadioGroupItem value={value} id={id} className="peer sr-only" />
      <Label
        htmlFor={id}
        className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-5 text-center shadow-sm transition peer-data-[state=checked]:border-emerald-400 peer-data-[state=checked]:bg-emerald-50/40 dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-none dark:peer-data-[state=checked]:border-emerald-400/60 dark:peer-data-[state=checked]:bg-emerald-500/10"
      >
        <div className={`grid h-11 w-11 place-items-center rounded-full ${tone}`}>{icon}</div>
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
        </div>
      </Label>
    </div>
  );
}

function LabeledSelect({ id, label, options, helper, defaultValue }) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id} className="text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
      </Label>
      <div className="w-full">
        <NativeSelect id={id} className="w-full" defaultValue={defaultValue}>
          {options.map((option) => (
            <NativeSelectOption key={option} value={option}>
              {option}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </div>
      {helper ? <p className="text-xs text-slate-500 dark:text-slate-400">{helper}</p> : null}
    </div>
  );
}

export default function BookingSettingsSection({ settings }) {
  const requirements = settings?.requirements || [];
  return (
    <Section title="Booking Settings" subtitle="Set your availability, pricing, and booking requirements in one place." icon={<CalendarClock className="h-5 w-5" />} iconClassName="bg-emerald-600 text-white">
      <div className="mt-6 grid gap-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">Booking Availability Status</div>
            <RadioGroup defaultValue={settings?.status ?? "open"} className="grid gap-3 sm:grid-cols-3">
              <StatusCard id="booking-status-open" value="open" title="Open" subtitle="Accepting bookings" icon={<CheckCircle2 className="h-5 w-5" />} tone="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200" />
              <StatusCard id="booking-status-limited" value="limited" title="Limited" subtitle="Few slots left" icon={<Clock3 className="h-5 w-5" />} tone="bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200" />
              <StatusCard id="booking-status-closed" value="closed" title="Closed" subtitle="Not accepting" icon={<XCircle className="h-5 w-5" />} tone="bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-200" />
            </RadioGroup>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <LabeledSelect id="booking-notice" label="Minimum Booking Notice" options={["Same day", "24 hours", "48 hours", "1 week"]} defaultValue={settings?.min_notice ?? "24 hours"} />
            <LabeledSelect id="booking-advance" label="Maximum Advance Booking" options={["2 weeks", "1 month", "3 months", "6 months"]} defaultValue={settings?.max_advance ?? "1 month"} />
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">Session Types & Pricing</div>
            {[
              { title: "Small Tattoo Session", duration: "1-2 hours", price: "$150/hr" },
              { title: "Medium Tattoo Session", duration: "3-4 hours", price: "$140/hr" },
              { title: "Full Day Session", duration: "5+ hours", price: "$130/hr" },
            ].map((session) => (
              <div key={session.title} className="flex items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-xs dark:border-slate-800/80 dark:bg-slate-900/70">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{session.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{session.duration}</p>
                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <Checkbox id={`${session.title}-available`} defaultChecked />
                    <Label htmlFor={`${session.title}-available`} className="text-xs">
                      Available for booking
                    </Label>
                    <button type="button" className="text-xs font-semibold text-violet-600 hover:text-violet-500">
                      Edit
                    </button>
                  </div>
                </div>
                <div className="text-sm font-semibold text-violet-600 dark:text-violet-300">{session.price}</div>
              </div>
            ))}
            <Button variant="outline" className="w-full border-dashed text-slate-600 dark:text-slate-200">
              <Plus className="h-4 w-4" />
              Add session type
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <LabeledSelect id="deposit-required" label="Deposit Required" options={["No deposit", "Fixed amount", "Percentage"]} defaultValue={settings?.deposit_required ?? "No deposit"} />
            <LabeledSelect id="cancellation-policy" label="Cancellation Policy" options={["Flexible (24h notice)", "Moderate (48h notice)", "Strict (72h notice)"]} defaultValue={settings?.cancellation_policy ?? "Flexible (24h notice)"} />
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">Booking Form Requirements</div>
            <div className="grid gap-3 lg:grid-cols-2">
              {[
                { id: "req-reference", label: "Require reference images", defaultChecked: true },
                { id: "req-placement", label: "Request placement location", defaultChecked: true },
                { id: "req-size", label: "Ask for size estimate", defaultChecked: true },
                { id: "req-history", label: "Require previous tattoo info", defaultChecked: false },
                { id: "req-budget", label: "Request budget range", defaultChecked: true },
                { id: "req-colors", label: "Ask for preferred color palette", defaultChecked: false },
              ].map((item) => (
                <label key={item.id} htmlFor={item.id} className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-xs dark:border-slate-800/80 dark:bg-slate-900/70 dark:text-slate-200">
                  <Checkbox id={item.id} defaultChecked={requirements.includes(item.id) || item.defaultChecked} />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="sm:col-span-2 flex justify-end pt-2">
            <Button className="rounded-full bg-violet-600 px-6 text-white hover:bg-violet-500">Save Booking Settings</Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
