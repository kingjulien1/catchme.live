/**
 * Section component to wrap content sections with a title, subtitle, and icon.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to be displayed within the section.
 * @param {React.ReactNode} props.icon - The icon to be displayed alongside the title.
 * @param {string} props.title - The title of the section.
 * @param {string} [props.subtitle] - An optional subtitle for the section.
 * @returns {JSX.Element} The rendered Section component.
 */
export default function Section({ children, icon, title, subtitle }) {
  return (
    <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 dark:border-slate-800/80 dark:bg-slate-900/70">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 grid min-h-9 min-w-9 place-items-center rounded-full bg-fuchsia-500 text-white dark:bg-fuchsia-500/30 dark:text-fuchsia-100">{icon}</div>
        <div className="min-w-0">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-gray-900 dark:text-slate-100">{title}</h4>
          {subtitle ? <p className="text-sm font-normal text-gray-600 dark:text-slate-300">{subtitle}</p> : null}
        </div>
      </div>
      {children}
    </section>
  );
}
