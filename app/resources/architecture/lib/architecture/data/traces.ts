import { Radio, ServerCog, ShieldCheck, Workflow } from "lucide-react";

import type { ArchitectureTrace } from "../types";

export const architectureTraces: ArchitectureTrace[] = [
  {
    id: "approval",
    name: "Agent escalates a decision",
    icon: ShieldCheck,

    summary:
      "A pricing exception crosses a policy limit and lands on a human desk — the core loop of accountable autonomy.",

    steps: [
      {
        layer: "knowledge",
        label: "Renewal risk signal detected",
        detail:
          "Churn and usage data converge on one account; the fact exists in one canonical record with lineage.",
      },
      {
        layer: "agents",
        label: "Revenue Agent drafts a plan",
        detail:
          "Working inside its domain scope, the agent proposes terms it is allowed to recommend — nothing more.",
      },
      {
        layer: "runtime",
        label: "Guardrails check the request",
        detail:
          "The gateway validates policy limits, spend caps and schema before the draft moves anywhere.",
      },
      {
        layer: "intelligence",
        label: "Impact scored and grounded",
        detail:
          "A retrieval-backed model call estimates revenue effect, with citations back to the account record.",
      },
      {
        layer: "experience",
        label: "Decision lands on the reviewer",
        detail:
          "The exception appears in the approver's queue with context, evidence and one-click approve or reject.",
      },
      {
        layer: "knowledge",
        label: "Outcome written to the log",
        detail:
          "The decision, its rationale and the full trace are stored — the next ask of any agent inherits this context.",
      },
    ],
  },

  {
    id: "realtime",
    name: "Team edits one forecast",
    icon: Radio,

    summary:
      "Three people and one agent touch the same document at once — collaboration without a merge nightmare.",

    steps: [
      {
        layer: "experience",
        label: "Analyst edits the forecast",
        detail:
          "An optimistic update renders instantly; the previous value is kept so a failed write rolls back.",
      },
      {
        layer: "realtime",
        label: "Change broadcasts as an event",
        detail:
          "The edit enters the authoritative event log with a sequence number, not a fragile socket payload.",
      },
      {
        layer: "realtime",
        label: "Concurrent edits merge per field",
        detail:
          "Two simultaneous changes to different fields both survive; same-field conflicts resolve by rule, not by race.",
      },
      {
        layer: "agents",
        label: "Agent receives new context",
        detail:
          "Subscribed agents see the merged state — their recommendations are never based on a stale copy.",
      },
      {
        layer: "intelligence",
        label: "Model call re-scores the forecast",
        detail:
          "The updated numbers flow through scoring with budgets and rate limits applied by the gateway.",
      },
      {
        layer: "experience",
        label: "Every view converges",
        detail:
          "Presence shows who changed what; all clients settle on identical state from the same ordered log.",
      },
    ],
  },

  {
    id: "runtime",
    name: "Copilot answers under load",
    icon: ServerCog,

    summary:
      "A production model call, seen end to end — every hop authenticates, budgets, grounds and records.",

    steps: [
      {
        layer: "experience",
        label: "Copilot request submitted",
        detail:
          "The prompt, attachments and domain context leave the surface as a single well-formed request.",
      },
      {
        layer: "runtime",
        label: "Gateway authenticates & budgets",
        detail:
          "Credentials never reach the client; the gateway enforces per-team spend and rate limits before routing.",
      },
      {
        layer: "knowledge",
        label: "Retrieval grounds the context",
        detail:
          "Governed sources are queried with provenance attached — the model answers from receipts, not memory.",
      },
      {
        layer: "intelligence",
        label: "Model streams the response",
        detail:
          "Chosen by task routing, the model streams tokens back through the gateway as they generate.",
      },
      {
        layer: "runtime",
        label: "Guardrails inspect the output",
        detail:
          "Policy checks and schema validation run before anything reaches the user's screen.",
      },
      {
        layer: "runtime",
        label: "Trace and eval recorded",
        detail:
          "Latency, tokens, cost and quality signals feed the eval suite that gates the next release.",
      },
    ],
  },

  {
    id: "workflow",
    name: "Workflow runs on schedule",
    icon: Workflow,

    summary:
      "A durable automation walks its pipeline — pausing for humans, surviving restarts, and logging each hop.",

    steps: [
      {
        layer: "experience",
        label: "Workflow trigger fires",
        detail:
          "A schedule or signal starts the run; the operator sees it appear in the live run list immediately.",
      },
      {
        layer: "intelligence",
        label: "Step calls a model",
        detail:
          "The agent's summarization or scoring hop runs through the gateway with structured outputs.",
      },
      {
        layer: "realtime",
        label: "Run state streams to watchers",
        detail:
          "Step progress publishes as events, so anyone watching the pipeline sees it advance live.",
      },
      {
        layer: "knowledge",
        label: "Data read and written canonically",
        detail:
          "Each hop updates the single source of truth, leaving lineage from trigger to effect.",
      },
      {
        layer: "agents",
        label: "Approval gate pauses the run",
        detail:
          "The workflow waits — for hours if needed — until the designated reviewer decides, then resumes.",
      },
      {
        layer: "knowledge",
        label: "Audit trail completed",
        detail:
          "The run, its steps and every decision are recorded as a durable, replayable history.",
      },
    ],
  },
];