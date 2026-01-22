import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/db";
import VisitForm from "./visit-form";

const allowedVisitTypes = ["guest", "residency", "convention", "workshop", "popup", "custom"];

export default async function NewVisitPage() {
  const user = await getSessionUser();
  if (!user) {
    redirect("/me");
  }

  async function createVisit(_prevState, formData) {
    "use server";
    const raw = Object.fromEntries(formData.entries());
    const errors = {};

    if (!raw.destination_instagram_handle?.trim()) {
      errors.destination_instagram_handle = "Please add a destination Instagram handle.";
    }

    if (!raw.visit_location?.trim()) {
      errors.visit_location = "Please add a visit location.";
    }

    if (!raw.visit_start_time) {
      errors.visit_start_time = "Please select a start date and time.";
    }

    if (!raw.visit_end_time) {
      errors.visit_end_time = "Please select an end date and time.";
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

    if (Object.keys(errors).length > 0) {
      return { errors, message: "Please fix the highlighted fields." };
    }

    return { errors: {}, message: "" };
  }

  return <VisitForm action={createVisit} />;
}
