import { SPECIALIST_LABELS } from "@/lib/virtual-advisory-team/config";
import { AdvisoryMemoryStore } from "@/lib/virtual-advisory-team/memory/advisory-memory";
import type {
  AdvisoryMemory,
  SpecialistId,
  SpecialistOutput,
  TranscriptItem,
  VoiceStatus,
} from "@/lib/virtual-advisory-team/types";
import { AdvisoryWorkspaceBridge } from "./advisory-workspace-bridge";
import type {
  ParticipantContext,
  RuntimeEvent,
  WorkspaceItem,
} from "./types";

type Options = {
  participants?: ParticipantContext[];
  onStatus: (status: VoiceStatus) => void;
  onTranscript: (items: TranscriptItem[]) => void;
  onAgentChange: (agent: SpecialistId) => void;
  onWorkspaceItem: (item: WorkspaceItem) => void;
  onRuntimeEvent: (event: RuntimeEvent) => void;
  onActivity: () => void;
  onError: (message: string) => void;
};

function normalizeAgent(name: string): SpecialistId {
  if (/strategy/i.test(name)) return "strategy";
  if (/operations/i.test(name)) return "operations";
  if (/people|change/i.test(name)) return "people-change";
  if (/ai|data/i.test(name)) return "ai-data";
  return "lead";
}

function evt(
  type: RuntimeEvent["type"],
  title: string,
  detail?: string,
): RuntimeEvent {
  return {
    id: crypto.randomUUID(),
    type,
    title,
    detail,
    at: Date.now(),
  };
}

function participantSummary(participants: ParticipantContext[]) {
  return participants
    .filter((participant) => participant.name && participant.name !== "Guest")
    .map((participant) => `${participant.name} (${participant.role})`)
    .join(", ");
}

export class CollaborativeAdvisoryRealtimeClient {
  private session: any = null;
  private activeAgent: SpecialistId = "lead";
  private lastAnnouncedAgent: SpecialistId | null = null;
  private memory = new AdvisoryMemoryStore();
  private bridge = new AdvisoryWorkspaceBridge();
  private participants: ParticipantContext[];
  private lastParticipantSignature = "";

  constructor(private readonly options: Options) {
    this.participants = options.participants ?? [];
    this.lastParticipantSignature = participantSummary(this.participants);
  }

  async connect() {
    this.options.onStatus("connecting");
    this.memory.reset();
    this.bridge.reset();

    const response = await fetch("/api/advisory-realtime/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Unable to create Realtime session.");
    }

    const token = await response.json();
    if (!token?.value) {
      throw new Error("Realtime client secret was not returned.");
    }

    const [{ RealtimeSession }, { buildAdvisoryAgents }] = await Promise.all([
      import("@openai/agents/realtime"),
      import("@/lib/virtual-advisory-team/agents"),
    ]);

    const emitMemory = () => {
      const snapshot = this.memory.getSnapshot();
      this.syncWorkspaceFromMemory(snapshot);
    };

    const { initialAgent } = buildAdvisoryAgents({
      mode: "team",
      getActiveAgent: () => this.activeAgent,
      getMemory: () => this.memory.getSnapshot(),
      setMemoryField: (field, value) => {
        this.memory.setField(field, value);
        this.options.onRuntimeEvent(
          evt("memory", "Business context updated", `${field}: ${value}`),
        );
        emitMemory();
      },
      appendMemory: (field, value) => {
        this.memory.append(field, value);
        this.options.onRuntimeEvent(
          evt("memory", `${field} updated`, value),
        );
        emitMemory();
      },
      onInsight: (insight) => {
        this.memory.addInsight(insight);
        this.options.onWorkspaceItem(this.bridge.fromInsight(insight));
        this.options.onRuntimeEvent(
          evt("workspace", "Insight captured", insight.label),
        );
        emitMemory();
      },
      onOutput: (output) => {
        this.memory.addOutput(output);
        this.emitOutput(output);
        emitMemory();
      },
    });

    const session = new RealtimeSession(initialAgent, {
      model: "gpt-realtime-mini",
      config: {
        audio: {
          input: {
            turnDetection: {
              type: "server_vad",
              threshold: 0.5,
              prefixPaddingMs: 250,
              silenceDurationMs: 500,
              createResponse: true,
              interruptResponse: true,
            },
          },
        },
      },
    });

    session.on("history_updated", (history: any[]) => {
      this.options.onTranscript(this.mapHistory(history));
      this.options.onActivity();
    });

    session.on("agent_start", (_ctx: any, agent: any) => {
      const nextAgent = normalizeAgent(agent?.name ?? "");
      this.activeAgent = nextAgent;
      this.options.onAgentChange(nextAgent);

      if (this.lastAnnouncedAgent !== nextAgent) {
        this.lastAnnouncedAgent = nextAgent;
        this.options.onRuntimeEvent(
          evt("agent", `${SPECIALIST_LABELS[nextAgent]} active`),
        );
      }

      this.options.onActivity();
    });

    session.on("agent_handoff", (_ctx: any, fromAgent: any, toAgent: any) => {
      const from = fromAgent?.name ?? "Previous advisor";
      const to = toAgent?.name ?? "Next advisor";
      const nextAgent = normalizeAgent(to);

      this.activeAgent = nextAgent;
      this.lastAnnouncedAgent = nextAgent;
      this.options.onAgentChange(nextAgent);
      this.options.onRuntimeEvent(
        evt("handoff", `${from} → ${to}`, "Realtime specialist handoff"),
      );
      this.options.onActivity();
    });

    session.on("agent_tool_start", (_ctx: any, agent: any, tool: any) => {
      this.options.onRuntimeEvent(
        evt(
          "tool",
          tool?.name ?? "Tool started",
          `Started by ${agent?.name ?? SPECIALIST_LABELS[this.activeAgent]}`,
        ),
      );
      this.options.onActivity();
    });

    session.on("agent_tool_end", (_ctx: any, agent: any, tool: any) => {
      this.options.onRuntimeEvent(
        evt(
          "tool",
          `${tool?.name ?? "Tool"} completed`,
          `Completed by ${agent?.name ?? SPECIALIST_LABELS[this.activeAgent]}`,
        ),
      );
      this.options.onActivity();
    });

    session.on("audio_start", () => this.options.onActivity());
    session.on("audio_stopped", () => this.options.onActivity());

    session.on("error", (error: unknown) => {
      const message =
        error instanceof Error ? error.message : "Realtime session error.";
      this.options.onStatus("error");
      this.options.onError(message);
    });

    await session.connect({ apiKey: token.value });

    this.session = session;
    this.activeAgent = normalizeAgent(initialAgent.name);
    this.lastAnnouncedAgent = this.activeAgent;
    this.options.onAgentChange(this.activeAgent);
    this.options.onStatus("live");

    const participants = participantSummary(this.participants);
    const participantContext = participants
      ? `Participants currently in the room: ${participants}. Use their names naturally when useful.`
      : "Participant names may not be set yet. Briefly invite participants to set their name and role in the Participants panel.";

    session.sendMessage(
      `Welcome the participants to Myria's collaborative Virtual Advisory Team. ${participantContext} Explain briefly that Strategy, Operations, People & Change, and AI & Data specialists can be brought in as needed. Capture material findings with the existing advisory tools so the shared workspace visibly fills with Insights, Opportunities, Decisions, and Actions. After the first substantive participant answer, capture useful context and a decision-useful insight. Once the challenge clearly maps to a specialist, route and hand off rather than continuing as Lead Advisor. Then ask one focused question about the business challenge the group wants to examine.`,
    );

    this.options.onActivity();
  }

  updateParticipants(participants: ParticipantContext[]) {
    this.participants = participants;
    const signature = participantSummary(participants);

    if (!this.session || signature === this.lastParticipantSignature) return;
    this.lastParticipantSignature = signature;

    this.options.onRuntimeEvent(
      evt(
        "system",
        "Participants updated",
        signature || "No named participants currently in the room",
      ),
    );

    // Keep the active realtime conversation aware of joins/profile changes.
    // The instruction explicitly says not to answer this metadata update.
    this.session.sendMessage(
      signature
        ? `Room context update only — do not respond to this message. Current participants: ${signature}. Use this context naturally in subsequent advisory turns.`
        : "Room context update only — do not respond to this message. No named participant profiles are currently available.",
    );
  }

  mute(muted: boolean) {
    if (typeof this.session?.mute === "function") {
      this.session.mute(muted);
    }
    this.options.onStatus(muted ? "muted" : "live");
  }

  sendMessage(message: string) {
    this.session?.sendMessage(message);
    this.options.onActivity();
  }

  disconnect() {
    try {
      this.session?.close?.();
    } finally {
      this.session = null;
      this.options.onStatus("idle");
    }
  }

  private emitOutput(output: SpecialistOutput) {
    const label =
      output.type === "strategy-brief"
        ? "Strategy brief created"
        : output.type === "operations-brief"
          ? "Operations brief created"
          : output.type === "change-snapshot"
            ? "People & Change snapshot created"
            : output.type === "ai-data-snapshot"
              ? "AI & Data snapshot created"
              : "Advisory summary created";

    this.options.onRuntimeEvent(evt("output", label));
  }

  private syncWorkspaceFromMemory(memory: AdvisoryMemory) {
    const items = this.bridge.fromMemory(memory, this.activeAgent);

    for (const item of items) {
      this.options.onWorkspaceItem(item);
      this.options.onRuntimeEvent(
        evt("workspace", `${item.category} captured`, item.title),
      );
    }
  }

  private mapHistory(history: any[]): TranscriptItem[] {
    return history
      .map((item, index) => {
        const role = item?.role ?? item?.item?.role;
        if (role !== "user" && role !== "assistant") return null;

        const content = item?.content ?? item?.item?.content ?? [];
        const text =
          typeof item?.text === "string"
            ? item.text
            : Array.isArray(content)
              ? content
                  .map((part: any) => part?.transcript ?? part?.text ?? "")
                  .filter(Boolean)
                  .join(" ")
                  .trim()
              : "";

        if (!text) return null;

        return {
          id: item?.id ?? item?.itemId ?? `history-${index}`,
          role,
          text,
        } satisfies TranscriptItem;
      })
      .filter((item): item is TranscriptItem => Boolean(item));
  }
}
