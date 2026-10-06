export type AgentId = "orchestrator" | "revenue" | "customer" | "operations";
export type Channel = "voice" | "chat";
export type ScenarioId = "expansion" | "service" | "order";

export type Agent = {
  id: AgentId;
  name: string;
  role: string;
  initials: string;
  specialty: string;
};

export type Message = {
  id: string;
  author: string;
  role: "customer" | "human" | "agent" | "system";
  agentId?: AgentId;
  text: string;
  time: string;
};

export type ToolEvent = {
  id: string;
  label: string;
  detail: string;
  status: "ready" | "running" | "complete";
};

export type SharedInsight = {
  label: string;
  value: string;
  tone?: "default" | "attention" | "positive";
};
