"use client";

import { useCallStore } from '@/app/(tools)/customer-support/stores/callStore';
import type { TTSEngine } from '@/app/(tools)/customer-support/lib/schemas';

const engines: { id: TTSEngine; label: string; desc: string }[] = [
  { id: 'browser', label: 'Browser', desc: 'Built-in SpeechSynthesis' },
  { id: 'openai', label: 'OpenAI', desc: 'Coming soon' },
  { id: 'elevenlabs', label: 'ElevenLabs', desc: 'Coming soon' },
];

export function TTSSelector() {
  const { ttsEngine, setTTSEngine } = useCallStore();

  return (
    <div className="glass-panel p-4 space-y-3">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">TTS Engine</h3>
      <div className="flex gap-2">
        {engines.map(e => (
          <button
            key={e.id}
            onClick={() => setTTSEngine(e.id)}
            className={`flex-1 p-2 rounded-lg text-center transition-all ${
              ttsEngine === e.id
                ? 'bg-primary/10 border border-primary/30 text-primary'
                : 'bg-muted/50 border border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className="text-xs font-semibold block">{e.label}</span>
            <span className="text-[10px] block mt-0.5 opacity-70">{e.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
