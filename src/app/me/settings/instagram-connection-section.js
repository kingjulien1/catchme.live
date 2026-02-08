"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { BadgeCheck, Check, Clock, Cloud, CloudSync, ImagePlus, Info, Instagram, Link2, RotateCw, ShieldCheck, Sparkles, Unlink, UserRound } from "lucide-react";

import Section from "@/components/Section";
import SettingsSubmitButton from "@/components/settings-submit-button";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { cn, formatFollowers } from "@/lib/utils";
import Link from "next/link";

const defaultSyncSettings = {
  autoSync: true,
  importCaptions: true,
  includeVideos: true,
  syncProfilePhoto: false,
  showFollowers: true,
  showInstagramLink: true,
};

const defaultNotifications = {
  successAlerts: true,
  errorAlerts: true,
};

function formatRelativeTime(value) {
  if (!value) return "Not synced yet";
  const now = Date.now();
  const time = typeof value === "string" ? new Date(value).getTime() : value.getTime();
  if (!Number.isFinite(time)) return "Not synced yet";
  const diff = Math.max(0, now - time);
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  return `${days} days ago`;
}

function ToggleSwitch({ value, onChange }) {
  return <Switch checked={value} onCheckedChange={onChange} className="data-[state=checked]:bg-fuchsia-500 data-[state=unchecked]:bg-slate-200 dark:data-[state=unchecked]:bg-slate-800" />;
}

function StatTile({ label, value }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-slate-200 bg-white/80 p-4 text-center shadow-sm dark:border-slate-800/80 dark:bg-slate-950/60">
      <div className="text-xl font-semibold text-slate-900 dark:text-slate-100">{value}</div>
      <div className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</div>
    </div>
  );
}

function SettingRow({ icon, title, description, value, onChange, id, disabled = false }) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex items-start justify-between gap-4 rounded-2xl border bg-white px-4 py-3 shadow-xs transition dark:bg-slate-950/60",
        value ? "border-fuchsia-200 bg-fuchsia-50/40 dark:border-fuchsia-500/30 dark:bg-fuchsia-500/10" : "border-slate-200 hover:bg-slate-50 dark:border-slate-800/80 dark:hover:bg-slate-950/80",
        disabled ? "cursor-default opacity-80" : "cursor-pointer",
      )}
    >
      <div className="flex items-start gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-fuchsia-100 text-fuchsia-600 dark:bg-fuchsia-500/20 dark:text-fuchsia-200">{icon}</div>
        <div>
          <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">{description}</div>
        </div>
      </div>
      <Checkbox id={id} checked={value} onCheckedChange={onChange} disabled={disabled} />
    </label>
  );
}

function InfoRow({ title, value, valueClassName = "" }) {
  return (
    <div className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-slate-600 dark:text-slate-300">
      <div className="flex items-center gap-2">
        <span className="text-slate-500 dark:text-slate-400">{title}</span>
      </div>
      <span className={cn("font-semibold text-slate-900 dark:text-slate-100", valueClassName)}>{value}</span>
    </div>
  );
}

const initialState = { ok: false, message: "" };

export default function InstagramConnectionSection({ user, instagramToken, settings, action }) {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const [syncSettings, setSyncSettings] = useState(() => ({
    autoSync: settings?.auto_sync_posts ?? defaultSyncSettings.autoSync,
    importCaptions: settings?.import_captions ?? defaultSyncSettings.importCaptions,
    includeVideos: settings?.include_videos ?? defaultSyncSettings.includeVideos,
    syncProfilePhoto: settings?.sync_profile_photo ?? defaultSyncSettings.syncProfilePhoto,
    showFollowers: settings?.show_followers ?? defaultSyncSettings.showFollowers,
    showInstagramLink: settings?.show_instagram_link ?? defaultSyncSettings.showInstagramLink,
  }));
  const [notifications, setNotifications] = useState(() => ({
    successAlerts: settings?.notify_sync_success ?? defaultNotifications.successAlerts,
    errorAlerts: settings?.notify_sync_error ?? defaultNotifications.errorAlerts,
  }));

  useEffect(() => {
    if (!settings) return;
    setSyncSettings({
      autoSync: settings.auto_sync_posts ?? defaultSyncSettings.autoSync,
      importCaptions: settings.import_captions ?? defaultSyncSettings.importCaptions,
      includeVideos: settings.include_videos ?? defaultSyncSettings.includeVideos,
      syncProfilePhoto: settings.sync_profile_photo ?? defaultSyncSettings.syncProfilePhoto,
      showFollowers: settings.show_followers ?? defaultSyncSettings.showFollowers,
      showInstagramLink: settings.show_instagram_link ?? defaultSyncSettings.showInstagramLink,
    });
    setNotifications({
      successAlerts: settings.notify_sync_success ?? defaultNotifications.successAlerts,
      errorAlerts: settings.notify_sync_error ?? defaultNotifications.errorAlerts,
    });
  }, [settings]);

  const stats = useMemo(
    () => [
      { label: "Followers", value: user?.followers_count ? formatFollowers(user.followers_count) : "—" },
      { label: "Posts", value: user?.media_count ?? "—" },
      { label: "Following", value: user?.following_count ?? "—" },
      { label: "Engagement", value: user?.engagement_rate ? `${user.engagement_rate}%` : "—" },
    ],
    [user],
  );

  const lastSyncLabel = formatRelativeTime(instagramToken?.updated_at);

  return (
    <Section title="Instagram Connection" subtitle="Sync your Instagram account to keep your portfolio and stats fresh." icon={<Instagram className="h-5 w-5" />}>
      <form action={formAction} className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-fuchsia-200 bg-fuchsia-50/60 p-5 shadow-sm dark:border-fuchsia-500/30 dark:bg-fuchsia-500/10">
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-start gap-3">
                <Avatar className="h-11 w-11 border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-800">
                  <AvatarImage src={user?.profile_picture_url || undefined} alt={user?.username || "Instagram"} />
                  <AvatarFallback>
                    <UserRound className="h-5 w-5 text-slate-400" />
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  {user?.username ? (
                    <Link href={`/artists/${user.username}`} className="text-base font-semibold text-fuchsia-600 transition hover:text-fuchsia-700 dark:text-fuchsia-300 dark:hover:text-fuchsia-200">
                      @{user.username}
                    </Link>
                  ) : null}
                  <div className="text-xs text-slate-500 dark:text-slate-400">{user?.name || "Connected profile"}</div>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Connected
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-200">
                      <BadgeCheck className="h-3 w-3" />
                      Verified Account
                    </span>
                  </div>
                </div>
              </div>
              <Button type="button" variant="outline" className="mt-1 rounded-full">
                <Unlink className="h-4 w-4" />
                Disconnect
              </Button>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <StatTile key={stat.label} {...stat} />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">Sync Settings</div>
            <div className="grid gap-3 sm:grid-cols-2">
              <input type="hidden" name="ig_auto_sync_posts" value={syncSettings.autoSync ? "true" : "false"} />
              <input type="hidden" name="ig_import_captions" value={syncSettings.importCaptions ? "true" : "false"} />
              <input type="hidden" name="ig_include_videos" value={syncSettings.includeVideos ? "true" : "false"} />
              <input type="hidden" name="ig_sync_profile_photo" value={syncSettings.syncProfilePhoto ? "true" : "false"} />
              <input type="hidden" name="ig_show_followers" value={syncSettings.showFollowers ? "true" : "false"} />
              <input type="hidden" name="ig_show_instagram_link" value="true" />
              <input type="hidden" name="ig_notify_sync_success" value={notifications.successAlerts ? "true" : "false"} />
              <input type="hidden" name="ig_notify_sync_error" value={notifications.errorAlerts ? "true" : "false"} />
              <SettingRow id="ig-show-link" icon={<Link2 className="h-4 w-4" />} title="Instagram link" description="Show profile link." value disabled />
              <SettingRow
                id="ig-auto-sync"
                icon={<Cloud className="h-4 w-4" />}
                title="Auto-sync posts"
                description="Import new posts automatically."
                value={syncSettings.autoSync}
                onChange={(value) => setSyncSettings((prev) => ({ ...prev, autoSync: value }))}
              />
              <SettingRow
                id="ig-import-captions"
                icon={<Sparkles className="h-4 w-4" />}
                title="Import captions"
                description="Use Instagram captions."
                value={syncSettings.importCaptions}
                onChange={(value) => setSyncSettings((prev) => ({ ...prev, importCaptions: value }))}
              />
              <SettingRow
                id="ig-include-videos"
                icon={<ImagePlus className="h-4 w-4" />}
                title="Include videos"
                description="Sync Reels and videos."
                value={syncSettings.includeVideos}
                onChange={(value) => setSyncSettings((prev) => ({ ...prev, includeVideos: value }))}
              />
              <SettingRow
                id="ig-sync-photo"
                icon={<UserRound className="h-4 w-4" />}
                title="Sync profile photo"
                description="Use Instagram picture."
                value={syncSettings.syncProfilePhoto}
                onChange={(value) => setSyncSettings((prev) => ({ ...prev, syncProfilePhoto: value }))}
              />
              <SettingRow
                id="ig-show-followers"
                icon={<ShieldCheck className="h-4 w-4" />}
                title="Show followers"
                description="Display follower count."
                value={syncSettings.showFollowers}
                onChange={(value) => setSyncSettings((prev) => ({ ...prev, showFollowers: value }))}
              />
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-sm text-slate-600 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/70 dark:text-slate-300">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-200">
                <CloudSync className="h-5 w-5" />
              </div>
              Last Sync
            </div>
            <div className="mt-4 space-y-2">
              <InfoRow title="Status" value="Active" valueClassName="text-emerald-500 dark:text-emerald-300" />
              <InfoRow title="Last Synced" value={lastSyncLabel} />
              <InfoRow title="Posts Synced" value={user?.media_count ?? "—"} />
            </div>
            <Button type="button" variant="outline" className="mt-4 w-full rounded-full">
              <RotateCw className="h-4 w-4" />
              Sync Now
            </Button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-sm text-slate-600 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/70 dark:text-slate-300">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-200">
                <Info className="h-4 w-4" />
              </div>
              Connection Info
            </div>
            <p className="mt-3 text-xs text-slate-600 dark:text-slate-300">
              We only use your Instagram profile details and post metrics to keep your portfolio and stats up to date. We never publish or modify content on your behalf. Your data is stored securely and is not shared with third parties.
            </p>
          </div>
        </aside>
        <div className="lg:col-span-2">
          {state.message ? <p className="text-xs text-red-600 dark:text-red-300">{state.message}</p> : null}
          <div className="mt-4 flex justify-end pt-2">
            <SettingsSubmitButton isPending={isPending} label="Save Instagram Connection Settings" />
          </div>
        </div>
      </form>
    </Section>
  );
}
