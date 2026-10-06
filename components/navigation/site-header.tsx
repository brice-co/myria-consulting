"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { DesktopNavigation } from "./desktop-navigation";
import { MobileNavigation } from "./mobile-navigation";
import { MyriaLogo } from "./myria-logo";

export default function SiteHeader({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <header className="relative z-50 border-b border-[#173039]/30 bg-[#f8f5ef]/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-6 px-6 lg:px-10">
        <MyriaLogo />

        <DesktopNavigation />

        <div className="hidden shrink-0 items-center gap-5 xl:flex">
          <Link
            href="/client-portal"
            className="text-[12px] text-muted-foreground transition-colors hover:text-foreground"
          >
            Client portal
          </Link>

          <Link
            href="/resources/playbook"
            className="inline-flex items-center gap-2 rounded-full bg-[#173039] px-5 py-3 text-[12px] font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            AI-Enabled E-Book

            <ArrowUpRight size={13} />
          </Link>
        </div>

        <MobileNavigation />
      </div>
      {children}
    </header>
  );
}