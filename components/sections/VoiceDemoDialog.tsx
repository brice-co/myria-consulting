"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Mic, MicOff, Phone, PhoneOff } from "lucide-react";

type TierType = "essential" | "professional" | "realtime";

interface ConversationStep {
  role: "user" | "ai";
  text: string;
  delay: number; // ms before this message appears after previous
}

const scenarios: Record<TierType, { intro: string; steps: ConversationStep[] }> = {
  essential: {
    intro: "Simulating Essential Voice — Browser STT, higher latency, budget-friendly",
    steps: [
      { role: "user", text: "Hi, I'd like to book an appointment.", delay: 800 },
      { role: "ai", text: "Processing your request…", delay: 2200 },
      { role: "ai", text: "Sure! I can help you book an appointment. What date works for you?", delay: 1800 },
      { role: "user", text: "How about next Tuesday at 3pm?", delay: 2000 },
      { role: "ai", text: "Processing…", delay: 2400 },
      { role: "ai", text: "Let me check availability for Tuesday at 3 PM. One moment please.", delay: 1600 },
      { role: "ai", text: "Great news — Tuesday at 3 PM is available! I've booked that for you.", delay: 2000 },
    ],
  },
  professional: {
    intro: "Simulating Professional Voice — OpenAI STT+TTS, server-orchestrated, production-ready",
    steps: [
      { role: "user", text: "Hi, I'd like to book an appointment.", delay: 600 },
      { role: "ai", text: "Of course! I'd be happy to help you schedule an appointment. What date and time work best for you?", delay: 1200 },
      { role: "user", text: "Next Tuesday at 3pm.", delay: 1400 },
      { role: "ai", text: "Tuesday at 3 PM — checking availability now…", delay: 800 },
      { role: "ai", text: "✅ Booked! I've also sent a confirmation email to your address on file. Would you like me to add a calendar reminder?", delay: 1100 },
      { role: "user", text: "Yes please!", delay: 1200 },
      { role: "ai", text: "Done! Calendar invite sent. Anything else I can help with?", delay: 900 },
    ],
  },
  realtime: {
    intro: "Simulating Realtime Voice — WebRTC, barge-in support, human-like latency",
    steps: [
      { role: "user", text: "Hi, I'd like to book an—", delay: 400 },
      { role: "ai", text: "An appointment? Absolutely! When works for you?", delay: 350 },
      { role: "user", text: "Uh, next Tues—", delay: 500 },
      { role: "ai", text: "Tuesday? Sure thing. What time?", delay: 280 },
      { role: "user", text: "3 PM.", delay: 400 },
      { role: "ai", text: "3 PM Tuesday — booked! ✅ Confirmation sent. Anything else?", delay: 320 },
      { role: "user", text: "Nope, thanks!", delay: 500 },
      { role: "ai", text: "Have a great day! 👋", delay: 250 },
    ],
  },
};

// Animated waveform bars
const WaveformBars = ({ active, color }: { active: boolean; color: string }) => (
  <div className="flex items-center gap-[3px] h-8">
    {Array.from({ length: 5 }).map((_, i) => (
      <motion.div
        key={i}
        className="w-[3px] rounded-full"
        style={{ backgroundColor: color }}
        animate={
          active
            ? {
                height: [8, 20 + Math.random() * 12, 8],
                opacity: [0.5, 1, 0.5],
              }
            : { height: 8, opacity: 0.3 }
        }
        transition={
          active
            ? {
                duration: 0.4 + Math.random() * 0.3,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.08,
              }
            : { duration: 0.3 }
        }
      />
    ))}
  </div>
);

// Typing indicator dots
const TypingDots = ({ color }: { color: string }) => (
  <div className="flex items-center gap-1.5 px-3 py-2">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: color }}
        animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1, 0.85] }}
        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
      />
    ))}
  </div>
);

// Latency badge
const LatencyBadge = ({ ms }: { ms: number }) => (
  <span className="text-[10px] font-mono text-muted-foreground ml-2">
    ~{ms}ms
  </span>
);

interface VoiceDemoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tier: TierType;
  tierName: string;
  colorVar: string;
}

const VoiceDemoDialog = ({ open, onOpenChange, tier, tierName, colorVar }: VoiceDemoDialogProps) => {
  const [visibleSteps, setVisibleSteps] = useState<number>(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [currentSpeaker, setCurrentSpeaker] = useState<"user" | "ai" | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  const solidColor = `hsl(var(${colorVar}))`;
  const scenario = scenarios[tier];

  const clearTimeouts = useCallback(() => {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
  }, []);

  const startDemo = useCallback(() => {
    clearTimeouts();
    setVisibleSteps(0);
    setIsActive(true);
    setIsTyping(false);
    setCurrentSpeaker(null);

    let cumulativeDelay = 600; // initial pause

    scenario.steps.forEach((step, index) => {
      cumulativeDelay += step.delay;

      // Show typing indicator before AI messages
      if (step.role === "ai") {
        const typingTimeout = setTimeout(() => {
          setIsTyping(true);
          setCurrentSpeaker("ai");
        }, cumulativeDelay - Math.min(step.delay * 0.6, 600));
        timeoutRefs.current.push(typingTimeout);
      } else {
        const speakTimeout = setTimeout(() => {
          setCurrentSpeaker("user");
          setIsTyping(false);
        }, cumulativeDelay - Math.min(step.delay * 0.5, 400));
        timeoutRefs.current.push(speakTimeout);
      }

      const showTimeout = setTimeout(() => {
        setVisibleSteps(index + 1);
        setIsTyping(false);
        setCurrentSpeaker(step.role);
      }, cumulativeDelay);
      timeoutRefs.current.push(showTimeout);
    });

    // End state
    const endTimeout = setTimeout(() => {
      setCurrentSpeaker(null);
      setIsActive(false);
    }, cumulativeDelay + 1000);
    timeoutRefs.current.push(endTimeout);
  }, [scenario, clearTimeouts]);

  useEffect(() => {
    if (open) {
      startDemo();
    } else {
      clearTimeouts();
      setVisibleSteps(0);
      setIsActive(false);
      setIsTyping(false);
      setCurrentSpeaker(null);
    }
    return clearTimeouts;
  }, [open, startDemo, clearTimeouts]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleSteps, isTyping]);

  const displayedSteps = scenario.steps.slice(0, visibleSteps);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border p-0 overflow-hidden">
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-border"
        >
          <div>
            <DialogTitle className="text-sm font-semibold text-foreground">
              {tierName} Demo
            </DialogTitle>
            <p className="text-[11px] text-muted-foreground font-mono mt-0.5">
              {scenario.intro}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <WaveformBars active={isActive} color={solidColor} />
            {isActive ? (
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: solidColor }} />
            ) : (
              <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
            )}
          </div>
        </div>

        {/* Conversation area */}
        <div ref={scrollRef} className="px-5 py-4 h-[340px] overflow-y-auto space-y-3">
          <AnimatePresence mode="popLayout">
            {displayedSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25 }}
                className={`flex ${step.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-sm ${
                    step.role === "user"
                      ? "bg-secondary text-secondary-foreground rounded-br-sm"
                      : "rounded-bl-sm"
                  }`}
                  style={
                    step.role === "ai"
                      ? {
                          backgroundColor: `hsl(var(${colorVar}) / 0.1)`,
                          color: solidColor,
                        }
                      : undefined
                  }
                >
                  {step.text}
                  {step.role === "ai" && (
                    <LatencyBadge ms={step.delay} />
                  )}
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                key="typing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-start"
              >
                <div
                  className="rounded-xl rounded-bl-sm"
                  style={{ backgroundColor: `hsl(var(${colorVar}) / 0.1)` }}
                >
                  <TypingDots color={solidColor} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!isActive && visibleSteps >= scenario.steps.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center pt-3"
            >
              <p className="text-xs text-muted-foreground mb-3">Demo complete</p>
              <button
                onClick={startDemo}
                className="text-xs font-mono px-4 py-2 rounded-lg border border-border hover:bg-secondary transition-colors text-foreground"
              >
                ↻ Replay
              </button>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-secondary/30">
          <div className="flex items-center gap-3">
            {currentSpeaker === "user" ? (
              <Mic className="w-4 h-4" style={{ color: solidColor }} />
            ) : (
              <MicOff className="w-4 h-4 text-muted-foreground" />
            )}
            <span className="text-xs text-muted-foreground font-mono">
              {currentSpeaker === "user"
                ? "User speaking…"
                : currentSpeaker === "ai"
                ? "AI responding…"
                : isActive
                ? "Connecting…"
                : "Idle"}
            </span>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
          >
            <PhoneOff className="w-3 h-3" />
            End
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VoiceDemoDialog;
