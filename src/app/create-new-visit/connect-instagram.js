import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { sql } from "@/lib/db";
import crypto from "crypto";
import { ArrowLeftRight, Check, ChevronDown, CloudCheck, InstagramIcon, Link, ListOrdered, Lock, RotateCw, Settings, Star, Unlink, User, UserCheck } from "lucide-react";
import { cookies } from "next/headers";
import Section from "./Section";
import ConnectInstagramButton from "./connect-instagram-button";

const SESSION_COOKIE_NAME = "session";

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function formatFollowers(count) {
  if (typeof count !== "number") return "— followers";
  return `${new Intl.NumberFormat("en-US", { notation: "compact" }).format(count)} followers`;
}

async function getSessionUser() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionToken) return null;

  const tokenHash = hashToken(sessionToken);
  const [user] = await sql`
    select
      users.id,
      users.username,
      users.name,
      users.profile_picture_url,
      users.followers_count,
      users.account_type,
      users.media_count
    from sessions
    join users on users.id = sessions.user_id
    where sessions.token_hash = ${tokenHash}
      and sessions.expires_at > now()
    limit 1
  `;

  return user || null;
}

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
        <div className="flex flex-col gap-4 p-4 mt-6 border border-gray-200 rounded-2xl bg-gray-50 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800/80 dark:bg-slate-900/60">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img src={user.profile_picture_url || "/default-avatar.png"} alt={user.username ? `@${user.username}` : "Instagram profile"} className="object-cover rounded-full h-14 w-14 ring-2 ring-white dark:ring-slate-900" />
              <span className="absolute flex items-center justify-center w-6 h-6 text-xs text-white rounded-full -bottom-1 -right-1 bg-emerald-500 ring-2 ring-white dark:ring-slate-900">
                <CloudCheck className="w-4 h-4" />
              </span>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-base font-semibold text-fuchsia-500">@{user.username}</span>
                <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-green-700 dark:border-green-500/30 dark:bg-green-500/10 dark:text-green-200">
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

        <button
          type="button"
          className="flex items-center justify-center w-full gap-2 px-5 py-3 mt-6 text-base font-semibold text-white transition shadow-sm rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
        >
          <Unlink className="w-4 h-4" />
          Disconnect Instagram Account
        </button>
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
        <ConnectInstagramButton />
        <div className="text-xs text-center text-gray-500 dark:text-slate-400">
          By connecting, you agree to our <span className="text-fuchsia-700 hover:underline dark:text-fuchsia-300">Terms of Service</span> and <span className="text-fuchsia-700 hover:underline dark:text-fuchsia-300">Privacy Policy</span>.
        </div>
      </div>
    </Section>
  );
}
