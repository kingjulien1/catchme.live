import Link from "next/link";
import { Instagram, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getSessionUser } from "@/lib/db";
import ThemeToggleButton from "./theme-toggle-button";
import ProfileMenu from "./profile-menu";

export default async function TopAppBar() {
  const user = await getSessionUser();

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white/70 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/60">
      <div className="flex items-center justify-between w-full h-16 max-w-6xl gap-4 px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center">
            <span className="relative mr-2 inline-flex h-2.5 w-2.5 items-center justify-center">
              <span className="absolute inline-flex h-2.5 w-2.5 animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.45)]" />
            </span>
            <span className="font-mono text-sm font-medium uppercase tracking-[0.32em] text-gray-900 dark:text-slate-100">catchme.live</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild type="button" variant="ghost" size="icon" className="text-gray-600 rounded-full h-9 w-9 hover:bg-gray-100 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-slate-100">
            <Link href="/find" aria-label="Search">
              <Search className="w-5 h-5" />
            </Link>
          </Button>
          <ThemeToggleButton />

          {user ? (
            <ProfileMenu name={user.name || user.username} username={user.username} imageUrl={user.profile_picture_url || "/default-avatar.png"} />
          ) : (
            <Link
              href="/me"
              className="inline-flex items-center px-4 py-0 ml-2 text-sm font-semibold text-white transition bg-black rounded-full shadow-sm h-11 hover:bg-gray-900 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              <Instagram className="w-4 h-4 mr-2" />
              <span className="sm:hidden">Connect</span>
              <span className="hidden sm:inline">Connect Instagram</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
