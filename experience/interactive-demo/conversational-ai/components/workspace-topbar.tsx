import { Mic, MessageSquareText, Radio, Users } from "lucide-react";
import { participants } from "../data/demo";
import type { Channel } from "../types/conversation";

export function WorkspaceTopbar({ channel, onChannel }: { channel: Channel; onChannel: (c: Channel) => void }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#173039]/10 px-5 py-4">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#173039]"><span className="h-2 w-2 rounded-full bg-[#0b6b66]" /> Myria Conversation Room</div>
        <div className="mt-1 text-[10px] text-[#7a898b]">Shared context · live collaboration · governed actions</div>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden items-center -space-x-2 sm:flex">{participants.map((p) => <div key={p.name} title={`${p.name} · ${p.role}`} className="grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-[#173039] text-[9px] font-bold text-white">{p.initials}</div>)}</div>
        <div className="flex rounded-full border border-[#173039]/10 bg-[#f8f5ef] p-1">
          <button onClick={() => onChannel("voice")} className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-semibold ${channel === "voice" ? "bg-[#173039] text-white" : "text-[#53686d]"}`}><Mic className="h-3 w-3" /> Voice</button>
          <button onClick={() => onChannel("chat")} className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-semibold ${channel === "chat" ? "bg-[#173039] text-white" : "text-[#53686d]"}`}><MessageSquareText className="h-3 w-3" /> Chat</button>
        </div>
        <span className="hidden items-center gap-1 text-[9px] font-semibold uppercase tracking-wider text-[#0b6b66] md:flex"><Radio className="h-3 w-3" /> Live</span>
      </div>
    </div>
  );
}
