"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Facebook, ImagePlus, Instagram, Link2, Loader2, Palette, Stars, Twitter, Youtube } from "lucide-react";

import Section from "@/components/Section";
import SettingsSubmitButton from "@/components/settings-submit-button";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
function SocialInput({ icon, placeholder, defaultValue, name, readOnly = false }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-3 py-2 shadow-xs dark:border-slate-800/80 dark:bg-slate-900/70">
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-200">{icon}</div>
      <Input className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 read-only:text-slate-400 dark:read-only:text-slate-500" name={name} placeholder={placeholder} defaultValue={defaultValue} readOnly={readOnly} />
    </div>
  );
}

const initialState = { ok: false, message: "" };

export default function ProfileDisplaySection({ settings, action, user }) {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const fileInputRef = useRef(null);
  const [bannerUrl, setBannerUrl] = useState(settings?.banner_image_url ?? "");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [displayState, setDisplayState] = useState(() => ({
    followers: settings?.show_followers ?? true,
    experience: settings?.show_experience ?? true,
    location: settings?.show_location ?? true,
    socials: settings?.show_socials ?? true,
    verified: settings?.show_verified ?? false,
  }));

  useEffect(() => {
    if (!settings) return;
    setBannerUrl(settings.banner_image_url ?? "");
    setDisplayState({
      followers: settings.show_followers ?? true,
      experience: settings.show_experience ?? true,
      location: settings.show_location ?? true,
      socials: settings.show_socials ?? true,
      verified: settings.show_verified ?? false,
    });
  }, [settings]);

  const handleBannerUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploadError("");
    setIsUploading(true);

    try {
      const response = await fetch(`/api/upload/banner?filename=${encodeURIComponent(file.name)}`, {
        method: "POST",
        body: file,
      });
      if (!response.ok) throw new Error("Upload failed.");
      const blob = await response.json();
      setBannerUrl(blob.url);
    } catch (error) {
      console.log("ERROR", error);
      setUploadError("Upload failed. Please try a different image.");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  return (
    <Section title="Profile Display & Customization" subtitle="Control how your public profile looks and which details appear." icon={<Palette className="h-5 w-5" />} iconClassName="bg-violet-600 text-white">
      <form action={formAction} className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-xs dark:border-slate-800/80 dark:bg-slate-900/70">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Cover / Banner Image</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Showcase your studio or portfolio header.</p>
              </div>
              <div className="flex items-center gap-2">
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleBannerUpload} className="hidden" />
                <Button size="sm" variant="outline" type="button" className="rounded-full" onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
                  {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
                  {isUploading ? "Uploading" : "Upload"}
                </Button>
              </div>
            </div>
            <input type="hidden" name="banner_image_url" value={bannerUrl} />
            <div className="mt-4 h-40 w-full overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-violet-200/80 via-sky-100/70 to-emerald-100/70 dark:border-slate-700 dark:from-violet-500/30 dark:via-slate-900 dark:to-emerald-500/20">
              {bannerUrl ? <img src={bannerUrl} alt="Banner preview" className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center text-xs font-semibold text-slate-700/80 dark:text-slate-200">Banner preview</div>}
            </div>
            {uploadError ? <p className="mt-2 text-xs text-red-600 dark:text-red-300">{uploadError}</p> : null}
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">Social Media Links</div>
            <div className="grid gap-3">
              <SocialInput icon={<Instagram className="h-4 w-4 text-fuchsia-600" />} placeholder="@yourhandle" name="social_instagram" defaultValue={settings?.social_instagram ?? (user?.username ? `@${user.username}` : "")} readOnly />
              <SocialInput icon={<Twitter className="h-4 w-4 text-sky-500" />} placeholder="X / Twitter handle" name="social_x" defaultValue={settings?.social_x ?? ""} />
              <SocialInput icon={<Link2 className="h-4 w-4 text-slate-600" />} placeholder="Website or portfolio link" name="social_website" defaultValue={settings?.social_website ?? ""} />
              <SocialInput icon={<Facebook className="h-4 w-4 text-blue-600" />} placeholder="Facebook page URL" name="social_facebook" defaultValue={settings?.social_facebook ?? ""} />
              <SocialInput icon={<Youtube className="h-4 w-4 text-red-600" />} placeholder="YouTube channel URL" name="social_youtube" defaultValue={settings?.social_youtube ?? ""} />
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xs dark:border-slate-800/80 dark:bg-slate-900/70">
            <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">Display Options</div>
            <div className="mt-3 space-y-2">
              {[
                { id: "display-followers", key: "followers", label: "Show follower count", defaultChecked: true },
                { id: "display-experience", key: "experience", label: "Show years of experience", defaultChecked: true },
                { id: "display-location", key: "location", label: "Show location badge", defaultChecked: true },
                { id: "display-socials", key: "socials", label: "Show social media links", defaultChecked: true },
                { id: "display-verified", key: "verified", label: "Show verified badge", defaultChecked: false },
              ].map((item) => (
                <label
                  key={item.id}
                  htmlFor={item.id}
                  className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-slate-600 shadow-xs dark:border-slate-800/80 dark:bg-slate-900/70 dark:text-slate-200"
                >
                  <span>{item.label}</span>
                  <input type="hidden" name={`display_${item.id.replace("display-", "")}`} value={displayState[item.key] ? "true" : "false"} />
                  <Checkbox
                    id={item.id}
                    checked={displayState[item.key]}
                    onCheckedChange={(value) => {
                      const next = value === true;
                      setDisplayState((prev) => ({ ...prev, [item.key]: next }));
                    }}
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-violet-200 bg-violet-50/70 p-4 text-sm dark:border-violet-500/30 dark:bg-violet-500/10">
            <div className="flex items-center gap-2 text-sm font-semibold text-violet-700 dark:text-violet-200">
              <Stars className="h-4 w-4" />
              Profile tips
            </div>
            <ul className="mt-3 space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li>Use a wide banner that reflects your style.</li>
              <li>Keep social links consistent across platforms.</li>
              <li>Choose visuals that reflect your style.</li>
            </ul>
          </div>
        </aside>
        <div className="lg:col-span-2">
          {state.message ? <p className="text-xs text-red-600 dark:text-red-300">{state.message}</p> : null}
          <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
            <SettingsSubmitButton isPending={isPending} label="Save Display Settings" />
          </div>
        </div>
      </form>
    </Section>
  );
}
