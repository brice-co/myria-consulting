import type { TranscriptItem } from "./types";

export function historyToTranscript(history: any[]): TranscriptItem[] {
  return history
    .filter((item) => item?.type === "message")
    .map((item, index) => {
      const role: TranscriptItem["role"] = item.role === "assistant" ? "assistant" : "user";
      const content = Array.isArray(item.content) ? item.content : [];
      const text = content
        .map((part: any) => typeof part?.text === "string" ? part.text : typeof part?.transcript === "string" ? part.transcript : "")
        .filter(Boolean)
        .join(" ")
        .trim();
      return { id: item.id ?? `${role}-${index}`, role, text };
    })
    .filter((item) => item.text);
}
