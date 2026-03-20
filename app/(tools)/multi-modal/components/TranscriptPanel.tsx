"use client"

import { useVoiceAgentStore } from '@/app/(tools)/multi-modal/stores/voiceAgentStore';
import { ScrollArea } from '@/components/ui/scroll-area';
import { agentLabels } from '@/app/(tools)/multi-modal/lib/types';
import { useEffect, useRef } from 'react';

export function TranscriptPanel() {
  const { transcript } = useVoiceAgentStore();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript.length]);

  if (transcript.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground font-mono text-sm">
        Multi-Agent • Tool Calling • Browser-based Speech-to-Text <br />
        Conversation will appear here...
      </div>
      
    );
  }

  return (
    <ScrollArea className="flex-1 pr-3">
      <div className="space-y-3 py-2">
        {transcript.map((entry) => (
          <div
            key={entry.id}
            className={`flex gap-3 ${entry.speaker === 'User' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2.5 text-sm ${
                entry.speaker === 'User'
                  ? 'bg-primary/15 text-foreground border border-primary/20'
                  : entry.speaker === 'System'
                  ? 'bg-accent/10 text-accent border border-accent/20 font-mono text-xs'
                  : 'bg-secondary text-secondary-foreground border border-border'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-semibold ${
                  entry.speaker === 'User' ? 'text-primary' : entry.speaker === 'System' ? 'text-accent' : 'text-muted-foreground'
                }`}>
                  {entry.speaker === 'Agent' && entry.agentType
                    ? agentLabels[entry.agentType]
                    : entry.speaker}
                </span>
                <span className="text-xs text-muted-foreground font-mono">
                  {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="leading-relaxed">{entry.text}</p>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}
