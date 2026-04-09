"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Sparkles, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-background">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-4xl text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-linear-to-r from-cyan-500/10 to-blue-500/10 px-5 py-2.5 text-sm font-medium text-cyan-400 backdrop-blur-sm"
            >
              <Shield className="h-4 w-4" />
              <span>Paid Advisory Engagement · AI Architecture Labs</span>
              <Sparkles className="h-4 w-4" />
            </motion.div>

            <motion.h1
              className="mb-6 text-4xl font-bold md:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Understand Your AI System <br />
              <span className="text-cyan-400">Before You Scale It.</span>
            </motion.h1>

            <motion.p
              className="mb-8 text-lg text-white/70 md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              A focused 2–4 week engagement to assess architecture, governance,
              operational risk, and production readiness.
              <br className="hidden md:block" />
              Get clarity on what is strong, what is fragile, and what needs to
              happen next.
            </motion.p>

            <motion.div
              className="mb-10 flex flex-col justify-center gap-4 text-sm text-white/70 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span>✔ Architecture Clarity</span>
              <span>✔ Risk Identification</span>
              <span>✔ Executive-Ready Outputs</span>
            </motion.div>

            <motion.div
              className="flex flex-col justify-center gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="/voice-diagnostic/apply" className="mx-auto sm:mx-0">
                <Button size="lg" className="group px-8 py-6 text-base">
                  Book an AI Architecture Lab
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <Link href="/deliverable" className="mx-auto sm:mx-0">
                <Button size="lg"  className="px-8 py-6 text-blue-300 bg-muted hover:bg-muted/80 hover:text-white hover:bg-blue-500/10 transition-colors">
                  View Sample Deliverables
                  <Briefcase className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;