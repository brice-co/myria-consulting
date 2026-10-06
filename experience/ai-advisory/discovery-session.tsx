"use client";

import { useEffect, useRef,  type FormEvent } from "react";
import { ArrowRight, Bookmark, BookmarkCheck, MessageSquare, Reply, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Advisor, DiscoveryPhase } from "./lib/advisory";
import { cn } from "@/lib/utils";

export type SessionEntry = { id: string; author: string; initials: string; isAdvisor: boolean; text: string; phase: DiscoveryPhase };

export function DiscoverySession({ problem, phases, phase, prompt, entries, advisors, captured, draft, onDraftChange, onCapture, onAdvance, onSelectPhase, onAsk, onReply, thinking }: {
  problem: { title: string; statement: string }; phases: DiscoveryPhase[]; phase: DiscoveryPhase; prompt: string; entries: SessionEntry[]; advisors: Advisor[];
  captured: string[]; draft: string; onDraftChange: (v: string) => void;
  onCapture: (e: SessionEntry) => void; onAdvance: () => void; onSelectPhase: (p: DiscoveryPhase) => void; onAsk: (text: string) => void; onReply: (e: SessionEntry) => void; thinking: boolean;
}) {
  const idx = phases.indexOf(phase);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const questionsByPhase = phases.map((p) => entries.filter((e) => !e.isAdvisor && e.phase === p).length);
  const questionsHere = questionsByPhase[idx] ?? 0;

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries.length, thinking]);

  function submit(e: FormEvent) { e.preventDefault(); const t = draft.trim(); if (!t) return; onAsk(t); onDraftChange(""); }

  return (
    <div className="flex min-w-0 flex-col bg-card">
      <div className="border-b border-border p-4">
        <div className="text-[9px] font-semibold uppercase text-primary">Business problem</div>
        <div className="mt-1 font-display text-lg text-foreground">{problem.title}</div>
        <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{problem.statement}</p>
        <div className="mt-4 grid grid-cols-4 gap-1">
          {phases.map((p, i) => (
            <button key={p} type="button" onClick={() => onSelectPhase(p)} disabled={thinking} aria-current={i === idx ? "step" : undefined}
              className="text-center transition-opacity hover:opacity-80 disabled:opacity-60">
              <div className={cn("h-1 rounded-full", i <= idx ? "bg-primary" : "bg-muted")} />
              <div className={cn("mt-1 text-[9px] font-semibold", i === idx ? "text-foreground" : "text-muted-foreground")}>{p}</div>
              <div className="text-[7px] text-muted-foreground/70">{questionsByPhase[i] ?? 0} asked</div>
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-2.5">
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground"><MessageSquare className="h-3 w-3" />{prompt}</div>
        <Button size="sm" variant="outline" onClick={onAdvance} disabled={thinking || idx === phases.length - 1} className="shrink-0 text-[10px]">
          {idx === phases.length - 1 ? "Session complete" : <>Next: {phases[idx + 1]}<ArrowRight /></>}
        </Button>
      </div>
      {idx < phases.length - 1 && questionsHere === 0 && (
        <div className="border-b border-border bg-accent/10 px-4 py-1.5 text-[9px] text-muted-foreground">
          Tip: ask at least one question in this phase before moving on — it sharpens the advisors' contributions.
        </div>
      )}
      <div ref={scrollRef} className="max-h-[420px] flex-1 space-y-3 overflow-y-auto p-4">
        {entries.map((e) => {
          const isCaptured = captured.includes(e.id);
          return (
            <div key={e.id} className="flex animate-rise gap-2.5">
              <span className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[8px] font-bold", e.isAdvisor ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground")}>{e.initials}</span>
              <div className="min-w-0 flex-1 rounded-md bg-secondary/40 p-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5"><strong className="text-[10px] text-foreground">{e.author}</strong><span className="rounded bg-card px-1.5 text-[8px] text-muted-foreground">{e.phase}</span></div>
                  {e.isAdvisor && (
                    <span className="flex items-center gap-1">
                      <button type="button" onClick={() => onReply(e)} aria-label={`Reply to ${e.author}`} className="text-muted-foreground hover:text-primary">
                        <Reply className="h-3.5 w-3.5" />
                      </button>
                      <button type="button" onClick={() => onCapture(e)} disabled={isCaptured} aria-label="Capture insight" className="text-muted-foreground hover:text-primary disabled:text-primary">
                        {isCaptured ? <BookmarkCheck className="h-3.5 w-3.5" /> : <Bookmark className="h-3.5 w-3.5" />}
                      </button>
                    </span>
                  )}
                </div>
                <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground">{e.text}</p>
              </div>
            </div>
          );
        })}
        {thinking && (
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
            <span className="flex gap-1"><span className="h-1.5 w-1.5 typing-dot rounded-full bg-primary" /><span className="h-1.5 w-1.5 typing-dot rounded-full bg-primary [animation-delay:150ms]" /><span className="h-1.5 w-1.5 typing-dot rounded-full bg-primary [animation-delay:300ms]" /></span>
            {advisors.length} advisors contributing…
          </div>
        )}
      </div>
      <form onSubmit={submit} className="flex gap-2 border-t border-border p-3">
        <input value={draft} onChange={(e) => onDraftChange(e.target.value)} aria-label="Ask the advisory team" placeholder="Ask the advisory team a question…" className="min-w-0 flex-1 rounded-md border border-input bg-background px-3 py-2 text-[11px] text-foreground outline-none focus:ring-1 focus:ring-ring" />
        <Button type="submit" size="icon" disabled={thinking} aria-label="Send question"><Send /></Button>
      </form>
    </div>
  );
}
