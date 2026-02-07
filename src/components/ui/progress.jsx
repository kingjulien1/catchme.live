"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

function Progress({ className, value, indicatorClassName, indicatorStyle, ...props }) {
  return (
    <ProgressPrimitive.Root data-slot="progress" className={cn("bg-primary relative h-2 w-full overflow-hidden rounded-full", className)} {...props}>
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        suppressHydrationWarning
        className={cn("bg-primary h-full w-full flex-1 transition-all", indicatorClassName)}
        style={{ transform: `translateX(-${100 - (value || 0)}%)`, ...indicatorStyle }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
