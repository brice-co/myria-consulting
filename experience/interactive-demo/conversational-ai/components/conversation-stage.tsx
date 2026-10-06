import { ArrowUp, Mic, Sparkles, Volume2 } from "lucide-react";
import type { AgentId, Channel, Message } from "../types/conversation";

export function ConversationStage({ messages, channel, activeAgent, draft, onDraft, onSend }: { messages: Message[]; channel: Channel; activeAgent: AgentId; draft: string; onDraft: (v: string) => void; onSend: () => void }) {
  return (
    <main className="flex min-h-[520px] flex-col bg-white">
      <div className="flex items-center justify-between border-b border-[#173039]/10 px-5 py-3"><div><div className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#7b898c]">Shared conversation</div><div className="mt-1 text-xs font-semibold text-[#173039]">Northwind expansion discussion</div></div><div className="flex items-center gap-2 text-[9px] text-[#0b6b66]"><Sparkles className="h-3 w-3" /> {activeAgent === "orchestrator" ? "Myria coordinating" : "Specialist engaged"}</div></div>
      <div className="flex-1 space-y-4 overflow-y-auto p-5">
        {messages.map((m) => {
          const human = m.role === "customer" || m.role === "human";
          return <div key={m.id} className={`flex ${human ? "justify-start" : "justify-end"}`}><div className={`max-w-[82%] ${human ? "" : "text-right"}`}><div className="mb-1 flex items-center gap-2 text-[8px] uppercase tracking-wider text-[#849093]">{!human && <span className="ml-auto" />}{m.author}<span>{m.time}</span></div><div className={`inline-block rounded-xl px-4 py-3 text-left text-[11px] leading-5 ${human ? "bg-[#efede5] text-[#354b50]" : m.agentId === "orchestrator" ? "bg-[#086963] text-white" : "border border-[#0b6b66]/20 bg-[#f2f8f6] text-[#29484b]"}`}>{m.text}</div></div></div>;
        })}
      </div>
      <div className="border-t border-[#173039]/10 p-4">
        {channel === "voice" && <div className="mb-3 flex items-center gap-3 rounded-xl bg-[#f8f5ef] px-3 py-2"><div className="grid h-8 w-8 place-items-center rounded-full bg-[#0b6b66] text-white"><Mic className="h-3.5 w-3.5" /></div><div className="flex flex-1 items-end gap-[3px]">{[8,14,6,18,11,20,9,15,7,17,10,13,6,19,9,14].map((h,i)=><span key={i} className="w-1 rounded-full bg-[#0b6b66]/60" style={{height:h}} />)}</div><Volume2 className="h-3.5 w-3.5 text-[#6e7e81]" /></div>}
        <div className="flex items-center gap-2 rounded-xl border border-[#173039]/15 bg-white px-3 py-2"><input value={draft} onChange={(e)=>onDraft(e.target.value)} onKeyDown={(e)=>e.key === "Enter" && onSend()} placeholder="Add to the shared conversation…" className="min-w-0 flex-1 bg-transparent text-[11px] text-[#173039] outline-none placeholder:text-[#9aa4a5]" /><button onClick={onSend} className="grid h-7 w-7 place-items-center rounded-full bg-[#173039] text-white"><ArrowUp className="h-3.5 w-3.5" /></button></div>
      </div>
    </main>
  );
}
