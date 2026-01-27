import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { getSessionUser } from "@/lib/db";
import { formatFollowers } from "@/lib/utils";
import { formatDistanceToNowStrict } from "date-fns";
import { ArrowLeftRight, ChevronDown, CloudCheck, CloudSync, InstagramIcon, Link, ListOrdered, Lock, RotateCw, Settings, Star, Unlink, User, UserCheck } from "lucide-react";
import Section from "@/components/Section";
import { Check } from "lucide-react";
import { Shield } from "lucide-react";
import AccountHandle from "@/components/account-handle";

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
    const connectedBadge = (
      <Badge className="tracking-wide uppercase border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200">
        <span className="relative inline-flex w-2 h-2">
          <span className="absolute inline-flex w-full h-full rounded-full animate-ping bg-emerald-500 opacity-70" />
          <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500" />
        </span>
        connected
      </Badge>
    );

    const lastSyncedLabel = user.instagram_token_updated_at ? formatDistanceToNowStrict(new Date(user.instagram_token_updated_at), { addSuffix: true }) : "just now";
    const accountTypeLabel = user.account_type ? user.account_type.replace(/_/g, " ") : "Instagram account";
    const mediaCountLabel = typeof user.media_count === "number" ? `${user.media_count}` : "—";

    return (
      <Section title="Link your Instagram" icon={<InstagramIcon className="w-4 h-4" />} subtitle="Connected accounts sync automatically" headerRight={connectedBadge}>
        <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-fuchsia-200/70 bg-fuchsia-50/40 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-fuchsia-500/20 dark:bg-fuchsia-500/10">
          <div className="flex items-center gap-4">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-fuchsia-500 bg-white text-fuchsia-600 shadow-sm dark:bg-slate-950 dark:text-fuchsia-300">
              <Check className="h-3.5 w-3.5" />
            </span>
            <div className="relative">
              <img src={user.profile_picture_url || "/default-avatar.png"} alt={user.username ? `@${user.username}` : "Instagram profile"} className="h-12 w-12 rounded-full object-cover ring-1 ring-gray-200 dark:ring-slate-800" />
              <span className="absolute -bottom-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white ring-2 ring-white dark:ring-slate-900">
                <CloudCheck className="h-3 w-3" />
              </span>
            </div>
            <div className="min-w-0">
              <AccountHandle username={user.username} />
              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-slate-400">
                <span>{formatFollowers(user.followers_count)}</span>
                <span className="hidden h-1 w-1 rounded-full bg-gray-300 sm:inline-block" />
                <span>Last synced {lastSyncedLabel}</span>
              </div>
            </div>
          </div>
          <Badge className="gap-2 rounded-full capitalize border border-fuchsia-200 bg-fuchsia-50 px-4 py-2 text-sm font-semibold text-fuchsia-700 dark:border-fuchsia-500/30 dark:bg-fuchsia-500/10 dark:text-fuchsia-200">
            <UserCheck className="h-4 w-4" />
            {accountTypeLabel}
          </Badge>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-medium text-gray-500 dark:text-slate-400">
          <Badge className="gap-2 border border-gray-200 bg-white text-gray-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
            <Lock className="h-3.5 w-3.5" />
            Secure, read-only access
          </Badge>
          <Badge className="gap-2 border lowercase border-gray-200 bg-white text-gray-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
            <User className="h-3.5 w-3.5" />
            {mediaCountLabel} media item{mediaCountLabel === "1" ? "" : "s"} imported
          </Badge>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <a
            href="/api/auth/instagram/start"
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-base font-semibold text-gray-700 transition hover:border-gray-300 hover:text-gray-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-700"
          >
            <CloudSync className="h-4 w-4" />
            Sync Instagram
          </a>
          <form action="/api/auth/instagram/logout?redirect=/me" method="post">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-3 text-base font-semibold text-rose-600 transition hover:border-rose-300 hover:text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300 dark:hover:border-rose-400/40"
            >
              <Unlink className="h-4 w-4" />
              Disconnect Instagram
            </button>
          </form>
        </div>
      </Section>
    );
  }

  return (
    <Section title="Link your Instagram" icon={<InstagramIcon className="w-4 h-4" />} subtitle="Connect to verify your profile and pull your public stats.">
      <div className="mt-6 rounded-2xl border border-gray-200 bg-white/80 p-5 dark:border-slate-800/80 dark:bg-slate-950/40">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-lg">
            <div className="text-sm font-semibold text-gray-900 dark:text-slate-100">Fast, verified setup</div>
            <p className="mt-1 text-sm text-gray-600 dark:text-slate-300">We import your public profile, follower count, and media stats so your page is ready in minutes.</p>
          </div>
          <a
            href="/api/auth/instagram/start"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
          >
            <InstagramIcon className="h-4 w-4" />
            Connect Instagram
          </a>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-gray-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 dark:border-slate-800 dark:bg-slate-900/60">
            <Shield className="h-3.5 w-3.5" />
            Read-only access
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 dark:border-slate-800 dark:bg-slate-900/60">
            <UserCheck className="h-3.5 w-3.5" />
            Creator or Business account required
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 dark:border-slate-800 dark:bg-slate-900/60">
            <Link className="h-3.5 w-3.5" />
            Disconnect anytime
          </span>
        </div>
      </div>
      <p className="mt-3 text-xs text-gray-500 dark:text-slate-400">
        By connecting, you agree to our <span className="font-semibold text-fuchsia-700 hover:underline dark:text-fuchsia-300">Terms of Service</span> and{" "}
        <span className="font-semibold text-fuchsia-700 hover:underline dark:text-fuchsia-300">Privacy Policy</span>.
      </p>
    </Section>
  );
}
