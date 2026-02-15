"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import VisitDetails from "@/components/visit-details";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useRouter } from "next/navigation";
import * as React from "react";

export default function VisitDialog({ visit, slug, scrollKey }) {
  const [open, setOpen] = React.useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const router = useRouter();

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <VisuallyHidden>
              <DialogTitle>Visit Details</DialogTitle>
            </VisuallyHidden>
            <VisuallyHidden>
              <DialogDescription>Explore this artist visit schedule.</DialogDescription>
            </VisuallyHidden>
          </DialogHeader>
          <VisitDetails visit={visit} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Visit Details</DrawerTitle>
          <DrawerDescription>Explore this artist visit schedule.</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-4">
          <VisitDetails visit={visit} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
