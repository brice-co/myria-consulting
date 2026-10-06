import { useMemo, useState } from "react";
import { Radio } from "lucide-react";
import { collaborativeArtifacts, collaborativePresence, initialActionCards, initialCollabMessages, initialDecisions, type ActionCard, type RoomMessage } from "@/lib/intelligence-use-cases";
import { ArtifactCanvas } from "./artifact-canvas";
import { DecisionBoard } from "./decision-board";
import { TeamRoom } from "./team-room";

export function CollaborativeIntelligenceExperience() {
  const [selectedId, setSelectedId] = useState(collaborativeArtifacts[0]?.id ?? "");
  const [applied, setApplied] = useState<Record<string, boolean>>({});
  const [decisions, setDecisions] = useState(initialDecisions);
  const [cards, setCards] = useState(initialActionCards);
  const [participants, setParticipants] = useState(collaborativePresence);
  const [messages, setMessages] = useState<RoomMessage[]>(initialCollabMessages);
  const selected = useMemo(() => collaborativeArtifacts.find((artifact) => artifact.id === selectedId) ?? collaborativeArtifacts[0]!, [selectedId]);

  function addSystemMessage(text: string) { setMessages((items) => [...items, { id: `event-${Date.now()}`, author: "Workspace agent", initials: "WA", kind: "agent", text, time: "Now" }]); }
  function applySuggestion() { setApplied((map) => ({ ...map, [selected.id]: true })); addSystemMessage(`Applied the AI suggestion to "${selected.title}" and kept the source context linked.`); }
  function decide(id: string, option: string) { const decision = decisions.find((item) => item.id === id); setDecisions((items) => items.map((item) => item.id === id ? { ...item, status: "Decided", decided: option } : item)); addSystemMessage(`Decision recorded: "${decision?.title}" → ${option}. The audit trail and linked artifacts were updated.`); }
  function moveCard(id: string, column: ActionCard["column"]) { const card = cards.find((item) => item.id === id); setCards((items) => items.map((item) => item.id === id ? { ...item, column } : item)); addSystemMessage(`"${card?.title}" moved to ${column}.`); }
  function invite() { if (participants.some((person) => person.id === "theo")) return; setParticipants((items) => [...items, { id: "theo", name: "Theo Jensen", role: "Commercial strategy", kind: "person", status: "Active", initials: "TJ" }]); addSystemMessage("Theo Jensen joined the room with full shared context."); }
  function send(text: string) { setMessages((items) => [...items, { id: `human-${Date.now()}`, author: "Maya Chen", initials: "MC", kind: "person", text, time: "Now" }]); }

  return (
    <div className="animate-rise overflow-hidden rounded-lg border border-border bg-card shadow-[0_24px_70px_rgba(18,42,49,0.09)] [animation-delay:120ms]">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <strong className="text-xs text-foreground">Collaborative intelligence</strong>
          <div className="text-[9px] text-muted-foreground">Documents, decisions, actions and agents in one shared workspace</div>
        </div>
        <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase text-primary"><Radio className="h-3 w-3" />Workspace live</span>
      </div>
      <div className="grid lg:grid-cols-[1fr_300px]">
        <ArtifactCanvas artifacts={collaborativeArtifacts} selected={selected} onSelect={(artifact) => setSelectedId(artifact.id)} onApplySuggestion={applySuggestion} applied={Boolean(applied[selected.id])} />
        <TeamRoom participants={participants} messages={messages} onSend={send} onInvite={invite} />
      </div>
      <DecisionBoard decisions={decisions} cards={cards} onDecide={decide} onMoveCard={moveCard} />
    </div>
  );
}
