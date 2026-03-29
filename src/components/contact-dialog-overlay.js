"use client";

import { Dialog, DialogDescription, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerDescription, DrawerHeader, DrawerOverlay, DrawerPortal, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { Dialog as DialogPrimitive } from "radix-ui";
import { Drawer as DrawerPrimitive } from "vaul";
import { useState } from "react";
import { Mail, MessageCircle, Instagram, X } from "lucide-react";

function ContactDialogContent({ handle, email, discord, onOpenChange }) {
  const [selectedId, setSelectedId] = useState("instagram");
  const options = [
    { id: "instagram", label: "Instagram", value: handle ? `@${handle}` : "@artist_name", icon: Instagram },
    { id: "email", label: "Email", value: email || "artist@example.com", icon: Mail },
    { id: "discord", label: "Discord", value: discord || "artist_name#1234", icon: MessageCircle },
  ];

  return (
    <div className="relative flex flex-col gap-6 rounded-3xl border border-white/10 bg-slate-950 px-6 pb-6 pt-8 text-slate-100 shadow-[0_30px_80px_rgba(0,0,0,0.45)] dark:border-slate-200/80 dark:bg-white dark:text-slate-900">
      <button
        type="button"
        onClick={() => onOpenChange(false)}
        className="absolute right-5 top-5 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/70 transition hover:bg-white/10 hover:text-white dark:border-slate-200/80 dark:text-slate-600 dark:hover:bg-slate-100 dark:hover:text-slate-900"
        aria-label="Close contact dialog"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 shadow-none">
          <MessageCircle className="h-8 w-8 text-white dark:text-slate-900" />
        </div>
        <h2 className="text-2xl font-semibold text-white dark:text-slate-900">Get in Touch</h2>
        <p className="mt-2 text-sm text-white/70 dark:text-slate-500">Choose your preferred way to connect</p>
      </div>

      <div className="relative z-10 flex flex-col gap-3">
        {options.map((option) => {
          const Icon = option.icon;
          const isSelected = selectedId === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setSelectedId(option.id)}
              className={cn(
                "flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:border-white/20 hover:bg-white/10 dark:border-slate-200/80 dark:bg-slate-50 dark:hover:bg-white",
                isSelected && "border-white/30 bg-white/10 dark:border-slate-300 dark:bg-white",
              )}
            >
              <span className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 dark:border-slate-200/80 dark:bg-white">
                  <Icon className="h-4.5 w-4.5 text-white dark:text-slate-900" />
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-semibold text-white dark:text-slate-900">{option.label}</span>
                  <span className="text-xs text-white/60 dark:text-slate-500">{option.value}</span>
                </span>
              </span>
              <span
                className={cn(
                  "flex h-5 w-5 items-center justify-center rounded-full border border-white/20 dark:border-slate-300",
                  isSelected && "border-white/50 dark:border-slate-500",
                )}
              >
                <span
                  className={cn(
                    "h-2.5 w-2.5 rounded-full bg-white/70 opacity-0 dark:bg-slate-900/70",
                    isSelected && "opacity-100",
                  )}
                />
              </span>
            </button>
          );
        })}
      </div>

      <div className="relative z-10 h-px w-full bg-white/10 dark:bg-slate-200/80" />

      <div className="relative z-10 flex flex-col gap-3">
        <button
          type="button"
          className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900"
        >
          Copy Link Profile
        </button>
        <p className="text-center text-xs text-white/40 dark:text-slate-500">
          Response times may vary. For urgent inquiries, email is preferred.
        </p>
      </div>
    </div>
  );
}

export default function ContactDialogTrigger({ handle, email, discord, className }) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            type="button"
            className={cn(
              "inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-900 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100",
              className,
            )}
          >
            <Mail className="h-4 w-4" />
            Contact
          </button>
        </DialogTrigger>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 z-50 bg-transparent backdrop-blur-sm" />
          <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-[min(92vw,24rem)] -translate-x-1/2 -translate-y-1/2">
            <DialogHeader className="sr-only">
              <DialogTitle>Contact options</DialogTitle>
              <DialogDescription>Choose how to reach out.</DialogDescription>
            </DialogHeader>
            <ContactDialogContent handle={handle} email={email} discord={discord} onOpenChange={setOpen} />
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
            "inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-900 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100",
            className,
          )}
        >
          <Mail className="h-4 w-4" />
          Contact
        </button>
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerOverlay className="fixed inset-0 z-50 bg-transparent backdrop-blur-sm" />
        <DrawerPrimitive.Content className="fixed inset-x-0 bottom-0 z-50">
          <DrawerHeader className="sr-only">
            <DrawerTitle>Contact options</DrawerTitle>
            <DrawerDescription>Choose how to reach out.</DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-6 pt-4">
            <ContactDialogContent handle={handle} email={email} discord={discord} onOpenChange={setOpen} />
          </div>
        </DrawerPrimitive.Content>
      </DrawerPortal>
    </Drawer>
  );
}
