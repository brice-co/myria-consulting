"use client";

import { useCallStore } from '@/app/(tools)/customer-support/stores/callStore';
import { agentLabels, agentDescriptions, type AgentType } from '@/app/(tools)/customer-support/lib/schemas';
import { Headphones, ArrowRightLeft, Shield, Volume2 } from 'lucide-react';

const agentIcons: Record<AgentType, typeof Headphones> = {
  orchestrator: Headphones,
  billing: ArrowRightLeft,
  technical: Shield,
  retention: Volume2,
};

const agentColorClass: Record<AgentType, string> = {
  orchestrator: 'text-agent-orchestrator',
  billing: 'text-agent-billing',
  technical: 'text-agent-technical',
  retention: 'text-agent-retention',
};

const agentBgClass: Record<AgentType, string> = {
  orchestrator: 'bg-agent-orchestrator',
  billing: 'bg-agent-billing',
  technical: 'bg-agent-technical',
  retention: 'bg-agent-retention',
};

const agents: AgentType[] = ['orchestrator', 'billing', 'technical', 'retention'];

export function AgentPanel() {
  const { currentAgentType, isPlaying, isSpeaking, isTransferring } = useCallStore();

  return (
    <div className="glass-panel p-4 space-y-3">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Agents</h3>
      <div className="space-y-2">
        {agents.map((agent) => {
          const Icon = agentIcons[agent];
          const isActive = isPlaying && currentAgentType === agent;
          const isCurrentlySpeaking = isActive && isSpeaking;
          const isCurrentlyTransferring = isTransferring && currentAgentType === agent;

          return (
            <div
              key={agent}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                isActive
                  ? 'bg-secondary/80 border border-border'
                  : 'bg-transparent'
              }`}
            >
              <div className={`p-2 rounded-lg ${isActive ? agentBgClass[agent] + '/20' : 'bg-muted'}`}>
                <Icon className={`w-4 h-4 ${isActive ? agentColorClass[agent] : 'text-muted-foreground'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-medium ${isActive ? agentColorClass[agent] : 'text-foreground'}`}>
                  {agentLabels[agent]}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {agentDescriptions[agent]}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isCurrentlyTransferring && (
                  <span className="text-xs font-mono text-status-transferring animate-pulse">XFER</span>
                )}
                <div
                  className={`status-dot ${
                    isCurrentlySpeaking ? 'status-speaking' :
                    isCurrentlyTransferring ? 'status-transferring' :
                    isActive ? 'status-active' : 'status-idle'
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
