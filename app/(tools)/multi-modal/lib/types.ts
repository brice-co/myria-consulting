import { z } from 'zod';

// Agent types
export type AgentType = 'orchestrator' | 'search' | 'email' | 'browser';

export const agentLabels: Record<AgentType, string> = {
  orchestrator: 'Orchestrator',
  search: 'Search Agent',
  email: 'Email Agent',
  browser: 'Browser Agent',
};

export const agentVoices: Record<AgentType, SpeechSynthesisVoice | null> = {
  orchestrator: null,
  search: null,
  email: null,
  browser: null,
};

// Tool schemas
export const OpenUrlSchema = z.object({
  url: z.string().url(),
});

export const SendEmailSchema = z.object({
  to: z.string().email(),
  subject: z.string(),
  body: z.string(),
});

export const WebSearchSchema = z.object({
  query: z.string(),
});

export type ToolName = 'open_url' | 'send_email' | 'web_search';

export interface ToolCall {
  id: string;
  name: ToolName;
  arguments: Record<string, unknown>;
  status: 'pending' | 'running' | 'completed' | 'error';
  result?: string;
  agentType: AgentType;
}

export interface TranscriptEntry {
  id: string;
  speaker: 'User' | 'Agent' | 'System';
  text: string;
  timestamp: number;
  agentType?: AgentType;
  toolCalls?: ToolCall[];
}

export interface ConversationSession {
  id: string;
  startedAt: number;
  endedAt?: number;
  transcript: TranscriptEntry[];
  toolCalls: ToolCall[];
}

// AI message format
export interface AIMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
  tool_call_id?: string;
  tool_calls?: Array<{
    id: string;
    type: 'function';
    function: { name: string; arguments: string };
  }>;
}
