"use client";

import { motion } from 'framer-motion';
import { Scenario } from '@/app/(tools)/emergency-call/lib/scenarios';
import { Phone } from 'lucide-react';

interface ScenarioCardProps {
  scenario: Scenario;
  onSelect: (scenario: Scenario) => void;
  index: number;
}

const typeStyles = {
  '911': 'border-emergency/30 hover:border-emergency/60 hover:shadow-[0_0_30px_-5px_hsl(var(--emergency)/0.3)]',
  '311': 'border-services/30 hover:border-services/60 hover:shadow-[0_0_30px_-5px_hsl(var(--services)/0.3)]',
  'orchestrator': 'border-dispatch/30 hover:border-dispatch/60 hover:shadow-[0_0_30px_-5px_hsl(var(--dispatch)/0.3)]',
};

const typeBadgeStyles = {
  '911': 'bg-emergency/15 text-emergency',
  '311': 'bg-services/15 text-services',
  'orchestrator': 'bg-dispatch/15 text-dispatch',
};

export const ScenarioCard = ({ scenario, onSelect, index }: ScenarioCardProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      onClick={() => onSelect(scenario)}
      className={`w-full text-left p-5 rounded-xl border bg-card transition-all duration-300 group cursor-pointer ${typeStyles[scenario.type]}`}
    >
      <div className="flex items-start gap-4">
        <span className="text-3xl">{scenario.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <h3 className="font-semibold text-card-foreground truncate">{scenario.title}</h3>
            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${typeBadgeStyles[scenario.type]}`}>
              {scenario.type}
            </span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{scenario.description}</p>
          <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground">
            <Phone className="w-3 h-3" />
            <span>{scenario.steps.length} exchanges</span>
          </div>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Phone className="w-4 h-4 text-primary" />
          </div>
        </div>
      </div>
    </motion.button>
  );
};
