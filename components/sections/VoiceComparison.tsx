"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FEATURES = [
  {
    label: "Setup Complexity",
    essential: "Very Low",
    professional: "Low",
    realtime: "Medium",
  },
  {
    label: "Latency",
    essential: "Medium",
    professional: "Low",
    realtime: "Ultra-Low",
  },
  {
    label: "Barge-In / Interruptions",
    essential: "Not supported",
    professional: "Not supported",
    realtime: "Fully supported",
  },
  {
    label: "Voice Naturalness",
    essential: "Good",
    professional: "Very Good",
    realtime: "Excellent",
  },
  {
    label: "Browser Dependency",
    essential: "High",
    professional: "Low",
    realtime: "None",
  },
  {
    label: "Production Readiness",
    essential: "Limited",
    professional: "Production-ready",
    realtime: "Production-grade",
  },
  {
    label: "Ideal Use Case",
    essential: "MVP / Validation",
    professional: "Core Business Flows",
    realtime: "Sales & Support at Scale",
  },
];

export default function VoiceCapabilityComparison() {
  const [open, setOpen] = useState(false);

  return (
    <main className="mx-auto max-w-7xl px-6 py-24">

      {/* Header */}
      <section className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Voice Capability Comparison
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Different voice implementations serve different business needs.
          We design the right approach based on experience goals, latency
          requirements, and operational maturity.
        </p>
      </section>

      {/* Table */}
      <section className="mt-16 overflow-x-auto">
        <table className="w-full border-collapse rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-white/10">
              <th className="px-4 py-4 text-left text-sm font-medium text-white">
                Feature
              </th>
              <th className="px-4 py-4 text-sm font-medium text-white">
                Essential
              </th>
              <th className="px-4 py-4 text-sm font-medium text-white">
                Professional
              </th>
              <th className="px-4 py-4 text-sm font-medium text-emerald-400">
                Realtime
              </th>
            </tr>
          </thead>
          <tbody>
            {FEATURES.map((row) => (
              <tr key={row.label} className="border-t border-white/10">
                <td className="px-4 py-4 text-sm text-white">
                  {row.label}
                </td>
                <td className="px-4 py-4 text-sm text-muted-foreground">
                  {row.essential}
                </td>
                <td className="px-4 py-4 text-sm text-muted-foreground">
                  {row.professional}
                </td>
                <td className="px-4 py-4 text-sm text-emerald-400 font-medium">
                  {row.realtime}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Expandable Deep Dive Section */}
      <section className="mt-20 max-w-3xl mx-auto">

        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 mx-auto text-muted-foreground hover:text-white transition-colors group"
        >
          <span className="text-sm uppercase tracking-wide">
            Deep Dive: Capability Architecture
          </span>

          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8">

                <h3 className="text-lg font-semibold text-white">
                  Architectural Differences Explained
                </h3>

                <p className="mt-4 text-sm text-muted-foreground">
                  The difference between Essential, Professional, and Realtime
                  Voice is not just latency — it’s architectural design.
                </p>

                <div className="mt-6 space-y-6 text-sm text-muted-foreground">

                  <div>
                    <p className="font-medium text-white">
                      Essential Voice
                    </p>
                    <p className="mt-1">
                      Relies primarily on browser-native capabilities with
                      limited orchestration. Suitable for validation and
                      experimentation.
                    </p>
                  </div>

                  <div>
                    <p className="font-medium text-white">
                      Professional Voice
                    </p>
                    <p className="mt-1">
                      Introduces server-side orchestration, logging,
                      and workflow triggers. Designed for predictable
                      business operations.
                    </p>
                  </div>

                  <div>
                    <p className="font-medium text-emerald-400">
                      Realtime Voice
                    </p>
                    <p className="mt-1">
                      Built on streaming architectures (e.g., WebRTC),
                      enabling interruption handling, natural turn-taking,
                      and production-grade reliability at scale.
                    </p>
                  </div>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </section>

      {/* CTA */}
      <section className="mt-24 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <a
          href="/work-with-us/engagement-models"
          className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-6 py-3 text-sm font-medium text-black hover:bg-emerald-400 transition"
        >
          Discuss the Right Voice Approach
        </a>

        <a
          href="/voice-diagnostic/apply"
          className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3 text-sm font-medium text-white hover:bg-white/10 transition"
        >
          Request a Custom Build
        </a>
      </section>

    </main>
  );
}
