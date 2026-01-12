"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ArrowLeftRight, CheckIcon, ChevronDown, InstagramIcon, ListOrdered, Settings, ShieldIcon, Star, User, UserCheck } from "lucide-react";
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
      title="Connect Your Instagram Account"
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
          <p>
            Connection only works with <strong>Instagram Creator or Business accounts</strong>. Switching to a Creator or Business account has virtually no downsides — it’s free, keeps your content the same, and unlocks helpful tools that benefit
            your profile. Switch your personal account in less than 30 seconds
          </p>

          <Collapsible className="mt-4 w-full">
            <CollapsibleTrigger asChild>
              <button type="button" className="group flex w-full items-center justify-between bg-transparent px-0 py-2 text-left text-xs font-semibold text-gray-800 outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0">
                <span className="inline-flex items-center gap-2">
                  <ListOrdered className="h-4 w-4 text-indigo-700" />
                  Show step-by-step setup
                </span>
                <ChevronDown className="h-4 w-4 text-gray-500 transition-transform group-data-[state=open]:rotate-180" />
              </button>
            </CollapsibleTrigger>

            <CollapsibleContent className="pt-3">
              {/* Steps (responsive) */}
              <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-4">
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
                    label: 'Choose "Creator or Business"',
                  },
                ].map((step) => (
                  <div key={step.label} className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-4 text-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">{step.icon}</div>
                    <p className="text-xs font-medium text-gray-700">{step.label}</p>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
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
