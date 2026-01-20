import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { getSessionUser } from "@/lib/db";
import { formatFollowers } from "@/lib/utils";
import { ArrowLeftRight, ChevronDown, CloudCheck, InstagramIcon, Link, ListOrdered, Lock, RotateCw, Settings, Star, Unlink, User, UserCheck } from "lucide-react";
import Section from "./Section";

/**
 * ConnectInstagramSection component to connect an Instagram account.
 * This section provides information about the benefits of connecting an Instagram account
 * and includes a button to initiate the connection process. It also highlights the data that will be accessed
 * and assures users about the safety of their account.
 *
 * @returns {JSX.Element} The rendered ConnectInstagramSection component.
 */
export default async function ConnectInstagramSection() {
  const user = await getSessionUser();

  if (user) {
    return (
      <Section title="Instagram Account" icon={<InstagramIcon className="w-4 h-4" />} subtitle="Connect your Instagram to sync your profile">
        <div className="flex flex-col gap-4 p-4 mt-6 bg-gray-100 border border-gray-200 dark:bg-gray-800 dark:border-gray-800 rounded-2xl sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img src={user.profile_picture_url || "/default-avatar.png"} alt={user.username ? `@${user.username}` : "Instagram profile"} className="object-cover rounded-full h-14 w-14 ring-2 ring-white dark:ring-slate-900" />
              <span className="absolute flex items-center justify-center w-6 h-6 text-xs text-white rounded-full -bottom-1 -right-1 bg-emerald-500 ring-2 ring-white dark:ring-slate-900">
                <CloudCheck className="w-4 h-4" />
              </span>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-gray-800 dark:text-fuchsia-400">@{user.username}</span>
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200">
                  <Link className="inline-block w-3 h-3 mr-1" />
                  connected
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-gray-500 dark:text-slate-400">
                <span>{formatFollowers(user.followers_count)}</span>
                <span className="hidden w-1 h-1 bg-gray-300 rounded-full sm:inline-block" />
                <span>Last synced: just now</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-600 transition bg-white border border-gray-200 rounded-full shadow-sm hover:text-gray-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
          >
            <RotateCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        <div className="flex flex-col gap-3 mt-4 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between dark:text-slate-400">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Secure connection • Read-only
            </span>
          </div>
        </div>

        <form action="/api/auth/instagram/logout?redirect=/create-new-visit" method="post" className="mt-6">
          <button
            type="submit"
            className="flex items-center justify-center w-full gap-2 px-5 py-3 text-base font-semibold text-white transition shadow-sm rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
          >
            <Unlink className="w-4 h-4" />
            Disconnect Instagram Account
          </button>
        </form>
      </Section>
    );
  }

  return (
    <Section
      title="Connect Your Instagram Account"
      icon={<InstagramIcon className="w-4 h-4" />}
      subtitle="We’ll use your Instagram profile to verify your identity and populate your artist profile. Importing your details makes setup faster—no need to enter everything again."
    >
      {/* <Alert className="p-4 mt-5 border border-gray-200 rounded-2xl bg-fuchsia-50">
        <ShieldIcon className="w-4 h-4 text-blue-700" />
        <AlertTitle className="text-sm">Your account stays safe</AlertTitle>
        <AlertDescription className="w-full text-sm text-gray-600">
          <p>We only access public profile information and never post without your permission - no edits, no posts, and you’re always in control. You can disconnect at any time.</p>

          <div className="flex flex-wrap justify-center w-full gap-2 mt-3 sm:justify-around">
            {["Profile Name & Picture", "Bio & Links", "Public Posts & Stories"].map((pill) => (
              <span key={pill} className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-gray-700 border border-gray-200 rounded-full bg-white/70">
                <CheckIcon className="w-4 h-4 text-emerald-500" />
                {pill}
              </span>
            ))}
          </div>
        </AlertDescription>
      </Alert> */}
      {/* Creator/Business requirement */}
      <Alert className="p-4 mt-4 border border-gray-200 rounded-2xl bg-indigo-50/60 sm:p-5 dark:border-slate-800/80 dark:bg-indigo-500/10">
        <UserCheck className="w-4 h-4 text-indigo-700 dark:text-indigo-200" />
        <AlertTitle className="text-sm text-gray-900 dark:text-slate-100">Creator or Business Account Required</AlertTitle>
        <AlertDescription className="text-sm text-gray-600 dark:text-slate-300">
          <p>
            Connection only works with <strong>Instagram Creator or Business accounts</strong>. Switching to a Creator or Business account has virtually no downsides — it’s free, keeps your content the same, and unlocks helpful tools that benefit
            your profile — takes less than 30 seconds.
          </p>

          <Collapsible className="w-full mt-4">
            <CollapsibleTrigger asChild>
              <button
                type="button"
                className="flex items-center justify-between w-full px-0 py-2 text-xs font-semibold text-left text-gray-800 bg-transparent outline-none group focus:outline-none focus-visible:outline-none focus-visible:ring-0 dark:text-slate-100"
              >
                <span className="inline-flex items-center gap-2">
                  <ListOrdered className="w-4 h-4 text-indigo-700 dark:text-indigo-200" />
                  Show step-by-step setup
                </span>
                <ChevronDown className="h-4 w-4 text-gray-500 transition-transform group-data-[state=open]:rotate-180 dark:text-slate-400" />
              </button>
            </CollapsibleTrigger>

            <CollapsibleContent className="pt-3">
              {/* Steps (responsive) */}
              <div className="grid w-full grid-cols-2 gap-3 md:grid-cols-4">
                {[
                  {
                    icon: <User className="w-4 h-4" />,
                    label: "Profile → Menu → Settings",
                  },
                  {
                    icon: <Settings className="w-4 h-4" />,
                    label: "Account type and tools",
                  },
                  {
                    icon: <ArrowLeftRight className="w-4 h-4" />,
                    label: "Switch to professional",
                  },
                  {
                    icon: <Star className="w-4 h-4" />,
                    label: 'Choose "Creator or Business"',
                  },
                ].map((step) => (
                  <div key={step.label} className="flex flex-col items-center justify-center w-full gap-2 px-3 py-4 text-center bg-white border border-gray-200 rounded-xl dark:border-slate-800/80 dark:bg-slate-900/70">
                    <div className="flex items-center justify-center w-8 h-8 text-indigo-700 bg-indigo-100 rounded-full dark:bg-indigo-500/20 dark:text-indigo-200">{step.icon}</div>
                    <p className="text-xs font-medium text-gray-700 dark:text-slate-200">{step.label}</p>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </AlertDescription>
      </Alert>

      <div className="flex flex-col gap-3 mt-5 sm:flex-col sm:w-full">
        <a
          href="/api/auth/instagram/start"
          className="inline-flex items-center justify-center gap-2 px-4 py-4 text-sm font-semibold text-white transition shadow-sm rounded-xl bg-linear-65 from-fuchsia-500 to-pink-500 hover:opacity-80 dark:from-fuchsia-400 dark:to-pink-400"
        >
          <InstagramIcon className="w-5 h-5" />
          Connect with Instagram
        </a>
        <div className="text-xs text-center text-gray-500 dark:text-slate-400">
          By connecting, you agree to our <span className="text-fuchsia-700 hover:underline dark:text-fuchsia-300">Terms of Service</span> and <span className="text-fuchsia-700 hover:underline dark:text-fuchsia-300">Privacy Policy</span>.
        </div>
      </div>
    </Section>
  );
}
