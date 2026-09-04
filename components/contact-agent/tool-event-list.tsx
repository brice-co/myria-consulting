"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, LoaderCircle, ShieldCheck, X } from "lucide-react";
import type { ToolEvent } from "@/lib/myria-contact-agent/realtime/types";

function Icon({ status }: { status: ToolEvent["status"] }) {
  if (status === "running") return <LoaderCircle className="h-3.5 w-3.5 animate-spin" />;
  if (status === "error") return <X className="h-3.5 w-3.5" />;
  if (status === "info") return <ShieldCheck className="h-3.5 w-3.5" />;
  return <Check className="h-3.5 w-3.5" />;
}

export function ToolEventList({ events }: { events: ToolEvent[] }) {
  return (
    <section className="rounded-[24px] border border-[#17313a]/10 bg-[#fbf8f3] p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b57b2a]">Agent activity</p>
          <h3 className="mt-1 font-serif text-xl">Tool events</h3>
        </div>
        <span className="rounded-full bg-[#e8efec] px-2.5 py-1 text-[10px] text-[#52746f]">Live</span>
      </div>

      <div className="mt-4 space-y-2">
        <AnimatePresence initial={false}>
          {events.length ? events.map((event) => (
            <motion.div key={event.id} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 rounded-2xl border border-[#17313a]/8 bg-white/55 px-3 py-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#17313a] text-white"><Icon status={event.status} /></span>
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold">{event.label}</p>
                <p className="mt-0.5 text-[10px] text-[#7b888b]">{new Date(event.at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
              </div>
            </motion.div>
          )) : (
            <p className="rounded-2xl border border-dashed border-[#17313a]/10 px-4 py-5 text-xs leading-5 text-[#7b888b]">Tool activity will appear here as the advisor structures your inquiry and prepares confirmation.</p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
