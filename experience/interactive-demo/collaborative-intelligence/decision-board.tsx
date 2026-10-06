import { CheckCircle2, CircleDot, Trello } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ActionCard, DecisionItem } from "@/lib/intelligence-use-cases";
import { cn } from "@/lib/utils";

const columns: ActionCard["column"][] = ["To do", "Doing", "Done"];

export function DecisionBoard({ decisions, cards, onDecide, onMoveCard }: { decisions: DecisionItem[]; cards: ActionCard[]; onDecide: (id: string, option: string) => void; onMoveCard: (id: string, column: ActionCard["column"]) => void }) {
  return (
    <div className="grid border-t border-border lg:grid-cols-2">
      <section className="border-b border-border p-5 lg:border-b-0 lg:border-r">
        <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase text-muted-foreground"><CircleDot className="h-3 w-3" />Shared decisions</div>
        <div className="space-y-3">
          {decisions.map((decision) => (
            <div key={decision.id} className={cn("rounded-md border p-4", decision.status === "Decided" ? "border-primary/30 bg-primary/5" : "border-border bg-card")}>
              <div className="flex items-start justify-between gap-2">
                <strong className="text-[11px] text-foreground">{decision.title}</strong>
                {decision.status === "Decided" ? <span className="flex items-center gap-1 text-[9px] font-bold text-primary"><CheckCircle2 className="h-3 w-3" />Decided</span> : <span className="text-[9px] font-bold uppercase text-muted-foreground">Open</span>}
              </div>
              <p className="mt-1.5 text-[10px] leading-relaxed text-muted-foreground">{decision.context}</p>
              {decision.status === "Decided" ? (
                <div className="mt-2 border-l-2 border-primary pl-2 text-[10px] font-semibold text-foreground">{decision.decided}</div>
              ) : (
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {decision.options.map((option) => <Button key={option} size="sm" variant="outline" onClick={() => onDecide(decision.id, option)}>{option}</Button>)}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      <section className="p-5">
        <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase text-muted-foreground"><Trello className="h-3 w-3" />Actions board</div>
        <div className="grid gap-3 sm:grid-cols-3">
          {columns.map((column) => (
            <div key={column} className="rounded-md bg-secondary/35 p-2.5">
              <div className="mb-2 flex items-center justify-between px-1 text-[9px] font-bold uppercase text-muted-foreground"><span>{column}</span><span>{cards.filter((card) => card.column === column).length}</span></div>
              <div className="space-y-2">
                {cards.filter((card) => card.column === column).map((card) => {
                  const next = column === "To do" ? "Doing" : column === "Doing" ? "Done" : null;
                  return (
                    <div key={card.id} className="rounded-md border border-border bg-card p-2.5 shadow-sm">
                      <div className="text-[10px] font-semibold leading-snug text-foreground">{card.title}</div>
                      <div className="mt-1 text-[8px] text-muted-foreground">{card.owner}</div>
                      {next && <Button size="sm" variant="ghost" className="mt-1.5 h-6 px-2 text-[9px]" onClick={() => onMoveCard(card.id, next)}>Move to {next}</Button>}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
