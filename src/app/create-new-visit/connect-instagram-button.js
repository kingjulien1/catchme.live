"use client";

import { useState } from "react";
import { InstagramIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ConnectInstagramButton() {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectInstagram = () => {
    if (isConnecting) return;
    setIsConnecting(true);
    const authStartUrl = "/api/auth/instagram/start";
    window.location.assign(authStartUrl);
  };

  return (
    <Button
      type="button"
      size="lg"
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-65 from-fuchsia-500 to-pink-500 px-4 py-4 text-sm font-semibold text-white shadow-sm transition hover:opacity-80 dark:from-fuchsia-400 dark:to-pink-400"
      onClick={handleConnectInstagram}
      disabled={isConnecting}
    >
      <InstagramIcon className="h-5 w-5" />
      Connect with Instagram
    </Button>
  );
}
