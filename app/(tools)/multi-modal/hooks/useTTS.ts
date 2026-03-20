"use client"

import { useCallback, useRef } from 'react';

interface UseTTSOptions {
  onStart?: () => void;
  onEnd?: () => void;
}

export function useTTS({ onStart, onEnd }: UseTTSOptions = {}) {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback((text: string) => {
    window.speechSynthesis.cancel();
    // Strip markdown formatting so TTS doesn't read asterisks, hashes, etc.
    const clean = text
      .replace(/\*\*(.+?)\*\*/g, '$1')  // bold
      .replace(/\*(.+?)\*/g, '$1')      // italic
      .replace(/__(.+?)__/g, '$1')      // bold alt
      .replace(/_(.+?)_/g, '$1')        // italic alt
      .replace(/~~(.+?)~~/g, '$1')      // strikethrough
      .replace(/`(.+?)`/g, '$1')        // inline code
      .replace(/^#{1,6}\s+/gm, '')      // headings
      .replace(/^\s*[-*+]\s+/gm, '')    // list items
      .replace(/^\s*\d+\.\s+/gm, '')    // numbered lists
      .replace(/\[(.+?)\]\(.+?\)/g, '$1') // links
      .replace(/\n{2,}/g, '. ')         // paragraph breaks to pauses
      .trim();
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Try to pick a good English voice
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v => v.lang.startsWith('en') && v.name.includes('Google')) 
      || voices.find(v => v.lang.startsWith('en'));
    if (preferred) utterance.voice = preferred;

    utterance.onstart = () => onStart?.();
    utterance.onend = () => onEnd?.();
    utterance.onerror = () => onEnd?.();

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [onStart, onEnd]);

  const cancel = useCallback(() => {
    window.speechSynthesis.cancel();
  }, []);

  const reset = useCallback(() => {
    window.speechSynthesis.cancel();
    utteranceRef.current = null;
  }, []);

  return { speak, cancel, reset };
}
