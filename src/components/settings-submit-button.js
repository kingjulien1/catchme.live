import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SettingsSubmitButton({
  isPending,
  label,
  pendingLabel = "Saving...",
  className = "",
  icon = null,
  ...props
}) {
  return (
    <Button type="submit" disabled={isPending} className={cn("w-full sm:w-auto rounded-full px-8 py-6", className)} {...props}>
      {isPending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {pendingLabel}
        </>
      ) : (
        <>
          {icon ? <span className="text-base">{icon}</span> : null}
          {label}
        </>
      )}
    </Button>
  );
}
