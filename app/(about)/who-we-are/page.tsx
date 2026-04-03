"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/marketing/layout/Section";

/* -------------------------------------------------
   Motion variants (LOCAL, SAFE, TS-CLEAN)
-------------------------------------------------- */
const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};


export default function WhoWeArePage() {
  return (
    <Section className="py-24">
      <div className="mx-auto max-w-5xl space-y-24">
      
        {/* HERO */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
            We build AI systems people can trust.
          </h1>
          <p className="max-w-3xl text-lg text-muted-foreground">
            Myria Consulting is your AI systems and governance partner focused on
            designing and building intelligent systems that operate reliably
            inside real organizations — not just impressive demos.
          </p>
        </motion.div>

        {/* MISSION */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 sm:grid-cols-2"
        >
          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Our mission is to help organizations move from AI experimentation
              to structured, production-grade AI systems that create measurable value.
            </p>

            <p>
              We believe AI becomes powerful when it is governed, integrated,
              and designed as part of a larger system — not as isolated features.
            </p>

            <p>
              We don’t sell platforms.  
              We help teams define the right entry point into AI —  
              then design systems that evolve with them.
            </p>
          </div>

        </motion.section>

        {/* VISION */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 sm:grid-cols-2"
        >
          <h2 className="text-2xl font-semibold">Our Vision</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              We envision a future where AI is not a separate layer,
              but a living part of how organizations operate.
            </p>
            <p>
              AI interfaces — including voice and real-time systems —
              will become the front door —
              not because they are flashy,
              but because they reduce friction,
              accelerate decisions,
              and make systems more accessible.
            </p>
            <p>
              Our goal is to help organizations build AI foundations
              they can trust, govern, and grow over time.
            </p>
          </div>

        </motion.section>

        {/* PHILOSOPHY */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 sm:grid-cols-2"
        >
          <h2 className="text-2xl font-semibold">Our Philosophy</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              AI fails when it is treated as a feature.
            </p>
            <p>
              Successful AI systems are:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Designed around real workflows</li>
              <li>Integrated with existing tools and data</li>
              <li>Governed with clear ownership and security</li>
              <li>Built to evolve, not to impress</li>
            </ul>
            <p>
              That’s why we design AI as systems —
              where interfaces like voice are only one layer
              of a larger, governed architecture.
            </p>
          </div>

        </motion.section>

        {/* INSPIRATION */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 sm:grid-cols-2"
        >
          <div>
            <h2 className="text-2xl font-semibold">What Inspires Us</h2>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>
              We are inspired by organizations that treat technology
              as an enabler of people — not a replacement for them.
            </p>
            <p>
              We draw from systems thinking, organizational design,
              and real-world operations — not just AI research.
            </p>
            <p>
              The best AI solutions feel invisible:
              they reduce friction,
              simplify complexity,
              and quietly improve outcomes.
            </p>
          </div>

        </motion.section>

        {/* AMBITION */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 sm:grid-cols-2"
        >
          <div>
            <h2 className="text-2xl font-semibold">Our Ambition</h2>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Our ambition is to become a trusted partner
              for organizations navigating the shift toward AI-driven operations.
            </p>
            <p>
              We aim to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Design and implement production-grade AI systems</li>
              <li>Help teams avoid costly AI missteps</li>
              <li>Lay the groundwork for scalable AI platforms</li>
            </ul>
            <p>
              We believe trust is earned —
              through clarity, craftsmanship, and long-term thinking.
            </p>
          </div>

        </motion.section>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-12 border-t border-border"
        >
          <p className="text-lg font-medium">
            Want to understand how mature and scalable your AI systems are?
          </p>
          <Button
           asChild
           size="lg"
           className="bg-emerald-500 text-black hover:bg-emerald-400 transition-all duration-200"
            >
            <Link href="/ai-governance-assessment">
              Get Your AI Governance Score
            </Link>
          </Button>

        </motion.div>

      </div>
      
    </Section>
  );
}
