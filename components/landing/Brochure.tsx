"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { VoiceWaveform } from "@/components/sections/VoiceWaveform";
import {
  Mic,
  Brain,
  Plug,
  Users,
  Cpu,
  Workflow,
  Shield,
  Zap,
  Phone,
  Globe,
  ArrowRight,
  CheckCircle,
  Printer,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import BrochurePDF from "@/components/brochures/VoiceFirstBrochure";

// ✅ Dynamically import PDFDownloadLink (prevents SSR crash)
const PDFDownloadLink = dynamic(
  async () => {
    const mod = await import("@react-pdf/renderer");
    return mod.PDFDownloadLink;
  },
  { ssr: false }
);

const capabilities = [
  { icon: Mic, title: "Voice Agents", desc: "Natural language voice interfaces powered by OpenAI Realtime & ElevenLabs with sub-300ms latency." },
  { icon: Brain, title: "Agentic AI", desc: "Autonomous systems using ReAct patterns that reason, plan, and execute multi-step tasks." },
  { icon: Plug, title: "MCP Integrations", desc: "Seamless Model Context Protocol connections for tool use and extended capabilities." },
  { icon: Users, title: "Multi-Agent Systems", desc: "Orchestrated agent networks with specialized roles that collaborate on complex problems." },
  { icon: Cpu, title: "Custom LLM Pipelines", desc: "Tailored language model workflows optimized for your domain and use case." },
  { icon: Workflow, title: "Workflow Automation", desc: "Intelligent automation that understands intent and executes multi-step business processes." },
];

const techStack = [
  { category: "Voice & Speech", items: ["OpenAI Realtime API", "ElevenLabs Voice Synthesis", "WebRTC Streaming", "Whisper ASR"] },
  { category: "AI & Reasoning", items: ["GPT-4o / GPT-5", "Claude 3.5 Sonnet", "Gemini 2.5 Pro", "Custom Fine-tuned Models"] },
  { category: "Infrastructure", items: ["Edge Functions", "WebSocket Pipelines", "Real-time Database", "Secure Cloud Hosting"] },
  { category: "Integrations", items: ["CRM Systems", "Telephony (SIP/PSTN)", "Slack / Teams", "Custom REST APIs"] },
];

const useCases = [
  { icon: Phone, title: "Customer Support", desc: "24/7 voice agents that resolve 80% of inquiries without human escalation, reducing costs by 60%." },
  { icon: Globe, title: "Multilingual Concierge", desc: "Real-time translation and cultural adaptation across 30+ languages for global enterprises." },
  { icon: Shield, title: "Compliance & Healthcare", desc: "HIPAA-compliant voice interfaces with PII redaction and audit logging for regulated industries." },
];

const Brochure = () => {
  return (
    <div className="min-h-screen">
      {/* Fixed buttons */}
      <div className="no-print fixed top-6 right-6 z-50">
        <PDFDownloadLink
          document={<BrochurePDF />}
          fileName="Myria-Consulting-Voice-AI-Brochure.pdf"
        >
          {(params: any) => {
            const loading = params?.loading;
            return (
              <Button disabled={loading} className="gap-2 glow-effect">
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Printer className="w-4 h-4" />
                )}
                {loading ? "Generating…" : "Download as PDF"}
              </Button>
            );
          }}
        </PDFDownloadLink>
      </div>

      <div className="no-print fixed top-6 left-6 z-50">
        <Button variant="ghost" asChild>
          <a href="/">← Back to Site</a>
        </Button>
      </div>

      {/* -------- REST OF YOUR PAGE (UNCHANGED) -------- */}


      {/* Page 1: Cover */}
      <section data-pdf-section className="min-h-screen flex items-center justify-center px-8 py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[200px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[200px]" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center relative z-10 max-w-3xl"
        >
          <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-8">
            <Mic className="w-10 h-10 text-primary" />
          </div>
          <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-4">Myria Consulting</p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Voice-First <span className="text-gradient">AI Solutions</span>
          </h1>
          <VoiceWaveform isActive barCount={50} className="mb-6" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Custom-built voice agents, multi-agent systems, and agentic AI platforms
            that transform how enterprises interact with their customers and data.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> Enterprise-Grade</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> HIPAA Compliant</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary" /> Sub-300ms Latency</span>
          </div>
        </motion.div>
      </section>

      {/* Page 2: Capabilities */}
      <section data-pdf-section className="px-8 py-20">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-12">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">What We Build</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Core <span className="text-gradient">Capabilities</span></h2>
            <p className="text-muted-foreground max-w-xl">End-to-end AI solutions designed for production environments, not prototypes.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => (
              <motion.div key={cap.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass-card p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center mb-4">
                  <cap.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{cap.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{cap.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Page 3: Technical Architecture */}
      <section data-pdf-section className="px-8 py-20">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-12">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Under the Hood</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical <span className="text-gradient">Architecture</span></h2>
            <p className="text-muted-foreground max-w-xl">Battle-tested technology stack built for reliability, security, and scale.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-8 mb-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {["User (Voice/Text)", "Voice Engine", "AI Orchestrator", "Tool Layer", "Response"].map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-xl bg-primary/15 flex items-center justify-center mx-auto mb-2 border border-primary/20">
                      <span className="text-primary font-bold">{i + 1}</span>
                    </div>
                    <p className="text-xs font-medium text-muted-foreground whitespace-nowrap">{step}</p>
                  </div>
                  {i < 4 && <ArrowRight className="w-5 h-5 text-primary/40 hidden md:block" />}
                </div>
              ))}
            </div>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {techStack.map((group, i) => (
              <motion.div key={group.category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass-card p-6">
                <h3 className="font-semibold text-primary mb-3">{group.category}</h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Page 4: Use Cases & CTA */}
      <section data-pdf-section className="px-8 py-20">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-12">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Real-World Impact</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Use <span className="text-gradient">Cases</span></h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {useCases.map((uc, i) => (
              <motion.div key={uc.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass-card p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center mb-4">
                  <uc.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{uc.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{uc.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/15 rounded-full blur-[80px]" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/15 rounded-full blur-[80px]" />
            </div>
            <div className="relative z-10">
              <Zap className="w-10 h-10 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-3">Let's Build Together</h2>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                Whether you need a single voice agent or a full multi-agent platform,
                we deliver production-ready AI solutions tailored to your business.
              </p>
              <p className="text-primary font-semibold text-lg">hello@myriaconsulting.com</p>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="px-8 py-8 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">© 2025 Myria Consulting. Confidential.</p>
      </footer>
    </div>
  );
};

export default Brochure;
