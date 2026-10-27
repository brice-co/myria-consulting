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
        <section className="bg-[#f7f4ee] px-6 py-20 text-[#142b35]" aria-labelledby="consulting-services-title">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#785330]">Consulting services</p>
            <h2 id="consulting-services-title" className="mt-5 max-w-3xl font-serif text-4xl md:text-5xl">Expertise for the decisions and changes that matter.</h2>
            <p className="mt-6 max-w-3xl leading-8 text-[#536166]">Explore Myria's management consulting, business transformation, operational excellence, organizational change management and AI advisory services.</p>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[["Management consulting","management-consulting"],["Business transformation","business-transformation"],["Operational excellence","operations-excellence"],["Change management","change-management"],["AI strategy consulting","ai-strategy"],["Intelligent automation","intelligent-automation"]].map(([label,slug]) => (
                <Link key={slug} href={`/services/${slug}`} className="border-t border-[#a87532] pt-5 text-lg font-medium hover:underline">{label} <span aria-hidden="true">↗</span></Link>
              ))}
            </div>
          </div>
        </section>
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
