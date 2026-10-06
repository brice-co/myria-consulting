import { Bot, Sparkles, Users } from "lucide-react";
import { agents } from "../data/demo";
import type { AgentId } from "../types/conversation";

export function AgentTeamPanel({ active, onSelect }: { active: AgentId; onSelect: (id: AgentId) => void }) {
  return (
    <aside className="border-r border-[#173039]/10 bg-[#fbfaf6] p-4">
      <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#718185]"><Users className="h-3 w-3" /> Virtual team</div>
      <div className="mt-4 space-y-2">
        {agents.map((agent) => {
          const selected = active === agent.id;
          return <button key={agent.id} onClick={() => onSelect(agent.id)} className={`w-full rounded-xl border p-3 text-left transition ${selected ? "border-[#0b6b66]/40 bg-white shadow-sm" : "border-transparent hover:border-[#173039]/10 hover:bg-white"}`}>
            <div className="flex items-start gap-3"><div className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-[9px] font-bold ${selected ? "bg-[#0b6b66] text-white" : "bg-[#e7ebe7] text-[#173039]"}`}>{agent.initials}</div><div className="min-w-0"><div className="flex items-center gap-1.5 text-xs font-semibold text-[#173039]">{agent.name}{selected && <Sparkles className="h-3 w-3 text-[#b78232]" />}</div><div className="mt-0.5 text-[9px] font-medium text-[#0b6b66]">{agent.role}</div><p className="mt-1.5 text-[9px] leading-4 text-[#788689]">{agent.specialty}</p></div></div>
          </button>;
        })}
      </div>
      <div className="mt-5 rounded-xl border border-[#b78232]/20 bg-[#fffaf0] p-3"><div className="flex gap-2"><Bot className="mt-0.5 h-3.5 w-3.5 text-[#b78232]" /><p className="text-[9px] leading-4 text-[#6d6555]"><b className="text-[#173039]">Agent handoff:</b> Myria can bring specialists into the same context instead of restarting the conversation.</p></div></div>
    </aside>
  );
}
