"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Phone, PhoneOff, Pause, Play, Volume2 } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface TranscriptEntry {
  speaker: string;
  text: string;
}

interface CallInterfaceProps {
  isPlaying: boolean;
  isPaused: boolean;
  isSpeaking: boolean;
  transcript: TranscriptEntry[];
  currentAgentType: '911' | '311' | 'orchestrator';
  formattedDuration: string;
  onStop: () => void;
  onTogglePause: () => void;
}

const agentColors = {
  '911': { ring: 'border-emergency', bg: 'bg-emergency', text: 'text-emergency', label: '911 Emergency' },
  '311': { ring: 'border-services', bg: 'bg-services', text: 'text-services', label: '311 Services' },
  'orchestrator': { ring: 'border-dispatch', bg: 'bg-dispatch', text: 'text-dispatch', label: 'Routing' },
};

const WaveformVisualizer = ({ active }: { active: boolean }) => (
  <div className="flex items-center gap-[3px] h-8">
    {Array.from({ length: 5 }).map((_, i) => (
      <motion.div
        key={i}
        className="w-[3px] rounded-full bg-primary"
        animate={active ? {
          height: [8, 24, 12, 28, 8],
        } : {
          height: 4,
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: i * 0.15,
          ease: 'easeInOut',
        }}
      />
    ))}
  </div>
);

export const CallInterface = ({
  isPlaying,
  isPaused,
  isSpeaking,
  transcript,
  currentAgentType,
  formattedDuration,
  onStop,
  onTogglePause,
}: CallInterfaceProps) => {
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const colors = agentColors[currentAgentType];

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Call Header */}
      <div className="bg-card border border-border rounded-t-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className={`w-12 h-12 rounded-full ${colors.bg}/15 flex items-center justify-center`}>
                <Phone className={`w-5 h-5 ${colors.text}`} />
              </div>
              {isPlaying && !isPaused && (
                <motion.div
                  className={`absolute inset-0 rounded-full border-2 ${colors.ring}/40`}
                  animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </div>
            <div>
              <p className={`font-mono text-sm font-bold ${colors.text}`}>{colors.label}</p>
              <p className="text-xs text-muted-foreground">
                {isPaused ? 'PAUSED' : 'ACTIVE CALL'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {isSpeaking && <Volume2 className={`w-4 h-4 ${colors.text} animate-pulse`} />}
              <WaveformVisualizer active={isSpeaking && !isPaused} />
            </div>
            <span className="font-mono text-lg text-foreground tabular-nums">{formattedDuration}</span>
          </div>
        </div>

        {/* Transcript */}
        <div className="bg-background/50 rounded-xl border border-border p-4 h-[350px] overflow-y-auto">
          <AnimatePresence mode="popLayout">
            {transcript.map((entry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`mb-3 ${entry.speaker === 'System' ? 'text-center' : ''}`}
              >
                {entry.speaker === 'System' ? (
                  <span className="text-xs font-mono text-dispatch px-3 py-1 bg-dispatch/10 rounded-full">
                    {entry.text}
                  </span>
                ) : (
                  <div className={`flex ${entry.speaker === 'Caller' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                      entry.speaker === 'Caller'
                        ? 'bg-muted text-foreground rounded-br-md'
                        : `${colors.bg}/10 ${colors.text} rounded-bl-md`
                    }`}>
                      <p className="text-[10px] font-mono font-bold uppercase tracking-wider opacity-60 mb-1">
                        {entry.speaker}
                      </p>
                      <p className="text-sm leading-relaxed">{entry.text}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={transcriptEndRef} />
        </div>
      </div>

      {/* Call Controls */}
      <div className="bg-card border border-t-0 border-border rounded-b-2xl p-4">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={onTogglePause}
            className="w-12 h-12 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
          >
            {isPaused ? <Play className="w-5 h-5 text-foreground" /> : <Pause className="w-5 h-5 text-foreground" />}
          </button>
          <button
            onClick={onStop}
            className="w-14 h-14 rounded-full bg-destructive hover:bg-destructive/90 flex items-center justify-center transition-colors"
          >
            <PhoneOff className="w-6 h-6 text-destructive-foreground" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
