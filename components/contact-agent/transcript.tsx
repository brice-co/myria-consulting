"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

import type { TranscriptItem } from "@/lib/myria-contact-agent/realtime/types";

type Props = {
  items: TranscriptItem[];
  connected: boolean;
};

export function Transcript({ items, connected }: Props) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [items]);

  if (!items.length) {
    return (
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-8 py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#5d8f88]/25 bg-[#e9f0ed]">
          <MessageCircle className="h-6 w-6 text-[#4f7d77]" />
        </div>

        <h2 className="mt-6 font-serif text-2xl">
          {connected
            ? "I'm listening."
            : "A better way to contact Myria."}
        </h2>

        <p className="mt-3 max-w-md text-sm leading-6 text-[#68777a]">
          {connected
            ? "Tell me what you're working on. I'll help turn it into a clear inquiry for the Myria team."
            : "Start a live conversation, then speak naturally or use the text field."}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
      <div className="space-y-4 px-5 py-6 sm:px-6">
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={[
              "max-w-[88%] rounded-[22px] px-4 py-3 text-sm leading-6",
              item.role === "user"
                ? "ml-auto bg-[#17313a] text-white"
                : "border border-[#17313a]/8 bg-white/65 text-[#31484f]",
            ].join(" ")}
          >
            {item.text}
          </motion.div>
        ))}

        {/* Auto-scroll target */}
        <div ref={bottomRef} className="h-px" />
      </div>
    </div>
  );
}