"use client"; 

import { Section } from "@/components/marketing/layout/Section";
import { Motion } from "@/components/marketing/layout/Motion";
import Navbar from "@/components/layouts/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Technology() {
  return (
    <div className="min-h-screen bg-black text-white">
        <Navbar />
      {/* Hero */}
      <Section className="py-24">
        <Motion>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            The Technology Behind Scalable AI Platforms
          </h1>

          <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
            We don’t build AI features. We design <strong>AI platforms</strong>.
            That requires choosing technologies that support real-time
            interaction, multi-tenancy, security, and long-term evolution —
            not quick demos.
          </p>
        </Motion>
      </Section>

      {/* Philosophy */}
      <Section className="py-16">
        <Motion>
          <h2 className="text-3xl font-semibold tracking-tight">
            Our Technology Philosophy
          </h2>

          <div className="space-y-4 text-muted-foreground">
            <p>
              We are inspired by organizations that treat technology
              as an enabler of people — not a replacement for them.
            </p>
            <p>
              We draw from systems thinking, organizational design,
              and real-world operations — not just AI research.
            </p>
            <p>
              The best AI solutions feel invisible:
              they reduce friction,
              simplify complexity,
              and quietly improve outcomes.
            </p>
          </div>

        </Motion>
      </Section>

      {/* Architecture Diagram */}
<Section className="py-20">
  <Motion>
    <h2 className="text-3xl font-semibold tracking-tight">
      Platform Architecture Overview
    </h2>

    <p className="mt-4 max-w-3xl text-muted-foreground">
      This diagram illustrates how AI platform is structured —
      from voice interaction to secure, multi-tenant intelligence and tools.
      Each layer is intentionally separated to support scale, governance, and
      long-term evolution.
    </p>

    {/* Diagram container */}
    <div className="mt-10 rounded-3xl border border-white/10 bg-[#0a0a0a] p-6">
  <img
    src="/diagrams/myria-architecture.svg"
    alt="Myria Voice Platform Architecture Diagram"
    className="w-full h-auto rounded-xl"
    loading="lazy"
  />
</div>


    {/* Explanation */}
    <div className="mt-10 max-w-3xl space-y-4 text-muted-foreground">
      <p>
        <strong className="text-white">Voice Interface</strong> is the entry
        point. Users interact naturally through speech, lowering friction and
        increasing engagement.
      </p>

      <p>
        <strong className="text-white">Realtime AI Layer</strong> handles
        streaming audio, reasoning, and responses using secure ephemeral
        sessions. The browser never holds long-lived credentials.
      </p>

      <p>
        <strong className="text-white">AI Platform Core</strong> manages agents,
        intent, permissions, and orchestration. This is where business logic
        lives — not in prompts.
      </p>

      <p>
        <strong className="text-white">Tools & Integrations</strong> (calendar,
        email, CRM, internal APIs) are executed server-side, ensuring secrets,
        auditability, and control.
      </p>

      <p>
        <strong className="text-white">Data Layer</strong> enforces tenant
        isolation, role-based access, and observability across conversations,
        actions, and outcomes.
      </p>
    </div>
  </Motion>
</Section>


      {/* Voice & Realtime */}
      <Section className="py-16">
        <Motion>
          <h2 className="text-2xl font-semibold tracking-tight">
            Voice & Realtime Interaction
          </h2>

          <p className="mt-4 max-w-3xl text-muted-foreground">
            Voice-first AI requires ultra-low latency, streaming audio, and
            bidirectional communication. This layer is critical for trust and
            engagement.
          </p>

          <ul className="mt-6 max-w-3xl space-y-3 text-muted-foreground">
            <li>
              <strong className="text-white">OpenAI Realtime API</strong> — live
              speech understanding and generation.
            </li>
            <li>
              <strong className="text-white">WebRTC</strong> — real-time audio
              streaming between browser and AI.
            </li>
            <li>
              <strong className="text-white">Streaming transcripts</strong> —
              observability and downstream automation.
            </li>
          </ul>
        </Motion>
      </Section>

      {/* Intelligence */}
      <Section className="py-16">
        <Motion>
          <h2 className="text-2xl font-semibold tracking-tight">
            Intelligence & Agentic AI
          </h2>

          <p className="mt-4 max-w-3xl text-muted-foreground">
            We design AI as a system of agents — not a single prompt. Each agent
            has intent, context, permissions, and responsibilities.
          </p>

          <ul className="mt-6 max-w-3xl space-y-3 text-muted-foreground">
            <li>
              <strong className="text-white">Agent-based orchestration</strong>{" "}
              — sales, support, onboarding, operations.
            </li>
            <li>
              <strong className="text-white">Tool calling</strong> — calendars,
              email, CRM, internal APIs.
            </li>
            <li>
              <strong className="text-white">Intent modeling</strong> — turning
              conversations into structured actions.
            </li>
          </ul>
        </Motion>
      </Section>

      {/* Platform */}
      <Section className="py-16">
        <Motion>
          <h2 className="text-2xl font-semibold tracking-tight">
            Platform & Frontend
          </h2>

          <p className="mt-4 max-w-3xl text-muted-foreground">
            A modern AI platform must be fast, accessible, and maintainable.
            Frontend decisions directly impact adoption and usability.
          </p>

          <ul className="mt-6 max-w-3xl space-y-3 text-muted-foreground">
            <li>
              <strong className="text-white">Next.js 16</strong> — app router,
              server actions, streaming UI.
            </li>
            <li>
              <strong className="text-white">TypeScript</strong> — safety across
              AI, data, and integrations.
            </li>
            <li>
              <strong className="text-white">Tailwind CSS</strong> — consistent,
              scalable design systems.
            </li>
            <li>
              <strong className="text-white">Framer Motion</strong> — expressive,
              human-centered interactions.
            </li>
          </ul>
        </Motion>
      </Section>

      {/* Data & Multi-Tenancy */}
      <Section className="py-16">
        <Motion>
          <h2 className="text-2xl font-semibold tracking-tight">
            Data & Multi-Tenant Architecture
          </h2>

          <p className="mt-4 max-w-3xl text-muted-foreground">
            AI without data isolation is a liability. From day one, we design for
            workspaces, roles, and separation of concerns.
          </p>

          <ul className="mt-6 max-w-3xl space-y-3 text-muted-foreground">
            <li>
              <strong className="text-white">Neon Postgres</strong> — scalable,
              cloud-native relational data.
            </li>
            <li>
              <strong className="text-white">Drizzle ORM</strong> — typed schemas
              and predictable migrations.
            </li>
            <li>
              <strong className="text-white">Workspace isolation</strong> —
              tenant → agents → tools → data.
            </li>
          </ul>
        </Motion>
      </Section>

      {/* Security */}
      <Section className="py-16">
        <Motion>
          <h2 className="text-2xl font-semibold tracking-tight">
            Security & Compliance Mindset
          </h2>

          <p className="mt-4 max-w-3xl text-muted-foreground">
            Security is not a feature — it is an architectural posture. We build
            with a SOC2-aligned mindset from the start.
          </p>

          <ul className="mt-6 max-w-3xl space-y-3 text-muted-foreground">
            <li>
              <strong className="text-white">Ephemeral tokens</strong> — no API
              keys in the browser.
            </li>
            <li>
              <strong className="text-white">RBAC</strong> — role-based access
              across teams and agents.
            </li>
            <li>
              <strong className="text-white">Server-side tools</strong> —
              credentials never exposed to clients.
            </li>
            <li>
              <strong className="text-white">Auditability</strong> — transcripts,
              intent logs, and actions.
            </li>
          </ul>
        </Motion>
      </Section>

      {/* Build vs Boilerplate */}
      <Section className="py-20">
        <Motion>
          <h2 className="text-3xl font-semibold tracking-tight">
            Custom Build Agentic AI
          </h2>

          <p className="mt-4 max-w-3xl text-muted-foreground">
            This technology stack supports two paths — both designed for
            ownership and scalability.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link href="/work-with-us">
            <Button size="lg">
              Work With Myria Consulting
            </Button>
            </Link>
            
          </div>
        </Motion>
            
      </Section>
    </div>
  );
}
