"use client";

import { useCallStore } from '@/app/(tools)/customer-support/stores/callStore';
import { Play, Square, Pause, Phone, Clock, Mic, MicOff, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CallControls() {
  const {
    isPlaying, isPaused, isSpeaking, formattedDuration,
    stopScenario, togglePause, bargeInActive, lockInActive,
    noiseCancellation, vadActive, currentScenario,
  } = useCallStore();
  const duration = formattedDuration();

  if (!isPlaying) return null;

  return (
    <div className="glass-panel p-4 animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Phone className="w-5 h-5 text-status-active" />
            {isSpeaking && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-status-speaking animate-ping" />
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{currentScenario?.title}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span className="font-mono">{duration}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={togglePause} className="h-8 w-8 p-0">
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </Button>
          <Button size="sm" variant="destructive" onClick={stopScenario} className="h-8 w-8 p-0">
            <Square className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Status indicators */}
      <div className="flex items-center gap-3 flex-wrap">
        {isSpeaking && (
          <div className="flex items-center gap-1.5">
            <div className="flex items-end gap-0.5 h-4">
              {[0, 1, 2, 3, 4].map(i => (
                <div key={i} className="waveform-bar" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
            <span className="text-xs text-primary font-mono">SPEAKING</span>
          </div>
        )}
        {bargeInActive && (
          <div className="flex items-center gap-1 text-xs text-destructive font-mono">
            <Zap className="w-3 h-3" /> BARGE-IN
          </div>
        )}
        {lockInActive && (
          <div className="flex items-center gap-1 text-xs text-status-active font-mono">
            <Shield className="w-3 h-3" /> LOCK-IN
          </div>
        )}
        {noiseCancellation && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
            <MicOff className="w-3 h-3" /> NC
          </div>
        )}
        {vadActive && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
            <Mic className="w-3 h-3" /> VAD
          </div>
        )}
      </div>
    </div>
  );
}
