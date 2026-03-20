"use client";

import { motion } from "framer-motion";
import PageShell from "@/components/layouts/PageShell";
import {
  Shield,
  Eye,
  Lock,
  AlertTriangle,
  CheckCircle2,
  Scale,
  Users,
  Brain,
  ArrowRight,
  Link,
  Import,
} from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

const principles = [
  {
    icon: Scale,
    title: "Fairness & Bias Mitigation",
    description:
      "We actively evaluate our AI systems for bias across demographic groups and interaction patterns. Our voice AI architectures are tested for equitable performance across accents, languages, and communication styles.",
    items: [
      "Regular bias audits of model outputs",
      "Diverse testing datasets for voice recognition",
      "Inclusive design practices across all voice interfaces",
      "Continuous monitoring for discriminatory patterns",
    ],
  },
  {
    icon: Eye,
    title: "Transparency & Explainability",
    description:
      "Users interacting with our AI systems have the right to understand they are engaging with AI, how decisions are being made, and what data informs those decisions.",
    items: [
      "Clear AI disclosure in all voice interactions",
      "Explainable decision pathways for agentic systems",
      "Documented model capabilities and limitations",
      "Open communication about system confidence levels",
    ],
  },
  {
    icon: Users,
    title: "Human-Centered Design",
    description:
      "AI should augment human capability, not replace human judgment in critical decisions. Our systems are designed with human oversight as a core architectural principle.",
    items: [
      "Human-in-the-loop for high-stakes decisions",
      "Seamless escalation to human agents",
      "User control over AI interaction preferences",
      "Respect for user autonomy and consent",
    ],
  },
  {
    icon: Lock,
    title: "Privacy & Data Protection",
    description:
      "Voice data is inherently sensitive. We architect systems with privacy-by-design principles, minimizing data collection and ensuring secure handling of all conversational data.",
    items: [
      "Minimal data retention policies",
      "End-to-end encryption for voice streams",
      "No training on user data without explicit consent",
      "GDPR and HIPAA-aligned data practices",
    ],
  },
  {
    icon: Brain,
    title: "Accountability & Oversight",
    description:
      "We maintain clear accountability structures for AI system behavior, with defined roles for monitoring, incident response, and continuous improvement.",
    items: [
      "Defined ownership for AI system decisions",
      "Incident response protocols for AI failures",
      "Regular third-party reviews and assessments",
      "Published accountability frameworks",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Safety & Risk Management",
    description:
      "Before deploying any AI system, we conduct thorough risk assessments. Our systems include safeguards against harmful outputs, misuse, and unintended consequences.",
    items: [
      "Pre-deployment risk assessments",
      "Content safety filters and guardrails",
      "Graceful degradation under adversarial inputs",
      "Continuous safety monitoring post-deployment",
    ],
  },
];

export default function ResponsibleAI() {
  return (
    
      <PageShell>
       
        <motion.header className="mb-16" {...fadeUp()}>
          <span className="inline-block text-xs font-mono tracking-widest uppercase text-primary mb-4">
            Principles
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 tracking-tight">
            Responsible AI & Governance
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Building voice-first AI systems carries a unique responsibility. Real-time conversational
            AI operates in deeply personal contexts — healthcare, finance, customer service — where
            trust is paramount.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mt-4">
            Myria Consulting is committed to developing and deploying AI systems that are fair,
            transparent, accountable, and safe. These principles guide every architecture we design and
            every system we help bring to production.
          </p>
        </motion.header>

        {/* Principles Grid */}
        <div className="grid gap-5 md:grid-cols-2 mb-16">
          {principles.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                {...fadeUp(0.1 + i * 0.06)}
                className="rounded-xl border border-border bg-card p-6 hover:border-primary/20 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">{p.title}</h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.description}</p>
                <ul className="space-y-2">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-secondary-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Link to Governance */}
        <motion.section
          {...fadeUp(0.6)}
          className="rounded-xl border border-primary/20 bg-card p-8"
        >
          <div className="flex items-start gap-4">
            <Shield className="w-6 h-6 text-primary shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                AI Governance Framework
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                These principles are operationalized through our comprehensive AI Governance Framework,
                which provides detailed guidance on embedding governance into system architecture,
                security compliance, operational oversight, and responsible deployment practices.
              </p>
              <a
                href="/governance"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                View Governance Framework <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.section>
        
      </PageShell>
     
   );
}
