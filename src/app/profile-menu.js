"use client";

import Link from "next/link";
import { CalendarDays, LogOut, MapPinPlus, Settings, Unplug } from "lucide-react";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function ProfileMenu({ name, username, imageUrl }) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button type="button" className="flex items-center gap-3 px-3 py-0 ml-2 transition bg-gray-100 rounded-full shadow-sm h-11 hover:bg-gray-200 dark:bg-slate-900 dark:hover:bg-slate-800" aria-label="Open profile menu">
          <span className="w-8 h-8 overflow-hidden bg-gray-200 rounded-full dark:bg-slate-800">
            <img src={imageUrl} alt={username ? `@${username}` : "Instagram profile"} className="object-cover w-full h-full" />
          </span>
          <span className="hidden text-left sm:block">
            <span className="block text-sm font-semibold text-gray-900 dark:text-slate-100">{name}</span>
            <span className="block text-xs text-gray-500 dark:text-slate-400">{username ? `@${username}` : ""}</span>
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60 rounded-2xl border border-slate-200/80 bg-white/95 p-2 shadow-xl backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/90">
        <div className="px-3 py-2">
          <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{name}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">{username ? `@${username}` : ""}</div>
        </div>
        <DropdownMenuSeparator className="my-1 bg-slate-200/80 dark:bg-slate-800/80" />
        <DropdownMenuItem asChild>
          <Link href="/me/settings#me-start" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 focus:bg-slate-100 focus:text-slate-900 dark:text-slate-200 dark:focus:bg-slate-900">
            <Settings className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/me/visit#visit-start" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 focus:bg-slate-100 focus:text-slate-900 dark:text-slate-200 dark:focus:bg-slate-900">
            <MapPinPlus className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            Make a Visit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/me/visits#visits-start" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 focus:bg-slate-100 focus:text-slate-900 dark:text-slate-200 dark:focus:bg-slate-900">
            <CalendarDays className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            My Visits
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-1 bg-slate-200/80 dark:bg-slate-800/80" />
        <DropdownMenuItem asChild>
          <Link href="/api/auth/instagram/logout?redirect=/me" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-rose-600 focus:bg-rose-50 focus:text-rose-700 dark:text-rose-400 dark:focus:bg-rose-500/10">
            <Unplug className="h-4 w-4 text-rose-600 dark:text-rose-400" />
            Disconnect
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
