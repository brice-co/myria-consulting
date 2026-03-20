"use client"

import { useVoiceAgentStore } from '@/app/(tools)/multi-modal/stores/voiceAgentStore';
import { Globe, Mail, Search, Loader2, CheckCircle, XCircle } from 'lucide-react';

const toolIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  open_url: Globe,
  send_email: Mail,
  web_search: Search,
};

const toolColors: Record<string, string> = {
  open_url: 'text-agent-browser',
  send_email: 'text-agent-email',
  web_search: 'text-agent-search',
};

export function ToolCallsPanel() {
  const { toolCalls } = useVoiceAgentStore();

  if (toolCalls.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Tool Calls</h3>
      <div className="space-y-1.5">
        {toolCalls.map((tc) => {
          const Icon = toolIcons[tc.name] || Globe;
          const color = toolColors[tc.name] || 'text-muted-foreground';
          return (
            <div
              key={tc.id}
              className="flex items-center gap-2 px-3 py-2 rounded-md bg-secondary/50 border border-border/50 text-sm"
            >
              <Icon className={`w-4 h-4 ${color} shrink-0`} />
              <span className="font-mono text-xs truncate flex-1">
                {tc.name}({JSON.stringify(tc.arguments).slice(0, 60)}...)
              </span>
              {tc.status === 'running' && <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />}
              {tc.status === 'completed' && <CheckCircle className="w-3.5 h-3.5 text-primary" />}
              {tc.status === 'error' && <XCircle className="w-3.5 h-3.5 text-destructive" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
