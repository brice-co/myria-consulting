"use client";

import { useState } from "react";
import { CustomerIntelligenceExperience } from "@/experience/interactive-demo/customer-intelligence/customer-intelligence-experience";
import { LeadCaptureExperience } from "@/experience/interactive-demo/lead-capture/lead-capture-experience";
import { CollaborativeIntelligenceExperience } from "@/experience/interactive-demo/collaborative-intelligence/collaborative-intelligence-experience";
import { WorkflowUseCaseExperience } from "@/experience/interactive-demo/workflow-use-cases/workflow-use-case-experience";
import { workflowUseCases } from "@/lib/workflow-use-cases";
import { DashboardHeader, type UseCaseId } from "./dashboard-header";
import { UseCaseIntro } from "./use-case-intro";

const content = {
  customer: {
    eyebrow: "Customer intelligence",
    title: "Understand every customer in context.",
    description: "Connect customer history, conversations, signals, AI recommendations and business actions in one shared view.",
    outcomes: ["Connected customer context", "Earlier risk detection", "Coordinated next actions"],
  },
  architecture: {
    eyebrow: "Enterprise AI architecture",
    title: "Build an AI-enabled system around how the organization works.",
    description: "Bring agents, organizational knowledge, collaborative work, governed tools, durable workflows and enterprise integrations into one extensible operating architecture.",
    outcomes: ["Connected AI capabilities", "Governed enterprise execution", "Reusable platform foundation"],
  },
  operations: {
    eyebrow: "Operational intelligence",
    title: "Connect operational signals to coordinated execution.",
    description: "Help teams detect exceptions, understand business impact, recommend responses and coordinate approved actions across operational workflows.",
    outcomes: ["Faster exception response", "Better operational decisions", "Durable follow-through"],
  },
  leads: {
    eyebrow: "Collaborative lead capture",
    title: "Turn every buying signal into coordinated momentum.",
    description: "Bring leads, people and specialized agents into one shared room to enrich context, align on the next move and advance the pipeline together.",
    outcomes: ["Higher-quality qualification", "Faster team response", "Visible agent collaboration"],
  },
  collaboration: {
    eyebrow: "Collaborative intelligence",
    title: "Bring people and AI into the same work.",
    description: "Create a shared environment where teams, specialized AI, conversations, artifacts, decisions and actions remain connected from the first question through execution.",
    outcomes: ["Shared context across teams", "Faster alignment and decisions", "AI that participates in the work"],
  },
  advisory: {
    eyebrow: "AI advisory",
    title: "Extend management thinking with specialized AI advisors.",
    description: "Combine proven management consulting approaches with specialized Strategy, Operations, AI & Data, and People & Change advisors working around the same business problem.",
    outcomes: ["Broader perspective on complex problems", "Structured discovery and analysis", "Decisions translated into next steps"],
  },
  support: workflowUseCases.support,
  booking: workflowUseCases.booking,
  proposals: workflowUseCases.proposals,
};

export function IntelligenceDashboard() {
  const [active, setActive] = useState<UseCaseId>("customer");
  const current = content[active];
  return (
    <div className="min-h-screen bg-cream">
      <DashboardHeader active={active} onChange={setActive} />
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-5 lg:px-6">
          <UseCaseIntro eyebrow={current.eyebrow} title={current.title} description={current.description} outcomes={current.outcomes} />
          <div className="mt-9">
            {active === "customer" && <CustomerIntelligenceExperience embedded />}
            {active === "leads" && <LeadCaptureExperience />}
            {active === "collaboration" && <CollaborativeIntelligenceExperience />}        
            {(active === "support" || active === "booking" || active === "proposals") && <WorkflowUseCaseExperience key={active} useCase={active} />}
          </div>
        </div>
      </section>
    </div>
  );
}
