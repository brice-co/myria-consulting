"use client";

import Link from "next/link";
import { Linkedin, Mail, ArrowUpRight } from "lucide-react";

const navigation = {
  company: [
    { label: "Who We Are", href: "/who-we-are" },
    { label: "What We Build", href: "/what-we-build" },
    { label: "How We Build", href: "/how-we-build" },
    
  ],
  solutions: [
    { label: "AI Systems", href: "/what-we-build" },
    { label: "Architecture", href: "/what-we-build/architecture" },
  ],
  advisory: [
    { label: "AI Architecture Diagnostic", href: "/ai-architecture-diagnostic" },
    { label: "Governance Framework", href: "/governance" },
    { label: "AI Security", href: "/ai-security" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-[-80px] h-[260px] w-[260px] rounded-full bg-emerald-500/10 blur-[100px]" />
        <div className="absolute right-[-120px] bottom-[-80px] h-[260px] w-[260px] rounded-full bg-violet-500/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        {/* Top section */}
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          {/* Brand block */}
          <div className="max-w-md">
            
              
              <div>
                
                <div className="text-md text-white/45">
                  AI Systems & Governance
                </div>
              </div>
            

            <p className="mt-6 text-sm leading-7 text-white/65">
              Myria Consulting designs and implements production-grade AI systems
              with a focus on governance, architecture, and scalability. <br />

              We help organizations move from experimental AI to structured,
              reliable, and controllable systems.
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-300/80">
                Architecture Focus
              </p>
              <p className="mt-2 text-sm leading-6 text-white/70">
                AI Systems • Governance • Architecture • Orchestration
              </p>
            </div>
          </div>

          {/* Nav columns */}
          <FooterColumn title="Company" links={navigation.company} />
          <FooterColumn title="Solutions" links={navigation.solutions} />
          <FooterColumn title="Advisory" links={navigation.advisory} />
        </div>

        {/* Middle divider */}
        <div className="my-10 h-px w-full bg-white/10" />

        {/* Bottom section */}
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-sm font-medium text-white">
              Designing the infrastructure behind modern AI systems.
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">
              Strategic AI transformation for organizations building governed,
              scalable, and production-ready AI systems.
            </p>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <a
              href="mailto:info@myriaconsulting.com"
              className="inline-flex items-center gap-2 text-sm text-white/75 transition hover:text-white"
            >
              <Mail className="h-4 w-4" />
              info@myriaconsulting.com
            </a>

            <a
              href="https://www.linkedin.com/company/myria-consulting/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/75 transition hover:text-white"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Center Legal Links */}
  <div className="flex flex-wrap items-center gap-6 text-white/50">
    <Link href="/privacy-policy" className="hover:text-white transition">
      Privacy Policy
    </Link>

    <Link href="/terms-of-service" className="hover:text-white transition">
      Terms of Service
    </Link>

    <Link href="/cookie-policy" className="hover:text-white transition">
      Cookie Policy
    </Link>

    <Link href="/responsible-ai" className="hover:text-white transition">
      Responsible AI
    </Link>
  </div>
        
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/55">
        {title}
      </h3>

      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="no-underline hover:opacity-80 transition text-sm text-white/75"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}