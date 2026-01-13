"use client";

import { Bell, BookOpen, CalendarDays, HandHeart, HelpCircle, Home, Instagram, Mail, MapPin, Menu, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";

const community = [
  {
    title: "Waitlists / Notifications",
    href: "/notifications",
    icon: Bell,
    description: "Notify me when artists or studios host new visits or events in my area.",
  },
  {
    title: "Bookings",
    href: "/bookings",
    icon: CalendarDays,
    description: "How does booking a visit or event work? Find out here.",
  },
  {
    title: "Guides",
    href: "/guides",
    icon: BookOpen,
    description: "Important information and tips for a successful visit or event.",
  },
  {
    title: "Support & Help Center",
    href: "/support",
    icon: HelpCircle,
    description: "Get assistance with any issues or questions you may have. Find answers in our FAQ section.",
  },
];

const forArtists = [
  {
    title: "Submit a new Visit",
    href: "/create-new-visit",
    icon: MapPin,
    description: "Host your own live visit or event at any location that has an Instagram account.",
  },
  {
    title: "Create a new Event",
    href: "/create-new-event",
    icon: CalendarDays,
    description: "Schedule and manage special events during your visits to engage with your audience.",
  },
  {
    title: "Connect Instagram",
    href: "/create-new-visit/connect-instagram",
    icon: Instagram,
    description: "We use Instagram as a base for artist and studio profiles. No need to re-enter your information or media.",
  },
];

const about = [
  {
    title: "Mission",
    href: "/about/mission",
    icon: HandHeart,
    description: "How we aim to connect artists and studios with their audience through live visits and events.",
  },
  {
    title: "Trust & Safety",
    href: "/about/trust",
    icon: ShieldCheck,
    description: "We use your Instagram account to show your information and media, but never post anything at all.",
  },
  {
    title: "Contact",
    href: "/about/contact",
    icon: Mail,
    description: "Get in touch with our team for any inquiries, support, or feedback.",
  },
];

const homeLinks = [
  {
    title: "Discover",
    href: "/discover",
    icon: Home,
    description: "Discover residencies, lineups and events around the world.",
  },
  {
    title: "Artists & Studios",
    href: "/artists",
    icon: Users,
    description: "Find and connect with artists and studios hosting live visits.",
  },
  {
    title: "Visits & Events",
    href: "/visits",
    icon: CalendarDays,
    description: "Find upcoming visits and events in your area or cities you plan to visit.",
  },
  {
    title: "Home",
    href: "/",
    icon: Home,
    description: "Go to our homepage to explore more features about our platform.",
  },
];

export default function TopAppBar() {
  return (
    <nav className="w-full z-10 sticky top-0 bg-white px-3 py-2 sm:px-4 flex items-center gap-3">
      <Link href="/" className="flex items-center gap-2 shrink-0">
        <Image src="/logo.svg" alt="Logo" width={28} height={28} />
        <h1 className="text-sm font-semibold">catchme.live</h1>
      </Link>
      <div className="hidden md:block md:absolute md:left-1/2 md:-translate-x-1/2">
        <NavigationMenu>
          <NavigationMenuList className="flex-nowrap">
            <NavigationMenuItem>
              <NavigationMenuTrigger>Home</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6" href="/discover">
                        <div className="mb-2 text-lg font-medium sm:mt-4">catchme.live/discover</div>
                        <p className="text-muted-foreground text-sm leading-tight">Discover residencies, lineups events all around the world and more.</p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/artists" title="Artists & Studios" icon={Users}>
                    Find and connect with artists and studios hosting live visits.
                  </ListItem>
                  <ListItem href="/visits" title="Visits & Events" icon={CalendarDays}>
                    Find upcoming visits and events in your area or in cities you plan to visit.
                  </ListItem>
                  <ListItem href="/" title="Home" icon={Home}>
                    Go to our homepage to explore more features about our platform.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Community</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {community.map((component) => (
                    <ListItem key={component.title} title={component.title} href={component.href} icon={component.icon}>
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            {/* <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/docs">Docs</Link>
            </NavigationMenuLink>
          </NavigationMenuItem> */}
            <NavigationMenuItem className="hidden md:block">
              <NavigationMenuTrigger>For Artists / Studios</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[340px] gap-2 p-1">
                  <ListItem href="/create-new-visit" title="Submit a new Visit" icon={MapPin}>
                    Host your own live visit or event at any location that has an Instagram account.
                  </ListItem>
                  <ListItem href="/create-new-event" title="Create a new Event" icon={CalendarDays}>
                    Schedule and manage special events during your visits to engage with your audience.
                  </ListItem>
                  <ListItem href="/create-new-visit/connect-instagram" title="Connect Instagram" icon={Instagram}>
                    We use Instagram as a base for artist and studio profiles. No need to re-enter your information or media.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem className="hidden md:block">
              <NavigationMenuTrigger>About</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[340px] gap-2 p-1">
                  <ListItem href="/about/mission" title="Mission" icon={HandHeart}>
                    How we aim to connect artists and studios with their audience through live visits and events.
                  </ListItem>
                  <ListItem href="/about/trust" title="Trust & Safety" icon={ShieldCheck}>
                    We use your Instagram account to show your information and media, but never post anything at all.
                  </ListItem>
                  <ListItem href="/about/contact" title="Contact" icon={Mail}>
                    Get in touch with our team for any inquiries, support, or feedback.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Mobile menu */}
      <div className="ml-auto md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <button type="button" aria-label="Open menu" className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50">
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[320px] sm:w-[360px] p-0">
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center gap-2 px-4 pt-4">
                <Image src="/logo.svg" alt="Logo" width={24} height={24} />
                <div className="text-sm font-semibold">catchme.live</div>
              </div>

              <Separator className="my-4" />

              {/* Scrollable content */}
              <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-6">
                <div className="grid gap-6">
                  <MobileSection title="Home">
                    {homeLinks.map((item) => (
                      <MobileNavItem key={item.href} {...item} />
                    ))}
                  </MobileSection>

                  <Separator />

                  <MobileSection title="Community">
                    {community.map((item) => (
                      <MobileNavItem key={item.href} {...item} />
                    ))}
                  </MobileSection>

                  <Separator />

                  <MobileSection title="For Artists / Studios">
                    {forArtists.map((item) => (
                      <MobileNavItem key={item.href} {...item} />
                    ))}
                  </MobileSection>

                  <Separator />

                  <MobileSection title="About">
                    {about.map((item) => (
                      <MobileNavItem key={item.href} {...item} />
                    ))}
                  </MobileSection>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

function ListItem({ title, children, href, icon: Icon, ...props }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href} className="block select-none rounded-md p-3 no-underline outline-hidden transition-colors hover:bg-muted focus:bg-muted">
          <div className="flex items-start gap-3">
            {Icon ? (
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-fuchsia-50 text-fuchsia-700">
                <Icon className="h-4 w-4" />
              </div>
            ) : null}
            <div className="min-w-0">
              <div className="text-sm font-medium leading-none">{title}</div>
              <p className="text-muted-foreground line-clamp-2 mt-1 text-sm leading-snug">{children}</p>
            </div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

function MobileSection({ title, children }) {
  return (
    <div className="grid gap-2">
      <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">{title}</div>
      <div className="grid gap-1">{children}</div>
    </div>
  );
}

function MobileNavItem({ title, description, href, icon: Icon }) {
  return (
    <Link href={href} className="flex items-start gap-3 rounded-md px-2 py-2 transition-colors hover:bg-muted">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-fuchsia-50 text-fuchsia-700">{Icon ? <Icon className="h-4 w-4" /> : null}</div>
      <div className="min-w-0">
        <div className="text-sm font-medium text-gray-900">{title}</div>
        <div className="text-xs text-gray-500 line-clamp-2">{description}</div>
      </div>
    </Link>
  );
}
