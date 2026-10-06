"use client";

import { fractionalCTOContent } from "./data/fractional-cto";
import { AudienceGrid } from "./components/audience-grid";
import { DeliverablesPanel } from "./components/deliverables-panel";
import { EngagementOverview } from "./components/engagement-overview";
import { EngagementRhythm } from "./components/engagement-rhythm";
import { FractionalCTOCTA } from "./components/fractional-cto-cta";
import { FractionalCTOHero } from "./components/fractional-cto-hero";

export function FractionalCTOPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f8f5ed] text-[#173039]">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-8">
        <FractionalCTOHero content={fractionalCTOContent} />

        <EngagementOverview content={fractionalCTOContent} />

        <EngagementRhythm steps={fractionalCTOContent.rhythm} />

        <section className="mt-32 grid items-start gap-12 lg:grid-cols-2">
          <DeliverablesPanel
            deliverables={fractionalCTOContent.deliverables}
          />
          <AudienceGrid audiences={fractionalCTOContent.audiences} />
        </section>

        <FractionalCTOCTA />

        <footer className="mt-20 text-center text-xs text-[#7a878c]">
          Myria Consulting — Business first. AI-enabled execution.
        </footer>
      </div>
    </main>
  );
}
