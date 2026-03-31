import { Shield, Eye, GitBranch, Plug, Activity, Database, Lock, Cpu } from "lucide-react";

export interface FrameworkLayer {
  id: string;
  concept: string;
  backendSource: string;
  uiRepresentation: string;
  description: string;
  icon: typeof Shield;
  riskLevel: "low" | "medium" | "high";
  controls: string[];
  questions: string[];
  example: string;
}

export const frameworkLayers: FrameworkLayer[] = [
  {
    id: "ai-behavior",
    concept: "AI Behavior",
    backendSource: "Model Configuration & Prompt Rules",
    uiRepresentation: "Security Controls",
    description: "How does the AI decide what to say and do? AI behavior is governed by prompt engineering, guardrails, temperature settings, and fine-tuning parameters. Without proper controls, AI can hallucinate, leak data, or act outside its intended scope.",
    icon: Cpu,
    riskLevel: "high",
    controls: [
      "Define strict system prompts with behavioral boundaries",
      "Implement output filtering and content moderation",
      "Set temperature and token limits for deterministic responses",
      "Establish fallback behaviors for edge cases",
      "Log all AI decisions for audit trails"
    ],
    questions: [
      "What happens when the AI encounters an input outside its training scope?",
      "Who reviews and approves changes to AI behavioral rules?",
      "How do you test for prompt injection vulnerabilities?"
    ],
    example: "A customer service AI that starts giving medical advice because its behavioral boundaries weren't properly defined."
  },
  {
    id: "status-badges",
    concept: "Status Badges",
    backendSource: "System State & Health Monitors",
    uiRepresentation: "Visual Status Indicators",
    description: "Status badges show the real-time health of your AI systems. They translate complex backend states into simple visual signals — green, amber, red — so stakeholders can instantly assess system reliability without diving into logs.",
    icon: Activity,
    riskLevel: "low",
    controls: [
      "Define clear status thresholds (healthy, degraded, critical)",
      "Implement real-time monitoring with alerting",
      "Create escalation paths for each status level",
      "Ensure status reflects actual system state, not cached data"
    ],
    questions: [
      "How quickly does a status change reflect in the UI?",
      "Who gets notified when a status changes to critical?",
      "Are your status indicators based on real-time data or periodic checks?"
    ],
    example: "An AI system shows 'healthy' status while actually processing requests with 40% error rate because monitoring thresholds were misconfigured."
  },
  {
    id: "data-exposure",
    concept: "Data Exposure",
    backendSource: "Data Sources + Access Controls",
    uiRepresentation: "Data Visibility & Permissions",
    description: "Data exposure defines what information the AI can access, process, and reveal. This is the most critical security layer — controlling which data sources feed the AI and what data surfaces to users determines your entire risk profile.",
    icon: Eye,
    riskLevel: "high",
    controls: [
      "Implement role-based access control (RBAC) for all data sources",
      "Classify data by sensitivity level (public, internal, confidential, restricted)",
      "Apply data masking and tokenization for PII",
      "Audit all data access patterns and anomalies",
      "Define data retention and deletion policies"
    ],
    questions: [
      "Can your AI access data it shouldn't based on the user's role?",
      "How do you prevent the AI from memorizing sensitive training data?",
      "What happens if a data source is compromised?"
    ],
    example: "An AI assistant trained on all company documents accidentally reveals salary data to a junior employee asking about HR policies."
  },
  {
    id: "risk-indicators",
    concept: "Risk Indicators",
    backendSource: "Risk Scoring Engine",
    uiRepresentation: "Risk Heatmaps & Alerts",
    description: "Risk indicators quantify and visualize the potential impact of AI decisions. They translate probability scores and impact assessments into actionable intelligence that helps organizations prioritize their security efforts.",
    icon: Shield,
    riskLevel: "medium",
    controls: [
      "Define risk scoring methodology aligned to business impact",
      "Set automated thresholds for human review triggers",
      "Create risk dashboards for different stakeholder levels",
      "Implement trend analysis for emerging risk patterns"
    ],
    questions: [
      "How do you quantify the business impact of an AI making a wrong decision?",
      "Are your risk thresholds calibrated to your industry's compliance requirements?",
      "How often do you recalibrate your risk models?"
    ],
    example: "A loan approval AI flags 15% of applications as 'high risk' but nobody has defined what actions should follow that classification."
  },
  {
    id: "decision-boundaries",
    concept: "Decision Boundaries",
    backendSource: "Decisions Database & Rules Engine",
    uiRepresentation: "Approval States & Workflows",
    description: "Decision boundaries define what the AI can decide autonomously versus what requires human approval. This is governance in action — the line between automation efficiency and human oversight that protects your organization.",
    icon: GitBranch,
    riskLevel: "high",
    controls: [
      "Map all AI decision points and classify by impact level",
      "Define clear escalation criteria for human-in-the-loop",
      "Implement approval workflows with audit trails",
      "Set financial and operational thresholds for autonomous decisions",
      "Create override mechanisms for edge cases"
    ],
    questions: [
      "What's the maximum financial impact an AI decision can have without human approval?",
      "How do you handle situations where the AI is confident but wrong?",
      "Who has the authority to override an AI decision?"
    ],
    example: "An AI procurement system autonomously approves a $500K vendor contract because decision boundaries only covered amounts under $10K."
  },
  {
    id: "system-integrations",
    concept: "System Integrations",
    backendSource: "Integrations Database & API Gateway",
    uiRepresentation: "Health & Coverage Dashboard",
    description: "System integrations define how your AI connects to external systems, APIs, and data sources. Each integration point is a potential attack surface that needs monitoring, authentication, and failover planning.",
    icon: Plug,
    riskLevel: "medium",
    controls: [
      "Maintain an integration registry with security classifications",
      "Implement API authentication and rate limiting",
      "Monitor integration health and latency continuously",
      "Define fallback behavior when integrations fail",
      "Conduct regular security audits of all integration points"
    ],
    questions: [
      "What happens to AI functionality when a critical integration goes down?",
      "How do you manage API keys and credentials across integrations?",
      "Do you have visibility into all systems your AI can reach?"
    ],
    example: "An AI chatbot with access to 12 internal APIs — but nobody tracks which APIs it actually calls or what data flows between them."
  }
];
