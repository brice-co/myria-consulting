"use client";

import { useCallStore } from '@/app/(tools)/customer-support/stores/callStore';
import { useRef, useEffect } from 'react';
import type { AgentType } from '@/app/(tools)/customer-support/lib/schemas';

const speakerStyles: Record<string, { color: string; align: string }> = {
  Agent: { color: 'text-primary', align: 'text-left' },
  Caller: { color: 'text-foreground', align: 'text-right' },
  System: { color: 'text-muted-foreground', align: 'text-center' },
};

const agentBadgeColor: Record<AgentType, string> = {
  orchestrator: 'bg-agent-orchestrator/20 text-agent-orchestrator',
  billing: 'bg-agent-billing/20 text-agent-billing',
  technical: 'bg-agent-technical/20 text-agent-technical',
  retention: 'bg-agent-retention/20 text-agent-retention',
};

export function TranscriptPanel() {
  const { transcript, isPlaying } = useCallStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcript]);

  return (
    <div className="glass-panel flex flex-col h-full">
      <div className="p-4 border-b border-border/50">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Live Transcript
        </h3>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
        {transcript.length === 0 && !isPlaying && (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground text-sm">Select a scenario to begin</p>
          </div>
        )}
        {transcript.map((entry) => {
          const style = speakerStyles[entry.speaker] || speakerStyles.System;
          const isSystem = entry.speaker === 'System';

          return (
            <div key={entry.id} className={`animate-slide-in ${style.align}`}>
              {isSystem ? (
                <div className="flex items-center justify-center gap-2 py-1">
                  <div className="h-px flex-1 bg-border/50" />
                  <span className="text-xs font-mono text-muted-foreground px-2">{entry.text}</span>
                  <div className="h-px flex-1 bg-border/50" />
                </div>
              ) : (
                <div className={`inline-block max-w-[85%] ${entry.speaker === 'Caller' ? 'ml-auto' : ''}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-semibold ${style.color}`}>{entry.speaker}</span>
                    {entry.speaker === 'Agent' && (
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${agentBadgeColor[entry.agentType]}`}>
                        {entry.agentType.toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className={`text-sm p-3 rounded-xl ${
                    entry.speaker === 'Caller'
                      ? 'bg-secondary text-secondary-foreground'
                      : 'bg-muted text-foreground'
                  }`}>
                    {entry.text}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
