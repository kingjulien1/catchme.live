import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SettingsSubmitButton({ isPending, label, pendingLabel = "Saving...", className = "", ...props }) {
  return (
    <Button type="submit" disabled={isPending} className={cn("rounded-full px-6", className)} {...props}>
      {isPending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {pendingLabel}
        </>
      ) : (
        label
      )}
    </Button>
  );
}
