import { Sparkles } from "lucide-react";
import type { ConnectionStatus } from "@/lib/myria-contact-agent/realtime/types";

const labels: Record<ConnectionStatus, string> = {
  idle: "Ready", connecting: "Connecting", connected: "Live", ending: "Ending", error: "Connection issue",
};

export function AgentHeader({ status }: { status: ConnectionStatus }) {
  return (
    <header className="flex items-center justify-between border-b border-[#17313a]/10 px-5 py-4 sm:px-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#17313a] text-[#f7f3ec]">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <p className="font-serif text-lg leading-none">Myria Contact Advisor</p>
          <p className="mt-1 text-[11px] text-[#738084]">Realtime voice + text</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs text-[#657478]">
        <span className={["h-2 w-2 rounded-full", status === "connected" ? "bg-[#5d8f88]" : status === "connecting" ? "animate-pulse bg-[#b57b2a]" : "bg-[#a9b0b0]"].join(" ")} />
        {labels[status]}
      </div>
    </header>
  );
}
