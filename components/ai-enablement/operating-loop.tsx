"use client";

import { motion } from "framer-motion";

import { operatingLoop } from "@/data/ai-enablement";
import { SectionHeading } from "./section-heading";

export function OperatingLoop() {
  return (
    <section className="mt-28">
      <SectionHeading
        eyebrow="Intelligent Operations"
        title="The AI-enabled operating loop"
        description="AI becomes operational when it can participate continuously in the cycle through which the enterprise senses change, reasons, acts, and learns."
      />

      <div className="mt-10 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        {operatingLoop.map(([number, title, description], index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.06 }}
            whileHover={{ y: -5 }}
            className="relative rounded-[24px] border border-[#17313a]/10 bg-[#fbf8f3] p-5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#5d8f88]/30 bg-[#e8f0ed] text-xs font-semibold text-[#3f756e]">
              {number}
            </div>
            <h3 className="mt-5 font-serif text-xl text-[#17313a]">{title}</h3>
            <p className="mt-3 text-xs leading-5 text-[#657478]">{description}</p>

            {index < operatingLoop.length - 1 ? (
              <span className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-[#b57b2a] xl:block">
                →
              </span>
            ) : null}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
