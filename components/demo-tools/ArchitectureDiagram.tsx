"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Mic, Brain, MessageSquare, Zap, Database, Share2 } from "lucide-react";
import { AgentNode } from "./AgentNode";

const nodes = [
  { id: "voice", icon: Mic, label: "Voice Input", description: "Speech recognition" },
  { id: "brain", icon: Brain, label: "AI Agent", description: "Processing & reasoning" },
  { id: "tools", icon: Zap, label: "Tools/MCP", description: "External integrations" },
  { id: "memory", icon: Database, label: "Memory", description: "Context storage" },
  { id: "multi", icon: Share2, label: "Multi-Agent", description: "Orchestration" },
  { id: "output", icon: MessageSquare, label: "Response", description: "Voice synthesis" },
];

export const ArchitectureDiagram = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % nodes.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card p-8 relative overflow-hidden bg-background">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-primary/5 rounded-full blur-3xl" />
      </div>
      
      <h3 className="text-lg font-semibold mb-6 text-center">Voice Agent Architecture</h3>
      
      <div className="relative">
        {/* Center connection hub */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Lines connecting nodes */}
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const angle = (i * 60 - 90) * (Math.PI / 180);
            const centerX = 50;
            const centerY = 50;
            const radius = 35;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            
            return (
              <motion.line
                key={i}
                x1={`${centerX}%`}
                y1={`${centerY}%`}
                x2={`${x}%`}
                y2={`${y}%`}
                stroke="url(#connectionGradient)"
                strokeWidth="1"
                initial={{ opacity: 0.2 }}
                animate={{ 
                  opacity: activeIndex === i ? 0.8 : 0.2,
                  strokeWidth: activeIndex === i ? 2 : 1
                }}
                transition={{ duration: 0.3 }}
              />
            );
          })}
        </svg>

        {/* Nodes arranged in a circle */}
        <div className="grid grid-cols-3 gap-4 relative z-10">
          {nodes.slice(0, 3).map((node, i) => (
            <AgentNode
              key={node.id}
              icon={node.icon}
              label={node.label}
              description={node.description}
              isActive={activeIndex === i}
              delay={i * 0.1}
            />
          ))}
        </div>
        
        <div className="flex justify-center my-4">
          <motion.div
            className="w-16 h-16 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center"
            animate={{ 
              boxShadow: [
                "0 0 20px hsl(var(--primary) / 0.3)",
                "0 0 40px hsl(var(--primary) / 0.5)",
                "0 0 20px hsl(var(--primary) / 0.3)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Brain className="w-8 h-8 text-primary" />
          </motion.div>
        </div>

        <div className="grid grid-cols-3 gap-4 relative z-10">
          {nodes.slice(3).map((node, i) => (
            <AgentNode
              key={node.id}
              icon={node.icon}
              label={node.label}
              description={node.description}
              isActive={activeIndex === i + 3}
              delay={(i + 3) * 0.1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
