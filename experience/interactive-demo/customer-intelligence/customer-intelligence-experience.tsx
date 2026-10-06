"use client";

import { useState } from "react";
import { customers, type Customer } from "./lib/customers";
import { ExperienceIntro } from "./experience-intro";
import { CustomerProfile } from "./customer-profile";
import { ConversationPanel } from "./conversation-panel";
import { CustomerInsights } from "./customer-insights";
import { CustomerJourney } from "./customer-journey";

export function CustomerIntelligenceExperience({ embedded = false }: { embedded?: boolean }) {
  const [active, setActive] = useState<Customer>(customers[0]!);

  return (
    <section className={embedded ? "" : "min-h-screen bg-cream py-24"}>
      <div className={embedded ? "" : "mx-auto max-w-7xl px-6"}>
        {!embedded && (
          <ExperienceIntro
            eyebrow="CUSTOMER INTELLIGENCE"
            title="Understand every customer in context."
            description="Connect customer history, conversations, signals, AI recommendations and business actions in one shared view."
          />
        )}

        <div className={`animate-rise overflow-hidden rounded-lg border border-border bg-card shadow-[0_24px_70px_rgba(18,42,49,0.09)] [animation-delay:120ms] ${embedded ? "" : "mt-12"}`}>
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <strong className="text-xs text-foreground">Customer Intelligence</strong>
              <div className="text-[9px] text-muted-foreground">
                Acme Distribution · Customer 360
              </div>
            </div>
            <span className="flex items-center gap-1.5 text-[9px] font-semibold tracking-wider text-primary">
              <span className="animate-pulse-soft inline-block h-1.5 w-1.5 rounded-full bg-primary" />
              AI ACTIVE
            </span>
          </div>

          <div className="grid lg:grid-cols-[220px_1fr_270px]">
            <CustomerProfile customers={customers} active={active} onSelect={setActive} />
            <ConversationPanel customer={active} />
            <CustomerInsights customer={active} />
          </div>

          <CustomerJourney customer={active} />
        </div>
      </div>
    </section>
  );
}
