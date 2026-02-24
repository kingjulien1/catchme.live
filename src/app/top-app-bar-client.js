"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Instagram, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import ThemeToggleButton from "./theme-toggle-button";
import ProfileMenu from "./profile-menu";

export default function TopAppBarClient({ user }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 4);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-colors ${
        isScrolled ? "border-b border-transparent bg-slate-900/10 backdrop-blur dark:bg-slate-100/10" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center">
            <span className='text-3xl leading-none text-gray-900 dark:text-slate-100 font-["Danfo"]'>CM.LIVE</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Button
            asChild
            type="button"
            variant="ghost"
            size="icon"
            className={`text-gray-600 rounded-full h-9 w-9 hover:bg-gray-100 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-slate-100 ${
              isScrolled ? "" : "bg-white/10 backdrop-blur dark:bg-slate-950/20"
            }`}
          >
            <Link href="/find" aria-label="Search">
              <Search className="w-5 h-5" />
            </Link>
          </Button>
          <ThemeToggleButton className={isScrolled ? "" : "bg-white/10 backdrop-blur dark:bg-slate-950/20"} />

          {user ? (
            <ProfileMenu name={user.name || user.username} username={user.username} imageUrl={user.profile_picture_url || "/default-avatar.png"} />
          ) : (
            <Link href="/me" className="inline-flex items-center px-4 py-0 ml-2 text-sm font-semibold text-white transition bg-black rounded-full shadow-sm h-11 hover:bg-gray-900 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100">
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
