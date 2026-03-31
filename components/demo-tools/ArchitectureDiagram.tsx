"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Mic, Brain, MessageSquare, Zap, Database, Share2 } from "lucide-react";
import { AgentNode } from "./AgentNode";

const nodes = [
  { id: "input", icon: Mic, label: "Input Layer", description: "Voice, text, APIs" },
  { id: "brain", icon: Brain, label: "AI Agent", description: "Reasoning & decisions" },
  { id: "tools", icon: Zap, label: "Tools", description: "APIs, actions, workflows" },
  { id: "memory", icon: Database, label: "Memory", description: "Context & history" },
  { id: "multi", icon: Share2, label: "Orchestration", description: "Multi-agent coordination" },
  { id: "output", icon: MessageSquare, label: "Output Layer", description: "Responses & actions" },
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
      
      <h3 className="text-lg font-semibold mb-6 text-center">
        What a Real AI System Looks Like</h3>

      <div className="text-center max-w-3xl mx-auto mb-12">
        <p className="text-sm text-cyan-400 mb-2">
          Most teams never design this
       </p>

      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        AI Isn’t a Model. It’s a System.
      </h2>

      <p className="text-muted-foreground text-lg">
        Real AI systems require orchestration, memory, tools, and control layers.
        Without this, they break, drift, and fail at scale.
    </p>
</div>
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
  stroke="#00f5c4"
  strokeWidth="1"
  strokeOpacity={activeIndex === i ? 0.9 : 0.25}
  initial={{ opacity: 0.2 }}
  animate={{
    opacity: activeIndex === i ? 0.9 : 0.25,
    strokeWidth: activeIndex === i ? 2.5 : 1,
  }}
  transition={{ duration: 0.3 }}
  style={{
    filter: activeIndex === i
      ? "drop-shadow(0 0 6px #00f5c4) drop-shadow(0 0 12px #00d4ff)"
      : "drop-shadow(0 0 2px #00f5c4)",
  }}
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
      <div className="text-center mt-10">
    <a
      href="/start-assessment"
      className="inline-flex items-center justify-center rounded-xl bg-cyan-600 px-8 py-4 font-medium text-white hover:bg-cyan-500 transition"
    >
      See Where Your System Breaks
    </a>

    <p className="text-sm text-muted-foreground mt-3">
    Get your AI Governance Score in 2 minutes
   </p>
</div>
    </div>
  );
};
