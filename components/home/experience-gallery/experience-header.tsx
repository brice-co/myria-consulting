"use client";

import { motion } from "framer-motion";

export function ExperienceHeader() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex items-center justify-center gap-3 font-mono text-[9px] uppercase tracking-[0.28em] text-primary"
      >
        <span className="h-px w-8 bg-primary" />

        Explore the experience

        <span className="h-px w-8 bg-primary" />
      </motion.div>

      <motion.h2
        initial={{
          opacity: 0,
          y: 16,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-6 font-serif text-4xl leading-[1.02] tracking-[-0.04em] text-foreground md:text-6xl"
      >
        See what collaborative
        <br />

        <em className="text-primary">
          intelligence can become.
        </em>
      </motion.h2>

      <motion.p
        initial={{
          opacity: 0,
          y: 10,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          delay: 0.1,
        }}
        className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground"
      >
        Explore how Myria brings business
        thinking, collaborative work and
        specialized AI together—from advisory
        conversations to enterprise execution.
      </motion.p>
    </div>
  );
}