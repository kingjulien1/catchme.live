"use client";

import { BadgeCheck, CalendarCheck2, Clock3, HandCoins, SlidersHorizontal, Sparkles } from "lucide-react";
import * as React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { CreditCardIcon } from "lucide-react";
import Section from "@/components/Section";

function VisitOptionCard({ id, name, title, description, icon, checked, onCheckedChange }) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-white p-4 shadow-sm transition sm:p-5 dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-none",
        checked ? "border-violet-300 bg-violet-50/30 dark:border-violet-400/60 dark:bg-violet-500/10" : "border-gray-200 hover:bg-gray-50 dark:hover:bg-slate-900/90",
      )}
    >
      <input type="hidden" name={name} value={checked ? "true" : "false"} />
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Checkbox */}
        <div className="shrink-0 pt-0.5">
          <Checkbox id={id} name={name} checked={checked} onCheckedChange={onCheckedChange} />
        </div>

        {/* Content (clickable via label) */}
        <label htmlFor={id} name={id} className="flex items-start flex-1 w-full min-w-0 gap-3 cursor-pointer">
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

export default function VisitOptionsSection({ initialValues, onOptionChange }) {
  const [options, setOptions] = React.useState({
    bookingsOpen: initialValues?.bookings_open ?? true,
    appointmentOnly: initialValues?.appointment_only ?? false,
    age18Id: initialValues?.age_18_plus ?? false,
    depositRequired: initialValues?.deposit_required ?? false,
    digitalPayments: initialValues?.digital_payments ?? false,
    customRequests: initialValues?.custom_requests ?? false,
  });

  React.useEffect(() => {
    if (!initialValues) return;
    setOptions({
      bookingsOpen: initialValues.bookings_open ?? true,
      appointmentOnly: initialValues.appointment_only ?? false,
      age18Id: initialValues.age_18_plus ?? false,
      depositRequired: initialValues.deposit_required ?? false,
      digitalPayments: initialValues.digital_payments ?? false,
      customRequests: initialValues.custom_requests ?? false,
    });
  }, [initialValues]);

  const setOption = (key) => (value) => {
    // shadcn Checkbox can emit true/false or "indeterminate"; treat indeterminate as false
    const next = value === true;
    setOptions((prev) => {
      const updated = { ...prev, [key]: next };
      if (onOptionChange) {
        requestAnimationFrame(() => onOptionChange());
      }
      return updated;
    });
  };

  return (
    <Section title="Additional Options" subtitle="Configure booking preferences and policies for your visit" icon={<SlidersHorizontal className="w-6 h-6" />}>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4">
        <VisitOptionCard
          id="opt-bookings-open"
          name="bookings_open"
          title="Bookings Open"
          description="Shows you’re available for new bookings or inquiries during this visit."
          checked={options.bookingsOpen}
          onCheckedChange={setOption("bookingsOpen")}
          icon={
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-200 sm:h-10 sm:w-10">
              <CalendarCheck2 className="w-5 h-5" />
            </div>
          }
        />

        <VisitOptionCard
          id="opt-appointment-only"
          name="appointment_only"
          title="Appointment Only"
          description="Clients must schedule in advance—no walk-ins or drop-ins."
          checked={options.appointmentOnly}
          onCheckedChange={setOption("appointmentOnly")}
          icon={
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200 sm:h-10 sm:w-10">
              <Clock3 className="w-5 h-5" />
            </div>
          }
        />

        <VisitOptionCard
          id="opt-18-id"
          name="age_18_plus"
          title="18+ Only & ID Required"
          description="Guests must be 18+ and show valid ID where required."
          checked={options.age18Id}
          onCheckedChange={setOption("age18Id")}
          icon={
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200 sm:h-10 sm:w-10">
              <BadgeCheck className="w-5 h-5" />
            </div>
          }
        />

        <VisitOptionCard
          id="opt-deposit"
          name="deposit_required"
          title="Deposit Required"
          description="A deposit is needed to confirm a booking or reservation."
          checked={options.depositRequired}
          onCheckedChange={setOption("depositRequired")}
          icon={
            <div className="grid text-orange-700 bg-orange-100 h-9 w-9 place-items-center rounded-xl dark:bg-orange-500/20 dark:text-orange-200 sm:h-10 sm:w-10">
              <HandCoins className="w-5 h-5" />
            </div>
          }
        />

        <VisitOptionCard
          id="opt-payment"
          name="digital_payments"
          title="Card / Digital Payments Accepted"
          description="Payments can be made via card or digital methods like Apple Pay or Google Pay."
          checked={options.digitalPayments}
          onCheckedChange={setOption("digitalPayments")}
          icon={
            <div className="grid text-blue-700 bg-blue-100 h-9 w-9 place-items-center rounded-xl dark:bg-blue-500/20 dark:text-blue-200 sm:h-10 sm:w-10">
              <CreditCardIcon className="w-5 h-5" />
            </div>
          }
        />

        <VisitOptionCard
          id="opt-custom"
          name="custom_requests"
          title="Custom Requests Accepted"
          description="You’re open to custom requests in addition to standard offerings."
          checked={options.customRequests}
          onCheckedChange={setOption("customRequests")}
          icon={
            <div className="grid text-pink-700 bg-pink-100 h-9 w-9 place-items-center rounded-xl dark:bg-pink-500/20 dark:text-pink-200 sm:h-10 sm:w-10">
              <Sparkles className="w-5 h-5" />
            </div>
          }
        />
      </div>
    </Section>
  );
}
