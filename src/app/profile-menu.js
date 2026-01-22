"use client";

import Link from "next/link";

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
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem asChild>
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/me/visit">Make an Appearence</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/api/auth/instagram/logout?redirect=/">Logout</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
