import { create } from 'zustand';
import type { AgentType, TranscriptEntry, Scenario, TTSEngine, CallSession } from '@/app/(tools)/customer-support/lib/schemas';
import { speak, cancelSpeech } from '@/app/(tools)/customer-support/lib/tts-engine';
import { saveSession } from '@/app/(tools)/customer-support/lib/db';

interface CallState {
  // Call state
  isPlaying: boolean;
  isPaused: boolean;
  isSpeaking: boolean;
  currentStepIndex: number;
  currentScenario: Scenario | null;
  currentAgentType: AgentType;
  callDuration: number;
  transcript: TranscriptEntry[];
  ttsEngine: TTSEngine;
  isTransferring: boolean;
  bargeInActive: boolean;
  lockInActive: boolean;
  noiseCancellation: boolean;
  vadActive: boolean;

  // Actions
  setTTSEngine: (engine: TTSEngine) => void;
  startScenario: (scenario: Scenario) => void;
  stopScenario: () => void;
  togglePause: () => void;
  formattedDuration: () => string;
}

let timeoutId: ReturnType<typeof setTimeout> | null = null;
let durationInterval: ReturnType<typeof setInterval> | null = null;
let cancelCurrentSpeech: (() => void) | null = null;
let sessionId: string = '';

function clearTimers() {
  if (timeoutId) clearTimeout(timeoutId);
  if (durationInterval) clearInterval(durationInterval);
  timeoutId = null;
  durationInterval = null;
}

export const useCallStore = create<CallState>((set, get) => {
  function playStep(scenario: Scenario, stepIndex: number, activeAgentType: AgentType) {
    if (stepIndex >= scenario.steps.length) {
      setTimeout(async () => {
        const state = get();
        const session: CallSession = {
          id: sessionId,
          scenarioId: scenario.id,
          scenarioTitle: scenario.title,
          startedAt: Date.now() - state.callDuration * 1000,
          endedAt: Date.now(),
          transcript: state.transcript,
          agentTypes: [...new Set(state.transcript.map(t => t.agentType))],
        };
        await saveSession(session).catch(console.error);
        set({ isPlaying: false, isTransferring: false, lockInActive: false, bargeInActive: false });
        clearTimers();
      }, 1000);
      return;
    }

    const step = scenario.steps[stepIndex];
    set({ currentStepIndex: stepIndex });

    let nextAgent = activeAgentType;

    // Handle transfers
    if (step.action === 'transfer' && step.transferTo) {
      nextAgent = step.transferTo;
      set({ isTransferring: true, currentAgentType: nextAgent });
      setTimeout(() => set({ isTransferring: false }), 1500);
    } else if (step.agentType) {
      nextAgent = step.agentType;
      set({ currentAgentType: nextAgent });
    }

    // Handle special actions
    if (step.action === 'barge-in') set({ bargeInActive: true });
    if (step.action === 'lock-in') set({ lockInActive: true });
    if (step.action === 'noise-cancel') set({ noiseCancellation: true, vadActive: true });
    if (step.action === 'vad-trigger') set({ vadActive: true });

    timeoutId = setTimeout(() => {
      if (step.action === 'barge-in') {
        cancelSpeech();
        set({ bargeInActive: false, isSpeaking: false });
      }

      const speakerLabel =
        step.speaker === 'agent' ? 'Agent' :
        step.speaker === 'caller' ? 'Caller' : 'System';

      const entry: TranscriptEntry = {
        id: `${stepIndex}-${Date.now()}`,
        speaker: speakerLabel,
        text: step.text,
        timestamp: Date.now(),
        agentType: nextAgent,
      };

      set(state => ({ transcript: [...state.transcript, entry] }));

      if (step.speaker === 'agent') {
        const { cancel } = speak({
          text: step.text,
          agentType: nextAgent,
          engine: get().ttsEngine,
          onStart: () => set({ isSpeaking: true }),
          onEnd: () => {
            set({ isSpeaking: false });
            playStep(scenario, stepIndex + 1, nextAgent);
          },
        });
        cancelCurrentSpeech = cancel;
      } else if (step.speaker === 'system') {
        setTimeout(() => playStep(scenario, stepIndex + 1, nextAgent), 1500);
      } else {
        // Caller — simulate reading delay
        setTimeout(() => playStep(scenario, stepIndex + 1, nextAgent), step.text.length * 35 + 500);
      }
    }, step.delay);
  }

  return {
    isPlaying: false,
    isPaused: false,
    isSpeaking: false,
    currentStepIndex: 0,
    currentScenario: null,
    currentAgentType: 'orchestrator',
    callDuration: 0,
    transcript: [],
    ttsEngine: 'browser',
    isTransferring: false,
    bargeInActive: false,
    lockInActive: false,
    noiseCancellation: false,
    vadActive: false,

    setTTSEngine: (engine) => set({ ttsEngine: engine }),

    startScenario: (scenario) => {
      cancelSpeech();
      clearTimers();
      sessionId = `session-${Date.now()}`;

      set({
        currentScenario: scenario,
        currentAgentType: scenario.type,
        transcript: [],
        currentStepIndex: 0,
        isPlaying: true,
        isPaused: false,
        callDuration: 0,
        isTransferring: false,
        bargeInActive: false,
        lockInActive: false,
        noiseCancellation: false,
        vadActive: false,
      });

      durationInterval = setInterval(() => {
        set(state => ({ callDuration: state.callDuration + 1 }));
      }, 1000);

      playStep(scenario, 0, scenario.type);
    },

    stopScenario: () => {
      cancelSpeech();
      if (cancelCurrentSpeech) cancelCurrentSpeech();
      clearTimers();

      set({
        isPlaying: false,
        isPaused: false,
        isSpeaking: false,
        currentScenario: null,
        transcript: [],
        currentStepIndex: 0,
        callDuration: 0,
        isTransferring: false,
        bargeInActive: false,
        lockInActive: false,
        noiseCancellation: false,
        vadActive: false,
      });
    },

    togglePause: () => {
      const state = get();
      if (state.isPaused) {
        set({ isPaused: false });
        durationInterval = setInterval(() => {
          set(s => ({ callDuration: s.callDuration + 1 }));
        }, 1000);
        if (state.currentScenario) {
          playStep(state.currentScenario, state.currentStepIndex + 1, state.currentAgentType);
        }
      } else {
        set({ isPaused: true, isSpeaking: false });
        cancelSpeech();
        clearTimers();
      }
    },

    formattedDuration: () => {
      const s = get().callDuration;
      const mins = Math.floor(s / 60);
      const secs = s % 60;
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    },
  };
});
