"use client";

import { BadgeCheck, CalendarCheck2, Clock3, HandCoins, SlidersHorizontal, Sparkles } from "lucide-react";
import * as React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { CreditCardIcon } from "lucide-react";
import Section from "./Section";

function VisitOptionCard({ id, title, description, icon, checked, onCheckedChange }) {
  return (
    <div className={cn("rounded-2xl border bg-white p-4 sm:p-5 shadow-sm transition", checked ? "border-violet-300 bg-violet-50/30" : "border-gray-200 hover:bg-gray-50")}>
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Checkbox */}
        <div className="shrink-0 pt-0.5">
          <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} />
        </div>

        {/* Content (clickable via label) */}
        <label htmlFor={id} name={id} className="flex w-full flex-1 min-w-0 cursor-pointer items-start gap-3">
          <div className="shrink-0">{icon}</div>
          <div className="min-w-0">
            <p className="text-sm sm:text-base font-semibold text-gray-900">{title}</p>
            <p className="mt-1 text-xs sm:text-sm text-gray-600">{description}</p>
          </div>
        </label>
      </div>
    </div>
  );
}

export default function VisitOptionsSection() {
  const [options, setOptions] = React.useState({
    bookingsOpen: true,
    appointmentOnly: false,
    age18Id: false,
    depositRequired: false,
    digitalPayments: false,
    customRequests: false,
  });

  const setOption = (key) => (value) => {
    // shadcn Checkbox can emit true/false or "indeterminate"; treat indeterminate as false
    const next = value === true;
    setOptions((prev) => ({ ...prev, [key]: next }));
  };

  return (
    <Section title="Additional Options" subtitle="Configure booking preferences and policies for your visit" icon={<SlidersHorizontal className="h-6 w-6" />}>
      <div className="mt-6 space-y-3 sm:space-y-4">
        <VisitOptionCard
          id="opt-bookings-open"
          title="Bookings Open"
          description="Shows you’re available for new bookings or inquiries during this visit."
          checked={options.bookingsOpen}
          onCheckedChange={setOption("bookingsOpen")}
          icon={
            <div className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-xl bg-violet-100 text-violet-700">
              <CalendarCheck2 className="h-5 w-5" />
            </div>
          }
        />

        <VisitOptionCard
          id="opt-appointment-only"
          title="Appointment Only"
          description="Clients must schedule in advance—no walk-ins or drop-ins."
          checked={options.appointmentOnly}
          onCheckedChange={setOption("appointmentOnly")}
          icon={
            <div className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-xl bg-amber-100 text-amber-700">
              <Clock3 className="h-5 w-5" />
            </div>
          }
        />

        <VisitOptionCard
          id="opt-18-id"
          title="18+ Only & ID Required"
          description="Guests must be 18+ and show valid ID where required."
          checked={options.age18Id}
          onCheckedChange={setOption("age18Id")}
          icon={
            <div className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
              <BadgeCheck className="h-5 w-5" />
            </div>
          }
        />

        <VisitOptionCard
          id="opt-deposit"
          title="Deposit Required"
          description="A deposit is needed to confirm a booking or reservation."
          checked={options.depositRequired}
          onCheckedChange={setOption("depositRequired")}
          icon={
            <div className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-xl bg-orange-100 text-orange-700">
              <HandCoins className="h-5 w-5" />
            </div>
          }
        />

        <VisitOptionCard
          id="opt-payment"
          title="Card / Digital Payments Accepted"
          description="Payments can be made via card or digital methods like Apple Pay or Google Pay."
          checked={options.digitalPayments}
          onCheckedChange={setOption("digitalPayments")}
          icon={
            <div className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-xl bg-blue-100 text-blue-700">
              <CreditCardIcon className="h-5 w-5" />
            </div>
          }
        />

        <VisitOptionCard
          id="opt-custom"
          title="Custom Requests Accepted"
          description="You’re open to custom requests in addition to standard offerings."
          checked={options.customRequests}
          onCheckedChange={setOption("customRequests")}
          icon={
            <div className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-xl bg-pink-100 text-pink-700">
              <Sparkles className="h-5 w-5" />
            </div>
          }
        />
      </div>
    </Section>
  );
}
