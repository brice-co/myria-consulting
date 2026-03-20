"use client"

import { useVoiceAgentStore } from '@/app/(tools)/multi-modal/stores/voiceAgentStore';
import { Mic, MicOff, Phone, PhoneOff } from 'lucide-react';

interface VoiceOrbProps {
  onStart: () => void;
  onEnd: () => void;
  onToggleMute: () => void;
}

export function VoiceOrb({ onStart, onEnd, onToggleMute }: VoiceOrbProps) {
  const { isActive, isListening, isSpeaking, isProcessing, isUserSpeaking, isMuted } = useVoiceAgentStore();

  const orbState = isSpeaking
    ? 'speaking'
    : isProcessing
    ? 'processing'
    : isUserSpeaking
    ? 'user-speaking'
    : isListening
    ? 'listening'
    : 'idle';

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Main Orb */}
      <button
        onClick={isActive ? onEnd : onStart}
        className={`
          relative w-32 h-32 rounded-full flex items-center justify-center
          transition-all duration-500 cursor-pointer
          ${!isActive
            ? 'bg-primary/20 hover:bg-primary/30 border-2 border-primary/40'
            : orbState === 'speaking'
            ? 'bg-primary/30 animate-pulse-glow border-2 border-primary'
            : orbState === 'processing'
            ? 'bg-accent/20 border-2 border-accent/60 animate-pulse'
            : orbState === 'user-speaking'
            ? 'bg-primary/40 border-2 border-primary glow-primary'
            : 'bg-primary/10 border-2 border-primary/30'
          }
        `}
      >
        {/* Inner glow rings */}
        {isActive && (
          <>
            <div className={`absolute inset-0 rounded-full border border-primary/20 animate-ping`} style={{ animationDuration: '2s' }} />
            <div className={`absolute inset-2 rounded-full border border-primary/10 animate-ping`} style={{ animationDuration: '3s' }} />
          </>
        )}

        {isActive ? (
          <PhoneOff className="w-10 h-10 text-destructive relative z-10" />
        ) : (
          <Phone className="w-10 h-10 text-primary relative z-10" />
        )}
      </button>

      {/* Status */}
      <p className="text-sm font-mono text-muted-foreground">
        {!isActive ? 'Tap to start' : orbState === 'speaking' ? '🔊 Agent speaking...' : orbState === 'processing' ? '⚡ Processing...' : orbState === 'user-speaking' ? '🎙️ Listening...' : '👂 Waiting...'}
      </p>

      {/* Controls row */}
      {isActive && (
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMute}
            className={`p-3 rounded-full transition-colors ${isMuted ? 'bg-destructive/20 text-destructive' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
          <button
            onClick={onEnd}
            className="px-5 py-2.5 rounded-full bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors font-mono text-sm flex items-center gap-2 border border-destructive/30"
          >
            <PhoneOff className="w-4 h-4" />
            End Call
          </button>
        </div>
      )}
    </div>
  );
}
