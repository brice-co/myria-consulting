import { SPECIALIST_LABELS } from "./config";
import { AdvisoryMemoryStore } from "./memory/advisory-memory";
import type {
  AdvisoryInsight,
  AdvisoryMemory,
  SpecialistId,
  SpecialistOutput,
  TeamMode,
  TranscriptItem,
  VoiceStatus,
} from "./types";

type ClientOptions = {
  mode: TeamMode;
  onStatus: (status: VoiceStatus) => void;
  onTranscript: (items: TranscriptItem[]) => void;
  onAgentChange: (id: SpecialistId) => void;
  onHandoff: (from: string, to: string) => void;
  onToolStart: (toolName: string, agentName: string) => string;
  onToolEnd: (id: string, result?: string) => void;
  onInsight: (insight: AdvisoryInsight) => void;
  onOutput: (output: SpecialistOutput) => void;
  onMemoryChange: (memory: AdvisoryMemory) => void;
  onActivity: () => void;
  onError: (message: string) => void;
};

function normalizeAgentId(name: string): SpecialistId {
  if (/strategy/i.test(name)) return "strategy";
  if (/operations/i.test(name)) return "operations";
  if (/people|change/i.test(name)) return "people-change";
  if (/ai|data/i.test(name)) return "ai-data";
  return "lead";
}

export class AdvisoryTeamRealtimeClient {
  private session: any = null;
  private activeAgent: SpecialistId = "lead";
  private toolQueue = new Map<string, string[]>();
  private memory = new AdvisoryMemoryStore();

  constructor(private readonly options: ClientOptions) {}

  async connect() {
    this.options.onStatus("connecting");
    this.memory.reset();
    this.options.onMemoryChange(this.memory.getSnapshot());

    const tokenResponse = await fetch("/api/advisory-realtime/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!tokenResponse.ok) {
      throw new Error("Unable to create Realtime session.");
    }

    const payload = await tokenResponse.json();
    if (!payload?.value) throw new Error("Realtime client secret was not returned.");

    const [{ RealtimeSession }, { buildAdvisoryAgents }] = await Promise.all([
      import("@openai/agents/realtime"),
      import("./agents"),
    ]);

    const emitMemory = () => this.options.onMemoryChange(this.memory.getSnapshot());

    const { initialAgent } = buildAdvisoryAgents({
      mode: this.options.mode,
      getActiveAgent: () => this.activeAgent,
      getMemory: () => this.memory.getSnapshot(),
      setMemoryField: (field, value) => {
        this.memory.setField(field, value);
        emitMemory();
      },
      appendMemory: (field, value) => {
        this.memory.append(field, value);
        emitMemory();
      },
      onInsight: (insight) => {
        this.memory.addInsight(insight);
        emitMemory();
        this.options.onInsight(insight);
      },
      onOutput: (output) => {
        this.memory.addOutput(output);
        emitMemory();
        this.options.onOutput(output);
      },
    });

    const session = new RealtimeSession(initialAgent, {
      model: "gpt-realtime-mini",
      config: {
          outputModalities: ["audio"],
          parallelToolCalls: false,

          audio: {
            input: {
              transcription: {
                model: "gpt-4o-mini-transcribe",

                prompt: `
      Transcribe the speaker accurately.

      The conversation is bilingual and should use only:
      - English
      - French

      If the speaker is speaking English, transcribe in English.
      If the speaker is speaking French, transcribe in French.

      Do not translate between English and French.
      Preserve the language actually spoken.

      For names, company names, product names, technical terms,
      and proper nouns, preserve their original spelling whenever possible.

      Myria Consulting is spelled "Myria Consulting".
                `.trim(),
              },

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

    session.on("agent_start", (_context: any, agent: any) => {
      const id = normalizeAgentId(agent?.name ?? "");
      this.activeAgent = id;
      this.options.onAgentChange(id);
      this.options.onActivity();
    });

    session.on("agent_handoff", (_context: any, fromAgent: any, toAgent: any) => {
      const from = fromAgent?.name ?? "Previous advisor";
      const to = toAgent?.name ?? "Next advisor";
      const id = normalizeAgentId(to);
      this.activeAgent = id;
      this.options.onHandoff(from, to);
      this.options.onAgentChange(id);
      this.options.onActivity();
    });

    session.on("agent_tool_start", (_context: any, agent: any, tool: any) => {
      const toolName = tool?.name ?? "tool";
      const agentName = agent?.name ?? SPECIALIST_LABELS[this.activeAgent];
      const id = this.options.onToolStart(toolName, agentName);
      const queue = this.toolQueue.get(toolName) ?? [];
      queue.push(id);
      this.toolQueue.set(toolName, queue);
      this.options.onActivity();
    });

    session.on("agent_tool_end", (_context: any, _agent: any, tool: any, result: any) => {
      const toolName = tool?.name ?? "tool";
      const queue = this.toolQueue.get(toolName) ?? [];
      const id = queue.shift() ?? crypto.randomUUID();
      if (queue.length) this.toolQueue.set(toolName, queue);
      else this.toolQueue.delete(toolName);
      this.options.onToolEnd(id, this.stringifyResult(result));
      this.options.onActivity();
    });

    session.on("audio_start", () => this.options.onActivity());
    session.on("audio_stopped", () => this.options.onActivity());

    session.on("error", (error: unknown) => {
      const message = error instanceof Error ? error.message : "Realtime session error.";
      this.options.onStatus("error");
      this.options.onError(message);
    });

    await session.connect({ apiKey: payload.value });

    this.session = session;
    this.activeAgent = normalizeAgentId(initialAgent.name);
    this.options.onAgentChange(this.activeAgent);
    this.options.onStatus("live");

    const opening =
      this.options.mode === "team"
        ? "Welcome the visitor to Myria's Virtual Advisory Team. Explain briefly that you can bring in Strategy, Operations, People & Change, and AI & Data specialists as needed. Then ask what business challenge they want the team to examine."
        : "Welcome the visitor briefly, introduce your specialist role, and ask one focused opening question about the business challenge they want to explore.";

    session.sendMessage(opening);
    this.options.onActivity();
  }

  sendMessage(message: string) {
    this.session?.sendMessage(message);
    this.options.onActivity();
  }

  mute(muted: boolean) {
    if (typeof this.session?.mute === "function") {
      this.session.mute(muted);
    }
    this.options.onStatus(muted ? "muted" : "live");
  }

  disconnect() {
    try {
      this.session?.close?.();
    } finally {
      this.session = null;
      this.options.onStatus("idle");
    }
  }

  private mapHistory(history: any[]): TranscriptItem[] {
    return history
      .map((item, index) => {
        const role = item?.role ?? item?.item?.role ?? null;
        if (role !== "user" && role !== "assistant") return null;
        const text = this.extractText(item);
        if (!text) return null;
        return {
          id: item?.id ?? item?.itemId ?? `history-${index}`,
          role,
          text,
        } satisfies TranscriptItem;
      })
      .filter((item): item is TranscriptItem => Boolean(item));
  }

  private extractText(item: any) {
    if (typeof item?.text === "string") return item.text;
    const content = item?.content ?? item?.item?.content ?? [];
    if (!Array.isArray(content)) return "";
    return content
      .map((part: any) => part?.transcript ?? part?.text ?? "")
      .filter(Boolean)
      .join(" ")
      .trim();
  }

  private stringifyResult(result: any) {
    if (typeof result === "string") return result;
    try {
      return JSON.stringify(result);
    } catch {
      return undefined;
    }
  }
}
