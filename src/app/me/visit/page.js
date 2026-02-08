import { redirect } from "next/navigation";
import { getSessionUser, sql } from "@/lib/db";
import VisitForm from "./visit-form";

const allowedVisitTypes = ["guest", "residency", "convention", "workshop", "popup", "custom", "other"];

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
    const mergeDateTime = (dateValue, timeValue, fallbackTime = "") => {
      if (!dateValue) return "";
      const resolvedTime = timeValue || fallbackTime;
      if (!resolvedTime) return "";
      return `${dateValue}T${resolvedTime}`;
    };
    const visitStartValue = raw.visit_start_time || mergeDateTime(raw.visit_start_date, raw.visit_start_clock, "00:00");
    const visitEndValue = raw.visit_end_time || mergeDateTime(raw.visit_end_date, raw.visit_end_clock);
    const errors = {};

    const parseHandles = (value) =>
      String(value || "")
        .split(",")
        .map((item) => item.trim().replace(/^@/, "").toLowerCase())
        .filter(Boolean);
    const destinationHandles = parseHandles(raw.destination_accounts);
    const partnerHandles = parseHandles(raw.linked_accounts);

    if (!destinationHandles.length) {
      errors.destination_accounts = "Please add at least one destination Instagram handle.";
    }

    if (!raw.visit_location?.trim()) {
      errors.visit_location = "Please add a visit location.";
    }

    if (!visitStartValue) {
      errors.visit_start_time = "Please select a start date.";
    }

    if (visitStartValue && visitEndValue) {
      const start = new Date(visitStartValue);
      const end = new Date(visitEndValue);
      if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
        errors.visit_time_range = "End time must be after the start time.";
      }
    }

    if (!raw.visit_type || !allowedVisitTypes.includes(raw.visit_type)) {
      errors.visit_type = "Please select a valid visit type.";
    }

    if (Object.keys(errors).length > 0) {
      return { errors, message: "Please fix the highlighted fields." };
    }
    const visitEndTime = visitEndValue ? new Date(visitEndValue) : null;
    const visitTypeValue = raw.visit_type === "custom" ? "other" : raw.visit_type;

    const allHandles = Array.from(new Set([...destinationHandles, ...partnerHandles]));
    const userRows = allHandles.length
      ? await sql`
          insert into users (username)
          select unnest(${allHandles}::text[])
          on conflict (username) do update set username = excluded.username
          returning id, username
        `
      : [];
    const usersByHandle = new Map(userRows.map((row) => [row.username, row.id]));
    const primaryDestinationHandle = destinationHandles[0];
    const primaryDestinationUserId = primaryDestinationHandle ? usersByHandle.get(primaryDestinationHandle) : null;

    if (!primaryDestinationUserId) {
      return { errors: { form: "Unable to resolve destination account." }, message: "Could not create the visit. Try again." };
    }

    const venueName = raw.venue_event?.trim();
    const [venue] = venueName
      ? await sql`
          select id
          from venues
          where venue_name = ${venueName}
          limit 1
        `
      : [];
    if (venueName && !venue?.id) {
      return { errors: { venue_event: "Venue not found. Please select an existing venue." }, message: "Please fix the highlighted fields." };
    }
    const venueId = venue?.id ?? null;

    const [createdVisit] = await sql`
      insert into visits (
        author_user_id,
        venue_id,
        visit_location,
        visit_start_time,
        visit_end_time,
        visit_type,
        status
      )
      values (
        ${sessionUser.id},
        ${venueId},
        ${raw.visit_location?.trim()},
        ${new Date(visitStartValue)},
        ${visitEndTime},
        ${visitTypeValue},
        ${"draft"}
      )
      returning id
    `;

    console.log("VISIT CREATED", createdVisit);

    if (!createdVisit?.id) {
      return { errors: { form: "Unable to save the visit details." }, message: "Could not create the visit. Try again." };
    }

    for (const handle of destinationHandles) {
      const accountUserId = usersByHandle.get(handle) || null;
      await sql`
        insert into visit_linked_accounts (visit_id, account_user_id, account_handle, account_type)
        values (${createdVisit.id}, ${accountUserId}, ${handle}, ${"destination"})
      `;
    }

    for (const handle of partnerHandles) {
      const accountUserId = usersByHandle.get(handle) || null;
      await sql`
        insert into visit_linked_accounts (visit_id, account_user_id, account_handle, account_type)
        values (${createdVisit.id}, ${accountUserId}, ${handle}, ${"partner"})
      `;
    }

    redirect(`/me/visit/${createdVisit.id}/options`);
  }

  return <VisitForm action={createVisit} user={user} />;
}
