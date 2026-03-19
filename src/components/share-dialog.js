"use client";

import { useState } from "react";
import { Check, Copy, ExternalLink, Facebook, Instagram, Linkedin, Mail, MessageCircle, QrCode, Send, Share2, Twitter, X } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const SOCIAL_LINKS = [
  { label: "Twitter", icon: Twitter, tone: "bg-black text-white" },
  { label: "Instagram", icon: Instagram, tone: "bg-gradient-to-br from-pink-500 via-orange-400 to-purple-500 text-white" },
  { label: "Facebook", icon: Facebook, tone: "bg-blue-600 text-white" },
  { label: "LinkedIn", icon: Linkedin, tone: "bg-sky-600 text-white" },
  { label: "WhatsApp", icon: MessageCircle, tone: "bg-emerald-500 text-white" },
  { label: "Telegram", icon: Send, tone: "bg-sky-500 text-white" },
  { label: "Reddit", icon: Share2, tone: "bg-orange-500 text-white" },
  { label: "Discord", icon: MessageCircle, tone: "bg-indigo-500 text-white" },
];

export default function ShareDialog({ url = "https://foundation.app/collection/bg-00bb", trigger, className = "" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <button
            type="button"
            className={`inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800 ${className}`}
          >
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </button>
        )}
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="backdrop-blur-xl" />
        <DialogContent
          showCloseButton={false}
          className="max-h-[80vh] w-[min(94vw,26rem)] overflow-y-auto overflow-x-hidden rounded-[24px] border border-slate-200 bg-white p-6 text-[12px] shadow-2xl dark:border-slate-800 dark:bg-slate-950 sm:max-h-none sm:w-full sm:max-w-xl sm:rounded-[32px] sm:p-8 sm:text-base"
        >
          <DialogTitle className="sr-only">Share</DialogTitle>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white sm:text-4xl">Share</h2>
            <DialogClose asChild>
              <button type="button" className="inline-flex h-6 w-6 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-900 dark:hover:text-slate-200 sm:h-8 sm:w-8">
                <X className="h-8 w-8 sm:h-5 sm:w-5" />
              </button>
            </DialogClose>
          </div>

          <div className="mt-4 rounded-2xl border border-purple-100/80 bg-gradient-to-r from-purple-50/80 via-pink-50/70 to-orange-50/60 p-3 dark:border-purple-500/20 dark:from-purple-500/10 dark:via-pink-500/10 dark:to-orange-500/10 sm:mt-6 sm:p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 via-orange-400 to-purple-500 text-white shadow-sm sm:h-12 sm:w-12">
                <Instagram className="h-4 w-4 sm:h-6 sm:w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-slate-900 dark:text-white sm:text-base">Share to Instagram Story</div>
                <div className="text-[11px] text-purple-600 dark:text-purple-300 sm:text-sm">Create a beautiful story post</div>{" "}
              </div>
              <button aria-label="Share to Instagram" className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-white shadow-sm sm:h-9 sm:w-9">
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-4 space-y-2 sm:mt-6">
            <div className="text-xs font-semibold text-slate-900 dark:text-white sm:text-xs">Project Link</div>
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 sm:px-4 sm:py-3">
              <div className="flex-1 truncate">{url}</div>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 sm:h-9 sm:w-9"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 sm:h-4 sm:w-4" /> : <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
              </button>
            </div>
          </div>

          <div className="mt-4 space-y-3 sm:mt-6">
            <div className="text-xs font-semibold text-slate-900 dark:text-white sm:text-xs">Share to Social</div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {SOCIAL_LINKS.map(({ label, icon: Icon, tone }) => (
                <button
                  key={label}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-slate-100 bg-white p-2.5 text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 sm:p-4"
                >
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full sm:h-12 sm:w-12 ${tone}`}>
                    <Icon className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                  </div>
                  <div className="text-[11px] font-semibold sm:text-sm">{label}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 space-y-3 sm:my-6">
            <button className="flex w-full items-center gap-3 rounded-2xl border border-slate-100 bg-white px-3 py-2.5 text-left text-slate-700 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 sm:gap-4 sm:px-4 sm:py-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300 sm:h-10 sm:w-10">
                <Mail className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold sm:text-base">Send via Email</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 sm:text-sm">Send a direct invite link</div>
              </div>
              <span className="text-slate-400">›</span>
            </button>
            <button className="flex w-full items-center gap-3 rounded-2xl border border-slate-100 bg-white px-3 py-2.5 text-left text-slate-700 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 sm:gap-4 sm:px-4 sm:py-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300 sm:h-10 sm:w-10">
                <QrCode className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold sm:text-base">Get QR Code</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 sm:text-sm">Scan to view on mobile</div>
              </div>
              <span className="text-slate-400">›</span>
            </button>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
