import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export function UseCaseIntro({ eyebrow, title, description, outcomes }: { eyebrow: string; title: string; description: string; outcomes: string[] }) {
  return (
    <div className="animate-rise grid gap-6 lg:grid-cols-[1fr_380px] lg:items-end">
      <div className="max-w-3xl"><div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">{eyebrow}</div><h1 className="font-display mt-3 text-3xl leading-tight text-spruce sm:text-5xl">{title}</h1><p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">{description}</p></div>
      <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
        {outcomes.map((outcome, index) => <div key={outcome} className="flex items-center gap-2 border-b border-border py-2.5 text-xs font-semibold text-foreground"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /><span className="flex-1">{outcome}</span><ArrowUpRight className="h-3 w-3 text-muted-foreground" /><span className="sr-only">Outcome {index + 1}</span></div>)}
      </div>
    </div>
  );
}
