import { EyeIcon } from "lucide-react";
import Section from "../Section";

export default function VisitPreviewSection() {
  return (
    <Section title="Preview" icon={<EyeIcon className="w-4 h-4" />} subtitle="Review how your visit details will appear to clients before finalizing.">
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
    </Section>
  );
}
