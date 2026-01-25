"use client";

import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { Check, Facebook, Grid, ImagePlus, Instagram, LayoutGrid, Layers, Link2, Palette, Plus, Stars, Twitter, Youtube } from "lucide-react";

import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function LayoutCard({ id, value, title, subtitle, icon }) {
  return (
    <div className="relative">
      <RadioGroupItem value={value} id={id} className="peer sr-only" />
      <Label
        htmlFor={id}
        className="flex h-full cursor-pointer items-start gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-violet-300 hover:bg-violet-50/30 peer-data-[state=checked]:border-violet-400 peer-data-[state=checked]:bg-violet-50/50 dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-none dark:hover:bg-slate-900/90 dark:peer-data-[state=checked]:border-violet-400/70 dark:peer-data-[state=checked]:bg-violet-500/10"
      >
        <div className="mt-0.5 grid h-9 w-9 place-items-center rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-200">{icon}</div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
        </div>
      </Label>
      <span className="pointer-events-none absolute right-4 top-4 grid h-5 w-5 place-items-center rounded-full border border-gray-300 bg-white text-transparent transition peer-data-[state=checked]:border-violet-500 peer-data-[state=checked]:text-violet-500 dark:border-slate-700 dark:bg-slate-950">
        <Check className="h-3.5 w-3.5" />
      </span>
    </div>
  );
}

function SocialInput({ icon, placeholder, defaultValue }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-3 py-2 shadow-xs dark:border-slate-800/80 dark:bg-slate-900/70">
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-200">{icon}</div>
      <Input className="border-0 bg-transparent p-0 shadow-none focus-visible:ring-0" placeholder={placeholder} defaultValue={defaultValue} />
    </div>
  );
}

export default function ProfileDisplaySection() {
  return (
    <Section title="Profile Display & Customization" subtitle="Control how your public profile looks and which details appear." icon={<Palette className="h-5 w-5" />} iconClassName="bg-violet-600 text-white">
      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-xs dark:border-slate-800/80 dark:bg-slate-900/70">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Cover / Banner Image</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Showcase your studio or portfolio header.</p>
              </div>
              <Button size="sm" variant="outline" className="rounded-full">
                <ImagePlus className="h-4 w-4" />
                Upload
              </Button>
            </div>
            <div className="mt-4 h-40 w-full overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-violet-200/80 via-sky-100/70 to-emerald-100/70 dark:border-slate-700 dark:from-violet-500/30 dark:via-slate-900 dark:to-emerald-500/20">
              <div className="grid h-full place-items-center text-xs font-semibold text-slate-700/80 dark:text-slate-200">Banner preview</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">Social Media Links</div>
            <div className="grid gap-3">
              <SocialInput icon={<Instagram className="h-4 w-4 text-fuchsia-600" />} placeholder="@yourhandle" />
              <SocialInput icon={<Facebook className="h-4 w-4 text-blue-600" />} placeholder="Facebook page URL" />
              <SocialInput icon={<Youtube className="h-4 w-4 text-red-600" />} placeholder="YouTube channel URL" />
              <SocialInput icon={<Twitter className="h-4 w-4 text-sky-500" />} placeholder="X / Twitter handle" />
              <SocialInput icon={<Link2 className="h-4 w-4 text-slate-600" />} placeholder="Website or portfolio link" />
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xs dark:border-slate-800/80 dark:bg-slate-900/70">
            <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">Display Options</div>
            <div className="mt-3 space-y-2">
              {[
                { id: "display-followers", label: "Show follower count", defaultChecked: true },
                { id: "display-experience", label: "Show years of experience", defaultChecked: true },
                { id: "display-location", label: "Show location badge", defaultChecked: true },
                { id: "display-socials", label: "Show social media links", defaultChecked: true },
                { id: "display-verified", label: "Show verified badge", defaultChecked: false },
              ].map((item) => (
                <label
                  key={item.id}
                  htmlFor={item.id}
                  className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-slate-600 shadow-xs dark:border-slate-800/80 dark:bg-slate-900/70 dark:text-slate-200"
                >
                  <span>{item.label}</span>
                  <Checkbox id={item.id} defaultChecked={item.defaultChecked} />
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
              <li>Choose the layout that best showcases your work.</li>
            </ul>
          </div>
        </aside>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
        <Button className="rounded-full px-6">Save Display Settings</Button>
      </div>
    </Section>
  );
}
