"use client";

import Link from "next/link";
import { AlertCircle, ArrowRight, BadgeCheck, Ban, Bell, BookOpen, CalendarDays, Check, ExternalLink, FileText, HandHeart, HelpCircle, Info, Instagram, Lock, Mail, MapPin, MessageSquare, Scale, ShieldCheck, User, Users } from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Minus } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Eye } from "lucide-react";
import { Pencil } from "lucide-react";
import { ShieldHalf } from "lucide-react";

function SectionShell({ number, title, children }) {
  return (
    <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-fuchsia-50 text-fuchsia-700 ring-1 ring-fuchsia-100">
            <span className="text-sm font-semibold">{number}</span>
          </div>
          <div className="min-w-0">
            <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">{children}</CardContent>
    </Card>
  );
}

function MiniRow({ icon: Icon, title, description, tone = "default" }) {
  const toneStyles = {
    default: "bg-gray-50 text-gray-700 ring-gray-200",
    info: "bg-blue-50 text-blue-700 ring-blue-200",
    warn: "bg-amber-50 text-amber-700 ring-amber-200",
    danger: "bg-rose-50 text-rose-700 ring-rose-200",
    success: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    purple: "bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-200",
  };

  return (
    <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-3">
      <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-1 ${toneStyles[tone]}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="text-sm font-semibold text-gray-900">{title}</div>
        <div className="mt-0.5 text-sm text-gray-600">{description}</div>
      </div>
    </div>
  );
}

function DefinitionItem({ term, meaning }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50/40 p-3">
      <div className="text-sm font-semibold text-gray-900">{term}</div>
      <div className="mt-1 text-sm text-gray-600">{meaning}</div>
    </div>
  );
}

function Bullets({ items, icon = Check }) {
  const Icon = icon;
  return (
    <ul className="grid gap-2">
      {items.map((t) => (
        <li key={t} className="flex items-start gap-2 text-sm text-gray-700">
          <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
            <Icon className="h-3.5 w-3.5" />
          </span>
          <span className="leading-relaxed">{t}</span>
        </li>
      ))}
    </ul>
  );
}

export default function TermsPage() {
  const lastUpdated = "January 13, 2026";

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-b from-fuchsia-50 via-slate-50 to-slate-50">
        <div className="mx-auto max-w-4xl px-4 pb-10 pt-10 sm:pb-12 sm:pt-12">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="rounded-full bg-fuchsia-100 text-fuchsia-800 hover:bg-fuchsia-100">
              <Scale className="h-4 w-4" />
              Legal Information
            </Badge>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Terms of Use</h1>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-gray-600">
              These Terms explain how you can use catchme.live to discover and publish artist visits, events, and conventions. They also describe your responsibilities, our policies, and how Instagram data is used. By accessing or using our platform,
              you agree to be bound by these Terms of Use and all applicable laws and regulations.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-gray-500">
              <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1">
                <FileText className="h-4 w-4 text-fuchsia-700" />
                Last updated: <span className="font-medium text-gray-700">{lastUpdated}</span>
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1">
                <ShieldCheck className="h-4 w-4 text-fuchsia-700" />
                Read together with our{" "}
                <Link className="underline underline-offset-4" href="/about/privacy">
                  Privacy Policy
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 pb-6">
        <div className="mx-auto max-w-3xl space-y-6">
          {/* 1 */}
          <SectionShell number="1" title="Acceptance of Terms">
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-gray-700">
                By accessing or using catchme.live, you agree to these Terms. If you do not agree, do not use the platform. If you use the platform on behalf of a studio or organization, you confirm you have the authority to bind that entity.
              </p>
              <Alert className="rounded-xl border border-blue-200 bg-blue-50/60">
                <Info className="h-4 w-4 text-blue-700" />
                <AlertTitle className="text-sm">Quick summary</AlertTitle>
                <AlertDescription className="text-sm text-gray-700">You can browse publicly available visits and events without an account. Creating or managing a profile requires connecting Instagram.</AlertDescription>
              </Alert>
            </div>
          </SectionShell>

          {/* 2 */}
          <SectionShell number="2" title="Definitions">
            <div className="space-y-4">
              <p className="text-sm text-gray-700">The following definitions help explain key terms used in these Terms.</p>
              <div className="grid gap-3">
                <DefinitionItem term="Platform" meaning="The catchme.live website and any related services." />
                <DefinitionItem term="Artist / Studio" meaning="A creator or business that publishes visits, events, or profile information." />
                <DefinitionItem term="Visit" meaning="A time-bound appearance at a location, such as a guest spot, residency, or tour stop." />
                <DefinitionItem term="Event / Convention" meaning="A scheduled gathering (including conventions, popups, flash days)." />
                <DefinitionItem term="Content" meaning="Text, images, media, and information submitted to or displayed by the Platform." />
              </div>
            </div>
          </SectionShell>

          {/* 3 */}
          <SectionShell number="3" title="Eligibility and User Requirements">
            <div className="space-y-4">
              <Card className="rounded-xl border border-gray-200 bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold">Age requirement</CardTitle>
                  <CardDescription className="text-sm">You must be old enough to legally use the Platform in your region.</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Bullets
                    items={[
                      "You must be at least 18 years of age to create an account and use the Platform. If you are under 18, you may only use the Platform under the supervision of a parent or legal guardian who agrees to be bound by these Terms.",
                      "You must have the legal capacity to enter into a binding contract. By using the Platform, you represent and warrant that you have the right, authority, and capacity to enter into these Terms and to abide by all of the terms and conditions set forth herein.",
                    ]}
                  />
                </CardContent>
              </Card>

              <div className="grid gap-3 sm:grid-cols-2">
                <MiniRow
                  icon={Scale}
                  title="Legal compliance"
                  description="You must have the legal capacity to enter into a binding contract. By using the Platform, you represent and warrant that you have the right, authority, and capacity to enter into these Terms and to abide by all of the terms and conditions set forth herein."
                  tone="warn"
                />
                <MiniRow
                  icon={ShieldCheck}
                  title="Accurate information"
                  description="You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You may not impersonate any person or entity or misrepresent your affiliation with any person or entity."
                  tone="success"
                />
              </div>
            </div>
          </SectionShell>

          {/* 4 */}
          <SectionShell number="4" title="Account Registration and Security">
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-gray-700">Some features require connecting an Instagram account. You are responsible for keeping your account secure and for activities that occur under your account.</p>

              <div className="grid gap-3 sm:grid-cols-2">
                <MiniRow icon={Lock} title="Keep credentials safe" description="Do not share passwords or access tokens." tone="danger" />
                <MiniRow icon={User} title="Account ownership" description="Only connect accounts you own or are authorized to manage." tone="warn" />
              </div>

              <Alert className="rounded-xl border border-amber-200 bg-amber-50/70">
                <AlertCircle className="h-4 w-4 text-amber-700" />
                <AlertTitle className="text-sm">Security notice</AlertTitle>
                <AlertDescription className="text-sm text-gray-700">
                  You are solely responsible for all activities that occur under your account. We will not be liable for any loss or damage arising from your failure to comply with these security obligations. If you suspect any unauthorized use of
                  your account, you must immediately change your password and notify us at security@artisttravel.com.
                </AlertDescription>
              </Alert>

              <div className="grid gap-3 sm:grid-cols-3">
                <MiniRow icon={BadgeCheck} title="Use strong security" description="Enable 2FA on Instagram." tone="success" />
                <MiniRow icon={Bell} title="Monitor changes" description="Review connected apps regularly." tone="info" />
                <MiniRow icon={HelpCircle} title="Need help?" description="Visit the Help Center for account support." tone="purple" />
              </div>
            </div>
          </SectionShell>

          {/* 5 */}
          <SectionShell number="5" title="Platform Services and Features">
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-gray-700">catchme.live helps artists and studios announce where and when they will be available. Feature availability may change as the Platform evolves.</p>

              <div className="grid gap-3">
                <MiniRow icon={MapPin} title="Location-based discovery" description="Find visits, events, and conventions near you." tone="purple" />
                <MiniRow icon={CalendarDays} title="Upcoming lineup" description="See current and future visits with countdowns." tone="info" />
                <MiniRow icon={Users} title="Public profiles" description="Artists and studios can showcase their work and travel history." tone="success" />
              </div>

              <div className="space-y-2">
                <div className="text-sm font-semibold text-gray-900">Important notes</div>
                <Bullets
                  items={["We do not guarantee availability, pricing, or booking outcomes.", "Information may change quickly — always confirm details directly with the artist/studio.", "We may remove or limit content that violates these Terms."]}
                />
              </div>

              <Alert className="rounded-xl border border-blue-200 bg-blue-50/60">
                <Info className="h-4 w-4 text-blue-700" />
                <AlertTitle className="text-sm">Planning tip</AlertTitle>
                <AlertDescription className="text-sm text-gray-700">For the most accurate info, rely on the visit’s listed dates, city, and the connected Instagram profile.</AlertDescription>
              </Alert>
            </div>
          </SectionShell>

          {/* 6 */}
          <SectionShell number="6" title="User Content and Submissions">
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-gray-700">You are responsible for the content you submit. You must have the rights to publish it and ensure it’s accurate.</p>

              <Card className="rounded-xl border border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold">Content guidelines</CardTitle>
                  <CardDescription className="text-sm">A few simple rules to keep the platform trustworthy.</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Bullets
                    items={[
                      "Only upload content you own or have permission to use.You own or have the necessary rights, licenses, consents, and permissions to use and authorize us to use your User Content as described in these Terms.",
                      "Do not misrepresent locations, dates, or availability. Your User Content does not infringe upon the intellectual property rights, privacy rights, or any other rights of any third party.",
                      "Respect privacy — don’t share private personal data without consent. Your User Content complies with these Terms and all applicable laws and regulations.",
                    ]}
                  />
                </CardContent>
              </Card>

              <div className="rounded-xl border border-rose-200 bg-rose-50/60 p-4">
                <div className="flex items-start gap-2">
                  <Ban className="mt-0.5 h-4 w-4 text-rose-700" />
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Prohibited content</div>
                    <div className="mt-1 text-sm text-gray-700">The following content is not allowed on catchme.live.</div>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {["Harassment, hate, or threats", "Non-consensual or private information", "Misleading impersonation", "Copyright infringement", "Illegal goods or services", "Spam or malicious links"].map((t) => (
                    <div key={t} className="flex items-start gap-2 rounded-lg border border-rose-200 bg-white/70 p-3 text-sm text-gray-700">
                      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-rose-700">
                        <Ban className="h-3.5 w-3.5" />
                      </span>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionShell>

          {/* 7 */}
          <SectionShell number="7" title="Instagram Integration and Third Party Services">
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-gray-700">
                We use Instagram to help populate public profile details and media. When you connect Instagram, you authorize us to access the permitted data for the purpose of operating the Platform.
              </p>

              <Alert className="rounded-xl border border-fuchsia-200 bg-fuchsia-50/70">
                <Instagram className="h-4 w-4 text-fuchsia-700" />
                <AlertTitle className="text-sm">Instagram data</AlertTitle>
                <AlertDescription className="text-sm text-gray-700">We only use Instagram data to display your public profile and visits. We never publish posts on your behalf.</AlertDescription>
              </Alert>

              <div className="space-y-2">
                <div className="text-sm font-semibold text-gray-900">Third-party services</div>
                <p className="text-sm text-gray-700">Your use of third-party services (like Instagram) is governed by their terms and policies. We’re not responsible for third-party downtime, changes, or decisions.</p>
              </div>

              <Alert className="rounded-xl border border-blue-200 bg-blue-50/60">
                <Info className="h-4 w-4 text-blue-700" />
                <AlertTitle className="text-sm">Tip</AlertTitle>
                <AlertDescription className="text-sm text-gray-700">Switching to a Creator or Business account is free and typically only adds useful insights and tools — with virtually no downside.</AlertDescription>
              </Alert>
            </div>
          </SectionShell>

          {/* 8 */}
          <SectionShell number="8" title="User Conduct and Acceptable Use">
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-gray-700">You agree not to misuse the Platform. We may suspend or remove accounts or content that violates these rules.</p>

              <Accordion type="single" collapsible className="rounded-xl border border-gray-200 bg-white">
                <AccordionItem value="a" className="px-4">
                  <AccordionTrigger className="text-sm">No abusive behavior</AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-700">
                    <div className="space-y-3">
                      <p className="leading-relaxed">Do not harass others or encourage harmful behavior. Keep communication respectful.</p>
                      <ul className="grid gap-2 text-sm text-gray-600">
                        {["Harassing, threatening, or bullying other users", "Hate speech, discrimination, or demeaning language", "Sharing private personal information (doxxing)", "Stalking or repeated unwanted contact"].map((t) => (
                          <li key={t} className="flex gap-2">
                            <Minus className="mt-1 h-4 w-4 shrink-0 text-gray-400" />
                            <span className="leading-relaxed">{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="b" className="px-4">
                  <AccordionTrigger className="text-sm">No scraping or automated access</AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-700">
                    <div className="space-y-3">
                      <p className="leading-relaxed">Do not use bots or automated tools to extract data or overload our services.</p>
                      <ul className="grid gap-2 text-sm text-gray-600">
                        {[
                          "Attempting to gain unauthorized access to the Platform or any accounts, systems, or networks",
                          "Using automated systems (robots, spiders, scrapers) without our permission",
                          "Introducing viruses, malware, or any harmful code",
                          "Attempting to reverse engineer, decompile, or disassemble any aspect of the Platform",
                        ].map((t) => (
                          <li key={t} className="flex gap-2">
                            <Minus className="mt-1 h-4 w-4 shrink-0 text-gray-400" />
                            <span className="leading-relaxed">{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="c" className="px-4">
                  <AccordionTrigger className="text-sm">No misleading listings</AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-700">
                    <div className="space-y-3">
                      <p className="leading-relaxed">Don’t publish false visit dates, fake studios, or impersonate artists or businesses.</p>
                      <ul className="grid gap-2 text-sm text-gray-600">
                        {[
                          "Creating multiple accounts or fake accounts",
                          "Impersonating any person or entity or misrepresenting your affiliation",
                          "Posting inaccurate visit dates, locations, or availability",
                          "Misleading claims about booking, pricing, or services",
                        ].map((t) => (
                          <li key={t} className="flex gap-2">
                            <Minus className="mt-1 h-4 w-4 shrink-0 text-gray-400" />
                            <span className="leading-relaxed">{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="grid gap-3 sm:grid-cols-3">
                <MiniRow icon={MessageSquare} title="Report abuse" description="Flag content that violates these Terms." tone="danger" />
                <MiniRow icon={HelpCircle} title="Get support" description="We’re happy to help resolve issues." tone="info" />
                <MiniRow icon={HandHeart} title="Be respectful" description="Support artists and communities." tone="success" />
              </div>
            </div>
          </SectionShell>

          {/* 9 */}
          <SectionShell number="9" title="Intellectual Property Rights">
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-gray-700">
                The Platform, its design, and underlying software are owned by catchme.live, its licensors, or other providers of such material and are protected by copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                <MiniRow icon={BookOpen} title="Our IP" description="Platform UI, code, and branding are protected." tone="purple" />
                <MiniRow icon={Users} title="Your IP" description="You keep ownership of your submitted content." tone="success" />
              </div>

              <Bullets items={["You grant us a limited license to display your content on the Platform.", "You may not copy, redistribute, or resell Platform data without permission."]} />
            </div>
          </SectionShell>

          {/* 10 */}
          <SectionShell number="10" title="Privacy and Data Protection">
            <div className="space-y-4">
              <Alert className="rounded-xl border border-blue-200 bg-blue-50/60">
                <Info className="h-4 w-4 text-blue-700" />
                <AlertTitle className="text-sm">Privacy overview</AlertTitle>
                <AlertDescription className="text-sm text-gray-700">We collect only what we need to operate the Platform. Learn more in our Privacy Policy.</AlertDescription>
              </Alert>

              <div className="grid gap-3 sm:grid-cols-2">
                <MiniRow icon={ShieldCheck} title="Data minimization" description="We aim to store the minimum required data." tone="success" />
                <MiniRow icon={Lock} title="Security" description="We use reasonable safeguards to protect information." tone="warn" />
              </div>

              <div className="rounded-xl border border-fuchsia-200 bg-fuchsia-50/60 p-4">
                <div className="text-sm font-semibold text-gray-900">Your choices</div>
                <div className="mt-1 text-sm text-gray-700">You can disconnect Instagram and request deletion where applicable.</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-white">
                    Disconnect
                  </Badge>
                  <Badge variant="secondary" className="bg-white">
                    Access
                  </Badge>
                  <Badge variant="secondary" className="bg-white">
                    Deletion
                  </Badge>
                </div>
              </div>
            </div>
            <div className="pt-2">
              <div className="text-base font-semibold text-gray-900">10.2 Data Security</div>
              <p className="mt-2 text-sm leading-relaxed text-gray-700">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or
                electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div className="pt-2">
              <div className="text-base font-semibold text-gray-900">10.3 Your Rights</div>
              <p className="mt-2 text-sm text-gray-700">Depending on your location, you may have certain rights regarding your personal information, including:</p>

              <div className="mt-4 rounded-2xl border border-fuchsia-200 bg-gradient-to-r from-fuchsia-50 to-violet-50 p-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-fuchsia-100 text-fuchsia-700 ring-1 ring-fuchsia-200">
                      <Eye className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-gray-900">Right to Access</div>
                      <div className="mt-0.5 text-sm text-gray-600">Request copies of your personal information</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-fuchsia-100 text-fuchsia-700 ring-1 ring-fuchsia-200">
                      <Pencil className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-gray-900">Right to Rectification</div>
                      <div className="mt-0.5 text-sm text-gray-600">Correct inaccurate information</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-fuchsia-100 text-fuchsia-700 ring-1 ring-fuchsia-200">
                      <Trash2 className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-gray-900">Right to Erasure</div>
                      <div className="mt-0.5 text-sm text-gray-600">Request deletion of your data</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-fuchsia-100 text-fuchsia-700 ring-1 ring-fuchsia-200">
                      <Ban className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-gray-900">Right to Object</div>
                      <div className="mt-0.5 text-sm text-gray-600">Object to processing of your data</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SectionShell>

          {/* 11 */}
          <SectionShell number="11" title="Disclaimers and Limitation of Liability">
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-gray-700">The Platform is provided “as is” and “as available.” We do not guarantee uninterrupted service or that listings are error-free.</p>

              <div className="grid gap-3 sm:grid-cols-3">
                <MiniRow icon={Info} title="No guarantees" description="Listings may change quickly." tone="info" />
                <MiniRow icon={Scale} title="Limited liability" description="To the extent allowed by law." tone="warn" />
                <MiniRow icon={AlertCircle} title="Use at your risk" description="Confirm details with artists/studios." tone="danger" />
              </div>
            </div>
          </SectionShell>

          {/* 12 */}
          <SectionShell number="12" title="Termination">
            <div className="space-y-3">
              <p className="text-sm leading-relaxed text-gray-700">We may suspend or terminate access if you violate these Terms. You may stop using the Platform at any time.</p>
              <Bullets items={["We may remove content that violates policies.", "Termination may be immediate in serious cases.", "Some provisions survive termination (e.g., IP, disclaimers)."]} />
            </div>
          </SectionShell>

          {/* 13 */}
          <SectionShell number="13" title="Changes to These Terms">
            <div className="space-y-3">
              <p className="text-sm leading-relaxed text-gray-700">We may update these Terms to reflect changes in features, laws, or business needs. If changes are material, we’ll provide reasonable notice.</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Policy updates</Badge>
                <Badge variant="secondary">Feature changes</Badge>
                <Badge variant="secondary">Legal requirements</Badge>
              </div>
            </div>
          </SectionShell>

          {/* FAQ cards block like in the mock */}
          <div className="grid gap-4 pt-4 sm:grid-cols-2">
            <Card className="rounded-2xl border border-gray-200 bg-white">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-fuchsia-50 text-fuchsia-700 ring-1 ring-fuchsia-100">
                    <HelpCircle className="h-4 w-4" />
                  </div>
                  <CardTitle className="text-sm">Need assistance?</CardTitle>
                </div>
                <CardDescription className="text-sm">Find answers quickly in our support resources.</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button asChild variant="secondary" className="w-full">
                  <Link href="/support">Open Help Center</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border border-gray-200 bg-white">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-fuchsia-50 text-fuchsia-700 ring-1 ring-fuchsia-100">
                    <ExternalLink className="h-4 w-4" />
                  </div>
                  <CardTitle className="text-sm">Related policies</CardTitle>
                </div>
                <CardDescription className="text-sm">Privacy, trust, and safety information.</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button asChild variant="secondary" className="w-full">
                  <Link href="/about/privacy">View Privacy Policy</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border border-gray-200 bg-white">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-fuchsia-50 text-fuchsia-700 ring-1 ring-fuchsia-100">
                    <Instagram className="h-4 w-4" />
                  </div>
                  <CardTitle className="text-sm">Instagram connection</CardTitle>
                </div>
                <CardDescription className="text-sm">How linking Instagram works on catchme.live.</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button asChild variant="secondary" className="w-full">
                  <Link href="/create-new-visit/connect-instagram">Learn more</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border border-gray-200 bg-white">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-fuchsia-50 text-fuchsia-700 ring-1 ring-fuchsia-100">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <CardTitle className="text-sm">Discover visits</CardTitle>
                </div>
                <CardDescription className="text-sm">Explore what’s happening near you right now.</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button asChild variant="secondary" className="w-full">
                  <Link href="/discover">Browse Discover</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Additional Legal Provisions */}
          <SectionShell number="14" title="Additional Legal Provisions">
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-gray-700">Depending on your location, additional legal provisions may apply. Here are some common clauses included for clarity:</p>
              <div className="grid gap-3">
                {[
                  {
                    title: "Governing law",
                    desc: "These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law provisions. You agree to submit to the personal and exclusive jurisdiction of the courts located within [Jurisdiction] for the resolution of any disputes.",
                  },
                  {
                    title: "Severability",
                    desc: "If any provision of these Terms is held to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable.",
                  },
                  {
                    title: "No waiver",
                    desc: "No waiver by ArtistTravel of any term or condition set forth in these Terms shall be deemed a further or continuing waiver of such term or condition or a waiver of any other term or condition. Any failure to assert a right or provision under these Terms shall not constitute a waiver of such right or provision.",
                  },
                  {
                    title: "Assignment",
                    desc: "You may not assign or transfer these Terms or your rights and obligations hereunder without our prior written consent. We may assign or transfer these Terms, in whole or in part, without restriction. Any attempted assignment in violation of this section shall be null and void.",
                  },
                  {
                    title: "Entire agreement",
                    desc: "These Terms, together with our Privacy Policy and any other legal notices published by us on the Platform, constitute the entire agreement between you and ArtistTravel concerning your use of the Platform and supersede all prior agreements and understandings.",
                  },
                  {
                    title: "Force Majeure",
                    desc: "ArtistTravel shall not be liable for any failure or delay in performance due to circumstances beyond our reasonable control, including acts of God, war, terrorism, riots, embargoes, acts of civil or military authorities, fire, floods, accidents, network infrastructure failures, strikes, or shortages of transportation facilities, fuel, energy, labor, or materials.",
                  },
                ].map((r) => (
                  <div key={r.title} className="rounded-xl border border-gray-200 bg-white p-3">
                    <div className="text-sm font-semibold text-gray-900">{r.title}</div>
                    <div className="mt-1 text-sm text-gray-600">{r.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </SectionShell>

          {/* Questions */}
          <div className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">Questions About These Terms?</div>
              <p className="mx-auto mt-2 max-w-2xl text-sm text-gray-600">We’re happy to help. Choose the best option below and we’ll get back to you.</p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <Card className="rounded-2xl border border-gray-200 bg-white">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-fuchsia-50 text-fuchsia-700 ring-1 ring-fuchsia-100">
                      <HelpCircle className="h-4 w-4" />
                    </div>
                    <CardTitle className="text-sm">Help Center</CardTitle>
                  </div>
                  <CardDescription className="text-sm">Common questions and support articles.</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button asChild variant="secondary" className="w-full">
                    <Link href="/support">Open</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border border-gray-200 bg-white">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-fuchsia-50 text-fuchsia-700 ring-1 ring-fuchsia-100">
                      <Mail className="h-4 w-4" />
                    </div>
                    <CardTitle className="text-sm">Email Legal</CardTitle>
                  </div>
                  <CardDescription className="text-sm">Questions about the Terms or compliance.</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button asChild className="w-full">
                    <a href="mailto:legal@catchme.live">legal@catchme.live</a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border border-gray-200 bg-white">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-fuchsia-50 text-fuchsia-700 ring-1 ring-fuchsia-100">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <CardTitle className="text-sm">Privacy</CardTitle>
                  </div>
                  <CardDescription className="text-sm">Data requests and privacy inquiries.</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button asChild variant="secondary" className="w-full">
                    <Link href="/about/privacy">View policy</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6 rounded-2xl border border-gray-200 bg-white">
              <CardHeader>
                <CardTitle className="text-base">Legal contact</CardTitle>
                <CardDescription className="text-sm">For formal notices related to these Terms, please contact our legal team.</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-gray-200 bg-gray-50/40 p-3">
                    <div className="text-sm font-semibold text-gray-900">Email</div>
                    <div className="mt-1 text-sm text-gray-700">
                      <a className="inline-flex items-center gap-2 underline underline-offset-4" href="mailto:legal@catchme.live">
                        legal@catchme.live <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                  <div className="rounded-xl border border-gray-200 bg-gray-50/40 p-3">
                    <div className="text-sm font-semibold text-gray-900">Support</div>
                    <div className="mt-1 text-sm text-gray-700">
                      <Link className="inline-flex items-center gap-2 underline underline-offset-4" href="/support">
                        Submit a request <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Small, subtle “cookie-style” band like in the mock (optional) */}
          <div className="rounded-2xl bg-gradient-to-r from-fuchsia-600 to-purple-600 p-5 text-white">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="text-sm font-semibold">By using catchme.live, you agree to these Terms.</div>
                <div className="mt-1 text-sm text-white/90">You can review them anytime in the About section.</div>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2">
                <Button variant="secondary" className="bg-white/15 text-white hover:bg-white/20" asChild>
                  <Link href="/about/terms">Review</Link>
                </Button>
                <Button className="bg-white text-gray-900 hover:bg-white/90" asChild>
                  <Link href="/discover">Continue</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
