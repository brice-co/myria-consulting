import Link from "next/link";
import { ConsultingHero } from "./ConsultingHero";
import { ExperienceSection } from "./ExperienceSection";
import { ResearchSection } from "@/components/consulting/insights/ResearchSection";
import {
  ChallengesSection,
  CapabilitiesSection,
  DifferenceSection,
  DiscoverySection,
  InsightsSection,
  ContactSection,
} from "./ConsultingSections";

export function ConsultingHomePage() {
  return (
    <div id="myria-consulting-home" className="myria-consulting">
      <main id="mc-main">
        <ConsultingHero />
        <ChallengesSection />
        <CapabilitiesSection />
        <DifferenceSection />
        <DiscoverySection />
        <ExperienceSection />
        <InsightsSection />
        <ResearchSection />
        <section aria-labelledby="mc-ecosystem-title" className="bg-[#f0ece3] px-6 py-20 text-[#173039]">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#667a78]">The Myria ecosystem</p>
              <h2 id="mc-ecosystem-title" className="font-serif text-4xl leading-tight md:text-5xl">Extend intelligence into every business interaction.</h2>
              <p className="mt-5 text-base leading-relaxed text-[#435a5c]">Discover MyriaChat, our voice-first AI experience connecting natural conversations with business knowledge, workflows, and human support.</p>
            </div>
            <a href="https://myriachat.com/" target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center rounded-full bg-[#173039] px-7 py-4 text-sm font-semibold !text-white transition hover:bg-[#29525a]" style={{ color: "#ffffff" }}>
              Explore MyriaChat <span className="ml-2" aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
        <ContactSection />
      </main>
      <footer className="mc-footer">
        <div className="mc-container mc-footer-main">
          <a href="#top" className="mc-footer-brand">MYRIA <span>CONSULTING</span></a>
          <nav aria-label="Footer links">
            <a href="#capabilities">Capabilities</a>
            <Link href="/our-approach/management-model">Management Model</Link>
            <Link href="/services">Consulting services</Link>
            <a href="#discovery">Discovery Lab</a>
            <a href="#experience">Experience</a>
            <Link href="/resources/brochures">Brochures</Link>
            <Link href="/insights">Research &amp; insights</Link>
            <Link href="/resources/playbook">Playbook</Link>
            <Link href="/client-portal">Client portal</Link>
            <a href="https://myriachat.com/" target="_blank" rel="noopener noreferrer">MyriaChat ↗</a>
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/terms-of-service">Terms</Link>
          </nav>
        </div>
        <div className="mc-container mc-footer-bottom">
          <span>© {new Date().getFullYear()} Myria Consulting</span>
          <span>Think deeper. Organize intelligently. Improve continuously.</span>
        </div>
      </footer>
    </div>
  );
}
