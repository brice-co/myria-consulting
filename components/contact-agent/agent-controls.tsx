import { Mic, MicOff, PhoneOff, Radio } from "lucide-react";
import type { ConnectionStatus } from "@/lib/myria-contact-agent/realtime/types";

type Props = { status: ConnectionStatus; muted: boolean; onConnect: () => void; onMute: () => void; onEnd: () => void };

export function AgentControls({ status, muted, onConnect, onMute, onEnd }: Props) {
  if (status !== "connected") {
    return (
      <button type="button" onClick={onConnect} disabled={status === "connecting"}
        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#b57b2a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#a76f24] disabled:cursor-wait disabled:opacity-60">
        <Radio className="h-4 w-4" />
        {status === "connecting" ? "Connecting…" : "Start voice conversation"}
      </button>
    );
  }

  return (
    <div className="mt-3 flex gap-2">
      <button type="button" onClick={onMute} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[#17313a]/12 bg-white/50 px-4 py-3 text-sm font-semibold transition hover:bg-white">
        {muted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        {muted ? "Unmute" : "Mute"}
      </button>
      <button type="button" onClick={onEnd} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[#17313a]/12 px-4 py-3 text-sm font-semibold transition hover:bg-[#17313a] hover:text-white">
        <PhoneOff className="h-4 w-4" /> End
      </button>
    </div>
  );
}
