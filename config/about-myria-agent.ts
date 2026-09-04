export const ABOUT_MYRIA_AGENT_CONFIG = {
  model: process.env.NEXT_PUBLIC_OPENAI_REALTIME_MODEL ?? "gpt-realtime-mini",
  voice: "marin",
  silenceWarningMs: 45_000,
  silenceTimeoutMs: 90_000,
  maxSessionMs: 30 * 60_000,
} as const;

export const ABOUT_MYRIA_STARTERS = [
  "What makes Myria different from traditional consulting?",
  "How does the virtual specialist team work?",
  "Which specialist would help with an operations problem?",
  "What does AI-enabled organization mean?",
  "Show me the AI Enablement Architecture.",
  "How do the Advisory Labs connect with the virtual team?",
] as const;
