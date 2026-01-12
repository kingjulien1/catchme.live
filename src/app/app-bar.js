"use client";

import * as React from "react";
import Link from "next/link";
import { Bell, BookOpen, CalendarDays, Compass, HandHeart, HelpCircle, Home, Info, Instagram, Mail, MapPin, Pencil, ShieldCheck, Users } from "lucide-react";

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
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

export default function TopAppBar() {
  return (
    <nav className="w-full z-10  bg-white px-4 py-2 relative flex flex-row items-center">
      <Link href="/" className="flex flex-row items-center gap-2">
        <Image src="/logo.svg" alt="Logo" width={30} height={30} />
        <h1 className="text-sm ml-2 font-semibold">catchme.live</h1>
      </Link>
      <div className="ml-auto md:ml-0 md:absolute md:left-1/2 md:-translate-x-1/2">
        <NavigationMenu>
          <NavigationMenuList className="flex-wrap">
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
