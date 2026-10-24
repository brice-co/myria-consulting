import Link from "next/link";
import { PreviewHeader } from "./PreviewHeader";
import { PreviewHero } from "./PreviewHero";
import {
  ChallengesSection,
  CapabilitiesSection,
  DifferenceSection,
  DiscoverySection,
  InsightsSection,
  ContactSection,
} from "./PreviewSections";

export function ConsultingPreviewPage() {
  return (
    <div id="myria-redesign-preview" className="myria-preview">
      <a className="mc-skip-link" href="#mc-main">Skip to content</a>
      <PreviewHeader />
      <main id="mc-main">
        <PreviewHero />
        <ChallengesSection />
        <CapabilitiesSection />
        <DifferenceSection />
        <DiscoverySection />
        <InsightsSection />
        <ContactSection />
      </main>
      <footer className="mc-footer">
        <div className="mc-container mc-footer-main">
          <a href="#top" className="mc-footer-brand">MYRIA <span>CONSULTING</span></a>
          <nav aria-label="Footer links">
            <a href="#capabilities">Capabilities</a>
            <a href="#difference">Our approach</a>
            <a href="#discovery">Discovery Lab</a>
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
