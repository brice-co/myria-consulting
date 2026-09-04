import { RealtimeSession } from "@openai/agents/realtime";
import { CONTACT_AGENT_CONFIG } from "@/config/contact-agent";
import type { ContactInquiry } from "@/lib/myria-contact-agent/contact/schema";
import { createContactAgent } from "@/lib/myria-contact-agent/agents/contact-agent";

type ClientCallbacks = {
  onInquiryPatch: (patch: Partial<ContactInquiry>) => void;
  onConfirmationRequested: () => void;
  onHistory: (history: any[]) => void;
  onToolStart: (name: string) => void;
  onToolEnd: (name: string, result: unknown) => void;
  onActivity: () => void;
  onError: (error: unknown) => void;
};

export class MyriaContactRealtimeClient {
  private session: RealtimeSession | null = null;
  constructor(private callbacks: ClientCallbacks) {}

  async connect() {
    const tokenResponse = await fetch("/api/realtime/client-secret", { method: "POST", headers: { "Content-Type": "application/json" } });
    const token = await tokenResponse.json();
    if (!tokenResponse.ok || !token?.value) throw new Error(token?.error ?? "Unable to create realtime session.");

    const agent = createContactAgent({
      updateInquiry: this.callbacks.onInquiryPatch,
      requestConfirmation: this.callbacks.onConfirmationRequested,
    });

    const session = new RealtimeSession(agent, {
          model: token.model ?? CONTACT_AGENT_CONFIG.model,
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
    session.on("agent_tool_start", (_context, _agent, tool) => {
      this.callbacks.onActivity();
      this.callbacks.onToolStart(tool.name);
    });
    session.on("agent_tool_end", (_context, _agent, tool, result) => {
      this.callbacks.onActivity();
      this.callbacks.onToolEnd(tool.name, result);
    });
    session.on("error", (error) => this.callbacks.onError(error));
    session.transport.on("*", (event: any) => {
      if (event?.type === "input_audio_buffer.speech_started" || event?.type === "conversation.item.input_audio_transcription.completed") {
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
    if (!this.session) return;
    await this.session.mute(muted);
  }

  interrupt() { this.session?.interrupt(); }
  close() { this.session?.close(); this.session = null; }
}
