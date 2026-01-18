export default function AccountLayout({ children }) {
  return (
    <div className="relative grid min-h-screen grid-cols-2">
      <div className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_20%_10%,rgba(217,70,239,0.18),transparent_60%)]" />
      </div>

      <div className="bg-white">
        <div className="h-full w-full p-8">{children}</div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-fuchsia-500/40 to-transparent" />
    </div>
  );
}
