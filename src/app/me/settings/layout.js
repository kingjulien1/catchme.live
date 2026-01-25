export default function SettingsLayout({ children }) {
  return (
    <div className="w-full max-w-5xl px-4 py-10 mx-auto sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-slate-100 sm:text-4xl">Settings</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-slate-400 sm:text-base">Manage your account preferences, visibility, and profile details.</p>
      </div>
      {children}
    </div>
  );
}
