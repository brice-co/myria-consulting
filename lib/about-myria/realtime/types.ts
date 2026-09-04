export type ConnectionStatus = "idle" | "connecting" | "connected" | "ending" | "error";

export type ToolEvent = {
  id: string;
  name: string;
  label: string;
  status: "running" | "completed" | "error";
  at: number;
};

export type TranscriptItem = {
  id: string;
  role: "user" | "assistant";
  text: string;
};
