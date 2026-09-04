export const CONTACT_AGENT_CONFIG = {
  model: "gpt-realtime-mini",
  voice: "marin",
  silenceWarningMs: 45_000,
  silenceTimeoutMs: 90_000,
  maxSessionMs: 30 * 60_000,
} as const;

export const CONTACT_STARTERS = [
  "We want to explore where AI could create value.",
  "I have an operations challenge I'd like to discuss.",
  "I'd like to learn about a Myria Advisory Lab.",
  "We need help with organizational change.",
] as const;
