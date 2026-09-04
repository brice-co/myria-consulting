"use client";

import { useEffect, useRef } from "react";
import type { TranscriptItem } from "@/lib/virtual-advisory-team/types";

export function TranscriptPanel({ transcript }: { transcript: TranscriptItem[] }) {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [transcript]);

  return (
    <section className="flex h-[430px] min-h-0 flex-col rounded-3xl border border-white/10 bg-white/[0.035]">
      <div className="shrink-0 border-b border-white/10 px-5 py-4">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Conversation</div>
        <h2 className="mt-1 text-sm font-semibold">Live transcript</h2>
      </div>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain p-5">
        {transcript.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 p-5 text-sm leading-6 text-slate-500">
            Start a session and the live advisory transcript will appear here.
          </div>
        ) : (
          transcript.map((item) => (
            <div
              key={item.id}
              className={[
                "max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6",
                item.role === "assistant"
                  ? "bg-white/[0.05] text-slate-200"
                  : "ml-auto bg-indigo-500/20 text-indigo-50",
              ].join(" ")}
            >
              {item.text}
            </div>
          ))
        )}
        <div ref={endRef} />
      </div>
    </section>
  );
}
