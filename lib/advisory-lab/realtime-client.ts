import type { AdvisoryStatus, AdvisoryTranscriptItem } from "./types";

type AdvisoryRealtimeClientOptions = {
  onStatus: (status: AdvisoryStatus) => void;
  onTranscript: (items: AdvisoryTranscriptItem[]) => void;
  onActivity?: () => void;
  onAssistantTurn?: (text: string) => void;
  onUserTurn?: (text: string) => void;
  onError: (message: string) => void;
};

export class AdvisoryRealtimeClient {
  private session: any = null;

  constructor(private readonly options: AdvisoryRealtimeClientOptions) {}

  async connect() {
    this.options.onStatus("connecting");
    const tokenResponse = await fetch("/api/advisory-realtime/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (!tokenResponse.ok) throw new Error("Unable to create advisory Realtime session.");
    const payload = await tokenResponse.json();
    if (!payload?.value) throw new Error("Realtime client secret was not returned.");

    const [{ RealtimeSession }, { createAdvisoryAgent }] = await Promise.all([
      import("@openai/agents/realtime"),
      import("./agent"),
    ]);

    const session = new RealtimeSession(createAdvisoryAgent(), {
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
      const items = this.mapHistory(history);
      this.options.onTranscript(items);
      const latest = items[items.length - 1];
      if (latest?.text) {
        this.options.onActivity?.();
        latest.role === "assistant"
          ? this.options.onAssistantTurn?.(latest.text)
          : this.options.onUserTurn?.(latest.text);
      }
    });

    session.on("audio_start", () => this.options.onActivity?.());
    session.on("audio_stopped", () => this.options.onActivity?.());
    session.on("error", (error: unknown) => {
      const message = error instanceof Error ? error.message : "Realtime session error.";
      this.options.onStatus("error");
      this.options.onError(message);
    });

    await session.connect({ apiKey: payload.value });
    this.session = session;
    this.options.onStatus("live");
    session.sendMessage("Begin the advisory session now. Briefly welcome the participant, explain that this is a structured Myria AI Advisory Lab, and ask the first business discovery question.");
  }

  sendMessage(message: string) {
    this.session?.sendMessage(message);
    this.options.onActivity?.();
  }

  mute(muted: boolean) {
    if (typeof this.session?.mute === "function") this.session.mute(muted);
    this.options.onStatus(muted ? "muted" : "live");
  }

  disconnect() {
    try { this.session?.close?.(); }
    finally {
      this.session = null;
      this.options.onStatus("idle");
    }
  }

  private mapHistory(history: any[]): AdvisoryTranscriptItem[] {
    return history
      .map((item, index) => {
        const role = item?.role ?? item?.item?.role ?? null;
        if (role !== "user" && role !== "assistant") return null;
        const text = this.extractText(item);
        if (!text) return null;
        return { id: item?.id ?? item?.itemId ?? `history-${index}`, role, text } as AdvisoryTranscriptItem;
      })
      .filter((item): item is AdvisoryTranscriptItem => Boolean(item));
  }

  private extractText(item: any) {
    if (typeof item?.text === "string") return item.text;
    const content = item?.content ?? item?.item?.content ?? [];
    if (!Array.isArray(content)) return "";
    return content.map((part: any) => part?.transcript ?? part?.text ?? "").filter(Boolean).join(" ").trim();
  }
}
