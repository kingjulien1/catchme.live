"use client";

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { AtSignIcon, CheckIcon, Loader2, SearchIcon } from "lucide-react";
import { useState } from "react";

export default function DestinationAccountField({ onLocationChange, error, onFieldChange }) {
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
      onLocationChange?.(data?.profile?.location || "");
    } catch (err) {
      setVerifyError("Unable to verify the account right now.");
    } finally {
      setIsVerifying(false);
    }
  };

  const hasError = Boolean(error);

  return (
    <div className="grid items-center w-full gap-3">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-none">
        <InputGroup className={`h-11 rounded-xl border-slate-200 bg-white shadow-none dark:border-slate-800 dark:bg-slate-950 ${hasError ? "border-red-400 focus-within:border-red-400 focus-within:ring-red-300/40 focus-within:ring-[3px]" : ""}`}>
          <InputGroupInput
            id="instagram-handle"
            name="destination_instagram_handle"
            placeholder="Search..."
            value={handle}
            aria-invalid={hasError}
            className="py-3"
            onChange={(event) => {
              setHandle(event.target.value);
              onFieldChange?.("destination_instagram_handle");
            }}
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
            <InputGroupButton
              size="sm"
              className="rounded-lg bg-purple-600 text-white transition-colors hover:bg-purple-500 dark:bg-purple-500 dark:text-white dark:hover:bg-purple-400 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-purple-600 dark:disabled:hover:bg-purple-500"
              onClick={handleVerify}
              disabled={isVerifying || !handle.trim()}
            >
              {isVerifying ? <Loader2 className="w-4 h-4 animate-spin" /> : <SearchIcon className="w-4 h-4" />}
              Verify Account
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">Enter the Instagram username of studio or venue of your destination.</p>
      </div>
      {error ? <p className="text-xs text-red-600 dark:text-red-400">{error}</p> : null}
      {null}
    </div>
  );
}
