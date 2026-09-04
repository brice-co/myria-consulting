import { RealtimeSession } from "@openai/agents/realtime";

import { ABOUT_MYRIA_AGENT_CONFIG } from "@/config/about-myria-agent";
import { createAboutMyriaAgent } from "@/lib/about-myria/agents/about-myria-agent";
import type { AboutState } from "@/lib/about-myria/about/schema";

type Callbacks = {
  onState: (patch: Partial<AboutState>) => void;
  onHistory: (history: any[]) => void;
  onToolStart: (name: string) => void;
  onToolEnd: (name: string) => void;
  onActivity: () => void;
  onError: (error: unknown) => void;
};

export class MyriaAboutRealtimeClient {
  private session: RealtimeSession | null = null;

  constructor(private callbacks: Callbacks) {}

  async connect() {
    const response = await fetch("/api/realtime/about-myria-client-secret", { method: "POST" });
    const token = await response.json();

    if (!response.ok || !token?.value) {
      throw new Error(token?.error ?? "Unable to create realtime session.");
    }

    const agent = createAboutMyriaAgent({ update: this.callbacks.onState });

    const session = new RealtimeSession(agent, {
      model: token.model ?? ABOUT_MYRIA_AGENT_CONFIG.model,
      transport: "webrtc",
      workflowName: "About Myria Agent",
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

    session.on("history_updated", (history) => {
      this.callbacks.onActivity();
      this.callbacks.onHistory(history as any[]);
    });

    session.on("agent_tool_start", (_ctx, _agent, tool) => {
      this.callbacks.onActivity();
      this.callbacks.onToolStart(tool.name);
    });

    session.on("agent_tool_end", (_ctx, _agent, tool) => {
      this.callbacks.onActivity();
      this.callbacks.onToolEnd(tool.name);
    });

    session.on("error", this.callbacks.onError);

    session.transport.on("*", (event: any) => {
      if (event?.type === "input_audio_buffer.speech_started") {
        this.callbacks.onActivity();
      }
    });

    await session.connect({ apiKey: token.value });
    this.session = session;
    this.callbacks.onActivity();
  }

  sendText(message: string) {
    if (!this.session) throw new Error("Realtime session is not connected.");
    this.callbacks.onActivity();
    this.session.sendMessage(message);
  }

  async setMuted(muted: boolean) {
    await this.session?.mute(muted);
  }

  close() {
    this.session?.close();
    this.session = null;
  }
}
