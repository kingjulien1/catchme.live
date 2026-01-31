import Section from "@/components/Section";
import AccountHandle from "@/components/account-handle";
import { Separator } from "@/components/ui/separator";
import { getSessionUser } from "@/lib/db";
import {
  Activity,
  BadgeCheck,
  BarChart3,
  BookOpen,
  Check,
  CheckCircle2,
  ExternalLink,
  HelpCircle,
  Image,
  Instagram,
  InstagramIcon,
  LineChart,
  Link,
  Lock,
  Mail,
  MessageCircle,
  Settings,
  Shield,
  ShieldCheck,
  TrendingUp,
  User,
  UserCheck,
  Users,
} from "lucide-react";

export default async function Me() {
  const user = await getSessionUser();
  const hasInstagramConnection = Boolean(user?.instagram_token_updated_at || user?.ig_user_id);

  return (
    <div className="w-full pb-20">
      <div className="w-full mx-auto">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid gap-6">
            {hasInstagramConnection ? (
              <div className="flex flex-col gap-3 rounded-2xl border border-emerald-200/70 bg-emerald-50/60 p-4 text-sm text-emerald-800 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-100">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-sm">
                    <Settings className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">Your Instagram is already connected.</p>
                    <p className="text-xs text-emerald-700/80 dark:text-emerald-100/80">
                      Keep your sync settings, notifications, and profile visibility up to date in the settings dashboard.
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-emerald-700/80 dark:text-emerald-100/80">
                      <span>Signed in as</span>
                      <AccountHandle
                        username={user?.username}
                        name={user?.name || null}
                        profilePictureUrl={user?.profile_picture_url || null}
                        followersCount={user?.followers_count ?? null}
                        accountType={user?.account_type || null}
                        mediaCount={user?.media_count ?? null}
                        bio={user?.bio || null}
                        className="text-xs font-semibold text-emerald-900 dark:text-emerald-100"
                      />
                    </div>
                  </div>
                </div>
                <a href="/me/settings" className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-700">
                  <ExternalLink className="h-4 w-4" />
                  Open Settings
                </a>
              </div>
            ) : null}
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
          </div>
        </div>
        <Separator className="bg-slate-200/80 dark:bg-slate-800/80 my-6 md:my-10" />
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-slate-100 sm:text-3xl">What Gets Imported</h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-slate-400 sm:text-base">Here&apos;s everything we&apos;ll automatically sync from your Instagram account</p>
        </div>

        <div className="grid gap-6 mt-10 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Portfolio Images",
              description: "Your latest posts, stories, and highlights automatically imported to showcase your best work.",
              icon: Image,
              items: ["Recent posts (up to 100)", "Story highlights", "Tagged photos"],
            },
            {
              title: "Profile Information",
              description: "Your bio, profile picture, and contact details synced in real-time.",
              icon: User,
              items: ["Profile picture", "Bio & description", "Website & contact info"],
            },
            {
              title: "Engagement Metrics",
              description: "Track your growth and engagement statistics over time.",
              icon: LineChart,
              items: ["Follower count", "Post engagement", "Growth analytics"],
            },
          ].map((card) => (
            <div key={card.title} className="p-6 transition bg-white border border-gray-200 shadow-sm rounded-2xl hover:-translate-y-1 hover:shadow-md dark:border-slate-800/80 dark:bg-slate-900/70">
              <div className="inline-flex items-center justify-center w-12 h-12 text-white shadow-sm rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700">
                <card.icon className="w-5 h-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-gray-900 dark:text-slate-100">{card.title}</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-slate-300">{card.description}</p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
                {card.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <section id="pro-account" className="px-6 py-10 mt-16 bg-white border border-gray-200 shadow-sm rounded-3xl dark:border-slate-800/80 dark:bg-slate-900/70">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-slate-100 sm:text-3xl">Creator or Business Account Required</h3>
            <p className="mt-3 text-sm text-gray-600 dark:text-slate-300 sm:text-base">
              Instagram&apos;s API only allows access to professional accounts. That means you&apos;ll need a Creator or Business account for us to sync your profile data, media, and insights. The switch is free, takes less than a minute, and
              doesn&apos;t change your content.
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="p-5 border border-gray-200 rounded-2xl bg-gray-50 dark:border-slate-800/80 dark:bg-slate-900/50">
              <div className="text-sm font-semibold text-gray-900 dark:text-slate-100">Why it&apos;s required</div>
              <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Instagram restricts API access to Creator/Business accounts for privacy and security.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Professional accounts unlock insights and profile fields required for syncing.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  You can switch back anytime if you change your mind.
                </li>
              </ul>
            </div>

            <div className="p-5 bg-white border border-gray-200 rounded-2xl dark:border-slate-800/80 dark:bg-slate-900/70">
              <div className="text-sm font-semibold text-gray-900 dark:text-slate-100">How to switch in Instagram</div>
              <ol className="mt-3 space-y-3 text-sm text-gray-600 dark:text-slate-300">
                {[
                  "Open Instagram and go to your profile.",
                  "Tap the menu (≡) in the top-right corner.",
                  "Select Settings and privacy → Account.",
                  "Tap Switch to professional account.",
                  "Choose Creator or Business and follow the prompts.",
                  "Confirm your category and contact info, then finish setup.",
                ].map((step, index) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white dark:bg-slate-100 dark:text-slate-900">{index + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <div className="mt-16 space-y-12">
          <section id="security" className="px-6 py-10 text-white shadow-2xl rounded-3xl bg-slate-950 shadow-slate-900/30">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300/80">Your Security Is Our Priority</p>
              <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">Secure, Permissioned, Transparent</h3>
              <p className="mt-3 text-sm text-slate-300 sm:text-base">We only request the minimum access required and protect your data with best-in-class safeguards.</p>
            </div>

            <div className="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Encrypted Storage", copy: "Tokens are protected and never shared.", icon: Lock },
                { title: "Scoped Access", copy: "Read-only permissions keep you in control.", icon: ShieldCheck },
                { title: "Activity Logs", copy: "Every sync is tracked and auditable.", icon: Activity },
                { title: "Privacy First", copy: "We never post on your behalf.", icon: BadgeCheck },
              ].map((item) => (
                <div key={item.title} className="p-4 border rounded-2xl border-white/10 bg-white/5">
                  <item.icon className="w-5 h-5 text-emerald-300" />
                  <div className="mt-3 text-sm font-semibold">{item.title}</div>
                  <p className="mt-2 text-xs text-slate-300">{item.copy}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-6 text-xs text-slate-300">
              {["SOC 2 aligned", "GDPR-ready", "Least-privilege access", "No credential storage"].map((pill) => (
                <span key={pill} className="px-3 py-1 border rounded-full border-white/10 bg-white/5">
                  {pill}
                </span>
              ))}
            </div>
          </section>

          <section className="relative">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-slate-100 sm:text-3xl">Permissions We Request</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-slate-400 sm:text-base">We only ask for what we need to sync your profile and performance insights.</p>
            </div>
            <div className="absolute inset-0 pointer-events-none rounded-3xl" />
            <div className="relative grid gap-4 mt-8 lg:grid-cols-2">
              {[
                { title: "Basic Profile", copy: "Access your profile, photo, and bio details.", status: "Required", icon: User, tone: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-200" },
                { title: "Media Insights", copy: "Read post engagement and performance metrics.", status: "Required", icon: BarChart3, tone: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-200" },
                { title: "Growth Analytics", copy: "Track follower growth and reach over time.", status: "Optional", icon: TrendingUp, tone: "bg-sky-500/10 text-sky-600 dark:text-sky-200" },
                { title: "Account Metrics", copy: "Aggregate stats used in your public profile.", status: "Optional", icon: Users, tone: "bg-sky-500/10 text-sky-600 dark:text-sky-200" },
              ].map((perm) => (
                <div key={perm.title} className="p-5 bg-white border border-gray-200 shadow-sm rounded-2xl dark:border-slate-800/80 dark:bg-slate-900/70">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-10 h-10 text-gray-600 bg-gray-100 rounded-xl dark:bg-slate-800 dark:text-slate-200">
                        <perm.icon className="w-5 h-5" />
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-slate-100">{perm.title}</div>
                        <div className="text-xs text-gray-500 dark:text-slate-400">{perm.copy}</div>
                      </div>
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase ${perm.tone}`}>{perm.status}</span>
                  </div>
                </div>
              ))}
              <div className="p-5 text-xs border lg:col-span-2 rounded-2xl border-amber-200 bg-amber-50/70 text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
                <div className="flex items-center gap-2 font-semibold">
                  <HelpCircle className="w-4 h-4" />
                  Manual Review
                </div>
                <p className="mt-2 text-sm">You can disconnect at any time. We keep your imported data, but stop syncing immediately when access is revoked.</p>
              </div>
            </div>
          </section>

          <section>
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-slate-100 sm:text-3xl">Frequently Asked Questions</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-slate-400 sm:text-base">Quick answers about Instagram sync and data privacy.</p>
            </div>
            <div className="grid gap-4 mt-8">
              {[
                {
                  q: "Does catchme.live ever post on my Instagram?",
                  a: "No. We only read your approved data to populate your profile and insights.",
                },
                {
                  q: "What happens if I disconnect my account?",
                  a: "Your existing profile data remains, but syncing stops immediately until you reconnect.",
                },
                {
                  q: "How often do you refresh my stats?",
                  a: "We sync automatically and refresh your metrics on a regular schedule.",
                },
                {
                  q: "Can I control what gets shown on my profile?",
                  a: "Yes. You can review and edit your public profile details at any time.",
                },
              ].map((faq) => (
                <div key={faq.q} className="p-5 bg-white border border-gray-200 shadow-sm rounded-2xl dark:border-slate-800/80 dark:bg-slate-900/70">
                  <div className="text-sm font-semibold text-gray-900 dark:text-slate-100">{faq.q}</div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-slate-300">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="px-6 py-10 text-white shadow-xl rounded-3xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-rose-500">
            <div className="text-center">
              <h3 className="text-2xl font-semibold sm:text-3xl">Join Thousands of Connected Artists</h3>
              <p className="mt-2 text-sm text-white/80 sm:text-base">Sync your Instagram once and let your profile stay fresh everywhere.</p>
            </div>
            <div className="grid gap-6 mt-8 text-center sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Connected Profiles", value: "12,500+" },
                { label: "Monthly Syncs", value: "2.4M" },
                { label: "Sync Accuracy", value: "99.9%" },
                { label: "Support", value: "24/7" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-semibold">{stat.value}</div>
                  <div className="mt-1 text-xs tracking-wide uppercase text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-slate-100 sm:text-3xl">Need Help Connecting?</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-slate-300 sm:text-base">Our support team is here to help you every step of the way.</p>
            </div>
            <div className="grid gap-4 mt-8 md:grid-cols-3">
              {[
                { title: "Documentation", copy: "Step-by-step guides and tutorials for connecting Instagram", cta: "View Docs →", icon: BookOpen, href: "/about/help" },
                { title: "Live Chat", copy: "Chat with our support team in real-time", cta: "Start Chat →", icon: MessageCircle, href: "/support" },
                { title: "Email Support", copy: "Get detailed help via email within 24 hours", cta: "Send Email →", icon: Mail, href: "/about/contact" },
              ].map((card) => (
                <a key={card.title} href={card.href} className="p-6 text-center transition bg-white border border-gray-200 shadow-sm rounded-2xl hover:-translate-y-1 hover:shadow-md dark:border-slate-800/80 dark:bg-slate-900/70">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-200">
                    <card.icon className="w-5 h-5" />
                  </span>
                  <h4 className="mt-4 text-base font-semibold text-gray-900 dark:text-slate-100">{card.title}</h4>
                  <p className="mt-2 text-sm text-gray-600 dark:text-slate-300">{card.copy}</p>
                  <span className="inline-block mt-4 text-sm font-semibold text-violet-600 dark:text-violet-300">{card.cta}</span>
                </a>
              ))}
            </div>
          </section>

          <section className="px-6 py-10 text-center border shadow-lg rounded-3xl border-fuchsia-200 bg-gradient-to-br from-fuchsia-50 via-white to-rose-50 dark:border-slate-800/80 dark:from-slate-900/80 dark:via-slate-950 dark:to-slate-900/80">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-slate-100 sm:text-3xl">Ready to Connect Your Instagram?</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-slate-300 sm:text-base">Join thousands of artists who have streamlined their profile with Instagram integration.</p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <a href="/api/auth/instagram/start" className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white transition shadow-sm rounded-xl bg-gradient-to-r from-fuchsia-500 to-rose-500 hover:opacity-90">
                <Instagram className="w-4 h-4" />
                Connect Instagram Now
              </a>
              <a
                href="/about"
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-gray-900 transition bg-white border border-gray-200 shadow-sm rounded-xl hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                Learn More
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs text-gray-500 dark:text-slate-400">
              {["Free forever", "No credit card required", "Cancel anytime"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  {item}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
