import { Mic, MicOff, PhoneOff } from "lucide-react";
import type { AdvisoryStatus } from "@/lib/advisory-lab/types";
const bars=[14,20,10,28,17,34,22,15,31,25,42,24,16,35,22,30,18,12,26,38,21,29,16,11,24,18,13];

export function VoiceControls({ status, muted, onStart, onToggleMute, onEnd }: { status: AdvisoryStatus; muted: boolean; onStart:()=>void; onToggleMute:()=>void; onEnd:()=>void }) {
  const live=status==="live"||status==="muted";
  return <div className="grid items-center gap-5 rounded-2xl border border-white/10 bg-black/10 p-4 md:grid-cols-[220px_1fr_180px]">
    <div className="flex items-center gap-3">{!live?<button type="button" onClick={onStart} disabled={status==="connecting"} className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-lg shadow-blue-500/20 disabled:opacity-50"><Mic className="h-5 w-5"/></button>:<button type="button" onClick={onToggleMute} className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 shadow-lg shadow-blue-500/20">{muted?<MicOff className="h-5 w-5"/>:<Mic className="h-5 w-5"/>}</button>}
      <div><div className="text-sm font-semibold">{status==="connecting"?"Connecting...":live?(muted?"Microphone muted":"Listening"):"Start advisory"}</div><div className="mt-1 text-xs text-slate-500">{live?"Speak naturally with Myria":"Begin the live Lab demo"}</div></div>
    </div>
    <div className="flex h-14 items-end justify-center gap-1 overflow-hidden">{bars.map((height,index)=><div key={index} className={["w-1 rounded-full transition-all",live&&!muted?"bg-gradient-to-t from-indigo-500 to-cyan-300":"bg-slate-700"].join(" ")} style={{height:live&&!muted?`${height}px`:`${Math.min(10,height)}px`}}/>)}</div>
    <div className="flex justify-end">{live?<button type="button" onClick={onEnd} className="inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-200"><PhoneOff className="h-4 w-4"/>End session</button>:<span className="text-xs text-slate-500">Auto-stop enabled</span>}</div>
  </div>;
}
