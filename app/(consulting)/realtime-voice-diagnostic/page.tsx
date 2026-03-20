"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PAGE_AGENTS } from "@/config/agentConfigs";
import ChatWidget from "@/components/ChatWidget/ChatWidget";
import { Zap, Layers, Shield, Cpu, BarChart, CheckCircle, BarChart3, FileText, Lock, Mic  } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 }
};

const modules = [
  {
    icon: Layers,
    title: "Voice System Architecture Layers",
    desc: "Browser vs WebRTC pipelines, streaming mechanics, latency perception vs infrastructure reality."
  },
  {
    icon: Cpu,
    title: "Realtime Infrastructure Complexity",
    desc: "Session orchestration, backpressure handling, event streaming, concurrency management."
  },
  {
    icon: Shield,
    title: "Governance & Compliance Implications",
    desc: "Logging strategies, PII redaction, role-based access control, auditability in voice systems."
  },
  {
    icon: BarChart,
    title: "Cost & Scalability Modeling",
    desc: "Token streaming economics, concurrency scaling, telephony integration cost structures."
  }
];

export default function RealtimeVoiceWorkshop() {
  return (
    <main className="min-h-screen bg-black text-white">
     
      {/* HERO */}
      <section className="pt-32 pb-24 px-6 max-w-6xl mx-auto text-center">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-semibold tracking-tight"
        >
          Realtime Voice Architecture Diagnostic
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 text-lg text-neutral-400 max-w-3xl mx-auto"
        >
          A strategic session designed to help technical and executive teams understand the
          architectural, operational, and governance implications of deploying
          low-latency Voice AI systems.
        </motion.p>
      </section>

      {/* WHY THIS WORKSHOP */}
      <section className="py-24 border-t border-neutral-800">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-8">
            Why This Architecture Diagnostic Matters
          </h2>

          <div className="space-y-6 text-neutral-400 leading-relaxed">
            <p>
              Realtime voice systems are not simple API integrations.
              They introduce architectural complexity across networking,
              infrastructure scaling, session management, and governance.
            </p>

            <p>
              Most organizations underestimate the implications of deploying
              WebRTC-based voice pipelines and multi-agent orchestration in production.
            </p>

            <p className="text-white font-medium">
              This session clarifies the complexity before you commit infrastructure or budget.
            </p>
          </div>
        </div>
      </section>

        {/* What We Assess */}
      <section className="py-20 px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
              Assessment Scope
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              What We Evaluate
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Cpu, title: "Architecture Readiness", desc: "Browser vs WebRTC scaling models, token streaming, concurrency limits, and state management assessment." },
              { icon: Shield, title: "Governance & Risk", desc: "PII implications, compliance gaps, security posture, and regulatory readiness evaluation." },
              { icon: BarChart3, title: "Cost Modeling", desc: "Token streaming cost projections, infrastructure spend analysis, and ROI framework." },
              { icon: FileText, title: "Readiness Deliverable", desc: "Written readiness summary with architecture tier recommendation and implementation roadmap." },
              { icon: Zap, title: "Capability Assessment", desc: "Internal technical capability gaps, skill requirements, and team readiness scoring." },
              { icon: Lock, title: "Infrastructure Audit", desc: "Current stack evaluation, integration complexity analysis, and migration path planning." },
            ].map((item, i) => (
              <div
                key={i}
                className="group p-6 rounded-lg bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 shadow-card hover:shadow-glow"
              >
                <div className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-sans font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IDEAL FOR */}
      <section className="py-24 border-t border-neutral-800">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-8">
            Ideal For
          </h2>

          <ul className="space-y-4 text-neutral-400">
            <li className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-primary" />
              CTOs and technical leaders evaluating WebRTC deployments
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-primary" />
              Product teams designing low-latency conversational systems
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-primary" />
              Compliance teams assessing voice data governance
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-primary" />
              Organizations exploring enterprise-scale Voice AI adoption
            </li>
          </ul>
        </div>
      </section>

      {/* OUTCOME */}
      <section className="py-24 border-t border-neutral-800 bg-neutral-950">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-8">
            Session Outcome
          </h2>

          <p className="text-neutral-400 leading-relaxed mb-6">
            By the end of this session, your team will understand the
            architectural implications, cost drivers, operational complexity,
            and governance considerations of deploying realtime Voice AI.
          </p>

          <p className="text-white font-medium">
            You will gain clarity before committing infrastructure investment.
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-6 border-t border-border/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-accent mb-4 block">
              Process
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              How It Works
            </h2>
          </div>
          <div className="space-y-8">
            {[
              { step: "01", title: "Apply", desc: "Submit a structured intake form. We review every application manually to ensure alignment." },
              { step: "02", title: "Review & Approval", desc: "Your application is reviewed within 48 hours. Approved applicants receive a calendar link." },
              { step: "03", title: "Diagnostic Session", desc: "A 2-3 hour structured session covering context, architecture, governance, cost, and capability." },
              { step: "04", title: "Readiness Deliverable", desc: "Within 5–7 business days, receive a comprehensive readiness summary with actionable recommendations." },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start">
                <span className="text-3xl font-serif font-bold text-gradient-primary flex-shrink-0 w-14">
                  {item.step}
                </span>
                <div className="border-l border-border/50 pl-6 pb-4">
                  <h3 className="font-sans font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-neutral-800 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">
          Evaluate Realtime Voice Before You Deploy It
        </h2>

        <p className="text-neutral-400 mb-10 max-w-2xl mx-auto">
          Protect your budget. Understand the architecture. Deploy responsibly.
        </p>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Structured as a paid architectural diagnostic engagement. Investment reflects 
            preparation, executive session, and written readiness deliverable.
          </p>

        <Link
          href="/voice-diagnostic/apply"
          className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-background rounded-full font-medium hover:opacity-90 transition"
        >
          Apply now <Zap className="w-4 h-4" />
        </Link>
      </section>
       <ChatWidget
          title="Myria Assistant"
          subtitle="Your AI companion for seamless communication and productivity."
          accentColor="260 80% 60%"
          icon={<Mic className="h-12 w-12" />}
          voice="alloy"
          systemPrompt={PAGE_AGENTS.workshop.systemPrompt}
          allowedTools={PAGE_AGENTS.workshop.allowedTools}
        />   
    </main>
  );
}