export type ConnectionStatus = "idle" | "connecting" | "connected" | "ending" | "error";
export type ToolEventStatus = "running" | "completed" | "error" | "info";
export type ToolEvent = { id: string; name: string; label: string; status: ToolEventStatus; at: number; detail?: string };
export type TranscriptItem = { id: string; role: "user" | "assistant"; text: string };
