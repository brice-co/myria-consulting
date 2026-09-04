"use client";

import { motion } from "framer-motion";

import { autonomyLevels } from "@/data/ai-enablement";
import { SectionHeading } from "./section-heading";

export function AutonomyScale() {
  return (
    <section className="mt-28">
      <SectionHeading
        eyebrow="Progressive Autonomy"
        title="Autonomy is earned, not switched on."
        description="Authority can expand progressively as use cases become better understood, controls mature, and performance becomes measurable."
      />

      <div className="mt-10 overflow-hidden rounded-[28px] border border-[#17313a]/10 bg-[#fbf8f3]">
        {autonomyLevels.map(([level, name, description], index) => (
          <motion.div
            key={level}
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="grid gap-3 border-b border-[#17313a]/10 p-5 last:border-b-0 md:grid-cols-[84px_220px_1fr] md:items-center"
          >
            <span
              className={[
                "flex h-10 w-14 items-center justify-center rounded-full text-xs font-semibold",
                index < 2
                  ? "bg-[#e6ecea] text-[#52746f]"
                  : index < 4
                    ? "bg-[#f1e4cf] text-[#9a6926]"
                    : "bg-[#17313a] text-white",
              ].join(" ")}
            >
              {level}
            </span>

            <p className="font-semibold text-[#17313a]">{name}</p>
            <p className="text-sm leading-6 text-[#68777a]">{description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
