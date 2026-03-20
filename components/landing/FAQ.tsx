import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  MessageCircleQuestion,
  Mic,
  Brain,
  Shield,
  DollarSign,
  Clock,
  BarChart,
} from "lucide-react";

export const faqCategories = [
  {
    title: "About Myria Consulting",
    icon: MessageCircleQuestion,
    questions: [
      {
        q: "What is Myria Consulting?",
        a: "Myria Consulting is a boutique AI transformation partner specializing in Voice-First intelligent systems. We design, architect, and implement production-grade voice agents and agentic AI systems for organizations that require reliability, governance, and measurable business impact."
      },
      {
        q: "What makes Myria different from other AI vendors?",
        a: "Most vendors focus on isolated AI features. We design complete voice systems integrated into enterprise architecture. Voice impacts infrastructure, governance, compliance, workflows, and cost modeling. We build systems that scale — not experiments."
      },
      {
        q: "What industries do you serve?",
        a: "We work across healthcare, financial services, customer experience, logistics, and enterprise internal operations. Each solution is tailored to regulatory requirements, latency expectations, and operational complexity."
      }
    ]
  },
  {
    title: "Voice AI Architecture",
    icon: Mic,
    questions: [
      {
        q: "What voice technologies do you use?",
        a: "We design voice pipelines using best-in-class providers including OpenAI Realtime API, ElevenLabs, Deepgram, and Azure Speech. Our architecture is provider-agnostic and selected based on latency, compliance, language support, and cost efficiency."
      },
      {
        q: "Do you build browser-based or realtime voice systems?",
        a: "Both. We implement browser-based voice for rapid MVPs, professional production pipelines for stable deployments, and ultra-low latency WebRTC architectures for advanced conversational systems."
      },
      {
        q: "What latency can we expect?",
        a: "Professional deployments typically achieve 200–400ms response times. Realtime WebRTC architectures can achieve sub-300ms conversational latency depending on infrastructure and region."
      },
      {
        q: "Can your voice agents support multiple languages?",
        a: "Yes. We implement multilingual detection and routing architectures. Language support depends on selected providers and compliance requirements."
      }
    ]
  },
  {
    title: "Agentic AI & Multi-Agent Systems",
    icon: Brain,
    questions: [
      {
        q: "What are agentic AI systems?",
        a: "Agentic systems are AI agents capable of reasoning, planning, using tools, and executing multi-step workflows. They operate with goal-driven logic rather than scripted responses."
      },
      {
        q: "What are multi-agent systems?",
        a: "Multi-agent systems coordinate specialized agents working together — for example triage, research, execution, and review agents. This modular design enables scalability and task complexity management."
      },
      {
        q: "Can your agents integrate with our systems?",
        a: "Yes. We integrate with CRMs, ERPs, ticketing systems, databases, telephony (SIP/PSTN), and custom APIs. Integrations are executed server-side with proper authentication and audit logging."
      }
    ]
  },
  {
    title: "Governance & Security",
    icon: Shield,
    questions: [
      {
        q: "How do you secure voice AI systems?",
        a: "We implement encrypted communication layers, tenant isolation, role-based access control (RBAC), secure token management, and structured audit logging."
      },
      {
        q: "Are you SOC2, HIPAA, or GDPR certified?",
        a: "We design systems with a SOC2-aligned architectural mindset. Where required, we implement HIPAA-ready or GDPR-aligned technical patterns. Formal certification typically occurs at the client organizational level."
      },
      {
        q: "How do you handle PII in voice conversations?",
        a: "We implement real-time PII detection, configurable redaction, masking workflows, controlled logging, and optional non-persistent processing modes."
      }
    ]
  },
  {
    title: "ROI & Strategy",
    icon: BarChart,
    questions: [
      {
        q: "How do you measure ROI?",
        a: "We define measurable outcomes before implementation, including automation rate, cost-per-interaction reduction, response time improvements, and customer satisfaction impact."
      },
      {
        q: "When should a company adopt Voice AI?",
        a: "Voice is most effective when it reduces friction, lowers operational costs, accelerates response cycles, or enhances accessibility. We determine readiness through structured assessment."
      }
    ]
  },
  {
    title: "Implementation & Engagement",
    icon: Clock,
    questions: [
      {
        q: "What does your implementation process look like?",
        a: "Our engagements follow: Voice Strategy Assessment, Architecture Design, Phased Build, Testing & Validation, Deployment, and Continuous Optimization."
      },
      {
        q: "How long does implementation take?",
        a: "Voice MVPs typically deploy in 2–4 weeks. Production systems take 8–12 weeks. Enterprise multi-agent architectures may require 3–6 months."
      },
      {
        q: "How is pricing structured?",
        a: "Pricing reflects system complexity, integration depth, compliance requirements, and voice architecture tier. We provide tailored proposals following structured discovery."
      },
      {
        q: "Do you offer proof-of-concept engagements?",
        a: "Yes. We offer structured validation engagements to assess technical feasibility and business ROI before full-scale deployment."
      }
    ]
  }
];


const FAQ = () => {
  return (
    <div className="min-h-screen">
     
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <MessageCircleQuestion className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">FAQ</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about Myria Consulting's Voice-First AI solutions and services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="pb-24 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <category.icon className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">{category.title}</h2>
              </div>

              <Accordion type="single" collapsible className="space-y-2">
                {category.questions.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`${category.title}-${index}`}
                    className="border border-border/50 rounded-lg px-4 bg-muted/20"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <span className="font-medium text-foreground">{item.q}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>
      </section>

            
    </div>
  );
};

export default FAQ;
