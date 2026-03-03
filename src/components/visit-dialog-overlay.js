"use client";

import HandleBadge from "@/components/handle-badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogOverlay, DialogPortal, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import ShareDialog from "@/components/share-dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { cn, hashSeed, safeCapitalize } from "@/lib/utils";
import { MoreHorizontal, Share2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function VisitDialogOverlay({ visit, open, onOpenChange }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (!visit) return null;

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogPortal>
          <DialogOverlay className="backdrop-blur-xl" />
          <DialogContent showCloseButton={false} className="p-0 m-0" onOpenAutoFocus={(event) => event.preventDefault()}>
            <DialogHeader className="sr-only">
              <VisuallyHidden>
                <DialogTitle>Visit Details</DialogTitle>
              </VisuallyHidden>
              <VisuallyHidden>
                <DialogDescription>Visit details dialog</DialogDescription>
              </VisuallyHidden>
            </DialogHeader>
            <div className="max-h-[85vh] w-[min(94vw,26rem)] no-scrollbar overflow-y-auto overflow-x-hidden bg-white text-[12px] rounded-md sm:w-full sm:max-w-xl sm:text-base [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <VisitDetailsContent visit={visit} open={open} onOpenChange={onOpenChange} />
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="w-full mx-auto !top-[12vh] !bottom-0 !mt-0 !max-h-none data-[vaul-drawer-direction=bottom]:!rounded-t-2xl shadow-none">
        <DrawerHeader className="sr-only">
          <DrawerTitle>Visit Details</DrawerTitle>
          <DrawerDescription>Visit details drawer</DrawerDescription>
        </DrawerHeader>
        <VisitDetailsContent visit={visit} open={open} onOpenChange={onOpenChange} />
      </DrawerContent>
    </Drawer>
  );
}

function ArtistAccountCard({ account, avatarUrl }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-2 px-3 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 overflow-hidden rounded-md bg-slate-200">
          <img src={avatarUrl} alt={account.name} className="h-full w-full object-cover" />
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-900 dark:text-white">{account.name}</div>
          <div className="text-xs font-medium text-slate-600 dark:text-slate-400">@{String(account.handle).replace(/^@/, "")}</div>
        </div>
      </div>
      <span className="text-xs capitalize font-semibold text-slate-400 dark:text-slate-500">{(account.accountType || "author").replace(/_/g, " ")}</span>
    </div>
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
  const bannerUrl = bannerImages[Math.floor(Math.random() * bannerImages.length)];
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://catchme.live";
  const destinationHandle = (visit?.destination_username || visit?.destination_instagram_handle || "").replace(/^@/, "");
  const shareUrl = destinationHandle ? `${baseUrl}/artists/${destinationHandle}` : `${baseUrl}/artists`;
  const startDate = visit?.visit_start_time || visit?.start_time || visit?.start_date || visit?.start;
  const endDate = visit?.visit_end_time || visit?.end_time || visit?.end_date || visit?.end;
  const startLabel = startDate ? new Date(startDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "TBD";
  const endLabel = endDate ? new Date(endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "TBD";
  const accountName = visit?.destination_name || visit?.visit_title || visit?.title || "Artist";
  const startText = startDate ? new Date(startDate).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }) : "TBD";
  const endText = endDate ? new Date(endDate).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }) : "TBD";
  const locationLabel = visit?.visit_location || visit?.destination_name || visit?.destination_instagram_handle || "Location TBA";
  const now = new Date();
  const startDateValue = startDate ? new Date(startDate) : null;
  const endDateValue = endDate ? new Date(endDate) : null;
  const isLive = startDateValue && startDateValue <= now && (!endDateValue || endDateValue >= now);
  const isUpcoming = !isLive && Boolean(startDateValue && startDateValue > now);
  const statusLabel = isLive ? "Live" : isUpcoming ? "Upcoming" : "Expired";
  const statusColor = isLive ? "text-purple-500 dark:text-purple-400" : isUpcoming ? "text-fuchsia-500 dark:text-fuchsia-400" : "text-rose-500 dark:text-rose-400";
  const descriptionText = "You stand against a wall; you sink into it. You rest your back against a tree, the breeze rubs you green. The city hums while the ink settles into your skin. Every line is a memory, every mark a promise.";
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
  const pickProfileImage = (seed) => {
    const hash = Math.abs(hashSeed(seed));
    return profileImages[hash % profileImages.length];
  };
  return (
    <div className="flex-1 rounded-md overflow-y-auto px-4 pb-10 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="pt-4">
        <div className="mt-5 flex flex-col items-center gap-3 text-center">
          <HandleBadge
            href={`/artists/${visit.destination_username || visit.destination_instagram_handle || ""}`}
            avatarUrl={pickProfileImage(visit.destination_username || visit.destination_instagram_handle || "handle")}
            alt={visit.destination_username || "Artist"}
            handle={`@${String(visit.destination_username || visit.destination_instagram_handle || "artist").replace(/^@/, "")}`}
            className="border mb-4 border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
          <div className="text-2xl font-semibold text-slate-900 dark:text-white">
            <span className="block">{startText}</span>
            <span className="block">{endText}</span>
          </div>
          <div className="text-sm font-normal text-slate-500 dark:text-slate-400">
            {safeCapitalize(visit.visit_type ? visit.visit_type.replace(/_/g, " ") : "Visit")} • {locationLabel} • <span className={`font-semibold ${statusColor}`}>{statusLabel}</span>
          </div>
          <HandleBadge
            href={`/artists/${visit.destination_username || visit.destination_instagram_handle || ""}`}
            avatarUrl={pickProfileImage(visit.destination_username || visit.destination_instagram_handle || "handle")}
            alt={visit.destination_username || "Artist"}
            handle={`@${String(visit.destination_username || visit.destination_instagram_handle || "artist").replace(/^@/, "")}`}
            className="mx-auto mt-4 border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
        </div>
        <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-800">
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">Description</h3>
              <p className={`mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300 ${isDescriptionExpanded ? "" : "line-clamp-3"}`}>{descriptionText}</p>
              <button type="button" onClick={() => setIsDescriptionExpanded((prev) => !prev)} className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
                {isDescriptionExpanded ? "Read less" : "Read more"}
              </button>
            </div>
            <div className="mt-6 flex items-center gap-6 border-b border-slate-200 pb-3 text-sm font-semibold text-slate-500 dark:border-slate-800 dark:text-slate-400">
              <span className="text-slate-900 dark:text-white">Details</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 text-sm dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">Now Live</span>
                <span className={cn("font-semibold underline-offset-4", isLive ? "text-emerald-500" : "text-gray-500")}>{isLive ? "Yes" : "No"}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 text-sm dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">Author</span>
                <Link href={`/profile/${visit.author_username || visit.author_name || "author"}`} className="flex items-center gap-2 underline">
                  <div className="h-5 w-5 overflow-hidden rounded-full bg-slate-200">
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
                <div key={label} className="flex items-center justify-between border-b border-slate-200 pb-4 text-sm dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400">{label}</span>
                  <span className="font-semibold text-slate-900 underline-offset-4 dark:text-white">{value}</span>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <div className="text-sm font-semibold text-slate-900 dark:text-white">Linked Partners</div>
              <div className="space-y-3">
                {presentedByAccounts.map((account) => (
                  <ArtistAccountCard key={account.id || account.handle} account={account} avatarUrl={pickProfileImage(account.handle)} />
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-sm font-semibold text-slate-900 dark:text-white">Linked Destinations</div>
              <div className="space-y-3">
                {destinationAccounts.map((account) => (
                  <ArtistAccountCard key={account.id || account.handle} account={account} avatarUrl={pickProfileImage(account.handle)} />
                ))}
              </div>
            </div>
            <div className="mt-12 flex items-center justify-between border-t border-slate-200 pt-8 dark:border-slate-800">
              <ShareDialog
                url={shareUrl}
                trigger={
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </button>
                }
              />
              <button
                type="button"
                aria-label="More options"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
