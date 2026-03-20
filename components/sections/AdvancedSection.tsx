"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, FlaskConical } from "lucide-react";
import { useState } from "react";

const providers = [
  { name: "ElevenLabs", desc: "Premium voice synthesis & cloning" },
  { name: "Deepgram", desc: "Fast, accurate speech recognition" },
  { name: "Azure Cognitive Services", desc: "Enterprise-grade speech APIs" },
  { name: "Google Cloud Speech", desc: "Multi-language STT/TTS" },
  { name: "Custom Pipelines", desc: "Bring your own models & providers" },
];

const accessPoints = [
  "\"Advanced voice configuration\" toggle",
  "Developer documentation",
  "Early access program",
];

const AdvancedSection = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="mt-16 max-w-3xl mx-auto"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 mx-auto text-muted-foreground hover:text-tier-advanced transition-colors group"
      >
        <FlaskConical className="w-4 h-4" />
        <span className="text-sm font-mono tracking-wide">Advanced voice configuration</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
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
            <div className="mt-6 rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">🧪</span>
                <h3 className="font-semibold text-foreground">Advanced Providers</h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-tier-advanced/10 text-tier-advanced">
                  Developer
                </span>
              </div>

              <p className="text-sm text-muted-foreground mb-5">
                For teams needing custom voice pipelines, specialized providers, or enterprise integrations.
              </p>

              <div className="grid sm:grid-cols-2 gap-3 mb-5">
                {providers.map((p) => (
                  <div
                    key={p.name}
                    className="flex flex-col rounded-lg border border-border bg-secondary/30 p-3"
                  >
                    <span className="text-sm font-medium text-foreground">{p.name}</span>
                    <span className="text-xs text-muted-foreground">{p.desc}</span>
                  </div>
                ))}
              </div>

              <div className="text-xs text-muted-foreground">
                <span className="font-mono text-tier-advanced">Accessible via:</span>
                <ul className="mt-1.5 space-y-1">
                  {accessPoints.map((a) => (
                    <li key={a} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-tier-advanced/50" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdvancedSection;
