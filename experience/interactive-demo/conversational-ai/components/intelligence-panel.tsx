import { Check, Circle, Loader2, Play, ShieldCheck, Sparkles } from "lucide-react";
import type { SharedInsight, ToolEvent } from "../types/conversation";

export function IntelligencePanel({ insights, tools, onRun }: { insights: SharedInsight[]; tools: ToolEvent[]; onRun: (id: string) => void }) {
  return (
    <aside className="border-l border-[#173039]/10 bg-[#fbfaf6] p-4">
      <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#718185]"><Sparkles className="h-3 w-3" /> Shared intelligence</div>
      <div className="mt-4 space-y-2">{insights.map((i)=><div key={i.label} className="rounded-lg border border-[#173039]/10 bg-white p-3"><div className="text-[8px] uppercase tracking-wider text-[#879396]">{i.label}</div><div className={`mt-1 text-xs font-semibold ${i.tone === "attention" ? "text-[#a35b3d]" : i.tone === "positive" ? "text-[#0b6b66]" : "text-[#173039]"}`}>{i.value}</div></div>)}</div>
      <div className="mt-5 border-t border-[#173039]/10 pt-4"><div className="mb-3 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#718185]"><ShieldCheck className="h-3 w-3" /> Tools & actions</div><div className="space-y-2">{tools.map((tool)=><button key={tool.id} disabled={tool.status !== "ready"} onClick={()=>onRun(tool.id)} className="flex w-full items-start gap-2 rounded-lg border border-[#173039]/10 bg-white p-3 text-left disabled:cursor-default"><div className="mt-0.5">{tool.status === "complete" ? <Check className="h-3.5 w-3.5 text-[#0b6b66]" /> : tool.status === "running" ? <Loader2 className="h-3.5 w-3.5 animate-spin text-[#b78232]" /> : <Play className="h-3.5 w-3.5 text-[#b78232]" />}</div><div><div className="text-[10px] font-semibold text-[#173039]">{tool.label}</div><div className="mt-1 text-[9px] leading-4 text-[#7c898c]">{tool.detail}</div></div></button>)}</div></div>
    </aside>
  );
}
