"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-50 text-gray-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-fuchsia-100/70 via-slate-50 to-transparent dark:from-fuchsia-900/30 dark:via-slate-950 dark:to-transparent" />

        <div className="relative mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
          <div className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-500 dark:text-slate-400">404</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Page not found</h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-600 dark:text-slate-300 sm:text-base">The page you are looking for does not exist or has been moved. Try returning home or exploring live visits.</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/">Back to home</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/discover">Explore visits</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
