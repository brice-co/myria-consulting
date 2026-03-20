"use client"

import { useCallback } from 'react';
import { useVoiceAgentStore } from '../stores/voiceAgentStore';
import { useSpeechRecognition } from './useSpeechRecognition';
import { useTTS } from './useTTS';
import { useAgentAI } from './useAgentAI';
import { toast } from 'sonner';

export function useVoiceAgent() {
  const store = useVoiceAgentStore();

  const tts = useTTS({
    onStart: () => store.setSpeaking(true),
    onEnd: () => {
      store.setSpeaking(false);
      stt.resume();
    },
  });

  const ai = useAgentAI({
    onResponse: (text) => {
      store.addTranscriptEntry({
        speaker: 'Agent',
        text,
        timestamp: Date.now(),
        agentType: 'orchestrator',
      });
      stt.pause();
      tts.speak(text);
    },
    onError: () => {
      stt.resume();
    },
  });

  const stt = useSpeechRecognition({
    onResult: (text) => {
      if (store.isMuted || store.isSpeaking) return;
      store.addTranscriptEntry({ speaker: 'User', text, timestamp: Date.now() });
      store.setProcessing(true);
      stt.pause();
      ai.sendMessage(text);
    },
    onUserSpeaking: (v) => store.setUserSpeaking(v),
  });

  const startSession = useCallback(async () => {
    tts.reset();
    ai.reset();
    store.startSession();

    try {
      await stt.start();
      store.setListening(true);

      const greeting = "Hello! I'm your multi-agent voice assistant. I can search the web, open URLs, and send emails. What would you like me to do?";
      store.addTranscriptEntry({
        speaker: 'Agent',
        text: greeting,
        timestamp: Date.now(),
        agentType: 'orchestrator',
      });
      stt.pause();
      tts.speak(greeting);
    } catch (err) {
      console.error('Failed to start:', err);
      toast( 'Could not access microphone');
      store.setListening(false);
    }
  }, [store, stt, tts, ai]);

  const endSession = useCallback(async () => {
    tts.cancel();
    stt.stop();
    await store.endSession();
    toast( 'Session ended');
  }, [store, tts, stt]);

  const toggleMute = useCallback(() => {
    const newMuted = !store.isMuted;
    store.setMuted(newMuted);
    if (newMuted) {
      tts.cancel();
      store.setSpeaking(false);
    }
  }, [store, tts]);

  const sendTextMessage = useCallback((text: string) => {
    if (!store.isActive) return;
    store.addTranscriptEntry({ speaker: 'User', text, timestamp: Date.now() });
    store.setProcessing(true);
    stt.pause();
    ai.sendMessage(text);
  }, [store, stt, ai]);

  return { startSession, endSession, toggleMute, sendTextMessage };
}
