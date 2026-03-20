import type { AgentType, TTSEngine } from './schemas';

interface TTSOptions {
  text: string;
  agentType: AgentType;
  engine: TTSEngine;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: Error) => void;
}

const agentVoiceConfig: Record<AgentType, { rate: number; pitch: number }> = {
  orchestrator: { rate: 1.05, pitch: 1.0 },
  billing: { rate: 0.95, pitch: 1.15 },
  technical: { rate: 1.1, pitch: 0.9 },
  retention: { rate: 0.9, pitch: 1.1 },
};

export function speak(options: TTSOptions): { cancel: () => void } {
  const { text, agentType, engine, onStart, onEnd, onError } = options;

  // For now, all engines fall back to browser SpeechSynthesis
  // OpenAI and ElevenLabs integration points are structured for future implementation
  if (engine === 'openai' || engine === 'elevenlabs') {
    console.info(`[TTS] ${engine} engine selected — falling back to browser SpeechSynthesis (configure API keys to enable)`);
  }

  return speakBrowser(text, agentType, onStart, onEnd, onError);
}

function speakBrowser(
  text: string,
  agentType: AgentType,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (error: Error) => void,
): { cancel: () => void } {
  if (!('speechSynthesis' in window)) {
    onEnd?.();
    return { cancel: () => {} };
  }

  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);

  const voices = speechSynthesis.getVoices();
  const preferredVoice =
    voices.find(v => v.name === 'Google US English') ||
    voices.find(v => v.name.includes('Google') && v.lang === 'en-US') ||
    voices.find(v => v.lang === 'en-US') ||
    voices.find(v => v.lang.startsWith('en'));
  if (preferredVoice) utterance.voice = preferredVoice;

  const config = agentVoiceConfig[agentType];
  utterance.rate = config.rate;
  utterance.pitch = config.pitch;

  utterance.onstart = () => onStart?.();
  utterance.onend = () => onEnd?.();
  utterance.onerror = () => {
    onError?.(new Error('SpeechSynthesis error'));
    onEnd?.();
  };

  speechSynthesis.speak(utterance);

  return {
    cancel: () => {
      speechSynthesis.cancel();
      onEnd?.();
    },
  };
}

export function cancelSpeech() {
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
  }
}
