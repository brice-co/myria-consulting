"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Shield } from 'lucide-react';
import { scenarios, Scenario } from '@/app/(tools)/emergency-call/lib/scenarios';
import { ScenarioCard } from '@/app/(tools)/emergency-call/components/ScenarioCard';
import { CallInterface } from '@/app/(tools)/emergency-call/components/CallInterface';
import { useScenarioPlayer } from '@/app/(tools)/emergency-call/hooks/useScenarioPlayer';

const EmergencyCall = () => {
  const [filter, setFilter] = useState<'all' | '911' | '311' | 'orchestrator'>('all');
  const player = useScenarioPlayer();

  const filtered = filter === 'all' ? scenarios : scenarios.filter(s => s.type === filter);

  const handleSelect = (scenario: Scenario) => {
    player.startScenario(scenario);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-services/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-card mb-6">
            <Radio className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Dispatch Simulator</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3 tracking-tight">
            Emergency Dispatch
            <span className="text-primary"> Training</span>
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Pre-recorded 911 & 311 call scenarios. No API key required — listen to realistic dispatch conversations.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {player.isPlaying ? (
            <CallInterface
              key="call"
              isPlaying={player.isPlaying}
              isPaused={player.isPaused}
              isSpeaking={player.isSpeaking}
              transcript={player.transcript}
              currentAgentType={player.currentAgentType}
              formattedDuration={player.formattedDuration}
              onStop={player.stopScenario}
              onTogglePause={player.togglePause}
            />
          ) : (
            <motion.div
              key="scenarios"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Filters */}
              <div className="flex items-center justify-center gap-2 mb-8">
                {(['all', '911', '311', 'orchestrator'] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filter === f
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card border border-border text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {f === 'all' ? 'All' : f === 'orchestrator' ? 'Routing' : f}
                  </button>
                ))}
              </div>

              {/* Scenario Grid */}
              <div className="grid gap-3">
                {filtered.map((scenario, i) => (
                  <ScenarioCard
                    key={scenario.id}
                    scenario={scenario}
                    onSelect={handleSelect}
                    index={i}
                  />
                ))}
              </div>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-12 text-center"
              >
                <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="w-3.5 h-3.5" />
                  <span>All scenarios are pre-recorded simulations for training purposes only</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EmergencyCall;
