export const dynamic = "force-dynamic";

export default async function CreateNewVisitLayout({ children }) {
  return (
    <div className="min-h-screen pt-28 bg-gray-50 dark:bg-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.12),_transparent_55%),radial-gradient(circle_at_20%_20%,_rgba(99,102,241,0.14),_transparent_50%),linear-gradient(180deg,_rgba(255,255,255,0.9),_rgba(255,255,255,0))] pointer-events-none dark:bg-[radial-gradient(circle_at_top,_rgba(217,70,239,0.16),_transparent_55%),radial-gradient(circle_at_20%_20%,_rgba(59,130,246,0.2),_transparent_50%),linear-gradient(180deg,_rgba(15,23,42,0.95),_rgba(15,23,42,0))]" />
      <div className="relative mx-auto">
        <div className="w-full pb-24 mx-auto sm:pb-2 lg:px-8">
          <div className="w-full max-w-5xl mx-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}
