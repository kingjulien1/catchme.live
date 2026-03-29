"use client";

import { Dialog, DialogDescription, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerDescription, DrawerHeader, DrawerOverlay, DrawerPortal, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { Dialog as DialogPrimitive } from "radix-ui";
import { Drawer as DrawerPrimitive } from "vaul";
import { useState } from "react";
import { Check, Copy, Facebook, Instagram, Link, Mail, Mails, Send, Share2, SquareArrowOutUpRight, Twitter, X } from "lucide-react";

function ShareDialogContent({ url, onOpenChange }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  const rows = [
    { label: "Instagram", value: "Share to story", icon: Instagram },
    { label: "Twitter", value: "Post to feed", icon: Twitter },
    { label: "Facebook", value: "Share with friends", icon: Facebook },
    { label: "Email", value: "Send direct link", icon: Mail },
  ];

  return (
    <div className="relative flex flex-col gap-6 rounded-3xl border border-white/10 bg-slate-950 px-6 pb-6 pt-8 text-slate-100 shadow-[0_30px_80px_rgba(0,0,0,0.45)] dark:border-slate-200/80 dark:bg-white dark:text-slate-900">
      <button
        type="button"
        onClick={() => onOpenChange(false)}
        className="absolute right-5 top-5 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:bg-white/10 hover:text-white dark:border-slate-200/80 dark:text-slate-600 dark:hover:bg-slate-100 dark:hover:text-slate-900"
        aria-label="Close share dialog"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 shadow-none dark:bg-slate-100">
          <Share2 className="h-8 w-8 text-white dark:text-slate-900" />
        </div>
        <h2 className="text-2xl font-semibold text-white dark:text-slate-900">Share Profile</h2>
        <p className="mt-2 text-sm text-white/70 dark:text-slate-500">Send this artist profile to clients and friends</p>
      </div>

      <div className="relative z-10 flex flex-col gap-3">
        {rows.map((row, index) => {
          const Icon = row.icon;
          const isPrimary = index === 0;
          return (
            <>
              <button
                key={row.label}
                type="button"
                className={cn(
                  "flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:border-white/20 hover:bg-white/10 dark:border-slate-200/80 dark:bg-slate-50 dark:hover:bg-white",
                  isPrimary && "border-white/10 bg-white/5 dark:border-slate-200/80 dark:bg-slate-50 mb-3",
                )}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={cn(
                      "inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 dark:border-slate-200/80 dark:bg-white",
                      isPrimary && "border-transparent bg-gradient-to-br from-fuchsia-500 via-pink-500 to-rose-500 text-white",
                      row.label === "Twitter" && "text-sky-400 dark:text-sky-500",
                      row.label === "Facebook" && "text-blue-400 dark:text-blue-600",
                      row.label === "Email" && "text-violet-400 dark:text-violet-500",
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4.5 w-4.5 text-white dark:text-slate-900",
                        isPrimary && "text-white dark:text-white",
                        !isPrimary && row.label === "Twitter" && "text-sky-400 dark:text-sky-500",
                        !isPrimary && row.label === "Facebook" && "text-blue-400 dark:text-blue-600",
                        !isPrimary && row.label === "Email" && "text-violet-400 dark:text-violet-500",
                      )}
                    />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm font-semibold text-white dark:text-slate-900">{row.label}</span>
                    <span className="text-xs text-white/60 dark:text-slate-500">{row.value}</span>
                  </span>
                </span>
                {isPrimary ? (
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:bg-white/10 dark:border-slate-200/80 dark:text-slate-600 dark:hover:bg-slate-100">
                    <SquareArrowOutUpRight className="h-4 w-4" />
                  </span>
                ) : (
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:bg-white/10 dark:border-slate-200/80 dark:text-slate-600 dark:hover:bg-slate-100">
                    <Send className="h-4 w-4" />
                  </span>
                )}
              </button>
              {isPrimary ? (
                <div className="mt-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-white/80 dark:border-slate-200/80 dark:bg-slate-50 dark:text-slate-600">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 dark:border-slate-200/80 dark:bg-white">
                    <Link className="h-4.5 w-4.5 text-white dark:text-slate-900" />
                  </span>
                  <span className="flex-1 truncate text-xs">{url}</span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:bg-white/10 dark:border-slate-200/80 dark:text-slate-600 dark:hover:bg-slate-100"
                    aria-label="Copy link"
                  >
                    {copied ? <Check className="h-4 w-4 text-emerald-400 dark:text-emerald-600" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              ) : null}
            </>
          );
        })}
      </div>

      <div className="relative z-10 flex flex-col gap-3">
        <p className="text-center text-xs text-white/40 dark:text-slate-500">Share links are public. Use email for private inquiries.</p>
      </div>
    </div>
  );
}

export default function ProfileShareDialog({ url, className }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useState(false);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            type="button"
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800",
              className,
            )}
          >
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </button>
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 z-50 bg-transparent backdrop-blur-sm" />
          <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-[min(92vw,24rem)] -translate-x-1/2 -translate-y-1/2">
            <DialogHeader className="sr-only">
              <DialogTitle>Share profile</DialogTitle>
              <DialogDescription>Share this profile.</DialogDescription>
            </DialogHeader>
            <ShareDialogContent url={url} onOpenChange={setOpen} />
          </DialogPrimitive.Content>
        </DialogPortal>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800",
            className,
          )}
        >
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </button>
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerOverlay className="fixed inset-0 z-50 bg-transparent backdrop-blur-sm" />
        <DrawerPrimitive.Content className="fixed inset-x-0 bottom-0 z-50">
          <DrawerHeader className="sr-only">
            <DrawerTitle>Share profile</DrawerTitle>
            <DrawerDescription>Share this profile.</DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-6 pt-4">
            <ShareDialogContent url={url} onOpenChange={setOpen} />
          </div>
        </DrawerPrimitive.Content>
      </DrawerPortal>
    </Drawer>
  );
}
