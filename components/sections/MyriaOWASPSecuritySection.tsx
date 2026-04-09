"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database, Bot, CheckCircle2, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const patterns = [
  {
    icon: Lock,
    title: "Scoped tool authorization",
    description:
      "Sensitive actions stay behind explicit permission boundaries, approval checks, and role-aware execution rules.",
    code: `type ToolName = "read_report" | "send_email" | "database_write" | "file_delete";

type ToolContext = {
  role: "viewer" | "operator" | "admin";
  userConfirmed?: boolean;
};

export function authorizeToolCall(tool: ToolName, context: ToolContext) {
  const sensitive = ["send_email", "database_write", "file_delete"];

  if (sensitive.includes(tool) && !context.userConfirmed) {
    return { allowed: false, status: "pending_confirmation" };
  }

  if (tool === "file_delete" && context.role !== "admin") {
    return { allowed: false, status: "forbidden" };
  }

  return { allowed: true, status: "approved" };
}`,
  },
  {
    icon: Shield,
    title: "Prompt-injection boundaries",
    description:
      "Untrusted content is isolated, labeled, sanitized, and handled separately from system instructions.",
    code: `import { z } from "zod";

const ExternalContentSchema = z.object({
  source: z.string().max(200),
  content: z.string().max(12000),
});

export function prepareUntrustedContent(input: unknown) {
  const parsed = ExternalContentSchema.parse(input);

  const normalized = parsed.content
    .replace(/ignore previous instructions/gi, "[FILTERED]")
    .replace(/system prompt/gi, "[FILTERED]");

  return \`UNTRUSTED_DATA_START
Source: \${parsed.source}
Content:
\${normalized}
UNTRUSTED_DATA_END\`;
}`,
  },
  {
    icon: Database,
    title: "Memory isolation",
    description:
      "Conversation memory is scoped per user and session, limited by size, and pruned with expiration rules.",
    code: `type MemoryItem = {
  userId: string;
  sessionId: string;
  content: string;
  createdAt: number;
};

const TTL_MS = 24 * 60 * 60 * 1000;

export class SecureAgentMemory {
  private items: MemoryItem[] = [];

  add(userId: string, sessionId: string, content: string) {
    this.items.push({
      userId,
      sessionId,
      content: content.slice(0, 5000),
      createdAt: Date.now(),
    });
  }

  getForSession(userId: string, sessionId: string) {
    const cutoff = Date.now() - TTL_MS;
    return this.items.filter(
      (item) =>
        item.userId === userId &&
        item.sessionId === sessionId &&
        item.createdAt >= cutoff
    );
  }
}`,
  },
  {
    icon: Eye,
    title: "Human approval for risky actions",
    description:
      "High-impact agent actions are paused for review before execution, instead of running autonomously.",
    code: `export function classifyActionRisk(toolName: string) {
  if (["database_write", "send_email", "file_delete"].includes(toolName)) {
    return "high";
  }
  return "low";
}

export async function executeAgentAction(toolName: string) {
  const risk = classifyActionRisk(toolName);

  if (risk === "high") {
    return {
      status: "awaiting_human_approval",
      toolName,
    };
  }

  return { status: "executed", toolName };
}`,
  },
  {
    icon: Bot,
    title: "Audit logging and observability",
    description:
      "Every sensitive action can be traced with event logs that support review, investigation, and operational visibility.",
    code: `type AuditEvent = {
  userId: string;
  action: string;
  toolName?: string;
  status: "approved" | "blocked" | "pending_confirmation";
  timestamp: string;
};

export async function logAuditEvent(event: AuditEvent) {
  console.log(JSON.stringify(event));
  // Send to Postgres, SIEM, or observability pipeline
}`,
  },
];

export default function MyriaOWASPSecuritySection() {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-24 text-white md:px-10 lg:px-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.14),transparent_30%)]" />
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-3xl text-center"
        >
          <Badge className="border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-emerald-300 hover:bg-emerald-500/10">
            AI Architecture Labs · Secure Agent Patterns
          </Badge>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight md:text-5xl">
            OWASP-inspired AI security patterns.
          </h2>
          <p className="mt-5 text-base leading-7 text-white/60 md:text-lg">
            Myria helps teams move from AI prototypes to production-grade systems with stronger control boundaries,
            safer tool execution, auditable decisions, and more resilient operating models.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {patterns.map((pattern, index) => {
            const Icon = pattern.icon;
            return (
              <motion.div
                key={pattern.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <Card className="group h-full rounded-3xl border-white/10 bg-white/[0.03] text-white shadow-2xl shadow-black/20 transition-all hover:border-emerald-500/20 hover:bg-white/[0.05]">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-3">
                        <Icon className="h-5 w-5 text-emerald-400" />
                      </div>
                      <Badge variant="outline" className="border-white/10 bg-white/[0.03] text-white/60">
                        Pattern {index + 1}
                      </Badge>
                    </div>
                    <CardTitle className="pt-4 text-xl font-semibold leading-7 text-white">
                      {pattern.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-6 text-white/55">
                      {pattern.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-neutral-950">
                      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                        <span className="text-xs uppercase tracking-[0.2em] text-white/35">Next.js / TypeScript</span>
                        <div className="flex gap-1.5">
                          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                        </div>
                      </div>
                      <pre className="overflow-x-auto p-4 text-xs leading-6 text-emerald-100/90">
                        <code>{pattern.code}</code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="mt-14 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 md:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <h3 className="text-2xl font-semibold md:text-3xl">
                Security should be part of the architecture, not added after the agent is live.
              </h3>
              <p className="mt-4 max-w-2xl text-white/60 leading-7">
                AI Architecture Labs helps organizations review agent design, execution flows, governance boundaries,
                and production controls before risk becomes operational debt.
              </p>
              <div className="mt-6 space-y-3 text-sm text-white/65">
                {[
                  "Review architecture decisions before scaling agents into production",
                  "Identify gaps in tool security, memory boundaries, approvals, and logging",
                  "Translate risk into a concrete roadmap leadership can act on",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Button className="rounded-2xl bg-emerald-500 px-6 py-6 text-base font-medium text-black hover:bg-emerald-400">
                Book AI Architecture Labs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="rounded-2xl border-white/10 bg-white/[0.03] px-6 py-6 text-base text-white hover:bg-white/[0.05] hover:text-white"
              >
                View sample deliverables
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
