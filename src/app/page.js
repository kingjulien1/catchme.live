"use client";

import Link from "next/link";
import { ArrowRight, BadgeCheck, CalendarDays, Check, CircleUser, Compass, Crown, Gift, Globe, HeartHandshake, MapPin, ShieldCheck, Sparkles, Star, Zap } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Rocket } from "lucide-react";
import { Caravan } from "lucide-react";

const stats = [
  { value: "10K+", label: "Artists & studios" },
  { value: "150K+", label: "Visits tracked" },
  { value: "85+", label: "Countries" },
  { value: "4.9★", label: "Average rating" },
];

const features = [
  {
    icon: MapPin,
    title: "Live visit discovery",
    description: "Find artists currently in your city — or see who’s coming next with a countdown.",
  },
  {
    icon: CalendarDays,
    title: "Events & conventions",
    description: "Track conventions, guest spots, residencies and special events alongside visits.",
  },
  {
    icon: ShieldCheck,
    title: "Instagram-based profiles",
    description: "Connect Instagram once. We use public info and media to build a clean profile.",
  },
  {
    icon: Compass,
    title: "Smart search",
    description: "Search by artist, studio, city or date range — and filter by style or category.",
  },
  {
    icon: Zap,
    title: "Instant announcements",
    description: "Publish a new stop in seconds. Update dates or locations anytime.",
  },
  {
    icon: Globe,
    title: "Global reach",
    description: "Follow artists worldwide and get notified when they travel near you.",
  },
];

const steps = [
  {
    n: "1",
    title: "Connect Instagram",
    description: "Import your public profile info and media lead-ins automatically.",
    icon: CircleUser,
  },
  {
    n: "2",
    title: "Add your visits",
    description: "Create upcoming stops, events, and residency lineups with countdowns.",
    icon: MapPin,
  },
  {
    n: "3",
    title: "Share & grow",
    description: "Share your page, build waitlists and keep fans updated in real time.",
    icon: Sparkles,
  },
];
const stepThemes = [
  {
    gradient: "from-fuchsia-100 via-white to-indigo-100 dark:from-fuchsia-950/40 dark:via-background dark:to-indigo-950/35",
    number: "bg-fuchsia-100 text-fuchsia-700 ring-fuchsia-200 dark:bg-fuchsia-950/40 dark:text-fuchsia-200 dark:ring-fuchsia-900/50",
    icon: "bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-950/30 dark:text-fuchsia-200",
  },
  {
    gradient: "from-indigo-100/80 via-white to-fuchsia-100/60 dark:from-indigo-950/40 dark:via-background dark:to-fuchsia-950/35",
    number: "bg-indigo-100 text-indigo-700 ring-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-200 dark:ring-indigo-900/50",
    icon: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-200",
  },
  {
    gradient: "from-emerald-100/70 via-white to-cyan-100/60 dark:from-emerald-950/35 dark:via-background dark:to-cyan-950/30",
    number: "bg-emerald-100 text-emerald-700 ring-emerald-200 dark:bg-emerald-950/35 dark:text-emerald-200 dark:ring-emerald-900/50",
    icon: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/25 dark:text-emerald-200",
  },
];

const testimonials = [
  {
    name: "Sofia M.",
    role: "Tattoo artist",
    text: "I can finally announce guest spots cleanly. The countdown + “currently in” section is perfect.",
  },
  {
    name: "Studio North",
    role: "Studio",
    text: "We use it to coordinate visiting artists and share a single schedule link with clients.",
  },
  {
    name: "Kevin R.",
    role: "Collector",
    text: "Discovering artists in my area became effortless. Notifications are a game changer.",
  },
];

const faq = [
  {
    q: "How does Instagram connection work?",
    a: "Connection only works with Instagram Creator or Business accounts. Switching to a Creator or Business account has virtually no downsides — it’s free, keeps your content the same, and unlocks helpful tools that benefit your profile — takes less than 30 seconds. Please refer to our Connect Instagram section for more details. We connect your Instagram account through our secure OAuth system. We'll automatically import your bio, profile picture, and portfolio images, no need to enter any of your information again. We only access public profile informatino and would never post anything without your permission. You can disconnect at any time.",
  },
  {
    q: "Is this platform only for tattoo artists?",
    a: "Absolutely not! While we started with tattoo artists, our platform works for any traveling artist including musicians, DJs, visual artists, performers, and more. The features are designed to be flexible for different art forms.",
  },
  {
    q: "Do you support conventions and events?",
    a: "Absolutely. Add events alongside visits — perfect for conventions, residencies, and guest spots. You can also check out permanent residencies to see where youre favorite artists are based long-term. Please refer to our Discover Section to find artists and events that you will love.",
  },
  {
    q: "What if I don't have an Instagram account?",
    a: "If you want to just check out artists and events on our platform, you won't be needing to sign in with any account at all. If you are an artist however, and you want to post your visits or residencies, you will need to have an Instagram Creator or Business account to connect and use our platform effectively. Creating an Instagram account is free, easy and fast, plus it unlocks great tools for artists to grow their audience.",
  },
];

function Section({ id, children, className = "" }) {
  return (
    <section id={id} className={`w-full py-12 sm:py-16 ${className}`.trim()}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

function SoftCard({ className = "", children }) {
  return <div className={"rounded-2xl border border-border bg-card/70 text-card-foreground shadow-sm backdrop-blur-sm " + className}>{children}</div>;
}

export default function Landing() {
  return (
    <main className="relative w-full overflow-hidden bg-background text-foreground">
      {/* Mobile top padding + gradient */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-fuchsia-200/60 via-fuchsia-100/30 to-transparent dark:from-fuchsia-950/50 dark:via-fuchsia-950/20 dark:to-transparent sm:hidden" />
      {/* HERO */}
      <Section className="pt-24 sm:pt-10">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="rounded-full" variant="secondary">
                <Caravan className="mr-1 h-4 w-4" />
                Built for traveling artists
              </Badge>
              <Badge className="rounded-full" variant="outline">
                <Star className="mr-1 h-4 w-4" />
                Visits • Events • Conventions
              </Badge>
            </div>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Connect with fans <span className="text-fuchsia-600 dark:text-fuchsia-400">wherever</span> you go
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">catchme.live helps artists announce current and upcoming visits, events, and conventions — with clean profiles, countdowns, and discovery.</p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button size="lg" className="gap-2" asChild>
                <Link href="/create-new-visit">
                  Create your first visit <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/discover">Explore live visits</Link>
              </Button>
            </div>

            <div className="hidden grid-cols-2 gap-4 pt-2 sm:grid-cols-4 lg:grid">
              {stats.map((s) => (
                <SoftCard key={s.label} className="p-4">
                  <div className="text-xl font-semibold text-foreground">{s.value}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
                </SoftCard>
              ))}
            </div>
          </div>

          {/* Right side preview card */}
          <div className="relative">
            <div className="pointer-events-none absolute -inset-6 rounded-[32px] bg-gradient-to-br from-fuchsia-200/60 via-white to-indigo-200/50 blur-2xl dark:from-fuchsia-950/50 dark:via-background dark:to-indigo-950/40" />
            <SoftCard className="relative overflow-hidden p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-foreground">Upcoming + live visits</div>
                  <div className="text-xs text-muted-foreground">A clean lineup your fans can follow.</div>
                </div>
                <Badge variant="secondary" className="rounded-full">
                  <Sparkles className="mr-1 h-4 w-4" />
                  Live
                </Badge>
              </div>

              <div className="mt-5 grid gap-3">
                <Card className="border-border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-foreground">Los Angeles, CA</div>
                        <div className="mt-1 text-xs text-muted-foreground">Now • 3 days left</div>
                      </div>
                      <Badge className="rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-200 dark:hover:bg-emerald-950/50">In progress</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-foreground">New York, NY</div>
                        <div className="mt-1 text-xs text-muted-foreground">Starts in 12 days</div>
                      </div>
                      <Badge variant="outline" className="rounded-full">
                        Countdown
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-foreground">Berlin, DE</div>
                        <div className="mt-1 text-xs text-muted-foreground">Convention • September</div>
                      </div>
                      <Badge className="rounded-full bg-fuchsia-100 text-fuchsia-700 hover:bg-fuchsia-100 dark:bg-fuchsia-950/40 dark:text-fuchsia-200 dark:hover:bg-fuchsia-950/50">Event</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Separator className="my-5" />

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                    <Image src="/logo.svg" alt="catchme.live" width={20} height={20} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">catchme.live</div>
                    <div className="text-xs text-muted-foreground">Shareable visit page</div>
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/visits">View example</Link>
                </Button>
              </div>
            </SoftCard>
          </div>

          {/* Mobile stats (shown after the preview card) */}
          <div className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-4 lg:hidden">
            {stats.map((s) => (
              <SoftCard key={s.label} className="p-4">
                <div className="text-xl font-semibold text-foreground">{s.value}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
              </SoftCard>
            ))}
          </div>
        </div>
      </Section>

      {/* FEATURES */}
      <Section id="features" className="bg-muted/30">
        <div className="text-center">
          <Badge className="rounded-full bg-fuchsia-100 text-fuchsia-800 hover:bg-fuchsia-100 dark:bg-fuchsia-950/40 dark:text-fuchsia-200 dark:hover:bg-fuchsia-950/50">
            <Sparkles className="inline-block mr-1 h-4 w-4" />
            Get started
          </Badge>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Everything you need to grow</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">Build a simple, beautiful travel lineup for your audience — with discoverability, notifications and event support.</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} className="border-border">
              <CardHeader className="space-y-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-fuchsia-50 text-fuchsia-700">
                  <f.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">{f.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 text-sm leading-relaxed text-muted-foreground">{f.description}</CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* STEPS */}
      <Section id="steps">
        <div className="text-center">
          <Badge className="rounded-full bg-fuchsia-100 text-fuchsia-800 hover:bg-fuchsia-100 dark:bg-fuchsia-950/40 dark:text-fuchsia-200 dark:hover:bg-fuchsia-950/50">
            <Rocket className="inline-block mr-1 h-4 w-4" />
            Get started
          </Badge>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Get started in 3 simple steps</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">Set up your profile, add your travel plans, and share your page.</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((s, idx) => {
            const theme = stepThemes[idx] ?? stepThemes[0];

            return (
              <Card key={s.title} className="relative overflow-hidden border-border">
                {/* subtle gradient wash */}
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-60`} />

                <CardHeader className="relative space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ring-1 ${theme.number}`}>
                      <span className="text-sm font-semibold">{s.n}</span>
                    </div>

                    <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${theme.icon}`}>
                      <s.icon className="h-5 w-5" />
                    </div>
                  </div>

                  <CardTitle className="text-base">{s.title}</CardTitle>
                </CardHeader>

                <CardContent className="relative pt-0 text-sm leading-relaxed text-muted-foreground">{s.description}</CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <Button size="lg" className="gap-2" asChild>
            <Link href="/create-new-visit">
              Start now <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* TOP ARTISTS */}
      <Section id="top-artists" className="bg-muted/30">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-fuchsia-700">Discover</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Top artists on the platform</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">A small preview of profiles — imagine this filled with real artists in your area.</p>
          </div>
          <div className="hidden sm:block">
            <Button variant="outline" asChild>
              <Link href="/artists">Browse all</Link>
            </Button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="overflow-hidden border-border">
              <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-fuchsia-100 via-white to-indigo-100">
                <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/80 px-2 py-1 text-xs text-foreground ring-1 ring-border backdrop-blur">
                  <MapPin className="h-3.5 w-3.5" />
                  {i % 2 === 0 ? "Vienna" : "Berlin"}
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-foreground">@artist_{i + 1}</div>
                    <div className="mt-1 text-xs text-muted-foreground">Fine line • Blackwork</div>
                  </div>
                  <Badge variant="secondary" className="rounded-full">
                    Live
                  </Badge>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <Star className="h-4 w-4 text-amber-500" />
                  4.{8 - i} rating
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 sm:hidden">
          <Button variant="outline" className="w-full" asChild>
            <Link href="/artists">Browse all</Link>
          </Button>
        </div>
      </Section>

      {/* MUSICIANS / OTHER ARTISTS */}
      <Section id="other-artists">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="text-sm font-semibold text-fuchsia-700">Beyond tattoos</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">For musicians & performers too</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">The same visit + event structure works for tour dates, pop-ups, showcases and conventions.</p>

            <div className="mt-6 grid gap-3">
              {["Tour dates in a single link", "Event pages with countdowns", "City-based discovery", "Notifications for followers"].map((t) => (
                <div key={t} className="flex items-start gap-3 text-sm text-foreground">
                  <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="leading-relaxed">{t}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/discover">See what’s live</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/about/mission">Learn more</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {["Lineups", "Highlights", "Waitlists", "Analytics"].map((t, i) => (
              <Card key={t} className="border-border">
                <CardHeader className="space-y-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-muted text-foreground">{(i === 0 ? CalendarDays : i === 1 ? Sparkles : i === 2 ? BellIcon : BadgeCheckIcon).icon}</div>
                  <CardTitle className="text-base">{t}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 text-sm leading-relaxed text-muted-foreground">
                  {i === 0
                    ? "Show upcoming stops and events with clean dates and cities."
                    : i === 1
                    ? "Highlight important visits and keep old ones archived."
                    : i === 2
                    ? "Let fans join a waitlist and get notified when you arrive."
                    : "Understand what cities are most interested in your next trip."}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section id="testimonials">
        <div className="text-center">
          <div className="text-sm font-semibold text-fuchsia-700">Loved worldwide</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Loved by artists worldwide</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">Real feedback from creators and studios using travel pages daily.</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="border-border">
              <CardContent className="p-5">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="h-4 w-4" />
                  <Star className="h-4 w-4" />
                  <Star className="h-4 w-4" />
                  <Star className="h-4 w-4" />
                  <Star className="h-4 w-4" />
                </div>
                <p className="mt-4 text-sm leading-relaxed text-foreground">“{t.text}”</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground">
                    <CircleUser className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10">
          <div className="rounded-3xl border border-fuchsia-200/60 bg-gradient-to-r from-fuchsia-600 to-indigo-600 p-6 text-white dark:border-fuchsia-900/50 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-semibold text-white/90">Join 10,000+ happy artists</div>
                <div className="mt-1 text-2xl font-semibold">Build your travel lineup today</div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="bg-white text-gray-900 hover:bg-white/90" asChild>
                  <Link href="/create-new-visit">Get started</Link>
                </Button>
                <Button size="lg" variant="secondary" className="bg-white/15 text-white hover:bg-white/20" asChild>
                  <Link href="/discover">Discover</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" className="bg-muted/30">
        <div className="text-center">
          <div className="text-sm font-semibold text-fuchsia-700">FAQ</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Frequently asked questions</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">Everything you need to know about catchme.live.</p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <Card className="border-border">
            <CardContent className="p-0">
              <Accordion type="single" collapsible className="w-full">
                {faq.map((item, idx) => (
                  <AccordionItem key={item.q} value={`faq-${idx}`}>
                    <AccordionTrigger className="px-5 py-4 text-left text-sm font-semibold text-foreground">{item.q}</AccordionTrigger>
                    <AccordionContent className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* FINAL CTA */}
      <Section id="final-cta">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="text-sm font-semibold text-fuchsia-700">Ready to take your art on the road?</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Ready to take your art on the road?</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">Create your first visit page, connect Instagram and start getting discovered.</p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="gap-2" asChild>
                <Link href="/create-new-visit">
                  Create a visit <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about/contact">Talk to us</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {stats.map((s) => (
              <Card key={s.label} className="border-border">
                <CardContent className="p-5">
                  <div className="text-xl font-semibold text-foreground">{s.value}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>
    </main>
  );
}

const BellIcon = { icon: <Zap className="h-5 w-5" /> };
const BadgeCheckIcon = { icon: <BadgeCheck className="h-5 w-5" /> };
