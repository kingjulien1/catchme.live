import { redirect } from "next/navigation";
import { getSessionUser, sql } from "@/lib/db";
import VisitOptionsForm from "./options-form";

export default async function VisitOptionsPage({ params }) {
  const user = await getSessionUser();
  if (!user) redirect("/me");

  const { visitId } = await params;
  if (!visitId) redirect("/me/visit");

  const [visit] = await sql`
    select
      id
    from visits
    where id = ${visitId}
      and author_user_id = ${user.id}
    limit 1
  `;

  if (!visit) redirect("/me/visit");

  const [visitOptions] = await sql`
    select *
    from visit_options
    where visit_id = ${visitId}
    limit 1
  `;

  const [bookingSettings] = await sql`
    select status
    from user_booking_settings
    where user_id = ${user.id}
    limit 1
  `;

  async function updateVisitOptions(_prevState, formData) {
    "use server";
    const sessionUser = await getSessionUser();
    if (!sessionUser) {
      return { errors: { form: "Please sign in again to update your visit." }, message: "Session expired. Please try again." };
    }

    const [visitCheck] = await sql`
      select id
      from visits
      where id = ${visitId}
        and author_user_id = ${sessionUser.id}
      limit 1
    `;
    if (!visitCheck) {
      return { errors: { form: "Visit not found." }, message: "Please try again." };
    }

    const toBoolean = (value) => value === true || value === "true" || value === "on";
    const toNullableString = (value) => {
      if (value === null || value === undefined) return null;
      const trimmed = String(value).trim();
      return trimmed.length ? trimmed : null;
    };
    const toNullableNumber = (value) => {
      if (value === null || value === undefined || value === "") return null;
      const num = Number(value);
      return Number.isFinite(num) ? num : null;
    };
    const payload = {
      bookings_open: toBoolean(formData.get("bookings_open")),
      appointment_only: toBoolean(formData.get("appointment_only")),
      age_18_plus: toBoolean(formData.get("age_18_plus")),
      deposit_required: toBoolean(formData.get("deposit_required")),
      digital_payments: toBoolean(formData.get("digital_payments")),
      custom_requests: toBoolean(formData.get("custom_requests")),
      walk_ins_welcome: toBoolean(formData.get("walk_ins_welcome")),
      portfolio_photos: toBoolean(formData.get("portfolio_photos")),
      flash_designs: toBoolean(formData.get("flash_designs")),
      touch_ups_included: toBoolean(formData.get("touch_ups_included")),
      cover_ups_accepted: toBoolean(formData.get("cover_ups_accepted")),
      booking_method: toNullableString(formData.get("booking_method")),
      cancellation_policy: toNullableString(formData.get("cancellation_policy")),
      deposit_amount: toNullableNumber(formData.get("deposit_amount")),
      price_min: toNullableNumber(formData.get("price_min")),
      price_max: toNullableNumber(formData.get("price_max")),
      languages_spoken: toNullableString(formData.get("languages_spoken")),
      special_notes: toNullableString(formData.get("special_notes")),
    };
    const bookingStatus = payload.bookings_open ? (payload.appointment_only ? "limited" : "open") : "closed";
    const agePolicy = payload.age_18_plus ? "18+ only" : "All ages";

    await sql`
      insert into visit_options (
        visit_id,
        booking_status,
        booking_method,
        cancellation_policy,
        appointment_only,
        deposit_required,
        deposit_amount,
        price_min,
        price_max,
        age_policy,
        digital_payments,
        languages_spoken,
        custom_requests,
        walk_ins_welcome,
        portfolio_photos,
        flash_designs,
        touch_ups_included,
        cover_ups_accepted,
        special_notes,
        updated_at
      )
      values (
        ${visitId},
        ${bookingStatus},
        ${payload.booking_method},
        ${payload.cancellation_policy},
        ${payload.appointment_only},
        ${payload.deposit_required},
        ${payload.deposit_amount},
        ${payload.price_min},
        ${payload.price_max},
        ${agePolicy},
        ${payload.digital_payments},
        ${payload.languages_spoken},
        ${payload.custom_requests},
        ${payload.walk_ins_welcome},
        ${payload.portfolio_photos},
        ${payload.flash_designs},
        ${payload.touch_ups_included},
        ${payload.cover_ups_accepted},
        ${payload.special_notes},
        now()
      )
      on conflict (visit_id) do update set
        booking_status = excluded.booking_status,
        booking_method = excluded.booking_method,
        cancellation_policy = excluded.cancellation_policy,
        appointment_only = excluded.appointment_only,
        deposit_required = excluded.deposit_required,
        deposit_amount = excluded.deposit_amount,
        price_min = excluded.price_min,
        price_max = excluded.price_max,
        age_policy = excluded.age_policy,
        digital_payments = excluded.digital_payments,
        languages_spoken = excluded.languages_spoken,
        custom_requests = excluded.custom_requests,
        walk_ins_welcome = excluded.walk_ins_welcome,
        portfolio_photos = excluded.portfolio_photos,
        flash_designs = excluded.flash_designs,
        touch_ups_included = excluded.touch_ups_included,
        cover_ups_accepted = excluded.cover_ups_accepted,
        special_notes = excluded.special_notes,
        updated_at = now()
    `;

    return { errors: {}, message: "" };
  }

  const initialValues = visitOptions
    ? {
        bookings_open: visitOptions.booking_status ? visitOptions.booking_status !== "closed" : null,
        appointment_only: visitOptions.appointment_only ?? (visitOptions.booking_status === "limited"),
        age_18_plus: visitOptions.age_policy ? visitOptions.age_policy.toLowerCase().includes("18") : null,
        deposit_required: visitOptions.deposit_required ?? false,
        digital_payments: visitOptions.digital_payments ?? false,
        custom_requests: visitOptions.custom_requests ?? false,
      }
    : null;

  return <VisitOptionsForm action={updateVisitOptions} initialValues={initialValues} defaultBookingStatus={bookingSettings?.status ?? null} />;
}
