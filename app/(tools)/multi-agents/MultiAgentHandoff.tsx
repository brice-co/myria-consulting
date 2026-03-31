"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRealtimeWebRTC } from "@/hooks/useRealtimeWebRTC";
import { toast } from "sonner";
import {
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Pause,
  Play,
  SkipForward,
  ArrowLeft,
  Users,
  Headphones,
  DollarSign,
  CreditCard,
  Shield,
  Bot
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

interface AgentConfig {
  id: string;
  name: string;
  role: string;
  systemPrompt: string;
  greeting: string;
  voice: string;
  icon: React.ReactNode;
  color: string;
  transferKeywords: string[];
}

// -------------------------
// AGENT DEFINITIONS
// -------------------------
const AGENTS: AgentConfig[] = [
  {
    id: "orchestrator",
    name: "Maya",
    role: "Greeter / Orchestrator",
    systemPrompt: `You are Maya, the friendly greeter and orchestrator...`,
    greeting: "Hi there! I'm Maya, your first point of contact. How can I help direct your call today?",
    voice: "alloy",
    icon: <Bot className="w-5 h-5" />,
    color: "bg-violet-500",
    transferKeywords: []
  },
  {
    id: "sales",
    name: "Alex",
    role: "Sales Agent",
    systemPrompt: `You are Alex, a skilled sales representative...`,
    greeting: "Hey! I'm Alex from Sales. How can I help you today?",
    voice: "shimmer",
    icon: <DollarSign className="w-5 h-5" />,
    color: "bg-emerald-500",
    transferKeywords: ["buy","purchase","price","cost","product","service","demo","trial"]
  },
  {
    id: "support",
    name: "Jordan",
    role: "Support Agent",
    systemPrompt: `You are Jordan, a patient and knowledgeable support specialist...`,
    greeting: "Hi, this is Jordan from Support. Let's get this sorted out together.",
    voice: "echo",
    icon: <Headphones className="w-5 h-5" />,
    color: "bg-blue-500",
    transferKeywords: ["help","issue","problem","broken","not working","error","bug","fix"]
  },
  {
    id: "billing",
    name: "Sam",
    role: "Billing Agent",
    systemPrompt: `You are Sam, a detail-oriented billing specialist...`,
    greeting: "Hello! Sam here from Billing. I can help with invoices or payments.",
    voice: "sage",
    icon: <CreditCard className="w-5 h-5" />,
    color: "bg-amber-500",
    transferKeywords: ["bill","invoice","payment","charge","refund","subscription","cancel"]
  },
  {
    id: "senior",
    name: "Morgan",
    role: "Senior Agent",
    systemPrompt: `You are Morgan, a senior agent with authority...`,
    greeting: "Hi, I'm Morgan, a Senior Agent. I can handle escalations personally.",
    voice: "coral",
    icon: <Shield className="w-5 h-5" />,
    color: "bg-rose-500",
    transferKeywords: ["escalate","manager","supervisor","complaint","unacceptable","lawyer"]
  }
];

const TRANSFER_TAG_REGEX = /\[TRANSFER:(sales|support|billing|senior|orchestrator)\]/gi;

// -------------------------
// KEYWORD HANDOFF CONFIG
// -------------------------
const HANDOFF_TRIGGERS: Record<string, { keywords: string[]; target: string; reason: string }[]> = {
  orchestrator: [
    { keywords: ["technical","bug","error","not working","broken","issue","help","problem","fix"], target: "support", reason: "Technical issue detected" },
    { keywords: ["bill","billing","payment","charge","refund","invoice","subscription","cancel"], target: "billing", reason: "Billing question identified" },
    { keywords: ["buy","purchase","price","cost","product","service","demo","trial","pricing","plan"], target: "sales", reason: "Sales inquiry detected" },
    { keywords: ["manager","supervisor","escalate","complaint","unacceptable","lawyer"], target: "senior", reason: "Escalation requested" }
  ],
  sales: [
    { keywords: ["technical","bug","error","not working","broken","issue","problem","fix"], target: "support", reason: "Technical issue detected" },
    { keywords: ["bill","billing","payment","charge","refund","invoice"], target: "billing", reason: "Billing question identified" },
    { keywords: ["manager","supervisor","escalate","complaint"], target: "senior", reason: "Escalation requested" }
  ],
  support: [
    { keywords: ["bill","billing","payment","charge","refund","invoice","subscription"], target: "billing", reason: "Payment-related issue" },
    { keywords: ["manager","supervisor","escalate","complaint","unacceptable"], target: "senior", reason: "Escalation requested" },
    { keywords: ["buy","purchase","upgrade","pricing","plan"], target: "sales", reason: "Sales inquiry detected" }
  ],
  billing: [
    { keywords: ["dispute","manager","supervisor","escalate","unacceptable","lawyer"], target: "senior", reason: "Dispute requires escalation" },
    { keywords: ["technical","bug","error","not working","broken"], target: "support", reason: "Technical issue detected" },
    { keywords: ["upgrade","new plan","pricing","product"], target: "sales", reason: "Sales inquiry detected" }
  ],
  senior: [
    { keywords: ["technical","bug","error","setup"], target: "support", reason: "Technical assistance needed" },
    { keywords: ["new purchase","upgrade","pricing"], target: "sales", reason: "Sales inquiry" },
    { keywords: ["invoice details","payment method"], target: "billing", reason: "Billing specifics needed" }
  ]
};

// -------------------------
// COMPONENT
// -------------------------
export default function MultiAgentHandoff() {
  const {
    isActive,
    isListening,
    isSpeaking,
    isProcessing,
    isMuted,
    onHold,
    transcript,
    interimTranscript,
    currentAgent,
    startSession,
    endSession,
    toggleMute,
    toggleHold,
    transferToAgent
  } = useRealtimeWebRTC();

  const [selectedAgent, setSelectedAgent] = useState<AgentConfig>(AGENTS[0]);
  const [autoTransferEnabled, setAutoTransferEnabled] = useState(true);
  const lastProcessedIndex = useRef(-1);

  // -------------------------
  // PENDING TRANSFER QUEUE
  // -------------------------
  const pendingTransfer = useRef<AgentConfig | null>(null);

  useEffect(() => {
    if (!isSpeaking && pendingTransfer.current) {
      const agent = pendingTransfer.current;
      pendingTransfer.current = null;

      setTimeout(() => {
        toast.info(`Transferring to ${agent.name}...`, { duration: 2000 });
        handleTransfer(agent);
      }, 500);
    }
  }, [isSpeaking]);

  // -------------------------
  // UTILS
  // -------------------------
  const stripTransferTags = useCallback((text: string) => text.replace(TRANSFER_TAG_REGEX, "").trim(), []);

  const detectKeywordHandoff = useCallback((userMessage: string, agentId: string): { target: string; reason: string } | null => {
    const lowerMessage = userMessage.toLowerCase();
    const triggers = HANDOFF_TRIGGERS[agentId] || [];
    for (const trigger of triggers) {
      for (const keyword of trigger.keywords) {
        if (lowerMessage.includes(keyword.toLowerCase())) return { target: trigger.target, reason: trigger.reason };
      }
    }
    return null;
  }, []);

  // -------------------------
  // AUTO TRANSFER EFFECT
  // -------------------------
  useEffect(() => {
    if (!autoTransferEnabled || !isActive || !currentAgent || transcript.length === 0) return;

    const latestIndex = transcript.length - 1;
    if (latestIndex <= lastProcessedIndex.current) return;

    const latestEntry = transcript[latestIndex];
    lastProcessedIndex.current = latestIndex;

    if (latestEntry.speaker === "You") {
      const handoff = detectKeywordHandoff(latestEntry.text, currentAgent.id);
      if (handoff) {
        const targetAgent = AGENTS.find(a => a.id === handoff.target);
        if (targetAgent && targetAgent.id !== currentAgent.id) {
          pendingTransfer.current = targetAgent;
          return;
        }
      }
      return;
    }

    const match = latestEntry.text.match(TRANSFER_TAG_REGEX);
    if (match) {
      const targetAgentId = match[0].replace(/\[TRANSFER:|]/gi, "").toLowerCase();
      const targetAgent = AGENTS.find(a => a.id === targetAgentId);
      if (targetAgent && targetAgent.id !== currentAgent.id) {
        pendingTransfer.current = targetAgent;
      }
    }
  }, [transcript, isActive, autoTransferEnabled, currentAgent, detectKeywordHandoff]);

  useEffect(() => { if (!isActive) lastProcessedIndex.current = -1; }, [isActive]);

  const handleStartCall = async () => {
    await startSession({
      id: selectedAgent.id,
      name: selectedAgent.name,
      systemPrompt: selectedAgent.systemPrompt,
      greeting: selectedAgent.greeting,
      voice: selectedAgent.voice
    });
  };

  const handleTransfer = (agent: AgentConfig) => {
    setSelectedAgent(agent);
    transferToAgent({
      id: agent.id,
      name: agent.name,
      systemPrompt: agent.systemPrompt,
      greeting: agent.greeting,
      voice: agent.voice
    });
  };

  const getStatusText = () => {
    if (onHold) return "On Hold";
    if (isSpeaking) return "Agent Speaking";
    if (isProcessing) return "Processing...";
    if (isListening) return "Listening";
    return "Ready";
  };

  const getStatusColor = () => {
    if (onHold) return "bg-amber-500";
    if (isSpeaking) return "bg-emerald-500";
    if (isProcessing) return "bg-blue-500";
    if (isListening) return "bg-rose-500";
    return "bg-muted";
  };

  // -------------------------
  // RENDER
  // -------------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon"><ArrowLeft className="w-5 h-5" /></Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Multi-Agent Handoff
              </h1>
              <p className="text-sm text-muted-foreground">OpenAI Realtime WebRTC Demo</p>
            </div>
          </div>
          {isActive && currentAgent && (
            <div className="flex items-center gap-3">
              <motion.div
                className={`w-3 h-3 rounded-full ${getStatusColor()}`}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-sm font-medium">{getStatusText()}</span>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* --------------------- */}
          {/* AGENT SELECTION PANEL */}
          {/* --------------------- */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader className="pb-3 flex justify-between items-center">
                <CardTitle className="text-lg">Available Agents</CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Auto-transfer</span>
                  <Button
                    variant={autoTransferEnabled ? "default" : "outline"}
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={() => setAutoTransferEnabled(!autoTransferEnabled)}
                  >
                    {autoTransferEnabled ? "ON" : "OFF"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {AGENTS.map((agent) => {
                  const isCurrentAgent = currentAgent?.id === agent.id;
                  const isSelected = selectedAgent.id === agent.id;

                  return (
                    <motion.button
                      key={agent.id}
                      onClick={() => isActive ? handleTransfer(agent) : setSelectedAgent(agent)}
                      className={`w-full p-3 rounded-lg border text-left transition-all ${
                        isCurrentAgent
                          ? "border-primary bg-primary/10"
                          : isSelected
                            ? "border-primary/50 bg-muted/50"
                            : "border-border hover:border-primary/30 hover:bg-muted/30"
                      }`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${agent.color} text-white`}>
                          {agent.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{agent.name}</span>
                            {isCurrentAgent && <Badge variant="default" className="text-xs">Active</Badge>}
                          </div>
                          <span className="text-xs text-muted-foreground">{agent.role}</span>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Selected Agent Details */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className={`p-1.5 rounded ${selectedAgent.color} text-white`}>{selectedAgent.icon}</div>
                  {selectedAgent.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">Role</span>
                  <p className="text-sm font-medium">{selectedAgent.role}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">Greeting</span>
                  <p className="text-sm italic text-muted-foreground">"{selectedAgent.greeting}"</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">Voice</span>
                  <Badge variant="outline" className="ml-2">{selectedAgent.voice}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* --------------------- */}
          {/* MAIN CALL INTERFACE */}
          {/* --------------------- */}
          <div className="lg:col-span-2 space-y-4">
            {/* Call Controls + Status */}
            {/* ... replicate your call interface with AnimatePresence ... */}

            {/* Transcript */}
            <Card className="flex-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Conversation</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  {transcript.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                      <Users className="w-12 h-12 mb-4 opacity-30" />
                      <p>Start a call to begin the conversation</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {transcript.map((entry, index) => {
                        const isUser = entry.speaker === "You";
                        const isSystem = entry.speaker === "System";
                        const agent = AGENTS.find((a) => a.name === entry.speaker);

                        if (isSystem) return (
                          <div key={index} className="text-center py-2">
                            <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                              {entry.text}
                            </span>
                          </div>
                        );

                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}
                          >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              isUser ? "bg-primary text-primary-foreground" : agent?.color || "bg-muted"
                            } ${!isUser && "text-white"}`}>
                              {isUser ? "U" : agent?.icon || <Bot className="w-4 h-4" />}
                            </div>
                            <div className={`flex-1 max-w-[80%] ${isUser ? "text-right" : ""}`}>
                              <span className="text-xs text-muted-foreground">{entry.speaker}</span>
                              <p className="text-sm">{stripTransferTags(entry.text)}</p>
                            </div>
                          </motion.div>
                        );
                      })}
                      {interimTranscript && (
                        <div className="text-sm text-muted-foreground italic">{interimTranscript}</div>
                      )}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
