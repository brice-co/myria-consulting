import type { ReactNode } from "react";
import Link from "next/link";

/** Use the root shared public header; avoid the old duplicate legal-site header. */
export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f7f4ee] text-[#142b35]">
      {children}
      <footer className="border-t border-[#142b35]/15 px-6 py-10">
        <nav aria-label="Legal and corporate links" className="mx-auto flex max-w-7xl flex-wrap gap-6 text-sm">
          <Link href="/our-approach/management-model">Our approach</Link>
          <Link href="/resources/brochures">Resources</Link>
          <Link href="/privacy-policy">Privacy</Link>
          <Link href="/terms-of-service">Terms</Link>
          <Link href="/contact-myria">Contact</Link>
        </nav>
      </footer>
    </div>
  );
}
