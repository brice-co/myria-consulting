"use client";

import { useCallStore } from '@/app/(tools)/customer-support/stores/callStore';
import { scenarios } from '@/app/(tools)/customer-support/lib/scenarios';
import { agentLabels, type AgentType } from '@/app/(tools)/customer-support/lib/schemas';
import { Play, ArrowRightLeft, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categoryIcons: Record<string, typeof Play> = {
  Billing: ArrowRightLeft,
  Technical: Zap,
  Retention: Shield,
};

const categoryColor: Record<string, string> = {
  Billing: 'text-agent-billing',
  Technical: 'text-agent-technical',
  Retention: 'text-agent-retention',
};

export function ScenarioSelector() {
  const { isPlaying, startScenario } = useCallStore();

  return (
    <div className="glass-panel p-4 space-y-3">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Scenarios</h3>
      <div className="space-y-2">
        {scenarios.map((scenario) => {
          const Icon = categoryIcons[scenario.category] || Play;
          const color = categoryColor[scenario.category] || 'text-primary';

          const transferSteps = scenario.steps.filter(s => s.action === 'transfer');
          const agentPath = [scenario.type as AgentType, ...transferSteps.map(s => s.transferTo!)];

          return (
            <div key={scenario.id} className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2 flex-1 min-w-0">
                  <Icon className={`w-4 h-4 mt-0.5 ${color} shrink-0`} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{scenario.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{scenario.description}</p>
                    <div className="flex items-center gap-1 mt-2 flex-wrap">
                      {agentPath.map((agent, i) => (
                        <span key={i} className="flex items-center gap-1">
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground">
                            {agentLabels[agent]}
                          </span>
                          {i < agentPath.length - 1 && (
                            <span className="text-muted-foreground text-[10px]">→</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={isPlaying}
                  onClick={() => startScenario(scenario)}
                  className="h-8 w-8 p-0 shrink-0"
                >
                  <Play className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
