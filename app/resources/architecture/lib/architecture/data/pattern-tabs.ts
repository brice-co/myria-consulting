import { Bot, Radio, ShieldCheck, Sigma, Workflow } from "lucide-react";

import type { PatternTab } from "../types";

export const architecturePatternTabs: PatternTab[] = [
  {
    id: "agents",
    label: "Agents",
    icon: Bot,
    intro:
      "Patterns for designing agents that earn autonomy instead of demanding it.",

    patterns: [
      {
        name: "Start read-only",
        detail:
          "Launch every agent with observation-only access. Promote it to recommend after a review cycle, and to act only after its recommendations have a measured hit rate you trust.",
      },
      {
        name: "Capability contracts",
        detail:
          "Define each capability as a contract: inputs, preconditions, side effects, and who signs off. Ambiguous powers are how agents end up doing things nobody designed them to do.",
      },
      {
        name: "Dry-run everything destructive",
        detail:
          "Any action that writes, sends, spends or deletes has a dry-run mode the agent exercises first — and the diff between planned and executed is logged for audit.",
      },
      {
        name: "One agent, one job",
        detail:
          "Agents with narrow scopes are easier to evaluate, easier to trust and safer to fail. A general 'business agent' is an audit and debugging black hole.",
      },
    ],
  },

  {
    id: "ml",
    label: "Machine learning",
    icon: Sigma,
    intro:
      "Patterns for ML and model work that survives contact with production.",

    patterns: [
      {
        name: "Classical first",
        detail:
          "Reach for simple statistical models before deep ones. A transparent score you can explain beats a marginally better one you can't — especially in approvals.",
      },
      {
        name: "Shadow deploys",
        detail:
          "Run new models alongside the live one, comparing outputs silently before switching. Model changes become reversible experiments, not gambles.",
      },
      {
        name: "Drift alarms on inputs",
        detail:
          "Monitor the distribution of inputs, not just outputs. A forecast model can look fine while the world it was trained on has quietly moved on.",
      },
      {
        name: "Label the ground truth early",
        detail:
          "Decide what 'correct' means and collect labels while the system is small. Retrofitting evaluation onto a live system is the most expensive way to learn you were wrong.",
      },
    ],
  },

  {
    id: "realtime",
    label: "Realtime collaboration",
    icon: Radio,
    intro:
      "Patterns for shared state that people, agents and workflows can all trust.",

    patterns: [
      {
        name: "One writer per record",
        detail:
          "Even with a merge engine, assign each record a primary writer. Distributed autonomy is easy to demo and nearly impossible to debug.",
      },
      {
        name: "Optimistic UI, pessimistic data",
        detail:
          "Render client-side immediately but only commit through the authoritative log. Optimism is for pixels; correctness is for state.",
      },
      {
        name: "Presence is a product feature",
        detail:
          "Show who is viewing, editing and deciding. Presence collapses the coordination meetings that distributed teams otherwise need.",
      },
      {
        name: "Design for reconnect",
        detail:
          "Every client drops offline eventually. Model reconnect-and-replay as a first-class flow, and test it — a silent divergence is worse than a visible outage.",
      },
    ],
  },

  {
    id: "workflows",
    label: "Workflows",
    icon: Workflow,
    intro:
      "Patterns for durable automation with humans in the right places.",

    patterns: [
      {
        name: "Durable execution",
        detail:
          "Workflow state lives outside the process, so a crash or deploy resumes the run where it stopped. In-memory pipelines are demo software.",
      },
      {
        name: "Gates, not suggestions",
        detail:
          "Where human approval is required, the workflow pauses — it doesn't proceed optimistically and ask forgiveness. The pause is visible with an owner and a deadline.",
      },
      {
        name: "Idempotent steps",
        detail:
          "Every step can run twice with the same result. Retries are normal in production; steps that aren't idempotent turn a transient failure into a duplicate wire transfer.",
      },
      {
        name: "Compensating actions",
        detail:
          "When a late step fails after earlier ones succeeded, know how to undo them. Design the rollback as deliberately as the rollout.",
      },
    ],
  },

  {
    id: "production",
    label: "Production AI",
    icon: ShieldCheck,
    intro:
      "Patterns that turn AI demos into systems a company can depend on.",

    patterns: [
      {
        name: "Credentials never reach the client",
        detail:
          "All model calls pass through a server-side gateway. Anything shipped to the browser is public, whatever the obfuscation says.",
      },
      {
        name: "Trace every hop",
        detail:
          "Log request, retrieval, model, cost and outcome per call. When quality regresses, the trace answers whether it was a prompt, a model, or the data underneath.",
      },
      {
        name: "Degradation ladders",
        detail:
          "For each capability, define what happens at 10× traffic and at provider outage: queue, fall back to a smaller model, or degrade gracefully — never a blank screen.",
      },
      {
        name: "Review the failures weekly",
        detail:
          "Sample real failures — refusals, wrong escalations, hallucinated citations — and turn the pattern into an eval case. The eval suite is the system's memory of its mistakes.",
      },
    ],
  },
];