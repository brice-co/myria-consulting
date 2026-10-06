"use client";

import { useMemo, useState } from "react";
import { Radio } from "lucide-react";
import { leadCaptureLeads, leadRoomParticipants, initialLeadRoomMessages, type LeadStage, type RoomMessage } from "@/lib/intelligence-use-cases";
import { LeadFunnel } from "./lead-funnel";
import { LeadWorkspace } from "./lead-workspace";
import { CollaborationRoom } from "./collaboration-room";

export function LeadCaptureExperience() {
  const [leads, setLeads] = useState(leadCaptureLeads);
  const [selectedId, setSelectedId] = useState(leadCaptureLeads[0]?.id ?? "");
  const [activeStage, setActiveStage] = useState<LeadStage | "All">("All");
  const [participants, setParticipants] = useState(leadRoomParticipants);
  const [messages, setMessages] = useState<RoomMessage[]>(initialLeadRoomMessages);
  const selected = useMemo(() => leads.find((lead) => lead.id === selectedId) ?? leads[0], [leads, selectedId]);
  if (!selected) return null;
  const activeLead = selected;
  function updateLead(changes: Partial<typeof activeLead>) { setLeads((items) => items.map((lead) => lead.id === activeLead.id ? { ...lead, ...changes } : lead)); }
  function addSystemMessage(text: string) { setMessages((items) => [...items, { id: `event-${Date.now()}`, author: "Pipeline agent", initials: "PA", kind: "agent", text, time: "Now" }]); }
  function moveLead(stage: LeadStage) { updateLead({ stage }); setActiveStage("All"); addSystemMessage(`${activeLead.name} moved to ${stage}. I updated the room brief and next-step context.`); }
  function assignLead(owner: string) { updateLead({ owner }); addSystemMessage(`${owner === "Unassigned" ? "Ownership was cleared" : `${owner} is now the lead owner`} for ${activeLead.company}.`); }
  function invite() { if (participants.some((person) => person.id === "jordan")) return; setParticipants((items) => [...items, { id: "jordan", name: "Jordan Kim", role: "Marketing partner", kind: "person", status: "Active", initials: "JK" }]); addSystemMessage("Jordan Kim joined the room and can see the shared account context."); }
  function send(text: string) { setMessages((items) => [...items, { id: `human-${Date.now()}`, author: "Alex Morgan", initials: "AM", kind: "person", text, time: "Now" }]); }
  return <div className="animate-rise overflow-hidden rounded-lg border border-border bg-card shadow-[0_24px_70px_rgba(18,42,49,0.09)] [animation-delay:120ms]"><div className="flex items-center justify-between border-b border-border px-5 py-4"><div><strong className="text-xs text-foreground">Collaborative lead capture</strong><div className="text-[9px] text-muted-foreground">One room for signals, people, agents and pipeline movement</div></div><span className="flex items-center gap-1.5 text-[9px] font-bold uppercase text-primary"><Radio className="h-3 w-3" />Room live</span></div><LeadFunnel leads={leads} activeStage={activeStage} onStageChange={setActiveStage} /><div className="grid lg:grid-cols-[1fr_300px]"><LeadWorkspace leads={leads} selected={activeLead} activeStage={activeStage} onSelect={(lead) => setSelectedId(lead.id)} onMove={moveLead} onAssign={assignLead} /><CollaborationRoom lead={activeLead} participants={participants} messages={messages} onSend={send} onInvite={invite} /></div></div>;
}