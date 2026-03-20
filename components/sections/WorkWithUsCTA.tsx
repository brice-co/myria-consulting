"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function WorkWithUsCTA() {
  return (
    <section className="relative border-t border-white/10 bg-black">
      <div className="mx-auto max-w-6xl px-6 py-24 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-semibold md:text-4xl"
        >
          Let’s build something real.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-neutral-400"
        >
          Tell us about your use case, constraints, and goals.
          We’ll help you assess what’s feasible — and what’s worth building.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-10 flex justify-center"
        >
          <Link
            href="/work-with-us"
            className="inline-flex items-center rounded-xl bg-white px-8 py-4 text-sm font-medium text-black transition hover:bg-neutral-200"
          >
            Work with us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
