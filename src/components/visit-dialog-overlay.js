"use client";

import HandleBadge from "@/components/handle-badge";
import { Dialog, DialogDescription, DialogHeader, DialogOverlay, DialogPortal, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerDescription, DrawerHeader, DrawerOverlay, DrawerPortal, DrawerTitle } from "@/components/ui/drawer";
import ShareDialog from "@/components/share-dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { useCountdown } from "@/lib/hooks/use-countdown";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { cn, hashSeed, safeCapitalize } from "@/lib/utils";
import { Link2, MoreHorizontal, Share2, Tag } from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { Drawer as DrawerPrimitive } from "vaul";

export default function VisitDialogOverlay({ visit, open, onOpenChange }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (!visit) return null;

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogPortal>
          <AnimatePresence>
            {open ? (
              <>
                <DialogOverlay asChild className="data-[state=open]:animate-none data-[state=closed]:animate-none">
                  <motion.div
                    className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </DialogOverlay>
                <DialogPrimitive.Content asChild forceMount>
                  <motion.div
                    className="fixed left-1/2 top-1/2 z-50 w-[min(94vw,26rem)] -translate-x-1/2 -translate-y-1/2 sm:w-full sm:max-w-xl"
                    initial={{ opacity: 0, y: 36, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 36, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <div className="p-0 m-0 overflow-hidden rounded-3xl ring-1 ring-purple-400/80 shadow-[0_20px_60px_rgba(168,85,247,0.45),0_0_120px_rgba(168,85,247,0.45)]">
                      <div className="rounded-3xl ring-1 ring-purple-300/80">
                        <DialogHeader className="sr-only">
                          <VisuallyHidden>
                            <DialogTitle>Visit Details</DialogTitle>
                          </VisuallyHidden>
                          <VisuallyHidden>
                            <DialogDescription>Visit details dialog</DialogDescription>
                          </VisuallyHidden>
                        </DialogHeader>
                        <div className="max-h-[85vh] w-[min(94vw,26rem)] no-scrollbar overflow-y-auto overflow-x-hidden rounded-3xl bg-[radial-gradient(140%_120%_at_50%_-10%,rgba(145,95,255,0.35)_0%,rgba(59,29,94,0.22)_42%,rgba(24,12,48,0.6)_68%,rgba(15,8,30,0.95)_100%),linear-gradient(180deg,#3a1b62_0%,#2a1651_35%,#22103f_60%,#140a2a_100%)] text-[12px] text-slate-100 sm:w-full sm:max-w-xl sm:text-base [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                          <VisitDetailsContent visit={visit} open={open} onOpenChange={onOpenChange} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </DialogPrimitive.Content>
              </>
            ) : null}
          </AnimatePresence>
        </DialogPortal>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerPortal>
        <AnimatePresence>
          {open ? (
            <>
              <DrawerOverlay asChild className="data-[state=open]:animate-none data-[state=closed]:animate-none">
                <motion.div
                  className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                />
              </DrawerOverlay>
              <DrawerPrimitive.Content asChild forceMount>
                <motion.div
                  className="w-full mx-auto !top-[12vh] !bottom-0 !mt-0 !max-h-none data-[vaul-drawer-direction=bottom]:!rounded-t-2xl border border-purple-500/60 shadow-[0_24px_70px_rgba(168,85,247,0.5),0_0_140px_rgba(168,85,247,0.45)] bg-[radial-gradient(140%_120%_at_50%_-10%,rgba(145,95,255,0.35)_0%,rgba(59,29,94,0.22)_42%,rgba(24,12,48,0.6)_68%,rgba(15,8,30,0.95)_100%),linear-gradient(180deg,#3a1b62_0%,#2a1651_35%,#22103f_60%,#140a2a_100%)] text-slate-100 fixed z-50 flex h-auto flex-col data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0"
                  initial={{ opacity: 0, y: 48, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 36, scale: 0.985 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <DrawerHeader className="sr-only">
                    <DrawerTitle>Visit Details</DrawerTitle>
                    <DrawerDescription>Visit details drawer</DrawerDescription>
                  </DrawerHeader>
                  <VisitDetailsContent visit={visit} open={open} onOpenChange={onOpenChange} />
                </motion.div>
              </DrawerPrimitive.Content>
            </>
          ) : null}
        </AnimatePresence>
      </DrawerPortal>
    </Drawer>
  );
}

function VisitDetailsContent({ visit, open, onOpenChange }) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const bannerImages = [
    "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
  ];
  const profileImages = [
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80",
  ];
  const bannerUrl = useMemo(() => bannerImages[Math.floor(Math.random() * bannerImages.length)], []);
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://catchme.live";
  const destinationHandle = (visit?.destination_username || visit?.destination_instagram_handle || "").replace(/^@/, "");
  const shareUrl = destinationHandle ? `${baseUrl}/artists/${destinationHandle}` : `${baseUrl}/artists`;
  const startDate = visit?.visit_start_time || visit?.start_time || visit?.start_date || visit?.start;
  const endDate = visit?.visit_end_time || visit?.end_time || visit?.end_date || visit?.end;
  const startLabel = startDate ? new Date(startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "TBD";
  const endLabel = endDate ? new Date(endDate).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "TBD";
  const accountName = visit?.destination_name || visit?.visit_title || visit?.title || "Artist";
  const startText = startDate ? new Date(startDate).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) : "TBD";
  const endText = endDate ? new Date(endDate).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) : "TBD";
  const startTimeOnly = startDate ? new Date(startDate).toLocaleString("en-US", { hour: "numeric", minute: "2-digit" }) : "TBD";
  const endTimeOnly = endDate ? new Date(endDate).toLocaleString("en-US", { hour: "numeric", minute: "2-digit" }) : "TBD";
  const locationLabel = visit?.visit_location || visit?.destination_name || visit?.destination_instagram_handle || "Location TBA";
  const nowValue = new Date();
  const startDateValue = startDate ? new Date(startDate) : null;
  const endDateValue = endDate ? new Date(endDate) : null;
  const isLive = startDateValue && startDateValue <= nowValue && (!endDateValue || endDateValue >= nowValue);
  const isUpcoming = !isLive && Boolean(startDateValue && startDateValue > nowValue);
  const isResidency = visit?.visit_type === "residency";
  const isSameDay = startDateValue && endDateValue ? startDateValue.toDateString() === endDateValue.toDateString() : false;
  const statusLabel = isLive ? "Live" : isUpcoming ? "Upcoming" : "Expired";
  const statusColor = isLive ? "text-purple-500 dark:text-purple-400" : isUpcoming ? "text-fuchsia-500 dark:text-fuchsia-400" : "text-rose-500 dark:text-rose-400";
  const descriptionText = "You stand against a wall; you sink into it. You rest your back against a tree, the breeze rubs you green. The city hums while the ink settles into your skin. Every line is a memory, every mark a promise.";
  const countdownTarget = isLive ? endDateValue : isUpcoming ? startDateValue : null;
  const countdownLabel = isLive ? "Time Remaining" : isUpcoming ? "Starts In" : "Visit Ended";
  const { countdown, pulse: countdownPulse } = useCountdown(countdownTarget, { active: open });
  const normalizedHandle = (value) => String(value || "account").replace(/^@/, "");
  const rawLinkedAccounts = Array.isArray(visit?.linked_accounts) ? visit.linked_accounts : [];
  const authorAccount = {
    name: visit?.author_name || visit?.author_username || "Author",
    handle: normalizedHandle(visit?.author_username || visit?.author_name || "author"),
    accountType: visit?.author_account_type || null,
  };
  const linkedPartnerAccounts = rawLinkedAccounts
    .filter((account) => (account.account_type || account.type) !== "destination")
    .map((account, index) => {
      const rawHandle = account.username || account.handle || account.name || `account-${account.id || index + 1}`;
      return {
        id: account.id || `partner-${index + 1}`,
        name: account.name || account.username || account.handle || "Account",
        handle: normalizedHandle(rawHandle),
        accountType: account.account_type || account.type || null,
      };
    });
  const linkedDestinationAccounts = rawLinkedAccounts
    .filter((account) => (account.account_type || account.type) === "destination")
    .map((account, index) => {
      const rawHandle = account.username || account.handle || account.name || `destination-${account.id || index + 1}`;
      return {
        id: account.id || `destination-${index + 1}`,
        name: account.name || account.username || account.handle || "Destination",
        handle: normalizedHandle(rawHandle),
        accountType: account.account_type || account.type || null,
      };
    });
  const destinationFallback = visit?.destination_username || visit?.destination_instagram_handle;
  const destinationAccounts = linkedDestinationAccounts.length
    ? linkedDestinationAccounts
    : [
        {
          id: "destination-fallback",
          name: visit?.destination_name || destinationFallback || "Destination",
          handle: normalizedHandle(destinationFallback || "destination"),
          accountType: visit?.destination_account_type || null,
        },
      ];
  const authorHandleValue = normalizedHandle(visit?.author_username || visit?.author_name || "author");
  const presentedByAccounts = [{ ...authorAccount, id: "author", handle: authorHandleValue }, ...linkedPartnerAccounts];
  const allLinkedAccounts = [{ ...authorAccount, id: "author", handle: authorHandleValue }, ...linkedPartnerAccounts, ...destinationAccounts];
  const featuredAccounts = presentedByAccounts.slice(0, 3);
  const pickProfileImage = (seed) => {
    const hash = Math.abs(hashSeed(seed));
    return profileImages[hash % profileImages.length];
  };
  return (
    <div className="flex-1 rounded-md overflow-y-auto px-4 pb-10 text-white/90 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="pt-4">
        <div className="mt-3 flex flex-col items-center gap-4 text-center text-white">
          <div className="mb-6 flex flex-col items-center justify-center gap-2">
            <div className="flex flex-wrap items-center justify-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold tracking-[0.18em]",
                isLive
                  ? "border-pink-400/70 bg-pink-500/55 text-pink-50"
                  : isUpcoming
                    ? "border-emerald-400/70 bg-emerald-500/40 text-emerald-50"
                    : "border-white/20 bg-white/10 text-white/70",
              )}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full animate-pulse",
                  isLive ? "bg-pink-300" : isUpcoming ? "bg-emerald-300" : "bg-white/50",
                )}
              />
              {statusLabel === "Live" ? "Live Now" : statusLabel}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/80">
              <Tag className="h-3 w-3" />
              {safeCapitalize(visit.visit_type ? visit.visit_type.replace(/_/g, " ") : "Visit")}
            </span>
            </div>
            {/* location badge moved into date card */}
          </div>
          {!isResidency ? (
            <>
              {isLive || isUpcoming ? (
                <div className="flex flex-col items-center gap-1.5">
                  <div className="text-[12px] font-semibold text-white/90">{countdownLabel}</div>
                  <div className="flex items-end gap-1.5 text-2xl font-semibold text-white sm:text-3xl">
                    <span
                      className={`min-w-[2.2ch] text-center transition md:hover:-translate-y-0.5 md:hover:text-white/80 ${
                        countdownPulse.days ? "scale-105 text-white" : ""
                      }`}
                    >
                      {countdown?.days ?? "00"}
                    </span>
                    <span className="text-white/55">:</span>
                    <span
                      className={`min-w-[2.2ch] text-center transition md:hover:-translate-y-0.5 md:hover:text-white/80 ${
                        countdownPulse.hours ? "scale-105 text-white" : ""
                      }`}
                    >
                      {countdown?.hours ?? "00"}
                    </span>
                    <span className="text-white/55">:</span>
                    <span
                      className={`min-w-[2.2ch] text-center transition md:hover:-translate-y-0.5 md:hover:text-white/80 ${
                        countdownPulse.mins ? "scale-105 text-white" : ""
                      }`}
                    >
                      {countdown?.mins ?? "00"}
                    </span>
                    <span className="text-white/55">:</span>
                    <span
                      className={`min-w-[2.2ch] text-center transition md:hover:-translate-y-0.5 md:hover:text-white/80 ${
                        countdownPulse.secs ? "scale-105 text-white" : ""
                      }`}
                    >
                      {countdown?.secs ?? "00"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/50">
                    {["Days", "Hours", "Mins", "Secs"].map((label) => (
                      <span key={label} className="transition md:hover:-translate-y-0.5 md:hover:text-white/80">
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
              <div className={cn("mt-3 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-center shadow-inner transition md:hover:-translate-y-0.5 md:hover:border-white/25 md:hover:bg-white/15", isLive || isUpcoming ? "" : "mt-6")}>
                <div className={cn("text-xl font-semibold text-white sm:text-2xl", isLive ? "text-sm font-medium text-white/80 sm:text-base" : "")}>
                  Starts {isSameDay ? startTimeOnly : startText}
                </div>
                <div
                  className={cn(
                    "mt-0.5 text-sm font-medium text-white/80 sm:text-base",
                    isLive ? "text-xl font-semibold text-white sm:text-2xl" : "",
                  )}
                >
                  {endText ? `Ends ${isSameDay ? endTimeOnly : endText}` : "Ends TBD"}
                </div>
                <div className="mt-4 flex justify-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/80">
                    <Tag className="h-3 w-3" />
                    {locationLabel}
                  </span>
                </div>
              </div>
            </>
          ) : null}
          <div className="mt-8 flex flex-col items-center gap-1.5 mb-6">
            <div className="flex items-center gap-2">
              <HandleBadge
                href={`/artists/${visit.destination_username || visit.destination_instagram_handle || ""}`}
                avatarUrl={pickProfileImage(visit.destination_username || visit.destination_instagram_handle || "handle")}
                alt={visit.destination_username || "Artist"}
                handle={`@${String(visit.destination_username || visit.destination_instagram_handle || "artist").replace(/^@/, "")}`}
                className="border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold text-white shadow-sm"
              />
              {destinationAccounts[0] ? (
                <>
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/60">
                    <Link2 className="h-3 w-3" />
                  </span>
                  <HandleBadge
                    href={`/artists/${destinationAccounts[0].handle || ""}`}
                    avatarUrl={pickProfileImage(destinationAccounts[0].handle)}
                    alt={destinationAccounts[0].name}
                    handle={`@${String(destinationAccounts[0].handle).replace(/^@/, "")}`}
                    className="border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold text-white shadow-sm"
                  />
                </>
              ) : null}
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-semibold text-white">Description</h3>
              <p className={`mt-2 text-sm leading-relaxed text-white/70 ${isDescriptionExpanded ? "" : "line-clamp-3"}`}>{descriptionText}</p>
              <button type="button" onClick={() => setIsDescriptionExpanded((prev) => !prev)} className="mt-2 text-sm font-semibold text-white/50">
                {isDescriptionExpanded ? "Read less" : "Read more"}
              </button>
            </div>
            <div className="mt-6 flex items-center gap-6 border-b border-white/10 pb-3 text-sm font-semibold text-white/60">
              <span className="text-white">Details</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 text-sm">
                <span className="text-white/60">Now Live</span>
                <span className={cn("font-semibold underline-offset-4", isLive ? "text-emerald-300" : "text-white/40")}>{isLive ? "Yes" : "No"}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 text-sm">
                <span className="text-white/60">Author</span>
                <Link href={`/profile/${visit.author_username || visit.author_name || "author"}`} className="flex items-center gap-2 text-white/90">
                  <div className="h-5 w-5 overflow-hidden rounded-full bg-white/10">
                    <img src={pickProfileImage(visit.author_username || visit.author_name || "author")} alt={authorAccount.name} className="h-full w-full object-cover" />
                  </div>
                  <span className="font-semibold underline-offset-4">{authorAccount.name}</span>
                </Link>
              </div>
              {[
                ["Start", startLabel],
                ["End", endLabel],
                ["Visit Type", safeCapitalize(visit.visit_type ? visit.visit_type.replace(/_/g, " ") : "N/A")],
                ["Location", locationLabel],
                ["Bookings Open", visit.booking_open_date ? new Date(visit.booking_open_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "TBD"],
                ["Age Policy", visit.age_policy || "N/A"],
                ["Total Linked Accounts", (visit.linked_accounts ? visit.linked_accounts.length : 0) + 1],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between border-b border-white/10 pb-4 text-sm">
                  <span className="text-white/55">{label}</span>
                  <span className="font-semibold text-white/90 underline-offset-4">{value}</span>
                </div>
              ))}
            </div>
            <div className="space-y-3 mt-10" id="linked-accounts">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 shadow-inner">
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-sm font-semibold text-white">Linked Accounts</div>
                  <div className="text-xs font-medium text-white/50">{allLinkedAccounts.length} total</div>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  {allLinkedAccounts.map((account) => (
                    <HandleBadge
                      key={account.id || account.handle}
                      href={`/artists/${account.handle || ""}`}
                      avatarUrl={pickProfileImage(account.handle)}
                      alt={account.name}
                      handle={`@${String(account.handle).replace(/^@/, "")}`}
                      className="border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold text-white shadow-sm"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-12 flex items-center justify-between pt-8">
              <ShareDialog
                url={shareUrl}
                trigger={
                  <button type="button" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-white/15">
                    <Share2 className="h-4 w-4" />
                    Share
                  </button>
                }
              />
              <button type="button" aria-label="More options" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/80 shadow-sm transition hover:-translate-y-0.5 hover:bg-white/15">
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
