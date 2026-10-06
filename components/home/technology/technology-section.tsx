"use client";

import { motion } from "framer-motion";

import { TechnologyCapabilities } from "./technology-capabilities";
import { TechnologyFlow } from "./technology-flow";
import { TechStack } from "./tech-stack";

export function TechnologySection() {
  return (
    <section className="border-t border-border/50 bg-card/30 py-24 lg:py-15">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader />

        <div className="mt-16">         
          <TechnologyCapabilities />
           <TechnologyFlow />
        </div>
        <TechStack/>
        
      </div>
    </section>
  );
}

function SectionHeader() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex items-center justify-center gap-3 font-mono text-[9px] uppercase tracking-[0.28em] text-primary"
      >
        <span className="h-px w-8 bg-primary" />

        Technology behind the experience

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
        className="mt-6 font-serif text-4xl tracking-[-0.04em] md:text-6xl"
      >
        From business thinking
        <br />

        <em className="text-primary">
          to enterprise execution.
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
        Myria brings collaboration, AI, organizational
        context, durable workflows and enterprise
        connectivity into one environment—so insight
        does not stop at recommendation.
      </motion.p>
    </div>
  );
}