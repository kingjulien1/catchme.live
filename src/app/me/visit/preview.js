import { EyeIcon } from "lucide-react";
import Section from "@/components/Section";
import VisitCard from "@/components/visit-card";

export default function VisitPreviewSection({ values = {} }) {
  const normalizedHandle = values.destination_instagram_handle ? values.destination_instagram_handle.replace(/^@/, "").trim() : "";
  const visitType = values.visit_type || "guest";
  const visitLocation = values.visit_location || "";
  const hasPreview = Boolean(normalizedHandle || visitLocation || values.visit_start_time || values.visit_end_time || values.description);

  const parseBoolean = (value) => value === true || value === "true" || value === "on";
  const visit = {
    id: "preview",
    destination_instagram_handle: normalizedHandle || null,
    destination_username: normalizedHandle || null,
    destination_name: normalizedHandle ? `@${normalizedHandle}` : null,
    destination_profile_picture_url: null,
    destination_account_type: "instagram account",
    destination_followers_count: null,
    destination_media_count: null,
    destination_bio: values.description || null,
    destination_banner_image_url: null,
    visit_location: visitLocation || null,
    visit_start_time: values.visit_start_time || null,
    visit_end_time: values.visit_end_time || null,
    visit_type: visitType,
    bookings_open: parseBoolean(values.bookings_open),
    appointment_only: parseBoolean(values.appointment_only),
    age_18_plus: parseBoolean(values.age_18_plus),
    deposit_required: parseBoolean(values.deposit_required),
    digital_payments: parseBoolean(values.digital_payments),
    custom_requests: parseBoolean(values.custom_requests),
  };

  const now = new Date();
  const startDate = visit.visit_start_time ? new Date(visit.visit_start_time) : null;
  const endDate = visit.visit_end_time ? new Date(visit.visit_end_time) : null;
  const isLive = Boolean(startDate && startDate <= now && (!endDate || endDate >= now));

  return (
    <Section title="Preview" icon={<EyeIcon className="w-4 h-4" />} subtitle="Review how your visit details will appear to clients before finalizing.">
      {hasPreview ? (
        <div className="mt-6">
          <VisitCard visit={visit} isLive={isLive} defaultOpen />
        </div>
      ) : (
        <div className="grid p-10 mt-6 text-center border border-gray-300 border-dashed place-items-center rounded-2xl bg-gray-50 dark:border-slate-700 dark:bg-slate-900/60">
          <div className="max-w-sm">
            <div className="grid w-12 h-12 mx-auto mb-3 text-gray-500 bg-white border border-gray-200 place-items-center rounded-2xl dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" aria-hidden="true">
                <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v13A2.5 2.5 0 0 1 17.5 21h-11A2.5 2.5 0 0 1 4 18.5v-13Z" stroke="currentColor" strokeWidth="1.6" />
                <path d="M8 10h8M8 14h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-gray-900 dark:text-slate-100">Complete the form above to see a preview</p>
            <p className="mt-1 text-sm text-gray-600 dark:text-slate-300">Your visit card will be generated here.</p>
          </div>
        </div>
      )}
    </Section>
  );
}
