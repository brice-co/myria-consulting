"use client";

import { useMemo, useState } from "react";
import { scenarios } from "../data/demo";
import type { AgentId, Channel, Message, ScenarioId, ToolEvent } from "../types/conversation";

export function useConversationDemo() {
  const [scenarioId, setScenarioId] = useState<ScenarioId>("expansion");
  const [channel, setChannel] = useState<Channel>("voice");
  const [activeAgent, setActiveAgent] = useState<AgentId>("orchestrator");
  const [draft, setDraft] = useState("");
  const [extraMessages, setExtraMessages] = useState<Message[]>([]);
  const [toolOverrides, setToolOverrides] = useState<Record<string, ToolEvent["status"]>>({});

  const scenario = scenarios[scenarioId];
  const messages = useMemo(() => [...scenario.messages, ...extraMessages], [scenario.messages, extraMessages]);
  const tools = scenario.tools.map((tool) => ({ ...tool, status: toolOverrides[tool.id] ?? tool.status }));

  function changeScenario(next: ScenarioId) {
    setScenarioId(next);
    setActiveAgent("orchestrator");
    setExtraMessages([]);
    setToolOverrides({});
  }

  function sendMessage() {
    const text = draft.trim();
    if (!text) return;
    setExtraMessages((items) => [...items, { id: `user-${Date.now()}`, author: "You", role: "human", text, time: "Now" }]);
    setDraft("");
    setTimeout(() => {
      setExtraMessages((items) => [...items, { id: `ai-${Date.now()}`, author: "Myria", role: "agent", agentId: activeAgent, text: "I’ve added that to our shared context. I’ll keep the other specialists aligned as we work through the next decision.", time: "Now" }]);
    }, 350);
  }

  function runTool(id: string) {
    setToolOverrides((s) => ({ ...s, [id]: "running" }));
    setTimeout(() => setToolOverrides((s) => ({ ...s, [id]: "complete" })), 650);
  }

  return { scenarioId, scenario, channel, setChannel, activeAgent, setActiveAgent, draft, setDraft, messages, tools, changeScenario, sendMessage, runTool };
}
