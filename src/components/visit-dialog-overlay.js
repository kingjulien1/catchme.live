"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import VisitDetails from "@/components/visit-details";
import { useMediaQuery } from "@/lib/hooks/use-media-query";

export default function VisitDialogOverlay({ visit, open, onOpenChange }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (!visit) return null;

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[520px] max-h-[85vh] overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" showCloseButton={false}>
          <DialogHeader>
            <VisuallyHidden>
              <DialogTitle>Visit Details</DialogTitle>
            </VisuallyHidden>
            <VisuallyHidden>
              <DialogDescription>Visit details dialog</DialogDescription>
            </VisuallyHidden>
          </DialogHeader>
          <VisitDetails visit={visit} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="w-full !top-[22vh] !bottom-0 !mt-0 !max-h-none rounded-t-[28px]">
        <DrawerHeader className="sr-only">
          <DrawerTitle>Visit Details</DrawerTitle>
          <DrawerDescription>Visit details drawer</DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto px-4 pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <VisitDetails visit={visit} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
