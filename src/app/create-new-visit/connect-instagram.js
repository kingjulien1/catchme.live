"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, CheckIcon, InstagramIcon, Settings, ShieldIcon, Star, User, UserCheck } from "lucide-react";
import Section from "./Section";

/**
 * ConnectInstagramSection component to connect an Instagram account.
 * This section provides information about the benefits of connecting an Instagram account
 * and includes a button to initiate the connection process. It also highlights the data that will be accessed
 * and assures users about the safety of their account.
 *
 * @returns {JSX.Element} The rendered ConnectInstagramSection component.
 */
export default function ConnectInstagramSection() {
  return (
    <Section
      title="1. Connect Your Instagram Account"
      icon={<InstagramIcon className="h-4 w-4" />}
      subtitle="We’ll use your Instagram profile to verify your identity and populate your artist profile. Importing your details makes setup faster—no need to enter everything again."
    >
      <Alert className="mt-5 rounded-2xl border border-gray-200 bg-fuchsia-50 p-4">
        <ShieldIcon className="h-4 w-4 text-blue-700" />
        <AlertTitle className="text-sm">Your account stays safe</AlertTitle>
        <AlertDescription className="text-sm text-gray-600 w-full">
          <p>We only access public profile information and never post without your permission - no edits, no posts, and you’re always in control. You can disconnect at any time.</p>

          <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-around w-full">
            {["Profile Name & Picture", "Bio & Links", "Public Posts & Stories"].map((pill) => (
              <span key={pill} className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-xs font-medium text-gray-700">
                <CheckIcon className="h-4 w-4 text-emerald-500" />
                {pill}
              </span>
            ))}
          </div>
        </AlertDescription>
      </Alert>
      {/* Creator/Business requirement */}
      <Alert className="mt-4 rounded-2xl border border-gray-200 bg-indigo-50/60 p-4 sm:p-5">
        <UserCheck className="h-4 w-4 text-indigo-700" />
        <AlertTitle className="text-sm">Creator or Business Account Required</AlertTitle>
        <AlertDescription className="text-sm text-gray-600">
          <p>Connection only works with Instagram Creator or Business accounts. Switch your personal account in less than 30 seconds, it's easy, quick, free and doesn't mess with your existing content.</p>

          {/* Steps (responsive) */}
          <div className="mt-4 grid w-full grid-cols-2 gap-3 md:grid-cols-4">
            {[
              {
                icon: <User className="h-4 w-4" />,
                label: "Profile → Menu → Settings",
              },
              {
                icon: <Settings className="h-4 w-4" />,
                label: "Account type and tools",
              },
              {
                icon: <ArrowLeftRight className="h-4 w-4" />,
                label: "Switch to professional",
              },
              {
                icon: <Star className="h-4 w-4" />,
                label: 'Choose "Creator"',
              },
            ].map((step) => (
              <div key={step.label} className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-4 text-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">{step.icon}</div>
                <p className="text-xs font-medium text-gray-700">{step.label}</p>
              </div>
            ))}
          </div>
        </AlertDescription>
      </Alert>

      <div className="mt-5 flex flex-col gap-3 sm:flex-col sm:w-full">
        <Button type="button" size="lg" className={"inline-flex items-center justify-center gap-2 rounded-xl px-4 py-4 text-sm font-semibold shadow-sm transition bg-linear-65 from-fuchsia-500 to-pink-500 text-white hover:opacity-80"}>
          <InstagramIcon className="h-5 w-5" />
          Connect with Instagram
        </Button>
        <div className="text-xs text-gray-500 text-center">
          By connecting, you agree to our <span className="text-fuchsia-700 hover:underline">Terms of Service</span> and <span className="text-fuchsia-700 hover:underline">Privacy Policy</span>.
        </div>
      </div>
    </Section>
  );
}
