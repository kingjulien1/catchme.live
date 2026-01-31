import { redirect } from "next/navigation";
import { getSessionUser, sql } from "@/lib/db";
import VisitForm from "./visit-form";

const allowedVisitTypes = ["guest", "residency", "convention", "workshop", "popup", "custom"];

export default async function NewVisitPage() {
  const user = await getSessionUser();
  if (!user) redirect("/me");

  async function createVisit(_prevState, formData) {
    "use server";
    const sessionUser = await getSessionUser();
    if (!sessionUser) {
      return { errors: { form: "Please sign in again to create a visit." }, message: "Session expired. Please try again." };
    }

    const raw = Object.fromEntries(formData.entries());
    const errors = {};

    const destinationHandle = raw.destination_instagram_handle?.trim().replace(/^@/, "").toLowerCase();

    if (!destinationHandle) {
      errors.destination_instagram_handle = "Please add a destination Instagram handle.";
    }

    if (!raw.visit_location?.trim()) {
      errors.visit_location = "Please add a visit location.";
    }

    if (!raw.visit_start_time) {
      errors.visit_start_time = "Please select a start date and time.";
    }

    if (raw.visit_start_time && raw.visit_end_time) {
      const start = new Date(raw.visit_start_time);
      const end = new Date(raw.visit_end_time);
      if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
        errors.visit_time_range = "End time must be after the start time.";
      }
    }

    if (!raw.visit_type || !allowedVisitTypes.includes(raw.visit_type)) {
      errors.visit_type = "Please select a valid visit type.";
    }

    if (raw.description && raw.description.length > 500) {
      errors.description = "Visit description must be 500 characters or less.";
    }

    const toBoolean = (value) => value === true || value === "true" || value === "on";
    const optionValues = {
      bookings_open: toBoolean(raw.bookings_open),
      appointment_only: toBoolean(raw.appointment_only),
      age_18_plus: toBoolean(raw.age_18_plus),
      deposit_required: toBoolean(raw.deposit_required),
      digital_payments: toBoolean(raw.digital_payments),
      custom_requests: toBoolean(raw.custom_requests),
    };

    if (Object.keys(errors).length > 0) {
      return { errors, message: "Please fix the highlighted fields.", values: optionValues };
    }
    const visitEndTime = raw.visit_end_time ? new Date(raw.visit_end_time) : null;

    const [destinationUser] = await sql`
      insert into users (username)
      values (${destinationHandle})
      on conflict (username) do update set username = excluded.username
      returning id
    `;

    if (!destinationUser?.id) {
      return { errors: { form: "Unable to resolve destination account." }, message: "Could not create the visit. Try again." };
    }

    await sql`
      insert into visits (
        author_user_id,
        destination_user_id,
        destination_instagram_handle,
        visit_location,
        visit_start_time,
        visit_end_time,
        visit_type,
        description,
        bookings_open,
        appointment_only,
        age_18_plus,
        deposit_required,
        digital_payments,
        custom_requests
      )
      values (
        ${sessionUser.id},
        ${destinationUser.id},
        ${destinationHandle},
        ${raw.visit_location?.trim()},
        ${new Date(raw.visit_start_time)},
        ${visitEndTime},
        ${raw.visit_type},
        ${raw.description?.trim() || null},
        ${optionValues.bookings_open},
        ${optionValues.appointment_only},
        ${optionValues.age_18_plus},
        ${optionValues.deposit_required},
        ${optionValues.digital_payments},
        ${optionValues.custom_requests}
      )
    `;

    return { errors: {}, message: "" };
  }

  return <VisitForm action={createVisit} />;
}
