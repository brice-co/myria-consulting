import {
  AppWindow,
  Bot,
  BrainCircuit,
  Database,
  Radio,
  ServerCog,
} from "lucide-react";

import type { ArchitectureLayer } from "../types";

export const architectureLayers: ArchitectureLayer[] = [
  {
    id: "experience",
    index: "L6",
    name: "Experience & collaboration",
    tag: "Where people and agents meet.",
    icon: AppWindow,

    role:
      "The surface every person touches: command centers, copilot panels, approvals and shared views. Everything above it streams — responses arrive token by token, actions land optimistically and roll back cleanly when they fail.",

    holds: [
      "Copilot panels",
      "Command surfaces",
      "Realtime presence",
      "Attachments & multimodal input",
      "Optimistic actions",
    ],

    patterns: [
      {
        name: "Streaming-first UI",
        detail:
          "Render tokens as they arrive with visible reasoning status, so trust in the system comes from watching it work — not from waiting on a spinner.",
      },
      {
        name: "Optimistic actions with rollback",
        detail:
          "Approve, defer and edit immediately; keep the previous state so any failed server write reverses visibly instead of leaving silent drift.",
      },
      {
        name: "Contextual copilot placement",
        detail:
          "Put the copilot beside the work it reasons about. A panel scoped to a domain beats a separate chat window people have to switch to.",
      },
      {
        name: "Graceful degradation",
        detail:
          "If the intelligence layer is slow or down, the surface keeps working: show cached data, queue the request, and explain what happened.",
      },
    ],
  },

  {
    id: "agents",
    index: "L5",
    name: "Agents",
    tag: "Autonomy with accountability.",
    icon: Bot,

    role:
      "Specialized agents that observe a domain, recommend, and act — but only within the permission level someone granted them. Every agent has an owner, a scope, and a ladder it climbs from watch-only to autonomous.",

    holds: [
      "Specialized agents",
      "Permission levels",
      "Autonomy thresholds",
      "Tool access grants",
      "Agent-to-agent handoffs",
    ],

    patterns: [
      {
        name: "The escalation ladder",
        detail:
          "Each capability moves through observe → recommend → act with approval → autonomous. Never grant autonomy on a capability until it has earned it with evidence.",
      },
      {
        name: "Least-privilege tool grants",
        detail:
          "An agent gets the narrowest tools that satisfy its job: a supply agent that rebalances inventory has no path to payroll data, even by accident.",
      },
      {
        name: "Domain-scoped agents",
        detail:
          "One agent per domain, tuned to its data and vocabulary, beats one general agent with everything — prompts stay short, evals stay honest, failures stay contained.",
      },
      {
        name: "Escalation by design",
        detail:
          "Agents escalate when confidence drops below threshold or stakes cross a limit. The default answer to 'should I?' is a human, not a retry.",
      },
    ],
  },

  {
    id: "intelligence",
    index: "L4",
    name: "Intelligence",
    tag: "Models in service of decisions.",
    icon: BrainCircuit,

    role:
      "Frontier models for reasoning, trained models for scoring, retrieval for grounding. This layer turns data into judgement — and is engineered so no call happens without context, limits, or a trace.",

    holds: [
      "Frontier model calls",
      "ML scoring models",
      "Retrieval-augmented generation",
      "Structured outputs",
      "Streaming responses",
    ],

    patterns: [
      {
        name: "Right model per task",
        detail:
          "Route cheap classification to small models and deep synthesis to frontier ones. A routing layer makes this a config change, not a rewrite.",
      },
      {
        name: "Ground every claim",
        detail:
          "Retrieval supplies the facts the model cites. Grounded answers are auditable; ungrounded ones are just plausible text.",
      },
      {
        name: "Structured outputs over parsing",
        detail:
          "Ask for schema-validated JSON instead of scraping prose. Downstream workflows should depend on contracts, not on regex hope.",
      },
      {
        name: "Stream with a visible trail",
        detail:
          "Stream responses and reasoning status end to end. Latency people can see feels fast; latency they can't feels broken.",
      },
    ],
  },

  {
    id: "realtime",
    index: "L3",
    name: "Realtime collaboration",
    tag: "One shared state for people and agents.",
    icon: Radio,

    role:
      "People editing, agents acting, and decisions landing all at once — without anyone overwriting anyone. An authoritative event log keeps every client, human and machine reading the same story in the same order.",

    holds: [
      "Presence",
      "Live edits & comments",
      "Authoritative event log",
      "Conflict resolution",
      "Sync engines",
    ],

    patterns: [
      {
        name: "Event log as truth",
        detail:
          "State changes are events with sequence numbers; every client reconstructs state from the log. Replay becomes debugging, and recovery becomes rewinding.",
      },
      {
        name: "Field-level merge",
        detail:
          "Merge concurrent edits per field, not per document. Two people fixing different columns of the same forecast should never lose either fix.",
      },
      {
        name: "Presence without secrets",
        detail:
          "Show who is here and what they are doing, but presence channels carry pointers — never sensitive content that a leaked socket could expose.",
      },
      {
        name: "Replayable history",
        detail:
          "Because every change is an event, agents can rebuild context from any point in time — and audits can explain exactly what each one saw.",
      },
    ],
  },

  {
    id: "knowledge",
    index: "L2",
    name: "Knowledge & context",
    tag: "Ground truth the whole system reads from.",
    icon: Database,

    role:
      "The operational database, vector search, working memory and lineage — one canonical record per fact so agents and people argue from the same numbers. Provenance travels with every piece of context.",

    holds: [
      "Operational database",
      "Vector search",
      "Working memory",
      "Lineage & provenance",
      "Governed data fabric",
    ],

    patterns: [
      {
        name: "One canonical record",
        detail:
          "Every fact has a single home. Derivations store their inputs, so any number in the interface can be traced back to the row that produced it.",
      },
      {
        name: "Retrieval before fine-tuning",
        detail:
          "Start with retrieval over governed sources. Fine-tuning is a tool for style and format — not a substitute for knowing where facts live.",
      },
      {
        name: "Memory with expiry",
        detail:
          "Agent memory is scoped, versioned and expires. Stale context is worse than no context: it produces confident answers about a world that no longer exists.",
      },
      {
        name: "Provenance on every fact",
        detail:
          "Each grounded claim carries its source, timestamp and retrieval score. Users can check the receipt; evals can grade the citation.",
      },
    ],
  },

  {
    id: "runtime",
    index: "L1",
    name: "Production runtime",
    tag: "Where AI systems earn reliability.",
    icon: ServerCog,

    role:
      "The gateway, observability, evals, guardrails and cost controls underneath everything. Model calls never reach providers directly from the client — they pass through one door that authenticates, budgets and records.",

    holds: [
      "AI gateway",
      "Observability & traces",
      "Evaluation suite",
      "Guardrails & rate limits",
      "Cost controls",
    ],

    patterns: [
      {
        name: "Gateway every model call",
        detail:
          "One server-side gateway holds credentials, applies budgets, and swaps providers. Keys stay off clients; outages and model changes stay config-level.",
      },
      {
        name: "Evals as release gates",
        detail:
          "Prompts and agents ship like code: changes run against a golden set in CI, and a regression blocks the deploy instead of waiting for a user to find it.",
      },
      {
        name: "Budget-aware routing",
        detail:
          "Track spend per team, agent and capability. Route to cheaper models when quality allows, and cap runaway loops before they cap your bill.",
      },
      {
        name: "Fail loudly and safely",
        detail:
          "Distinguish rate limits, credit exhaustion, access denials and model errors — surface each clearly to the user, and log enough to diagnose without guessing.",
      },
    ],
  },
];