"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Bot, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

const agents = [
  { id: "coordinator", name: "Coordinator", color: "primary" },
  { id: "researcher", name: "Researcher", color: "secondary" },
  { id: "analyzer", name: "Analyzer", color: "primary" },
  { id: "executor", name: "Executor", color: "secondary" },
];

export const MultiAgentFlow = () => {
  const [activeAgent, setActiveAgent] = useState(0);
  const [completedAgents, setCompletedAgents] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAgent((prev) => {
        const next = (prev + 1) % agents.length;
        if (next === 0) {
          setCompletedAgents([]);
        } else {
          setCompletedAgents((completed) => [...completed, prev]);
        }
        return next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card p-6 bg-background">
      <h3 className="text-lg font-semibold mb-6 text-center">Multi-Agent Orchestration</h3>
      
      <div className="flex items-center justify-between gap-2">
        {agents.map((agent, index) => {
          const isActive = activeAgent === index;
          const isCompleted = completedAgents.includes(index);
          
          return (
            <div key={agent.id} className="flex items-center">
              <motion.div
                className={`relative flex flex-col items-center p-3 rounded-lg border transition-all duration-300 ${
                  isActive 
                    ? "border-primary bg-primary/10 glow-effect" 
                    : isCompleted 
                      ? "border-green-500/50 bg-green-500/10" 
                      : "border-border bg-card/50"
                }`}
                animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isActive 
                    ? "bg-primary/20" 
                    : isCompleted 
                      ? "bg-green-500/20" 
                      : "bg-muted"
                }`}>
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : isActive ? (
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  ) : (
                    <Bot className={`w-5 h-5 ${
                      agent.color === "primary" ? "text-primary" : "text-secondary"
                    }`} />
                  )}
                </div>
                <span className="text-xs mt-2 font-medium">{agent.name}</span>
                
                {isActive && (
                  <motion.div
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  />
                )}
              </motion.div>
              
              {index < agents.length - 1 && (
                <motion.div className="mx-2">
                  <ArrowRight className={`w-4 h-4 transition-colors ${
                    isCompleted ? "text-green-500" : "text-muted-foreground"
                  }`} />
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-3 rounded-lg bg-background/50 border border-border">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs text-muted-foreground">Current Task</span>
        </div>
        <motion.p
          key={activeAgent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm font-mono"
        >
          {activeAgent === 0 && "Receiving and parsing user request..."}
          {activeAgent === 1 && "Gathering relevant information..."}
          {activeAgent === 2 && "Analyzing data and generating insights..."}
          {activeAgent === 3 && "Executing final actions and reporting..."}
        </motion.p>
      </div>
    </div>
  );
};
