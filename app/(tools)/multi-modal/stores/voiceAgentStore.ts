import { create } from 'zustand';
import type { AgentType, TranscriptEntry, ToolCall, ConversationSession } from '../lib/types';
import { saveSession } from '../lib/indexedDB';

interface VoiceAgentState {
  // Session
  sessionId: string | null;
  isActive: boolean;
  startedAt: number | null;

  // Voice state
  isListening: boolean;
  isSpeaking: boolean;
  isProcessing: boolean;
  isUserSpeaking: boolean;
  isMuted: boolean;

  // Agents
  activeAgents: AgentType[];

  // Transcript & tools
  transcript: TranscriptEntry[];
  toolCalls: ToolCall[];

  // History
  pastSessions: ConversationSession[];

  // Actions
  startSession: () => void;
  endSession: () => Promise<void>;
  setListening: (v: boolean) => void;
  setSpeaking: (v: boolean) => void;
  setProcessing: (v: boolean) => void;
  setUserSpeaking: (v: boolean) => void;
  setMuted: (v: boolean) => void;
  addTranscriptEntry: (entry: Omit<TranscriptEntry, 'id'>) => void;
  addToolCall: (tc: ToolCall) => void;
  updateToolCall: (id: string, update: Partial<ToolCall>) => void;
  setPastSessions: (sessions: ConversationSession[]) => void;
}

export const useVoiceAgentStore = create<VoiceAgentState>((set, get) => ({
  sessionId: null,
  isActive: false,
  startedAt: null,
  isListening: false,
  isSpeaking: false,
  isProcessing: false,
  isUserSpeaking: false,
  isMuted: false,
  activeAgents: [],
  transcript: [],
  toolCalls: [],
  pastSessions: [],

  startSession: () => {
    const id = crypto.randomUUID();
    set({
      sessionId: id,
      isActive: true,
      startedAt: Date.now(),
      transcript: [],
      toolCalls: [],
      activeAgents: ['orchestrator'],
    });
  },

  endSession: async () => {
    const state = get();
    if (state.sessionId && state.startedAt) {
      const session: ConversationSession = {
        id: state.sessionId,
        startedAt: state.startedAt,
        endedAt: Date.now(),
        transcript: state.transcript,
        toolCalls: state.toolCalls,
      };
      await saveSession(session);
      set(s => ({ pastSessions: [...s.pastSessions, session] }));
    }
    set({
      sessionId: null,
      isActive: false,
      startedAt: null,
      isListening: false,
      isSpeaking: false,
      isProcessing: false,
      isUserSpeaking: false,
      isMuted: false,
      activeAgents: [],
      transcript: [],
      toolCalls: [],
    });
  },

  setListening: (v) => set({ isListening: v }),
  setSpeaking: (v) => set({ isSpeaking: v }),
  setProcessing: (v) => set({ isProcessing: v }),
  setUserSpeaking: (v) => set({ isUserSpeaking: v }),
  setMuted: (v) => set({ isMuted: v }),

  addTranscriptEntry: (entry) =>
    set((s) => ({
      transcript: [...s.transcript, { ...entry, id: crypto.randomUUID() }],
      activeAgents: entry.agentType && !s.activeAgents.includes(entry.agentType)
        ? [...s.activeAgents, entry.agentType]
        : s.activeAgents,
    })),

  addToolCall: (tc) => set((s) => ({ toolCalls: [...s.toolCalls, tc] })),

  updateToolCall: (id, update) =>
    set((s) => ({
      toolCalls: s.toolCalls.map((tc) => (tc.id === id ? { ...tc, ...update } : tc)),
    })),

  setPastSessions: (sessions) => set({ pastSessions: sessions }),
}));
