import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { AtSignIcon, Building2Icon, CheckIcon, ClockIcon, GraduationCapIcon, InfoIcon, PaletteIcon, PencilIcon, PinIcon, SearchIcon, UserPlusIcon, UsersIcon } from "lucide-react";

import Section from "./Section";

function VisitTypeRadioCard({ value, id, title, subtitle, icon, iconWrapClassName }) {
  return (
    <div className="relative">
      <RadioGroupItem value={value} id={id} className="peer sr-only" />

      <Label
        htmlFor={id}
        className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 pr-12 shadow-sm transition hover:bg-gray-50 peer-data-[state=checked]:border-violet-300 peer-data-[state=checked]:bg-violet-50/40"
      >
        <div className={`grid h-10 w-10 place-items-center rounded-lg ${iconWrapClassName}`}>{icon}</div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900">{title}</p>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
      </Label>

      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 grid h-4 w-4 place-items-center rounded-full border border-gray-200 bg-white text-gray-400 opacity-0 transition peer-data-[state=checked]:opacity-100 peer-data-[state=checked]:border-violet-600 peer-data-[state=checked]:bg-violet-600 peer-data-[state=checked]:text-white">
        <CheckIcon className="h-3 w-3" />
      </span>
    </div>
  );
}

/**
 * VisitDetailsSection component renders a section for entering visit details including
 * destination Instagram handle, destination location, date & time, visit type, and description.
 * This section includes various input fields, radio buttons for visit type selection.
 *
 * @returns {JSX.Element} The rendered VisitDetailsSection component.
 */
export default function VisitDetailsSection() {
  return (
    <Section title="Visit Details" icon={<PinIcon className="h-4 w-4" />} subtitle="Provide information about your upcoming visit location and schedule.">
      {/* Instagram Handle Input Group */}
      <article className="my-5 space-y-6">
        <div className="grid w-full items-center gap-3">
          <div className="flex flex-row w-full justify-between items-baseline">
            <Label className="text-sm font-medium" htmlFor="instagram-handle">
              Destination Studio / Shop Instagram Handle
            </Label>
            <p className="text-xs text-gray-500">Instagram Username</p>
          </div>
          <InputGroup>
            <InputGroupInput id="instagram-handle" placeholder="Search..." />
            <InputGroupAddon>
              <AtSignIcon className="h-4 w-4 font-gray-200" />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              <div className="flex size-4 items-center justify-center rounded-full">
                <SearchIcon className="size-3" />
              </div>
            </InputGroupAddon>
          </InputGroup>
          <p className="text-xs text-gray-500 -mt-1">Tip: If the studio doesn’t have an Instagram account, you can manually enter location details in the next field.</p>
        </div>

        {/* Location Details Input Group */}
        <div className="grid w-full items-center gap-3">
          <div className="flex flex-row w-full justify-between items-baseline">
            <Label className="text-sm font-medium" htmlFor="location">
              Visit Location
            </Label>
            <p className="text-xs text-gray-500">Instagram Username</p>
          </div>
          <Input id="location" placeholder="Vienna, Austria (or full address)" />
          <p className="text-xs text-gray-500 -mt-1">Tip: If the studio doesn’t have an Instagram account, you can manually enter location details in the next field.</p>
        </div>
      </article>
      <div className="pt-8 w-full space-y-4">
        <div className="flex-row items-center justify-between flex space-x-4">
          <div className="grid w-full items-center gap-3">
            <Label className="text-sm font-medium" htmlFor="start-time">
              Start Date & Time
            </Label>
            <Input id="start-time" type="datetime-local" className="w-full bg-white" />
          </div>
          <div className="grid w-full items-center gap-3">
            <Label className="text-sm font-medium" htmlFor="end-time">
              End Date & Time
            </Label>
            <Input id="end-time" type="datetime-local" className="w-full bg-white" />
          </div>
        </div>
        <Alert className="mt-4 bg-purple-50" variant="info">
          <ClockIcon color="purple" className="h-4 w-4" />
          <AlertTitle className="text-sm font-semibold">Visit Duration</AlertTitle>
          <AlertDescription className="text-sm text-gray-600">7 days and 8 hours</AlertDescription>
        </Alert>
        <div className="py-4 w-full space-y-4">
          <Label className="text-sm font-medium">Visit Type</Label>

          <RadioGroup defaultValue="guest" className="mt-2 grid gap-3 sm:grid-cols-2">
            <VisitTypeRadioCard value="guest" id="visit-guest" title="Guest Spot" subtitle="Temporary visit" icon={<UserPlusIcon className="h-5 w-5" />} iconWrapClassName="bg-violet-100 text-violet-700" />
            <VisitTypeRadioCard value="residency" id="visit-residency" title="Residency" subtitle="Extended stay" icon={<Building2Icon className="h-5 w-5" />} iconWrapClassName="bg-pink-100 text-pink-700" />
            <VisitTypeRadioCard value="convention" id="visit-convention" title="Convention" subtitle="Event appearance" icon={<UsersIcon className="h-5 w-5" />} iconWrapClassName="bg-indigo-100 text-indigo-700" />
            <VisitTypeRadioCard value="workshop" id="visit-workshop" title="Workshop" subtitle="Teaching event" icon={<GraduationCapIcon className="h-5 w-5" />} iconWrapClassName="bg-emerald-100 text-emerald-700" />
            <VisitTypeRadioCard value="popup" id="visit-popup" title="Pop-up" subtitle="Short-term event" icon={<PaletteIcon className="h-5 w-5" />} iconWrapClassName="bg-amber-100 text-amber-700" />
            <VisitTypeRadioCard value="custom" id="visit-custom" title="Custom" subtitle="Create your own" icon={<PencilIcon className="h-5 w-5" />} iconWrapClassName="bg-gray-100 text-gray-700" />
          </RadioGroup>
        </div>
        <div className="w-full space-y-3">
          <div className="flex w-full items-baseline justify-between">
            <Label className="text-sm font-medium" htmlFor="description">
              Visit Description <span className="text-xs text-gray-400">(Optional)</span>
            </Label>
          </div>

          <Textarea id="description" name="description" maxLength={500} placeholder="Add any additional details about your visit, special offerings, or what clients can expect…" className="min-h-32 bg-white" />

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Share details about your availability, pricing, or booking process</span>
            <span>0 / 500</span>
          </div>

          <Alert className="py-3 bg-sky-50" variant="default">
            <InfoIcon color="blue" />
            <AlertTitle className="text-sm text-gray-800">Best Practices for Visit Descriptions</AlertTitle>
            <AlertDescription className="mt-3">
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckIcon className="mt-0.5 h-4 w-4 text-emerald-500" />
                  <span>How to book (Instagram DMs, email, etc.)</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckIcon className="mt-0.5 h-4 w-4 text-emerald-500" />
                  <span>Age policy (18+, all ages welcome)</span>
                </div>

                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckIcon className="mt-0.5 h-4 w-4 text-emerald-500" />
                  <span>Deposit requirements and amount</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckIcon className="mt-0.5 h-4 w-4 text-emerald-500" />
                  <span>Languages spoken</span>
                </div>

                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckIcon className="mt-0.5 h-4 w-4 text-emerald-500" />
                  <span>Pricing range or minimum</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckIcon className="mt-0.5 h-4 w-4 text-emerald-500" />
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
