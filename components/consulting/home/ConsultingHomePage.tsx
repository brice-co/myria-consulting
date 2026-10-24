import Link from "next/link";
import { ConsultingHero } from "./ConsultingHero";
import { ExperienceSection } from "./ExperienceSection";
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
        <ContactSection />
      </main>
      <footer className="mc-footer">
        <div className="mc-container mc-footer-main">
          <a href="#top" className="mc-footer-brand">MYRIA <span>CONSULTING</span></a>
          <nav aria-label="Footer links">
            <a href="#capabilities">Capabilities</a>
            <Link href="/our-approach/management-model">Management Model</Link>
            <a href="#discovery">Discovery Lab</a>
            <a href="#experience">Experience</a>
            <Link href="/resources/brochures">Brochures</Link>
            <Link href="/resources/playbook">Playbook</Link>
            <Link href="/client-portal">Client portal</Link>
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
