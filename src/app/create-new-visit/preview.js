import { EyeIcon } from "lucide-react";
import Section from "./Section";

export default function VisitPreviewSection() {
  return (
    <Section title="Preview" icon={<EyeIcon className="h-4 w-4" />} subtitle="Review how your visit details will appear to clients before finalizing.">
      <div className="mt-6 grid place-items-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
        <div className="max-w-sm">
          <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl border border-gray-200 bg-white text-gray-500">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
              <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v13A2.5 2.5 0 0 1 17.5 21h-11A2.5 2.5 0 0 1 4 18.5v-13Z" stroke="currentColor" strokeWidth="1.6" />
              <path d="M8 10h8M8 14h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-gray-900">Complete the form above to see a preview</p>
          <p className="mt-1 text-sm text-gray-600">Your visit card will be generated here.</p>
        </div>
      </div>
    </Section>
  );
}
