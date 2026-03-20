import { z } from 'zod';

export const AgentTypeSchema = z.enum(['orchestrator', 'billing', 'technical', 'retention']);
export type AgentType = z.infer<typeof AgentTypeSchema>;

export const SpeakerSchema = z.enum(['agent', 'caller', 'system']);
export type Speaker = z.infer<typeof SpeakerSchema>;

export const ScenarioStepSchema = z.object({
  speaker: SpeakerSchema,
  text: z.string().min(1),
  delay: z.number().min(0).default(500),
  agentType: AgentTypeSchema.optional(),
  action: z.enum(['transfer', 'barge-in', 'lock-in', 'vad-trigger', 'noise-cancel']).optional(),
  transferTo: AgentTypeSchema.optional(),
});
export type ScenarioStep = z.infer<typeof ScenarioStepSchema>;

export const ScenarioSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  type: AgentTypeSchema,
  category: z.string(),
  steps: z.array(ScenarioStepSchema).min(1),
});
export type Scenario = z.infer<typeof ScenarioSchema>;

export const TranscriptEntrySchema = z.object({
  id: z.string(),
  speaker: z.string(),
  text: z.string(),
  timestamp: z.number(),
  agentType: AgentTypeSchema,
});
export type TranscriptEntry = z.infer<typeof TranscriptEntrySchema>;

export const CallSessionSchema = z.object({
  id: z.string(),
  scenarioId: z.string(),
  scenarioTitle: z.string(),
  startedAt: z.number(),
  endedAt: z.number().optional(),
  transcript: z.array(TranscriptEntrySchema),
  agentTypes: z.array(AgentTypeSchema),
});
export type CallSession = z.infer<typeof CallSessionSchema>;

export const TTSEngineSchema = z.enum(['browser', 'openai', 'elevenlabs']);
export type TTSEngine = z.infer<typeof TTSEngineSchema>;

export const agentLabels: Record<AgentType, string> = {
  orchestrator: 'Orchestrator',
  billing: 'Billing',
  technical: 'Technical',
  retention: 'Retention',
};

export const agentDescriptions: Record<AgentType, string> = {
  orchestrator: 'Routes calls to the right department',
  billing: 'Handles payments, invoices & refunds',
  technical: 'Resolves technical issues & bugs',
  retention: 'Manages cancellations & loyalty offers',
};
