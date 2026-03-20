"use client";

import * as React from "react";
import { motion } from "framer-motion";

type Node = {
  id: string;
  x: number; // 0..100 (percent)
  y: number; // 0..100 (percent)
  r: number; // base radius
  kind: "core" | "standard" | "edge";
};

type Link = {
  id: string;
  from: string;
  to: string;
  weight?: 1 | 2; // line thickness
  accent?: boolean; // cyan accent
};

const NODES: Node[] = [
  { id: "a", x: 18, y: 30, r: 2.6, kind: "edge" },
  { id: "b", x: 30, y: 22, r: 2.2, kind: "standard" },
  { id: "c", x: 42, y: 34, r: 2.0, kind: "standard" },
  { id: "d", x: 55, y: 26, r: 2.6, kind: "standard" },
  { id: "e", x: 68, y: 36, r: 2.2, kind: "standard" },
  { id: "f", x: 80, y: 28, r: 2.6, kind: "edge" },

  { id: "g", x: 22, y: 55, r: 2.2, kind: "standard" },
  { id: "h", x: 36, y: 62, r: 2.4, kind: "standard" },
  { id: "i", x: 50, y: 58, r: 3.2, kind: "core" }, // central node
  { id: "j", x: 64, y: 62, r: 2.4, kind: "standard" },
  { id: "k", x: 78, y: 56, r: 2.2, kind: "standard" },

  { id: "l", x: 28, y: 80, r: 2.6, kind: "edge" },
  { id: "m", x: 44, y: 78, r: 2.2, kind: "standard" },
  { id: "n", x: 60, y: 80, r: 2.2, kind: "standard" },
  { id: "o", x: 74, y: 78, r: 2.6, kind: "edge" },
];

const LINKS: Link[] = [
  { id: "l1", from: "a", to: "b" },
  { id: "l2", from: "b", to: "c" },
  { id: "l3", from: "c", to: "d", accent: true },
  { id: "l4", from: "d", to: "e" },
  { id: "l5", from: "e", to: "f" },

  { id: "l6", from: "g", to: "h" },
  { id: "l7", from: "h", to: "i", accent: true, weight: 2 },
  { id: "l8", from: "i", to: "j", accent: true, weight: 2 },
  { id: "l9", from: "j", to: "k" },

  { id: "l10", from: "c", to: "h" },
  { id: "l11", from: "d", to: "i", weight: 2, accent: true },
  { id: "l12", from: "e", to: "j" },

  { id: "l13", from: "l", to: "m" },
  { id: "l14", from: "m", to: "i", accent: true },
  { id: "l15", from: "i", to: "n", accent: true },
  { id: "l16", from: "n", to: "o" },
];

function nodeById(id: string) {
  const n = NODES.find((x) => x.id === id);
  if (!n) throw new Error(`Missing node: ${id}`);
  return n;
}

// Converts percent coordinates into viewBox units
function toViewBox(xPct: number, yPct: number) {
  // viewBox 0..1000
  return { x: (xPct / 100) * 1000, y: (yPct / 100) * 1000 };
}

function linkPath(from: Node, to: Node) {
  const a = toViewBox(from.x, from.y);
  const b = toViewBox(to.x, to.y);

  // Gentle curve (McKinsey-style: very subtle)
  const cx = (a.x + b.x) / 2;
  const cy = (a.y + b.y) / 2 - 18; // slight upward bias
  return `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`;
}

export function AnimatedNetwork({
  className,
  intensity = "subtle",
}: {
  className?: string;
  intensity?: "subtle" | "medium";
}) {
  const lineOpacity = intensity === "medium" ? 0.22 : 0.14;
  const nodeOpacity = intensity === "medium" ? 0.6 : 0.45;

  return (
    <div className={["absolute inset-0", className || ""].join(" ")}>
      {/* Soft gradient glows behind */}
      <div className="absolute inset-0">
        <div className="absolute -top-48 -left-48 h-[520px] w-[520px] rounded-full bg-emerald-500/10 blur-[140px]" />
        <div className="absolute -bottom-56 -right-56 h-[620px] w-[620px] rounded-full bg-violet-500/10 blur-[160px]" />
        <div className="absolute top-1/3 right-1/4 h-[420px] w-[420px] rounded-full bg-cyan-500/8 blur-[140px]" />
      </div>

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          {/* Accent gradient stroke */}
          <linearGradient id="myria-accent" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.85" />
            <stop offset="55%" stopColor="#22D3EE" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.85" />
          </linearGradient>

          {/* Standard line stroke */}
          <linearGradient id="myria-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.08" />
          </linearGradient>

          {/* Subtle blur for glow dots */}
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Network Lines */}
        <g opacity={lineOpacity}>
          {LINKS.map((l, idx) => {
            const from = nodeById(l.from);
            const to = nodeById(l.to);
            const d = linkPath(from, to);

            const stroke = l.accent ? "url(#myria-accent)" : "url(#myria-line)";
            const strokeWidth = l.weight === 2 ? 2 : 1.35;

            return (
              <motion.path
                key={l.id}
                d={d}
                fill="none"
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: 2.2,
                  delay: 0.4 + idx * 0.06,
                }}
              />
            );
          })}
        </g>

        {/* Nodes */}
        <g opacity={nodeOpacity}>
          {NODES.map((n, idx) => {
            const p = toViewBox(n.x, n.y);
            const baseR = n.r;

            const isCore = n.kind === "core";
            const fill = isCore ? "#22D3EE" : "#E5E7EB";
            const glowFill = isCore ? "#22D3EE" : "#10B981";

            // Controlled pulse: slow, subtle, never “clubby”
            const pulseDuration = isCore ? 4.6 : 6.2 + (idx % 5) * 0.3;
            const pulseDelay = (idx % 7) * 0.25;

            return (
              <g key={n.id}>
                {/* Glow ring pulse */}
                <motion.circle
                  cx={p.x}
                  cy={p.y}
                  r={baseR + 6}
                  fill="none"
                  stroke={glowFill}
                  strokeWidth={1.2}
                  opacity={0}
                  animate={{
                    opacity: [0, 0.18, 0],
                    r: [baseR + 4, baseR + 12, baseR + 16],
                  }}
                  transition={{
                    duration: pulseDuration,
                    delay: pulseDelay,
                    repeat: Infinity,
                    repeatDelay: 1.4,
                  }}
                />

                {/* Core node glow */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isCore ? baseR + 2.6 : baseR + 1.4}
                  fill={glowFill}
                  opacity={isCore ? 0.18 : 0.08}
                  filter="url(#softGlow)"
                />

                {/* Node dot */}
                <motion.circle
                  cx={p.x}
                  cy={p.y}
                  r={baseR}
                  fill={fill}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.9 + idx * 0.03 }}
                />
              </g>
            );
          })}
        </g>

        {/* Optional: faint grid (very subtle) */}
        <g opacity="0.06">
          {Array.from({ length: 7 }).map((_, i) => {
            const y = 120 + i * 130;
            return (
              <line
                key={`gy-${i}`}
                x1="0"
                y1={y}
                x2="1000"
                y2={y}
                stroke="#ffffff"
                strokeWidth="1"
              />
            );
          })}
          {Array.from({ length: 7 }).map((_, i) => {
            const x = 120 + i * 130;
            return (
              <line
                key={`gx-${i}`}
                x1={x}
                y1="0"
                x2={x}
                y2="1000"
                stroke="#ffffff"
                strokeWidth="1"
              />
            );
          })}
        </g>
      </svg>

      {/* Film grain overlay (optional, subtle) */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay">
        <div className="h-full w-full bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:18px_18px]" />
      </div>
    </div>
  );
}
