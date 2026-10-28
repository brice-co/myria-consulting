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

export function ConsultingHomePage({ locale = "en" }: { locale?: "en" | "fr" }) {
  const fr = locale === "fr";
  return (
    <div id="myria-consulting-home" className="myria-consulting">
      <main id="mc-main">
        <ConsultingHero locale={locale} />
        <ChallengesSection locale={locale} />
        <CapabilitiesSection locale={locale} />
        <section className="bg-[#f7f4ee] px-6 py-20 text-[#142b35]" aria-labelledby="consulting-services-title">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-[#785330]">{fr ? "Services-conseils" : "Consulting services"}</p>
            <h2 id="consulting-services-title" className="mt-5 max-w-3xl font-serif text-4xl md:text-5xl">{fr ? "Une expertise pour les décisions et les changements qui comptent." : "Expertise for the decisions and changes that matter."}</h2>
            <p className="mt-6 max-w-3xl leading-8 text-[#536166]">{fr ? "Découvrez notre expertise en conseil en gestion, transformation organisationnelle, excellence opérationnelle, gestion du changement et stratégie IA." : "Explore Myria’s management consulting, business transformation, operational excellence, organizational change management and AI advisory services."}</p>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {(fr ? [["Conseil en gestion","conseil-en-gestion"],["Transformation organisationnelle","transformation-organisationnelle"],["Excellence opérationnelle","excellence-operationnelle"],["Gestion du changement","gestion-du-changement"],["Stratégie IA","strategie-ia"],["Automatisation intelligente","automatisation-intelligente"]] : [["Management consulting","management-consulting"],["Business transformation","business-transformation"],["Operational excellence","operations-excellence"],["Change management","change-management"],["AI strategy consulting","ai-strategy"],["Intelligent automation","intelligent-automation"]]).map(([label,slug]) => (
                <Link key={slug} href={`${fr ? "/fr" : ""}/services/${slug}`} className="border-t border-[#a87532] pt-5 text-lg font-medium hover:underline">{label} <span aria-hidden="true">↗</span></Link>
              ))}
            </div>
          </div>
        </section>
        <DifferenceSection locale={locale} />
        <DiscoverySection locale={locale} />
        <ExperienceSection />
        <InsightsSection locale={locale} />
        <ResearchSection />
        <section aria-labelledby="mc-ecosystem-title" className="bg-[#f0ece3] px-6 py-20 text-[#173039]">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#667a78]">{fr ? "L’écosystème Myria" : "The Myria ecosystem"}</p>
              <h2 id="mc-ecosystem-title" className="font-serif text-4xl leading-tight md:text-5xl">{fr ? "Intégrer l’intelligence à chaque interaction d’affaires." : "Extend intelligence into every business interaction."}</h2>
              <p className="mt-5 text-base leading-relaxed text-[#435a5c]">{fr ? "Découvrez MyriaChat, une expérience d’IA vocale qui relie les conversations aux connaissances, aux processus et à l’accompagnement humain." : "Discover MyriaChat, our voice-first AI experience connecting natural conversations with business knowledge, workflows, and human support."}</p>
            </div>
            <a href="https://myriachat.com/" target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center rounded-full bg-[#173039] px-7 py-4 text-sm font-semibold !text-white transition hover:bg-[#29525a]" style={{ color: "#ffffff" }}>
              {fr ? "Découvrir MyriaChat" : "Explore MyriaChat"} <span className="ml-2" aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
        <ContactSection locale={locale} />
      </main>
      <footer className="mc-footer">
        <div className="mc-container mc-footer-main">
          <a href="#top" className="mc-footer-brand">MYRIA <span>{fr ? "CONSEIL" : "CONSULTING"}</span></a>
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
          <span>© {new Date().getFullYear()} {fr ? "Myria Conseil" : "Myria Consulting"}</span>
          <span>Think deeper. Organize intelligently. Improve continuously.</span>
        </div>
      </footer>
    </div>
  );
}
