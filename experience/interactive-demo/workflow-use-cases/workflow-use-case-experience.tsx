"use client";

import { useState } from "react";
import { Bot, CheckCircle2, ChevronRight, CircleDot, HelpCircle, RotateCcw, Sparkles, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TeamRoom } from "@/experience/interactive-demo/collaborative-intelligence/team-room";
import type { RoomMessage } from "@/lib/intelligence-use-cases";
import { workflowUseCases, type WorkflowCase, type WorkflowUseCaseId } from "@/lib/workflow-use-cases";
import { cn } from "@/lib/utils";

const now = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export function WorkflowUseCaseExperience({ useCase }: { useCase: WorkflowUseCaseId }) {
  const data = workflowUseCases[useCase];
  const [cases, setCases] = useState<(WorkflowCase & { decision?: string | undefined })[]>(data.cases);
  const [selectedId, setSelectedId] = useState(data.cases[0]!.id);
  const [stepFilter, setStepFilter] = useState<number | null>(null);
  const [participants, setParticipants] = useState(data.participants);
  const [messages, setMessages] = useState<RoomMessage[]>(data.messages);
  const [capability, setCapability] = useState(0);
  const [question, setQuestion] = useState<number | null>(null);

  const selected = cases.find((c) => c.id === selectedId) ?? cases[0]!;
  const visible = stepFilter === null ? cases : cases.filter((c) => c.step === stepFilter);
  const last = data.flow.length - 1;

  const post = (text: string, author = data.systemAgent.name, initials = data.systemAgent.initials, kind: "agent" | "person" = "agent") =>
    setMessages((m) => [...m, { id: crypto.randomUUID(), author, initials, kind, text, time: now() }]);

  function update(id: string, patch: Partial<WorkflowCase & { decision?: string | undefined }>) {
    setCases((list) => list.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  }
  function decide(option: string) {
    update(selected.id, { decision: option, step: Math.min(selected.step + 1, last) });
    post(`${data.self.name} decided "${option}" on ${selected.title}. Moving to ${data.flow[Math.min(selected.step + 1, last)]!.title}.`);
  }
  function advance() {
    if (selected.step >= last) return;
    update(selected.id, { step: selected.step + 1 });
    post(`${selected.title} advanced to ${data.flow[selected.step + 1]!.title}.`);
  }
  function invite() {
    if (participants.some((p) => p.id === data.invitee.id)) return;
    setParticipants((p) => [...p, data.invitee]);
    post(`${data.invitee.name} (${data.invitee.role}) joined with context on ${selected.title}.`);
  }
  function send(text: string) {
    post(text, data.self.name, data.self.initials, "person");
    setTimeout(() => post(`Noted on ${selected.title}: I'll factor that in before the ${data.flow[selected.step]!.title.toLowerCase()} step.`, participants.find((p) => p.kind === "agent")?.name, participants.find((p) => p.kind === "agent")?.initials), 800);
  }
  function reset() {
    setCases(data.cases); setMessages(data.messages); setParticipants(data.participants); setStepFilter(null); setSelectedId(data.cases[0]!.id);
  }

  return (
    <div className="animate-rise space-y-4">
      <div className="grid gap-2 rounded-md border border-border bg-card p-2 sm:grid-cols-4">
        {data.flow.map((step, i) => {
          const count = cases.filter((c) => c.step === i).length;
          return (
            <button key={step.title} onClick={() => setStepFilter(stepFilter === i ? null : i)} className={cn("rounded-md p-3 text-left transition-colors", stepFilter === i ? "bg-primary text-primary-foreground" : "hover:bg-secondary")}>
              <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider opacity-70"><span>0{i + 1}</span><span>{count} cases</span></div>
              <div className="mt-1 text-sm font-bold">{step.title}</div>
              <div className="mt-0.5 text-[11px] opacity-75">{step.description}</div>
            </button>
          );
        })}
      </div>

      <div className="grid overflow-hidden rounded-md border border-border lg:grid-cols-[260px_1fr_320px]">
        <div className="border-b border-border bg-card lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <span className="text-xs font-bold text-foreground">Active work {stepFilter !== null && `· ${data.flow[stepFilter]!.title}`}</span>
            <Button size="icon" variant="ghost" onClick={reset} aria-label="Reset workspace"><RotateCcw /></Button>
          </div>
          {visible.length === 0 && <p className="p-4 text-xs text-muted-foreground">No cases in this step.</p>}
          {visible.map((c) => (
            <button key={c.id} onClick={() => setSelectedId(c.id)} className={cn("block w-full border-b border-border px-4 py-3 text-left", c.id === selected.id ? "bg-secondary" : "hover:bg-secondary/50")}>
              <div className="flex items-center gap-2"><span className={cn("h-2 w-2 rounded-full", c.priority === "High" ? "bg-destructive" : c.priority === "Medium" ? "bg-accent" : "bg-muted-foreground")} /><span className="truncate text-xs font-semibold text-foreground">{c.title}</span></div>
              <div className="mt-1 text-[10px] text-muted-foreground">{c.subject}</div>
              <div className="mt-1.5 text-[10px] font-semibold text-primary">{data.flow[c.step]!.title}{c.decision && " · decided"}</div>
            </button>
          ))}
        </div>

        <div className="space-y-4 bg-background p-5">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{selected.subject} · {selected.priority} priority</div>
            <h3 className="font-display mt-1 text-2xl text-spruce">{selected.title}</h3>
          </div>
          <div className="flex gap-1">
            {data.flow.map((s, i) => <div key={s.title} className={cn("h-1.5 flex-1 rounded-full", i <= selected.step ? "bg-primary" : "bg-border")} title={s.title} />)}
          </div>
          <div className="rounded-md border border-border bg-card p-4">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase text-muted-foreground"><UserRound className="h-3 w-3" />Context</div>
            <p className="mt-1.5 text-sm text-foreground">{selected.context}</p>
          </div>
          <div className="rounded-md border border-primary/30 bg-primary/5 p-4">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase text-primary"><Bot className="h-3 w-3" />Agent finding</div>
            <p className="mt-1.5 text-sm text-foreground">{selected.agentFinding}</p>
          </div>
          <div className="rounded-md border border-border bg-card p-4">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase text-accent-foreground"><CircleDot className="h-3 w-3" />Human decision</div>
            <p className="mt-1.5 text-sm font-semibold text-foreground">{selected.humanDecision}</p>
            {selected.decision ? (
              <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-primary"><CheckCircle2 className="h-4 w-4" />Decided: {selected.decision}
                <Button size="sm" variant="ghost" onClick={() => update(selected.id, { decision: undefined })}>Change</Button></div>
            ) : (
              <div className="mt-3 flex flex-wrap gap-2">{selected.options.map((o, i) => <Button key={o} size="sm" variant={i === 0 ? "default" : "outline"} onClick={() => decide(o)}>{o}</Button>)}</div>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={advance} disabled={selected.step >= last}>Advance to {data.flow[Math.min(selected.step + 1, last)]!.title}<ChevronRight /></Button>
            <Button size="sm" variant="outline" onClick={invite} disabled={participants.some((p) => p.id === data.invitee.id)}>Bring in {data.invitee.role.toLowerCase()}</Button>
          </div>
          <div>
            <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase text-muted-foreground"><Sparkles className="h-3 w-3" />Capabilities in play</div>
            <div className="flex flex-wrap gap-1.5">{data.capabilities.map((c, i) => <button key={c} onClick={() => { setCapability(i); post(`${c} engaged on ${selected.title}.`); }} className={cn("rounded-full border px-3 py-1 text-[11px]", capability === i ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:bg-secondary")}>{c}</button>)}</div>
          </div>
          <div>
            <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase text-muted-foreground"><HelpCircle className="h-3 w-3" />Design questions</div>
            {data.advisoryQuestions.map((q, i) => (
              <button key={q} onClick={() => { setQuestion(i); post(`Discussion opened: ${q}`); }} className={cn("block w-full border-b border-border py-2 text-left text-xs", question === i ? "font-semibold text-primary" : "text-foreground hover:text-primary")}>{q}</button>
            ))}
          </div>
        </div>

        <div className="border-t border-border lg:border-l lg:border-t-0">
          <TeamRoom participants={participants} messages={messages} onSend={send} onInvite={invite} />
        </div>
      </div>
    </div>
  );
}
