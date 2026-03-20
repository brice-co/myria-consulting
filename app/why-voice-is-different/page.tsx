"use client";

import { motion } from "framer-motion";
import {
  Mic,
  Zap,
  Brain,
  AlertTriangle,
  Shield,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";


const points = [
  {
    icon: Mic,
    title: "Voice Is Real-Time by Nature",
    description:
      "Unlike chat, voice happens in real time. Latency isn’t an optimization — it defines the experience. A few hundred milliseconds can make the difference between natural conversation and frustration.",
  },
  {
    icon: Zap,
    title: "Latency Is a Product Decision",
    description:
      "In voice systems, architecture choices directly impact user trust. Browser-based STT/TTS, server-side pipelines, or realtime WebRTC all change how responsive and interruptible the system feels.",
  },
  {
    icon: Brain,
    title: "Conversation Is Continuous",
    description:
      "Voice is not turn-based. Users interrupt, hesitate, change direction mid-sentence. Voice agents must handle barge-in, partial intent detection, and conversational recovery.",
  },
  {
    icon: AlertTriangle,
    title: "Failures Are More Visible",
    description:
      "When a voice agent fails, users hear it immediately. There’s no time to hide behind loading states. Error handling, fallback strategies, and graceful degradation are critical.",
  },
  {
    icon: Shield,
    title: "Voice Touches Trust & Compliance",
    description:
      "Voice often involves sensitive data — identity, intent, personal context. Logging, isolation, consent, and governance must be designed from the start, not added later.",
  },
];

export default function WhyVoiceIsDifferentPage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-200px] left-[-200px] h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute bottom-[-200px] right-[-200px] h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-[120px]" />
      </div>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-32 pb-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-semibold tracking-tight"
        >
          Why Voice Is Different
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 max-w-3xl text-lg text-white/70"
        >
          Voice AI is not “chat with audio.”  
          It’s a fundamentally different interaction model — with different
          constraints, risks, and architectural decisions.
        </motion.p>
      </section>

      {/* Core Differences */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {points.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-8"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                  <point.icon className="h-5 w-5 text-emerald-400" />
                </div>
                <h3 className="text-xl font-medium">{point.title}</h3>
              </div>
              <p className="text-white/70 leading-relaxed">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Closing Perspective */}
      <section className="max-w-6xl mx-auto px-6 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-10 md:p-14"
        >
          <h2 className="text-2xl md:text-3xl font-semibold">
            Voice Systems Must Be Designed — Not Assembled
          </h2>
          <p className="mt-4 max-w-3xl text-white/70">
            Successful voice systems are intentional.  
            They balance latency, accuracy, interruption handling, security,
            and business workflows — all at once.
          </p>
          <p className="mt-4 max-w-3xl text-white/70">
            That’s why Myria Consulting approaches voice as a{" "}
            <span className="text-white font-medium">system design challenge</span>,
            not a feature toggle.
          </p>

          {/* CTA */}
          <div className="mt-8">
            <Link
              href="/work-with-us"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-medium text-black hover:bg-emerald-400 transition"
            >
              Work with us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
