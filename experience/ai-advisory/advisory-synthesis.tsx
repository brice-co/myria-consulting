import { Check, ClipboardCopy, FileText, Lightbulb, Map, Pin, PinOff, RotateCcw, Sparkles, Target, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Advisor, AdvisorInsight, DecisionBrief, Opportunity } from "./lib/advisory";
import { cn } from "@/lib/utils";

const quadrants = [
  { label: "Quick wins", pos: "left-1.5 top-1", tone: "text-primary" },
  { label: "Big bets", pos: "right-1.5 top-1", tone: "text-muted-foreground" },
  { label: "Fill-ins", pos: "left-1.5 bottom-1", tone: "text-muted-foreground" },
  { label: "Deprioritize", pos: "right-1.5 bottom-1", tone: "text-muted-foreground" },
];

export function AdvisorySynthesis({ insights, opportunities, advisors, selected, focused, pinned, onToggleOpportunity, onFocusOpportunity, onTogglePin, committed, onCommit, onReset, onRemoveInsight, brief, onGenerateBrief, onCopyBrief, briefCopied }: {
  insights: AdvisorInsight[]; opportunities: Opportunity[]; advisors: Advisor[]; selected: string[]; focused: string | null; pinned: string[];
  onToggleOpportunity: (id: string) => void; onFocusOpportunity: (id: string | null) => void; onTogglePin: (id: string) => void;
  committed: boolean; onCommit: () => void; onReset: () => void; onRemoveInsight: (id: string) => void;
  brief: DecisionBrief | null; onGenerateBrief: () => void; onCopyBrief: () => void; briefCopied: boolean;
}) {
  const name = (id: string) => advisors.find((a) => a.id === id)?.initials ?? "";
  const chosen = opportunities.filter((o) => selected.includes(o.id));
  const focusedOpp = opportunities.find((o) => o.id === focused) ?? null;
  const pinnedInsights = insights.filter((i) => pinned.includes(i.id));

  return (
    <aside className="flex flex-col border-t border-border bg-card lg:border-l lg:border-t-0">
      <section className="border-b border-border p-4">
        <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase text-muted-foreground"><Lightbulb className="h-3 w-3" />Captured insights · {insights.length}</div>
        <div className="max-h-40 space-y-1.5 overflow-y-auto">
          {insights.map((i) => {
            const isPinned = pinned.includes(i.id);
            return (
              <div key={i.id} className={cn("group flex animate-rise items-start gap-2 rounded p-2 text-[9px] leading-snug text-muted-foreground", isPinned ? "bg-accent/15 ring-1 ring-accent/40" : "bg-secondary/40")}>
                <span className="font-bold text-primary">{name(i.advisor)}</span>
                <span className="flex-1">{i.text}</span>
                <button type="button" onClick={() => onTogglePin(i.id)} aria-label={isPinned ? "Unpin insight" : "Pin insight as evidence"} className={cn("hover:text-primary", isPinned ? "text-primary" : "text-muted-foreground/50")}>
                  {isPinned ? <PinOff className="h-3 w-3" /> : <Pin className="h-3 w-3" />}
                </button>
                <button type="button" onClick={() => onRemoveInsight(i.id)} aria-label="Remove insight" className="text-muted-foreground/50 hover:text-foreground">
                  <X className="h-3 w-3" />
                </button>
              </div>
            );
          })}
        </div>
      </section>
      <section className="border-b border-border p-4">
        <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase text-muted-foreground"><Map className="h-3 w-3" />Opportunity map</div>
        <div className="relative h-48 rounded-md border border-border bg-secondary/25">
          <span className="absolute left-1/2 top-0 h-full w-px bg-border" /><span className="absolute left-0 top-1/2 h-px w-full bg-border" />
          {quadrants.map((q) => (
            <span key={q.label} className={cn("absolute text-[7px] font-semibold uppercase tracking-wide", q.pos, q.tone)}>{q.label}</span>
          ))}
          <span className="absolute -left-0.5 top-1/2 -translate-y-1/2 -rotate-90 text-[7px] uppercase text-muted-foreground">Impact ↑</span>
          {opportunities.map((o) => (
            <button key={o.id} type="button" onClick={() => onFocusOpportunity(focused === o.id ? null : o.id)} title={o.title} aria-pressed={focused === o.id}
              style={{ left: `${o.effort}%`, bottom: `${o.impact}%` }}
              className={cn("absolute max-w-[110px] -translate-x-1/2 translate-y-1/2 truncate rounded-full px-1.5 py-0.5 text-[7px] font-semibold shadow-sm transition-colors",
                selected.includes(o.id) ? "bg-primary text-primary-foreground" : focused === o.id ? "bg-accent text-accent-foreground" : "bg-card text-foreground ring-1 ring-border")}>
              {o.title}
            </button>
          ))}
        </div>
        {focusedOpp ? (
          <div className="mt-2 animate-rise rounded-md border border-border bg-secondary/30 p-2.5">
            <div className="flex items-start justify-between gap-2">
              <strong className="text-[10px] text-foreground">{focusedOpp.title}</strong>
              <button type="button" onClick={() => onFocusOpportunity(null)} aria-label="Close opportunity detail" className="text-muted-foreground hover:text-foreground"><X className="h-3 w-3" /></button>
            </div>
            <p className="mt-1 text-[9px] leading-snug text-muted-foreground">{focusedOpp.rationale}</p>
            <div className="mt-2 space-y-1">
              <div className="flex items-center gap-1.5 text-[8px] text-muted-foreground"><span className="w-10">Impact</span><span className="h-1 flex-1 rounded-full bg-muted"><span className="block h-1 rounded-full bg-primary" style={{ width: `${focusedOpp.impact}%` }} /></span><span>{focusedOpp.impact}</span></div>
              <div className="flex items-center gap-1.5 text-[8px] text-muted-foreground"><span className="w-10">Effort</span><span className="h-1 flex-1 rounded-full bg-muted"><span className="block h-1 rounded-full bg-accent" style={{ width: `${focusedOpp.effort}%` }} /></span><span>{focusedOpp.effort}</span></div>
            </div>
            <div className="mt-2 flex items-center justify-between gap-2">
              <span className="text-[8px] text-muted-foreground">Owner: {name(focusedOpp.advisor)}</span>
              <Button size="sm" variant={selected.includes(focusedOpp.id) ? "outline" : "default"} className="h-6 px-2 text-[9px]" onClick={() => onToggleOpportunity(focusedOpp.id)}>
                {selected.includes(focusedOpp.id) ? "Remove from decision" : "Add to decision"}
              </Button>
            </div>
          </div>
        ) : (
          <p className="mt-1.5 text-[8px] text-muted-foreground">Click an opportunity to inspect it, then add it to the decision.</p>
        )}
      </section>
      <section className="border-b border-border p-4">
        <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase text-muted-foreground"><Target className="h-3 w-3" />Decision & next steps</div>
        {pinnedInsights.length > 0 && (
          <div className="mb-2 rounded-md bg-accent/10 p-2">
            <div className="mb-1 text-[8px] font-semibold uppercase text-muted-foreground">Supporting evidence</div>
            <ul className="space-y-1">
              {pinnedInsights.map((i) => (
                <li key={i.id} className="flex items-start gap-1.5 text-[9px] leading-snug text-muted-foreground">
                  <Pin className="mt-0.5 h-2.5 w-2.5 shrink-0 text-primary" /><span><strong className="text-primary">{name(i.advisor)}</strong> {i.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {chosen.length === 0 ? <p className="text-[10px] text-muted-foreground">Select opportunities on the map to build the recommendation.</p> : (
          <ol className="space-y-1.5">
            {chosen.map((o, n) => (
              <li key={o.id} className="flex items-center gap-2 text-[10px] text-foreground">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[8px] font-bold text-accent-foreground">{n + 1}</span>
                <span className="flex-1">{o.title}</span><span className="text-[8px] text-muted-foreground">Owner: {name(o.advisor)}</span>
              </li>
            ))}
          </ol>
        )}
        <div className="mt-3 flex gap-2">
          <Button size="sm" className="flex-1 text-[10px]" disabled={chosen.length === 0 || committed} onClick={onCommit}>
            {committed ? <><Check />Decision committed</> : "Commit decision"}
          </Button>
          <Button size="sm" variant="outline" className="text-[10px]" onClick={onReset} aria-label="Reset session">
            <RotateCcw />Reset
          </Button>
        </div>
      </section>
      <section className="p-4">
        <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase text-muted-foreground"><FileText className="h-3 w-3" />Decision brief</div>
        {brief ? (
          <div className="animate-rise rounded-md border border-border bg-secondary/30 p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <strong className="text-[10px] text-foreground">{brief.title}</strong>
                <div className="text-[8px] text-muted-foreground">{brief.createdAt} · Phase: {brief.phase}</div>
              </div>
              <Button size="sm" variant="outline" className="h-6 px-2 text-[9px]" onClick={onCopyBrief}>
                {briefCopied ? <><Check />Copied</> : <><ClipboardCopy />Copy</>}
              </Button>
            </div>
            <p className="mt-2 text-[9px] leading-snug text-muted-foreground">{brief.summary}</p>
            <div className="mt-2 text-[8px] font-semibold uppercase text-muted-foreground">Committed moves</div>
            <ul className="mt-1 space-y-1">
              {brief.opportunities.map((o, n) => (
                <li key={o.id} className="flex items-start gap-1.5 text-[9px] leading-snug text-foreground">
                  <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-primary text-[7px] font-bold text-primary-foreground">{n + 1}</span>
                  <span>{o.title} <span className="text-muted-foreground">— {name(o.advisor)} · impact {o.impact}, effort {o.effort}</span></span>
                </li>
              ))}
            </ul>
            {brief.evidence.length > 0 && (
              <>
                <div className="mt-2 text-[8px] font-semibold uppercase text-muted-foreground">Evidence</div>
                <ul className="mt-1 space-y-1">
                  {brief.evidence.map((i) => (
                    <li key={i.id} className="flex items-start gap-1.5 text-[9px] leading-snug text-muted-foreground">
                      <Pin className="mt-0.5 h-2.5 w-2.5 shrink-0 text-primary" /><span><strong className="text-primary">{name(i.advisor)}</strong> {i.text}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ) : (
          <p className="text-[10px] text-muted-foreground">Generate a shareable brief from the committed decision, pinned evidence and advisor owners.</p>
        )}
        <Button size="sm" variant="secondary" className="mt-2 w-full text-[10px]" disabled={chosen.length === 0} onClick={onGenerateBrief}>
          <Sparkles />{brief ? "Regenerate brief" : "Generate decision brief"}
        </Button>
      </section>
    </aside>
  );
}
