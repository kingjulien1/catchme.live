"use client";

import {
  AlertCircle,
  BadgeCheck,
  Bell,
  BookOpen,
  CalendarDays,
  Cookie,
  Database,
  ExternalLink,
  Eye,
  FileText,
  Gavel,
  Globe,
  Handshake,
  HelpCircle,
  Info,
  Instagram,
  Lock,
  Mail,
  Pencil,
  Scale,
  Settings2,
  Share2,
  ShieldCheck,
  Trash2,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Speaker } from "lucide-react";
import { Check } from "lucide-react";
import { HardDriveDownload } from "lucide-react";
import { Pause } from "lucide-react";
import { KeyRound } from "lucide-react";
import { LogOut } from "lucide-react";
import { AlertTriangle } from "lucide-react";

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

function Bullets({ items, icon: Icon = BadgeCheck }) {
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

export default function PrivacyPolicyPage() {
  const lastUpdated = "January 13, 2026";

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-b from-fuchsia-50 via-slate-50 to-slate-50">
        <div className="mx-auto max-w-4xl px-4 pb-10 pt-10 sm:pb-12 sm:pt-12">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="rounded-full bg-fuchsia-100 text-fuchsia-800 hover:bg-fuchsia-100">
              <ShieldCheck className="h-4 w-4" />
              Your Privacy Matters
            </Badge>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Privacy Policy</h1>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-gray-600">
              This Privacy Policy explains what information catchme.live collects, how we use it, and the choices you have. We designed this platform to keep things minimal: we only collect what we need to operate the service. By using our platform,
              you acknowledge that you have read and understood this Privacy Policy and consent to the collection, use, and disclosure of your information as described herein.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-gray-500">
              <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1">
                <FileText className="h-4 w-4 text-fuchsia-700" />
                Last updated: <span className="font-medium text-gray-700">{lastUpdated}</span>
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1">
                <Scale className="h-4 w-4 text-fuchsia-700" />
                Read together with our{" "}
                <Link className="underline underline-offset-4" href="/about/terms">
                  Terms of Use
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 pb-16">
        <div className="mx-auto max-w-3xl space-y-6">
          {/* 1 */}
          <SectionShell number="1" title="Overview and Consent">
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-gray-700">By using catchme.live, you consent to the collection and use of information as described in this Privacy Policy. If you do not agree, please do not use the Platform.</p>

              <Alert className="rounded-xl border border-blue-200 bg-blue-50/60">
                <Info className="h-4 w-4 text-blue-700" />
                <AlertTitle className="text-sm">Our Privacy Commitment</AlertTitle>
                <AlertDescription className="text-sm text-gray-700">
                  We are committed to transparency in our data practices, giving you control over your personal information, implementing robust security measures, and complying with applicable data protection laws including GDPR, CCPA, and other
                  regional privacy regulations.
                </AlertDescription>
              </Alert>

              <div className="grid gap-3 sm:grid-cols-3">
                <MiniRow icon={ShieldCheck} title="Data minimization" description="We collect the minimum required." tone="success" />
                <MiniRow icon={Lock} title="Security" description="We use reasonable safeguards." tone="warn" />
                <MiniRow icon={Eye} title="Transparency" description="We explain what we do and why." tone="info" />
              </div>
            </div>
          </SectionShell>

          {/* 2 */}
          <SectionShell number="2" title="Information We Collect">
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-gray-700">We collect information in three categories: information you provide, information from Instagram (if connected), and technical usage data.</p>

              <div className="grid gap-3">
                <MiniRow icon={User} title="Account & profile details" description="Basic account identifiers and profile fields you choose to publish." tone="purple" />
                <MiniRow icon={Instagram} title="Instagram connection data" description="Public profile info and media needed to build your artist/studio profile." tone="info" />
                <MiniRow icon={Database} title="Usage & technical data" description="Device/browser signals, logs, and basic analytics to keep the service running." tone="warn" />
              </div>

              <Card className="rounded-xl border border-gray-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold">Examples</CardTitle>
                  <CardDescription className="text-sm">Typical items we may process to operate catchme.live.</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Bullets
                    items={[
                      "Profile name, bio, and avatar used for your public artist/studio page",
                      "Visit/event details you publish (dates, city, venue/studio, optional links)",
                      "Instagram public profile details and permitted media (when you connect)",
                      "IP address, timestamps, and basic request logs for security and debugging",
                    ]}
                  />
                </CardContent>
              </Card>

              <div className="pt-2">
                <div className="text-base font-semibold text-gray-900">2.2 Information Collected Automatically</div>

                <div className="mt-4 space-y-6 border-l-2 border-gray-200 pl-6">
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Device and Browser Information</div>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">IP address, browser type and version, operating system, device identifiers, screen resolution, and language preferences.</p>
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-gray-900">Usage Data</div>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">Pages visited, time spent on pages, links clicked, search queries, features used, and interaction patterns with the platform.</p>
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-gray-900">Location Information</div>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">General location derived from IP address, and specific locations you choose to share in your travel plans.</p>
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-gray-900">Cookies and Tracking Technologies</div>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">Session cookies, persistent cookies, web beacons, and similar technologies to enhance your experience and analyze platform usage.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <div className="text-base font-semibold text-gray-900">2.3 Information from Third Parties</div>

                <Alert className="mt-4 rounded-xl border border-amber-200 bg-amber-50/70">
                  <AlertCircle className="h-4 w-4 text-amber-700" />
                  <AlertDescription className="text-sm leading-relaxed text-amber-900">
                    We may receive information about you from third-party services you connect to our platform (such as Instagram), analytics providers, advertising partners, and publicly available sources. This information helps us verify your
                    identity, prevent fraud, and improve our services.
                  </AlertDescription>
                </Alert>
              </div>

              <Alert className="rounded-xl border border-amber-200 bg-amber-50/70">
                <AlertCircle className="h-4 w-4 text-amber-700" />
                <AlertTitle className="text-sm">Important</AlertTitle>
                <AlertDescription className="text-sm text-gray-700">
                  Do not submit sensitive personal data (e.g., government IDs, payment card numbers, health info). catchme.live is not designed to process highly sensitive categories of data.
                </AlertDescription>
              </Alert>
            </div>
          </SectionShell>

          {/* 3 */}
          <SectionShell number="3" title="How We Use Your Information">
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-gray-700">We use information to run the Platform, keep it safe, and improve the experience.</p>

              <div className="grid gap-3 sm:grid-cols-2">
                <MiniRow icon={CalendarDays} title="Provide the service" description="Create profiles, publish visits/events, and power discovery." tone="success" />
                <MiniRow icon={Settings2} title="Maintain and improve" description="Fix bugs, improve features, and monitor performance." tone="info" />
                <MiniRow icon={ShieldCheck} title="Security and fraud prevention" description="Detect abuse, enforce policies, and protect users." tone="warn" />
                <MiniRow icon={Bell} title="Communications" description="Send essential updates, confirmations, or support replies." tone="purple" />
              </div>

              <div className="rounded-xl border border-gray-200 bg-gray-50/40 p-4">
                <div className="text-sm font-semibold text-gray-900">Legal bases (where applicable)</div>
                <p className="mt-1 text-sm text-gray-700">Depending on your location, we process data based on consent, contract necessity, legitimate interests, and legal obligations.</p>
              </div>
              <div className="pt-2">
                <div className="text-base font-semibold text-gray-900">Legal Basis for Processing (GDPR)</div>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">For users in the European Economic Area (EEA), we process your personal data based on the following legal grounds:</p>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-gray-200 bg-gray-50/60 p-5">
                    <div className="text-gray-600">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div className="mt-4 text-base font-semibold text-gray-900">Contractual Necessity</div>
                    <div className="mt-1 text-sm text-gray-600">To provide services you&apos;ve requested</div>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-gray-50/60 p-5">
                    <div className="text-gray-600">
                      <Handshake className="h-6 w-6" />
                    </div>
                    <div className="mt-4 text-base font-semibold text-gray-900">Consent</div>
                    <div className="mt-1 text-sm text-gray-600">When you&apos;ve given explicit permission</div>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-gray-50/60 p-5">
                    <div className="text-gray-600">
                      <Scale className="h-6 w-6" />
                    </div>
                    <div className="mt-4 text-base font-semibold text-gray-900">Legitimate Interests</div>
                    <div className="mt-1 text-sm text-gray-600">For business operations and improvements</div>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-gray-50/60 p-5">
                    <div className="text-gray-600">
                      <Gavel className="h-6 w-6" />
                    </div>
                    <div className="mt-4 text-base font-semibold text-gray-900">Legal Obligation</div>
                    <div className="mt-1 text-sm text-gray-600">To comply with applicable laws</div>
                  </div>
                </div>
              </div>
            </div>
          </SectionShell>

          {/* 4 */}
          <SectionShell number="4" title="How We Share Your Information">
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-gray-700">We do not sell your personal information. We share data only when needed to operate the Platform or comply with law.</p>

              <div className="grid gap-3 sm:grid-cols-2">
                <MiniRow icon={Users} title="Public content" description="Anything you publish (visits/events) may be visible publicly." tone="info" />
                <MiniRow icon={Share2} title="Service providers" description="Hosting, analytics, and support tools that help us run catchme.live." tone="warn" />
              </div>

              <Accordion type="single" collapsible className="rounded-xl border border-gray-200 bg-white">
                <AccordionItem value="a" className="px-4">
                  <AccordionTrigger className="text-sm">Service providers</AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-700">
                    We may share limited data with trusted vendors who process it on our behalf (e.g., cloud hosting, monitoring). They are bound by confidentiality and security obligations.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="b" className="px-4">
                  <AccordionTrigger className="text-sm">Legal and safety</AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-700">We may disclose information if required by law, or if we believe disclosure is necessary to protect users, investigate fraud, or enforce our Terms.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="c" className="px-4">
                  <AccordionTrigger className="text-sm">Business changes</AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-700">If catchme.live is involved in a merger, acquisition, or asset sale, your information may be transferred as part of that transaction, subject to this Policy.</AccordionContent>
                </AccordionItem>
              </Accordion>

              <Alert className="rounded-xl border border-blue-200 bg-blue-50/60">
                <Info className="h-4 w-4 text-blue-700" />
                <AlertTitle className="text-sm">Public vs. private</AlertTitle>
                <AlertDescription className="text-sm text-gray-700">Public profile and visit details are visible to help people discover you. Private operational data (like logs) is not displayed publicly.</AlertDescription>
              </Alert>

              <div className="pt-2">
                <div className="text-base font-semibold text-gray-900">4.4 Business Transfers</div>

                <Alert className="mt-4 rounded-xl border border-amber-200 bg-amber-50/70">
                  <AlertCircle className="h-4 w-4 text-amber-700" />
                  <AlertDescription className="text-sm leading-relaxed text-amber-900">
                    In the event of a merger, acquisition, reorganization, sale of assets, or bankruptcy, your information may be transferred to the successor entity. We will notify you of any such change and provide you with choices regarding your
                    information.
                  </AlertDescription>
                </Alert>
              </div>

              <div className="pt-2">
                <div className="text-base font-semibold text-gray-900">4.5 With Your Consent</div>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">We may share your information for other purposes with your explicit consent or at your direction.</p>
              </div>
            </div>
          </SectionShell>

          {/* 5 */}
          <SectionShell number="5" title="Cookies and Tracking Technologies">
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-gray-700">We use cookies and similar technologies to keep you signed in, remember preferences, and understand basic usage patterns.</p>

              <div className="grid gap-3 sm:grid-cols-2">
                <MiniRow icon={Cookie} title="Essential cookies" description="Required for the platform to function properly. These cookies enable core functionality such as security, network management, and accessibility." tone="success" />
                <MiniRow icon={BookOpen} title="Analytics (minimal)" description="Help us understand how visitors interact with our platform by collecting and reporting information anonymously." tone="info" />
                <MiniRow icon={Settings2} title="Functionality" description="Enable enhanced functionality and personalization, such as remembering your preferences and settings - Can be controlled through cookie preferences." tone="info" />
                <MiniRow icon={Speaker} title="Marketing" description="Track your activity across websites to deliver more relevant advertising and measure campaign effectiveness" tone="info" />
              </div>

              <div className="rounded-xl border border-gray-200 bg-gray-50/40 p-4">
                <div className="text-sm font-semibold text-gray-900">Your choices</div>
                <p className="mt-1 text-sm text-gray-700">You can control cookies through your browser settings. Blocking some cookies may affect functionality.</p>
              </div>
            </div>
            <div className="pt-2">
              <div className="text-base font-semibold text-gray-900">5.2 Managing Cookie Preferences</div>

              <div className="mt-4 rounded-2xl border border-blue-200 bg-blue-50/60 p-5">
                <div className="text-sm font-semibold text-blue-900">You can control and manage cookies in several ways:</div>

                <ul className="mt-4 grid gap-3">
                  <li className="flex items-start gap-3 text-sm text-blue-900">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 ring-1 ring-blue-200">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="leading-relaxed">Use our cookie consent banner to accept or reject non-essential cookies</span>
                  </li>

                  <li className="flex items-start gap-3 text-sm text-blue-900">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 ring-1 ring-blue-200">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="leading-relaxed">Adjust your browser settings to block or delete cookies</span>
                  </li>

                  <li className="flex items-start gap-3 text-sm text-blue-900">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 ring-1 ring-blue-200">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="leading-relaxed">Use browser extensions or privacy tools to manage tracking</span>
                  </li>

                  <li className="flex items-start gap-3 text-sm text-blue-900">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 ring-1 ring-blue-200">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="leading-relaxed">Opt out of targeted advertising through industry opt-out tools</span>
                  </li>
                </ul>
              </div>
            </div>
          </SectionShell>

          {/* 6 */}
          <SectionShell number="6" title="Data Security and Retention">
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-gray-700">We use reasonable administrative, technical, and physical safeguards. However, no method of transmission or storage is 100% secure.</p>

              <div className="grid gap-3 sm:grid-cols-3">
                <MiniRow icon={Lock} title="Protection" description="Access controls and monitoring." tone="warn" />
                <MiniRow icon={ShieldCheck} title="Security practices" description="Encryption where appropriate." tone="success" />
                <MiniRow icon={Trash2} title="Retention" description="We keep data only as needed." tone="danger" />
              </div>

              <Alert className="rounded-xl border border-amber-200 bg-amber-50/70">
                <AlertCircle className="h-4 w-4 text-amber-700" />
                <AlertTitle className="text-sm">Security note</AlertTitle>
                <AlertDescription className="text-sm text-gray-700">If you suspect unauthorized access to your account, please contact us immediately. You can also revoke access from Instagram at any time.</AlertDescription>
              </Alert>
            </div>
            <div className="pt-4">
              <div className="text-base font-semibold text-gray-900">6.2 Data Breach Response</div>

              <Alert className="mt-4 rounded-xl border border-rose-200 bg-rose-50/60">
                <AlertTriangle className="h-4 w-4 text-rose-700" />
                <AlertTitle className="text-sm text-rose-900">Breach Notification</AlertTitle>
                <AlertDescription className="text-sm leading-relaxed text-rose-900">
                  In the unlikely event of a data breach that affects your personal information, we will notify you and relevant authorities as required by applicable law. We will provide information about the breach, the data affected, and steps you
                  can take to protect yourself.
                </AlertDescription>
              </Alert>
            </div>
          </SectionShell>

          {/* 7 */}
          <SectionShell number="7" title="Your Rights and Choices">
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-gray-700">Depending on your location, you may have certain rights regarding your personal information.</p>

              <div className="mt-1 rounded-2xl border border-fuchsia-200 bg-gradient-to-r from-fuchsia-50 to-violet-50 p-5">
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
                      <Settings2 className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-gray-900">Manage Preferences</div>
                      <div className="mt-0.5 text-sm text-gray-600">Disconnect Instagram and update settings</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-fuchsia-100 text-fuchsia-700 ring-1 ring-fuchsia-200">
                      <HardDriveDownload className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-gray-900">Right to Data Portability</div>
                      <div className="mt-0.5 text-sm text-gray-600">Receive your personal information in a structured, commonly used format and transfer it to another service.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-fuchsia-100 text-fuchsia-700 ring-1 ring-fuchsia-200">
                      <Pause className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-gray-900">Right to Restrict Processing</div>
                      <div className="mt-0.5 text-sm text-gray-600">Request that we limit how we use your personal information in certain situations.</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <MiniRow icon={Instagram} title="Disconnect Instagram" description="You can revoke permissions from Instagram settings anytime." tone="purple" />
                <MiniRow icon={Mail} title="Request help" description="Contact us to exercise your rights." tone="info" />
              </div>
            </div>
          </SectionShell>

          {/* 8 */}
          <SectionShell number="8" title="International Transfers">
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-gray-700">
                If you access the Platform from outside the country where our servers or providers are located, your information may be transferred internationally. Where required, we use appropriate safeguards.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <MiniRow icon={Globe} title="Global access" description="The internet is global; transfers may occur." tone="info" />
                <MiniRow icon={ShieldCheck} title="Safeguards" description="We use contractual and technical protections." tone="success" />
              </div>
            </div>
          </SectionShell>

          {/* 9 */}
          <SectionShell number="9" title="Children’s Privacy">
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-gray-700">catchme.live is not intended for children. We do not knowingly collect personal information from children.</p>
              <Alert className="rounded-xl border border-rose-200 bg-rose-50/60">
                <AlertCircle className="h-4 w-4 text-rose-700" />
                <AlertTitle className="text-sm">Under 18</AlertTitle>
                <AlertDescription className="text-sm text-gray-700">If you believe a child has provided personal data, contact us and we’ll take appropriate action.</AlertDescription>
              </Alert>
            </div>
          </SectionShell>

          {/* 10 */}
          <SectionShell number="10" title="Changes to This Policy">
            <div className="space-y-3">
              <p className="text-sm leading-relaxed text-gray-700">We may update this Privacy Policy to reflect product changes or legal requirements. If changes are material, we’ll provide reasonable notice.</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Policy updates</Badge>
                <Badge variant="secondary">Feature changes</Badge>
                <Badge variant="secondary">Legal requirements</Badge>
              </div>
            </div>
          </SectionShell>

          {/* FAQ cards block */}
          <div className="grid gap-4 pt-4 sm:grid-cols-2">
            <Card className="rounded-2xl border border-gray-200 bg-white">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-fuchsia-50 text-fuchsia-700 ring-1 ring-fuchsia-100">
                    <HelpCircle className="h-4 w-4" />
                  </div>
                  <CardTitle className="text-sm">Questions about privacy?</CardTitle>
                </div>
                <CardDescription className="text-sm">Find common answers in our resources.</CardDescription>
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
                  <CardTitle className="text-sm">Related legal</CardTitle>
                </div>
                <CardDescription className="text-sm">Read the Terms that govern usage.</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button asChild variant="secondary" className="w-full">
                  <Link href="/about/terms">View Terms of Use</Link>
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
                <CardDescription className="text-sm">Learn how linking Instagram works.</CardDescription>
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
                    <Mail className="h-4 w-4" />
                  </div>
                  <CardTitle className="text-sm">Contact privacy</CardTitle>
                </div>
                <CardDescription className="text-sm">Data requests and privacy inquiries.</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button asChild className="w-full">
                  <a href="mailto:privacy@catchme.live">privacy@catchme.live</a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Questions */}
          <div className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">Questions About Our Privacy Policy?</div>
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
                    <CardTitle className="text-sm">Email Privacy</CardTitle>
                  </div>
                  <CardDescription className="text-sm">Privacy and data requests.</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button asChild className="w-full">
                    <a href="mailto:privacy@catchme.live">privacy@catchme.live</a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border border-gray-200 bg-white">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-fuchsia-50 text-fuchsia-700 ring-1 ring-fuchsia-100">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <CardTitle className="text-sm">Security</CardTitle>
                  </div>
                  <CardDescription className="text-sm">Report security concerns.</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button asChild variant="secondary" className="w-full">
                    <a href="mailto:security@catchme.live">security@catchme.live</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Small, subtle “cookie-style” band */}
          <div className="rounded-2xl bg-gradient-to-r from-fuchsia-600 to-purple-600 p-5 text-white">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="text-sm font-semibold">We respect your privacy.</div>
                <div className="mt-1 text-sm text-white/90">You can review this policy anytime in the About section.</div>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2">
                <Button variant="secondary" className="bg-white/15 text-white hover:bg-white/20" asChild>
                  <Link href="/about/privacy">Review</Link>
                </Button>
                <Button className="bg-white text-gray-900 hover:bg-white/90" asChild>
                  <Link href="/discover">Continue</Link>
                </Button>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="text-center text-xs text-gray-500">© {new Date().getFullYear()} catchme.live — All rights reserved.</div>
        </div>
      </div>
    </main>
  );
}
