"use client";

import { useState } from "react";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@radix-ui/react-label";
import { AtSignIcon, CheckIcon, Loader2, SearchIcon, InfoIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function DestinationAccountField({ onLocationChange, error }) {
  const [handle, setHandle] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verifiedProfile, setVerifiedProfile] = useState(null);
  const [verifyError, setVerifyError] = useState("");

  const handleVerify = async () => {
    const trimmed = handle.trim().replace(/^@/, "");
    if (!trimmed || isVerifying) return;

    setIsVerifying(true);
    setVerifyError("");
    setIsVerified(false);
    setVerifiedProfile(null);

    try {
      const res = await fetch(`/api/user-search?username=${encodeURIComponent(trimmed)}`);
      const data = await res.json();

      if (!res.ok || !data?.exists) {
        setVerifyError("We couldn’t find an account with that username on catchme.live yet. We’ll save the handle for now so it’s ready as soon as the account owner connects their Instagram. Once they join, we’ll automatically link the details.");
        setIsVerified(false);
        onLocationChange?.("");
        return;
      }

      setIsVerified(true);
      setVerifiedProfile(data?.profile || null);
      onLocationChange?.(data?.profile?.location?.name || "");
    } catch (err) {
      setVerifyError("Unable to verify the account right now.");
    } finally {
      setIsVerifying(false);
    }
  };

  const hasError = Boolean(error);

  return (
    <div className="grid items-center w-full gap-3">
      <div className="flex flex-col w-full gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <Label className="text-sm font-medium" htmlFor="instagram-handle">
          Destination Account Instagram Handle
        </Label>
        <p className="text-xs text-gray-500 dark:text-slate-400">Instagram Username</p>
      </div>
      <InputGroup className={hasError ? "border-red-400 focus-within:border-red-400 focus-within:ring-red-300/40 focus-within:ring-[3px]" : ""}>
        <InputGroupInput
          id="instagram-handle"
          name="destination_instagram_handle"
          placeholder="Search..."
          value={handle}
          aria-invalid={hasError}
          onChange={(event) => setHandle(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleVerify();
            }
          }}
        />
        <InputGroupAddon>
          <AtSignIcon className="w-4 h-4 font-gray-200" />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          {isVerifying ? (
            <div className="flex items-center justify-center rounded-full size-4">
              <Loader2 className="w-4 h-4 text-gray-500 animate-spin" />
            </div>
          ) : isVerified ? (
            <div className="flex items-center justify-center text-white rounded-full size-4 bg-emerald-500">
              <CheckIcon className="size-3" />
            </div>
          ) : null}
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="sm" className="text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800" onClick={handleVerify} disabled={isVerifying || !handle.trim()}>
            {isVerifying ? <Loader2 className="w-4 h-4 animate-spin" /> : <SearchIcon className="w-4 h-4" />}
            Verify account
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      {error ? <p className="text-xs text-red-600 dark:text-red-400">{error}</p> : null}
      {verifiedProfile ? (
        <div className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 border rounded-xl border-emerald-200 bg-emerald-50/40 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-slate-200">
          <img src={verifiedProfile.profile_picture_url || "/default-avatar.png"} alt={verifiedProfile.username ? `@${verifiedProfile.username}` : "Profile"} className="object-cover rounded-full h-9 w-9" />
          <div className="flex-1">
            <div className="font-semibold text-gray-900 dark:text-slate-100">{verifiedProfile.name || verifiedProfile.username || "Verified account"}</div>
            <div className="text-xs text-gray-500 dark:text-slate-300">{verifiedProfile.username ? `@${verifiedProfile.username}` : "Instagram account"}</div>
          </div>
          <div className="flex items-center justify-center text-white rounded-full size-5 bg-emerald-500">
            <CheckIcon className="size-3" />
          </div>
        </div>
      ) : null}
      {verifyError ? (
        <Alert variant="info" className="bg-sky-50 dark:bg-sky-500/10">
          <InfoIcon className="text-sky-700 dark:text-sky-200" />
          <AlertTitle className="text-sm font-semibold text-red-700 dark:text-red-300">Account not found yet</AlertTitle>
          <AlertDescription className="text-sm text-red-600 dark:text-red-300">{verifyError}</AlertDescription>
        </Alert>
      ) : null}
    </div>
  );
}
