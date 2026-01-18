import Image from "next/image";
import Link from "next/link";
import { Instagram, Mail } from "lucide-react";

const platformLinks = [
  { title: "Discover", href: "/discover" },
  { title: "Artists & Studios", href: "/artists" },
  { title: "Visits & Events", href: "/visits" },
  { title: "Home", href: "/" },
];

const companyLinks = [
  { title: "Submit a new Visit", href: "/create-new-visit" },
  { title: "Create a new Event", href: "/create-new-event" },
  { title: "Connect Instagram", href: "/create-new-visit/connect-instagram" },
  { title: "Mission", href: "/about/mission" },
  { title: "Trust & Safety", href: "/about/trust" },
  { title: "Contact", href: "/about/contact" },
];

const legalLinks = [
  { title: "Terms of Use", href: "/about/terms" },
  { title: "Privacy Policy", href: "/about/privacy" },
  { title: "Cookie Policy", href: "/about/cookies" },
];

function FooterLink({ href, children }) {
  return (
    <Link href={href} className="text-sm text-slate-300/80 transition-colors hover:text-white">
      {children}
    </Link>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div className="space-y-4">
      <div className="text-sm font-semibold text-white/90">{title}</div>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <FooterLink href={l.href}>{l.title}</FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative  w-full border-t border-white/10 bg-gray-900">
      {/* subtle top glow like the mock */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/50 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_20%_0%,rgba(217,70,239,0.14),transparent_60%),radial-gradient(60%_40%_at_80%_0%,rgba(168,85,247,0.10),transparent_60%)]" />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2.8fr]">
          {/* Brand block */}
          <div className="space-y-6">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/10">
                <Image src="/logo.svg" alt="catchme.live" width={22} height={22} />
              </span>
              <span className="text-xl font-semibold text-white">catchme.live</span>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-slate-300/70">Helping artists share where they are, where they&apos;re going, and what&apos;s happening next — visits, events and conventions in one place.</p>

            <div className="flex items-center gap-3">
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-slate-200 ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="/about/contact" aria-label="Contact" className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-slate-200 ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:text-white">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Columns (match mock: 3 columns) */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <FooterColumn title="Platform" links={platformLinks} />
            <FooterColumn title="Company" links={companyLinks} />
            <FooterColumn title="Legal" links={legalLinks} />
          </div>
        </div>

        {/* Divider + bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-slate-300/60">© {year} catchme.live. All rights reserved.</div>

            <div className="flex flex-wrap items-center gap-x-7 gap-y-2 text-xs">
              <FooterLink href="/about/terms">Terms</FooterLink>
              <FooterLink href="/about/privacy">Privacy</FooterLink>
              <FooterLink href="/about/cookies">Cookies</FooterLink>
              <FooterLink href="/sitemap.xml">Sitemap</FooterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
