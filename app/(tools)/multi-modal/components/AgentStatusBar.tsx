"use client"

import { useVoiceAgentStore } from '@/app/(tools)/multi-modal/stores/voiceAgentStore';
import { agentLabels } from '@/app/(tools)/multi-modal/lib/types';
import { Bot, Search, Mail, Globe } from 'lucide-react';
import type { AgentType } from '@/app/(tools)/multi-modal/lib/types';

const agentIcons: Record<AgentType, React.ComponentType<{ className?: string }>> = {
  orchestrator: Bot,
  search: Search,
  email: Mail,
  browser: Globe,
};

const agentColorClasses: Record<AgentType, string> = {
  orchestrator: 'bg-agent-general/15 text-agent-general border-agent-general/30',
  search: 'bg-agent-search/15 text-agent-search border-agent-search/30',
  email: 'bg-agent-email/15 text-agent-email border-agent-email/30',
  browser: 'bg-agent-browser/15 text-agent-browser border-agent-browser/30',
};

export function AgentStatusBar() {
  const { activeAgents, isActive } = useVoiceAgentStore();

  if (!isActive) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {activeAgents.map((agent) => {
        const Icon = agentIcons[agent];
        return (
          <div
            key={agent}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono border ${agentColorClasses[agent]}`}
          >
            <Icon className="w-3 h-3" />
            {agentLabels[agent]}
          </div>
        );
      })}
    </div>
  );
}
