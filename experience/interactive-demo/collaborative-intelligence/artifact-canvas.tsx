import { FileText, PenTool, Sparkles, Table, Waypoints } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CollaborativeArtifact } from "@/lib/intelligence-use-cases";
import { cn } from "@/lib/utils";

const kindIcons = { Document: FileText, Whiteboard: PenTool, Flowchart: Waypoints, "Data view": Table } as const;

export function ArtifactCanvas({ artifacts, selected, onSelect, onApplySuggestion, applied }: { artifacts: CollaborativeArtifact[]; selected: CollaborativeArtifact; onSelect: (artifact: CollaborativeArtifact) => void; onApplySuggestion: () => void; applied: boolean }) {
  const KindIcon = kindIcons[selected.kind];
  return (
    <div className="grid min-h-[420px] lg:grid-cols-[210px_1fr]">
      <aside className="border-b border-border bg-secondary/25 lg:border-b-0 lg:border-r">
        <div className="border-b border-border px-4 py-3 text-[10px] font-semibold uppercase text-muted-foreground">Workspace artifacts</div>
        <div className="space-y-1.5 p-3">
          {artifacts.map((artifact) => {
            const Icon = kindIcons[artifact.kind];
            return (
              <Button key={artifact.id} variant="ghost" onClick={() => onSelect(artifact)} className={cn("h-auto w-full justify-start whitespace-normal rounded-md border border-transparent p-3 text-left", selected.id === artifact.id && "border-primary bg-card shadow-sm")}>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5"><Icon className="h-3 w-3 shrink-0 text-primary" /><strong className="truncate text-[11px] text-foreground">{artifact.title}</strong></span>
                  <span className="mt-1 block text-[9px] text-muted-foreground">{artifact.kind} · {artifact.updated}</span>
                </span>
              </Button>
            );
          })}
        </div>
      </aside>
      <main key={selected.id} className="animate-fade">
        <div className="border-b border-border px-5 py-4">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase text-primary"><KindIcon className="h-3.5 w-3.5" />{selected.kind} · {selected.updated}</div>
          <h2 className="mt-1 text-lg font-bold text-foreground">{selected.title}</h2>
          <p className="mt-0.5 text-[10px] text-muted-foreground">{selected.summary}</p>
        </div>
        <div className="space-y-4 p-5">
          {selected.sections.map((section) => (
            <div key={section.heading} className="rounded-md border border-border bg-card p-4">
              <div className="text-[10px] font-semibold uppercase text-muted-foreground">{section.heading}</div>
              <p className="mt-1.5 text-xs leading-relaxed text-foreground">{section.body}</p>
            </div>
          ))}
          <div className="rounded-md border border-primary/30 bg-primary/5 p-4">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase text-primary"><Sparkles className="h-3.5 w-3.5" />AI suggestion</div>
            <p className="mt-2 text-xs leading-relaxed text-foreground">{selected.aiSuggestion}</p>
            <Button size="sm" className="mt-3" variant={applied ? "secondary" : "default"} onClick={onApplySuggestion} disabled={applied}>{applied ? "Applied to artifact" : "Apply suggestion"}</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
