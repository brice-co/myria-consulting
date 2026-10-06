"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Check,
  Lightbulb,
  Sparkles,
  Users,
} from "lucide-react";

const people = [
  {
    id: "leader",
    name: "Business Leader",
    initials: "BL",
    x: "14%",
    y: "27%",
    delay: 0.2,
  },
  {
    id: "advisor",
    name: "Myria Advisor",
    initials: "MA",
    x: "82%",
    y: "26%",
    delay: 0.35,
  },
  {
    id: "team",
    name: "Your Team",
    initials: "YT",
    x: "13%",
    y: "70%",
    delay: 0.5,
  },
];

const agents = [
  {
    id: "strategy",
    name: "Strategy",
    x: "83%",
    y: "70%",
    delay: 0.65,
  },
];

export function HumanAIIntelligence() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.85,
        delay: 0.25,
      }}
      className="relative"
    >
      <div className="relative min-h-[520px] overflow-hidden rounded-[32px] border border-border bg-card shadow-[0_25px_80px_rgba(15,39,46,0.08)]">

        <Header />

        <div className="relative h-[310px]">
          <NetworkLines />

          {people.map((person) => (
            <HumanNode
              key={person.id}
              {...person}
            />
          ))}

          {agents.map((agent) => (
            <AgentNode
              key={agent.id}
              {...agent}
            />
          ))}

          <MyriaCore />

          <Signal
            start={{ x: "21%", y: "32%" }}
            end={{ x: "45%", y: "47%" }}
            delay={1.2}
          />

          <Signal
            start={{ x: "74%", y: "31%" }}
            end={{ x: "55%", y: "47%" }}
            delay={2.3}
          />

          <Signal
            start={{ x: "24%", y: "67%" }}
            end={{ x: "45%", y: "54%" }}
            delay={3.4}
          />

          <Signal
            start={{ x: "75%", y: "67%" }}
            end={{ x: "55%", y: "54%" }}
            delay={4.5}
          />
        </div>

        <CollaborationFlow />
      </div>

      <motion.div
        animate={{
          y: [0, 30, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-10 -right-3 hidden rounded-2xl border border-border bg-background/95 px-4 py-3 shadow-xl backdrop-blur md:block"
      >
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>

          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
            Live collaboration
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   HEADER                                   */
/* -------------------------------------------------------------------------- */

function Header() {
  return (
    <div className="relative z-10 px-8 pb-2 pt-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="font-mono text-[9px] uppercase tracking-[0.3em] text-primary"
      >
        AI meets human intelligence
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.7,
          duration: 0.6,
        }}
        className="mt-3 max-w-sm font-serif text-3xl tracking-[-0.03em] text-foreground"
      >
        A new way to work together.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85 }}
        className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground"
      >
        Human judgment and specialized AI working
        in one shared space—from insight to action.
      </motion.p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                NETWORK                                     */
/* -------------------------------------------------------------------------- */

function NetworkLines() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 600 310"
      preserveAspectRatio="none"
    >
      <AnimatedLine x1="110" y1="75" x2="300" y2="155" delay={0.7} />
      <AnimatedLine x1="490" y1="75" x2="300" y2="155" delay={0.9} />
      <AnimatedLine x1="105" y1="225" x2="300" y2="155" delay={1.1} />
      <AnimatedLine x1="495" y1="225" x2="300" y2="155" delay={1.3} />

      <motion.circle
        cx="300"
        cy="155"
        r="78"
        fill="none"
        stroke="currentColor"
        className="text-primary/10"
        strokeWidth="1"
        strokeDasharray="4 8"
        animate={{ rotate: 360 }}
        style={{
          transformOrigin: "300px 155px",
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.circle
        cx="300"
        cy="155"
        r="102"
        fill="none"
        stroke="currentColor"
        className="text-foreground/5"
        strokeWidth="1"
        strokeDasharray="2 12"
        animate={{ rotate: -360 }}
        style={{
          transformOrigin: "300px 155px",
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </svg>
  );
}

function AnimatedLine({
  x1,
  y1,
  x2,
  y2,
  delay,
}: {
  x1: string;
  y1: string;
  x2: string;
  y2: string;
  delay: number;
}) {
  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="currentColor"
      className="text-primary/25"
      strokeWidth="1"
      initial={{
        pathLength: 0,
        opacity: 0,
      }}
      animate={{
        pathLength: 1,
        opacity: 1,
      }}
      transition={{
        duration: 1.4,
        delay,
      }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                               HUMAN NODE                                   */
/* -------------------------------------------------------------------------- */

function HumanNode({
  name,
  initials,
  x,
  y,
  delay,
}: {
  name: string;
  initials: string;
  x: string;
  y: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.7,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -4, 0],
      }}
      transition={{
        opacity: {
          delay,
          duration: 0.5,
        },
        scale: {
          delay,
          duration: 0.5,
        },
        y: {
          delay: delay + 0.5,
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
      style={{
        left: x,
        top: y,
      }}
    >
      <div className="group flex flex-col items-center">
        <div className="relative flex h-12 w-12 items-center justify-center rounded-full border-4 border-card bg-[#e8dfd2] text-xs font-semibold text-foreground shadow-lg">
          {initials}

          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card bg-[#6f9a91]" />
        </div>

        <span className="mt-2 whitespace-nowrap rounded-full bg-background/80 px-2 py-1 text-[9px] text-muted-foreground backdrop-blur">
          {name}
        </span>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                AI NODE                                     */
/* -------------------------------------------------------------------------- */

function AgentNode({
  name,
  x,
  y,
  delay,
}: {
  name: string;
  x: string;
  y: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, 5, 0],
      }}
      transition={{
        opacity: {
          delay,
          duration: 0.5,
        },
        scale: {
          delay,
          duration: 0.5,
        },
        y: {
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
      style={{
        left: x,
        top: y,
      }}
    >
      <div className="flex flex-col items-center">
        <motion.div
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(183,123,44,0)",
              "0 0 0 9px rgba(183,123,44,.08)",
              "0 0 0 0 rgba(183,123,44,0)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
        >
          <Bot size={18} />
        </motion.div>

        <span className="mt-2 whitespace-nowrap rounded-full bg-background/80 px-2 py-1 text-[9px] text-muted-foreground">
          {name} AI
        </span>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               MYRIA CORE                                   */
/* -------------------------------------------------------------------------- */

function MyriaCore() {
  return (
    <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
      <motion.div
        animate={{
          scale: [1, 1.04, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[#15323a] shadow-[0_20px_50px_rgba(15,39,46,0.25)]"
      >
        <motion.span
          className="absolute inset-[-10px] rounded-full border border-primary/30"
          animate={{
            scale: [0.9, 1.15],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
          }}
        />

        <div className="text-center">
          <span className="font-serif text-4xl text-[#c58b36]">
            M
          </span>

          <div className="mt-[-3px] font-mono text-[7px] uppercase tracking-[0.2em] text-white/55">
            Myria
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                           TRAVELLING SIGNAL                                */
/* -------------------------------------------------------------------------- */

function Signal({
  start,
  end,
  delay,
}: {
  start: { x: string; y: string };
  end: { x: string; y: string };
  delay: number;
}) {
  return (
    <motion.span
      className="absolute z-40 h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_rgba(183,123,44,.7)]"
      initial={{
        left: start.x,
        top: start.y,
        opacity: 0,
      }}
      animate={{
        left: [start.x, end.x],
        top: [start.y, end.y],
        opacity: [0, 1, 1, 0],
        scale: [0.5, 1, 1, 0.5],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: 4,
        ease: "easeInOut",
      }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                          COLLABORATION FLOW                                */
/* -------------------------------------------------------------------------- */

function CollaborationFlow() {
  const stages = [
    {
      label: "Insight",
      icon: Lightbulb,
    },
    {
      label: "Decision",
      icon: Users,
    },
    {
      label: "Action",
      icon: Check,
    },
  ];

  return (
    <div className="relative z-20 border-t border-border/70 bg-background/55 px-7 py-5 backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-primary">
            Shared intelligence
          </span>

          <p className="mt-1 text-xs text-muted-foreground">
            Turn conversation into coordinated action.
          </p>
        </div>

        <motion.div
          animate={{
            opacity: [0.45, 1, 0.45],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="flex items-center gap-1.5 text-[9px] text-muted-foreground"
        >
          <Sparkles
            size={12}
            className="text-primary"
          />
          AI active
        </motion.div>
      </div>

      <div className="flex items-center">
        {stages.map(
          ({ label, icon: Icon }, index) => (
            <div
              key={label}
              className="contents"
            >
              <motion.div
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 1.4 + index * 0.3,
                }}
                className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-card px-3 py-3"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon size={13} />
                </div>

                <div>
                  <span className="block text-[8px] uppercase tracking-wider text-muted-foreground">
                    {index === 0
                      ? "Discover"
                      : index === 1
                        ? "Align"
                        : "Execute"}
                  </span>

                  <strong className="text-[11px]">
                    {label}
                  </strong>
                </div>
              </motion.div>

              {index < stages.length - 1 && (
                <motion.div
                  initial={{
                    opacity: 0,
                    x: -5,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: 1.7 + index * 0.3,
                  }}
                  className="px-2 text-primary"
                >
                  <ArrowRight size={13} />
                </motion.div>
              )}
            </div>
          ),
        )}
      </div>
    </div>
  );
}