"use client"

import { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Keyboard } from 'lucide-react';
import { useVoiceAgentStore } from '@/app/(tools)/multi-modal/stores/voiceAgentStore';

interface TextInputBarProps {
  onSend: (text: string) => void;
}

export function TextInputBar({ onSend }: TextInputBarProps) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { isProcessing } = useVoiceAgentStore();

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || isProcessing) return;
    onSend(trimmed);
    setValue('');
  };

  return (
    <div className="mt-3 pt-3 border-t border-border/50">
      <div className="flex items-center gap-2">
        <Keyboard className="w-4 h-4 text-muted-foreground shrink-0" />
        <Input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type name, email, or message here..."
          disabled={isProcessing}
          className="flex-1 h-9 text-sm bg-secondary/50 border-border/50"
        />
        <Button
          size="sm"
          variant="ghost"
          onClick={handleSend}
          disabled={!value.trim() || isProcessing}
          className="h-9 w-9 p-0 shrink-0"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
      <p className="text-xs text-muted-foreground mt-1.5 ml-6">
        Use this to type names, emails, or details the agent needs accurately.
      </p>
    </div>
  );
}
