"use client";

import * as React from "react";
import { useActionState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BadgeCheck, CheckCircle2, Clock, Eye, FileText, HandCoins, Hourglass, ImageIcon, Info, LayersPlus, MessageCircle, ShieldAlert, ShieldCheck, Sparkles, Tag, Type, Users, Wand2, XCircle, Zap } from "lucide-react";

import SettingsSubmitButton from "@/components/settings-submit-button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { getRadioCardClasses } from "@/components/ui/radio-card-styles";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import VisitFormFooter from "../../visit-form-footer";

const initialState = {};
const SECTION_ICON_CHIP = "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900";

// THIS IS THE MAIN GRADIENT
// bg-gradient-to-br from-slate-100/90 via-purple-100/60 to-purple-50/30 dark:from-slate-900/90 dark:via-purple-400/20 dark:to-purple-500/10

function BookingStatusCard({ active, title, description, icon, tone, onClick }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={active} className={cn("w-full rounded-2xl px-4 py-5 text-center", getRadioCardClasses({ selected: active }))}>
      <div className="flex flex-col items-center gap-2">
        <div className={`grid h-11 w-11 place-items-center rounded-full ${tone}`}>{icon}</div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p>
        </div>
      </div>
    </button>
  );
}

function AdditionalOptionCard({ id, name, title, description, icon, checked, onCheckedChange }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-none">
      <input type="hidden" name={name} value={checked ? "true" : "false"} />
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">{icon}</div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</p>
            <p className="text-xs text-slate-500 dark:text-slate-300">{description}</p>
          </div>
        </div>
        <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
      </div>
    </div>
  );
}

function resolveBookingDefaults(defaultBookingStatus) {
  if (defaultBookingStatus === "limited") {
    return { bookingsOpen: true, appointmentOnly: true };
  }
  if (defaultBookingStatus === "closed") {
    return { bookingsOpen: false, appointmentOnly: false };
  }
  if (defaultBookingStatus === "open") {
    return { bookingsOpen: true, appointmentOnly: false };
  }
  return null;
}

export default function VisitOptionsForm({ action, initialValues, defaultBookingStatus }) {
  const [state, formAction, isPending] = useActionState(action, initialState);
  void state;
  const bookingDefaults = resolveBookingDefaults(defaultBookingStatus);
  const initialBookingOpen = initialValues?.bookings_open ?? bookingDefaults?.bookingsOpen ?? true;
  const initialAppointmentOnly = initialValues?.appointment_only ?? bookingDefaults?.appointmentOnly ?? false;
  const [options, setOptions] = React.useState({
    bookingsOpen: initialBookingOpen,
    appointmentOnly: initialAppointmentOnly,
    age18Id: initialValues?.age_18_plus ?? false,
    depositRequired: initialValues?.deposit_required ?? false,
    digitalPayments: initialValues?.digital_payments ?? false,
    customRequests: initialValues?.custom_requests ?? false,
    walkIns: false,
    portfolioPhotos: false,
    flashDesigns: false,
    touchUpsIncluded: false,
    coverUpsAccepted: false,
  });

  React.useEffect(() => {
    setOptions({
      bookingsOpen: initialValues?.bookings_open ?? bookingDefaults?.bookingsOpen ?? true,
      appointmentOnly: initialValues?.appointment_only ?? bookingDefaults?.appointmentOnly ?? false,
      age18Id: initialValues?.age_18_plus ?? false,
      depositRequired: initialValues?.deposit_required ?? false,
      digitalPayments: initialValues?.digital_payments ?? false,
      customRequests: initialValues?.custom_requests ?? false,
      walkIns: false,
      portfolioPhotos: false,
      flashDesigns: false,
      touchUpsIncluded: false,
      coverUpsAccepted: false,
    });
  }, [initialValues, bookingDefaults]);

  const bookingStatus = options.bookingsOpen ? (options.appointmentOnly ? "waitlist" : "open") : "closed";

  const setOption = (key) => (value) => {
    const next = value === true;
    setOptions((prev) => ({ ...prev, [key]: next }));
  };

  const setBookingStatus = (status) => {
    setOptions((prev) => ({
      ...prev,
      bookingsOpen: status !== "closed",
      appointmentOnly: status === "waitlist",
    }));
  };

  return (
    <form action={formAction} className="w-full mx-auto pb-20">
      <div className="mb-6 rounded-2xl border border-slate-200 bg-gradient-to-br from-sky-50/70 via-white to-violet-50/70 p-4 shadow-sm dark:border-slate-800/80 dark:from-sky-500/10 dark:via-slate-950 dark:to-violet-500/10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-900 text-white shadow-sm dark:bg-slate-100 dark:text-slate-900">
              <Info className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">This form is optional</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">You can skip this for now. Adding details helps set expectations and reduces back-and-forth with clients.</p>
            </div>
          </div>
          <Button asChild size="sm" className="rounded-full px-4">
            <Link href="/me/visits">Skip for now</Link>
          </Button>
        </div>
      </div>
      <Section
        title={null}
        subtitle={null}
        icon={null}
        headerRight={null}
        headerContent={
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-medium text-slate-500 dark:text-slate-400 sm:text-sm">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                <LayersPlus className="h-4 w-4 text-emerald-500" />
                Configuring Visit Options
              </span>
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 text-xs font-semibold">Step 2 of 3</span>
            </div>

            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-900 text-white shadow-sm dark:bg-slate-100 dark:text-slate-900 sm:h-14 sm:w-14">
                <BadgeCheck className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-slate-100 sm:text-3xl">
                    Visit Options
                  </h1>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold tracking-wide text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                    <Sparkles className="h-3.5 w-3.5 text-slate-500 dark:text-slate-300" />
                    Optional
                  </span>
                </div>
                <p className="line-clamp-4 sm:line-clamp-none text-sm text-gray-500 dark:text-slate-400 sm:text-base">
                  Set availability and booking preferences for this visit so clients know how to reach you and what to expect. These options help reduce back-and-forth and keep your calendar aligned. You can update them anytime.
                </p>
                <div className="flex flex-col gap-3 text-sm text-slate-500 dark:text-slate-400 sm:flex-row sm:items-center sm:gap-6">
                  <span className="inline-flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    ~2 minutes to complete
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
        <input type="hidden" name="bookings_open" value={options.bookingsOpen ? "true" : "false"} />

        <div className="mt-6">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
            <span className={`grid h-7 w-7 place-items-center rounded-lg ${SECTION_ICON_CHIP}`}>
              <CheckCircle2 className="h-4 w-4" />
            </span>
            Booking Status
          </div>
          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-none">
            <div className="grid gap-3 sm:grid-cols-3">
              <BookingStatusCard active={bookingStatus === "open"} title="Open" description="Accepting bookings" icon={<CheckCircle2 className="h-5 w-5" />} tone={SECTION_ICON_CHIP} onClick={() => setBookingStatus("open")} />
              <BookingStatusCard active={bookingStatus === "waitlist"} title="Limited" description="Few slots left" icon={<Hourglass className="h-5 w-5" />} tone={SECTION_ICON_CHIP} onClick={() => setBookingStatus("waitlist")} />
              <BookingStatusCard active={bookingStatus === "closed"} title="Closed" description="Not accepting" icon={<XCircle className="h-5 w-5" />} tone={SECTION_ICON_CHIP} onClick={() => setBookingStatus("closed")} />
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">
                <MessageCircle className="h-4 w-4" />
              </span>
              Booking Method
            </div>
            <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-none">
              <NativeSelect name="booking_method" className="h-11" defaultValue="">
                <NativeSelectOption value="">No booking method</NativeSelectOption>
                <NativeSelectOption value="instagram_dm">Direct Message on Instagram</NativeSelectOption>
                <NativeSelectOption value="website_form">Website inquiry form</NativeSelectOption>
                <NativeSelectOption value="email">Email booking</NativeSelectOption>
              </NativeSelect>
              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">How clients should book appointments.</p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">
                <ShieldAlert className="h-4 w-4" />
              </span>
              Cancellation Policy
            </div>
            <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-none">
              <NativeSelect name="cancellation_policy" className="h-11" defaultValue="">
                <NativeSelectOption value="">No cancellation policy</NativeSelectOption>
                <NativeSelectOption value="flexible">Flexible — 24h notice</NativeSelectOption>
                <NativeSelectOption value="moderate">Moderate — 48h notice</NativeSelectOption>
                <NativeSelectOption value="strict">Strict — 72h notice</NativeSelectOption>
              </NativeSelect>
              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">Minimum cancellation notice period.</p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">
                <HandCoins className="h-4 w-4" />
              </span>
              Required Deposit
            </div>
            <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-none">
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500 dark:text-slate-400">$</span>
                <Input name="deposit_amount" inputMode="decimal" placeholder="0.00" className="h-11 pl-8" />
              </div>
              <label className="mt-3 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                <Checkbox id="deposit-required" name="deposit_required" checked={options.depositRequired} onCheckedChange={setOption("depositRequired")} />
                Deposit required to confirm booking
              </label>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">
                <Tag className="h-4 w-4" />
              </span>
              Pricing Range
            </div>
            <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-none">
              <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500 dark:text-slate-400">$</span>
                  <Input name="price_min" inputMode="decimal" placeholder="Min" className="h-11 pl-8" />
                </div>
                <span className="hidden text-sm text-slate-400 sm:inline">—</span>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500 dark:text-slate-400">$</span>
                  <Input name="price_max" inputMode="decimal" placeholder="Max" className="h-11 pl-8" />
                </div>
              </div>
              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">Typical price range for services</p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">
                <ShieldCheck className="h-4 w-4" />
              </span>
              Age Policy
            </div>
            <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-none">
              <NativeSelect name="age_18_plus" className="h-11" value={options.age18Id ? "true" : "false"} onChange={(event) => setOption("age18Id")(event.target.value === "true")}>
                <NativeSelectOption value="true">18+ only</NativeSelectOption>
                <NativeSelectOption value="false">All ages</NativeSelectOption>
              </NativeSelect>
              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">Minimum age requirement for clients.</p>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">
                <Type className="h-4 w-4" />
              </span>
              Languages Spoken
            </div>
            <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-none">
              <Input name="languages_spoken" placeholder="English, German" className="h-11" />
              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">Languages you can communicate in.</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">
              <Sparkles className="h-4 w-4" />
            </span>
            Additional Options
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <AdditionalOptionCard
              id="opt-appointment-only"
              name="appointment_only"
              title="Appointment Only"
              description="Bookings by appointment only."
              checked={options.appointmentOnly}
              onCheckedChange={setOption("appointmentOnly")}
              icon={<ShieldAlert className="h-5 w-5" />}
            />
            <AdditionalOptionCard
              id="opt-custom"
              name="custom_requests"
              title="Custom Requests"
              description="Accept custom design ideas."
              checked={options.customRequests}
              onCheckedChange={setOption("customRequests")}
              icon={<Sparkles className="h-5 w-5" />}
            />
            <AdditionalOptionCard
              id="opt-digital-payments"
              name="digital_payments"
              title="Digital Payments"
              description="Accept card and digital payments."
              checked={options.digitalPayments}
              onCheckedChange={setOption("digitalPayments")}
              icon={<HandCoins className="h-5 w-5" />}
            />
            <AdditionalOptionCard id="opt-walkins" name="walk_ins_welcome" title="Walk-ins Welcome" description="Accept walk-in clients." checked={options.walkIns} onCheckedChange={setOption("walkIns")} icon={<Users className="h-5 w-5" />} />
            <AdditionalOptionCard
              id="opt-portfolio"
              name="portfolio_photos"
              title="Portfolio Photos"
              description="Allow work photography."
              checked={options.portfolioPhotos}
              onCheckedChange={setOption("portfolioPhotos")}
              icon={<ImageIcon className="h-5 w-5" />}
            />
            <AdditionalOptionCard id="opt-flash" name="flash_designs" title="Flash Designs" description="Pre-made designs available." checked={options.flashDesigns} onCheckedChange={setOption("flashDesigns")} icon={<Zap className="h-5 w-5" />} />
            <AdditionalOptionCard
              id="opt-touchups"
              name="touch_ups_included"
              title="Touch-ups Included"
              description="Free touch-up session."
              checked={options.touchUpsIncluded}
              onCheckedChange={setOption("touchUpsIncluded")}
              icon={<Wand2 className="h-5 w-5" />}
            />
            <AdditionalOptionCard
              id="opt-coverups"
              name="cover_ups_accepted"
              title="Cover-ups Accepted"
              description="Cover existing work."
              checked={options.coverUpsAccepted}
              onCheckedChange={setOption("coverUpsAccepted")}
              icon={<ShieldCheck className="h-5 w-5" />}
            />
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">
              <Tag className="h-4 w-4" />
            </span>
            Special Notes & Requirements
          </div>
          <div className="mt-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-none">
            <Textarea name="special_notes" placeholder="Any special requirements, health considerations, or important information clients should know..." className="min-h-32" />
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">Include information about aftercare, what to bring, or preparation needed.</p>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 dark:border-slate-800 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="order-2 flex w-full flex-col gap-3 sm:order-1 sm:w-auto">
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-slate-500 dark:text-slate-400 sm:justify-start sm:text-sm">
              <Link
                href="/help"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 transition hover:text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
              >
                <Info className="h-4 w-4 text-slate-400 dark:text-slate-500" />
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
            <SettingsSubmitButton isPending={isPending} label="Save & Continue to Preview" icon={<Sparkles className="h-4 w-4" />} />
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
