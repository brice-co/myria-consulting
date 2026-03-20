"use client";

import { motion } from "framer-motion";
import TierCard from "@/components/sections/TierCard";

const tiers = [
  {
    emoji: "1️⃣",
    name: "Essential Voice",
    label: "Budget-friendly",
    bestFor: "MVPs, small businesses",
    features: [
      "Browser STT (Web Speech API)",
      "Browser or OpenAI TTS",
      "Server-side LLM",
      "No Realtime WebRTC",
      "Slightly higher latency",
      "Lowest cost",
    ],
    tagline: "Great for getting started",
    colorVar: "--tier-essential",
    tierId: "essential" as const,
  },
  {
    emoji: "2️⃣",
    name: "Professional Voice",
    label: "Default",
    bestFor: "Most customers",
    features: [
      "OpenAI STT + TTS",
      "Server-orchestrated",
      "Better reliability",
      "Intent logging + summaries",
      "Booking & email tools",
    ],
    tagline: "Production-ready voice AI",
    colorVar: "--tier-professional",
    tierId: "professional" as const,
    featured: true,
  },
  {
    emoji: "3️⃣",
    name: "Realtime Voice",
    label: "Premium",
    bestFor: "Sales, support, high-touch UX",
    features: [
      "OpenAI Realtime WebRTC",
      "Barge-in & interruption",
      "Natural conversation flow",
      "Best user experience",
    ],
    tagline: "Human-like, low-latency conversations",
    colorVar: "--tier-realtime",
    tierId: "realtime" as const,
  },
];

const VoiceTiers = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Grid pattern overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-20">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-mono tracking-widest uppercase text-primary mb-4">
            Voice Capabilities
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Choose Your Voice Experience
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From budget-friendly MVPs to human-like real-time conversations —
            pick the tier that fits your product and scale as you grow.
          </p>
        </motion.div>

        {/* Tier Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <TierCard key={tier.name} {...tier} delay={0.2 + i * 0.15} />
          ))}
        </div>

        {/* Advanced Section */}
       
      </div>
    </div>
  );
};

export default VoiceTiers;
