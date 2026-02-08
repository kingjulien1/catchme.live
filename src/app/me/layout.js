export const dynamic = "force-dynamic";

export default async function CreateNewVisitLayout({ children }) {
  return (
    <div className="min-h-screen pt-28 bg-gray-50 dark:bg-slate-900">
      <div className="relative mx-auto">
        <div className="w-full pb-24 mx-auto sm:pb-2 lg:px-8">
          <div className="w-full max-w-5xl mx-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}
