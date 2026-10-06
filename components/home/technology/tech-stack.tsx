"use client";

import { motion } from "framer-motion";

const stack = [
  "Next.js 16",
  "TypeScript",
  "OpenAI Realtime",
  "WebRTC",
  "AI SDK",
  "Liveblocks",
  "Livekit",
  "Tiptap",
  "Redis Streams",
  "Inngest",
  "PostgreSQL",
  "Drizzle ORM",
  "React Flow",
  "AWS",  
  "Railway",
  "Vercel",
];

export function TechStack() {
  const row = [...stack, ...stack];
  return (
    <section className="relative py-24 px-6 border-y border-border/50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
            ── The stack we ship with
          </div>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex gap-3 w-max"
          >
            {row.map((s, i) => (
              <div key={`${s}-${i}`} className="px-5 py-3 rounded-full glass text-sm font-mono whitespace-nowrap">
                {s}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
