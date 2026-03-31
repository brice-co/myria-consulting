"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { frameworkLayers } from "@/lib/data/FrameworkLayer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, X } from "lucide-react";

const connections: { from: string; to: string; label: string }[] = [
  { from: "ai-behavior", to: "data-exposure", label: "AI accesses data through exposure controls" },
  { from: "ai-behavior", to: "decision-boundaries", label: "Behavior rules define decision scope" },
  { from: "data-exposure", to: "risk-indicators", label: "Exposed data feeds risk scoring" },
  { from: "risk-indicators", to: "decision-boundaries", label: "Risk levels trigger approval workflows" },
  { from: "decision-boundaries", to: "system-integrations", label: "Decisions flow through integrations" },
  { from: "system-integrations", to: "status-badges", label: "Integration health drives status" },
  { from: "status-badges", to: "ai-behavior", label: "Status informs behavioral adjustments" },
  { from: "data-exposure", to: "system-integrations", label: "Data flows through integration points" },
];

// Hex layout positions (centered in SVG viewBox)
const nodePositions: Record<string, { x: number; y: number }> = {
  "ai-behavior":        { x: 400, y: 80 },
  "data-exposure":      { x: 650, y: 200 },
  "risk-indicators":    { x: 650, y: 380 },
  "decision-boundaries":{ x: 400, y: 500 },
  "system-integrations":{ x: 150, y: 380 },
  "status-badges":      { x: 150, y: 200 },
};

const riskColors: Record<string, string> = {
  low: "#34d399",
  medium: "#eab308",
  high: "#ef4444",
};

const Architecture = () => {
  const router = useRouter();
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [hoveredConnection, setHoveredConnection] = useState<string | null>(null);

  const activeLayer = frameworkLayers.find((l) => l.id === activeNode);

  const activeConnections = connections.filter(
    (c) => c.from === activeNode || c.to === activeNode
  );

  const isConnectionHighlighted = (from: string, to: string) => {
    if (hoveredConnection) return hoveredConnection === `${from}-${to}`;
    if (activeNode) return activeConnections.some((c) => c.from === from && c.to === to);
    return true;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8 mt-15">
          
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Security Architecture Map</h1>
          <p className="text-muted-foreground text-sm">
            Click any node to explore how the 6 security layers interconnect. Each connection represents a critical data or control flow.
          </p>
        </div>

        <div className="relative">
          {/* SVG Diagram */}
          <svg viewBox="0 0 800 580" className="w-full" style={{ maxHeight: "520px" }}>
            <defs>
              <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="hsl(174, 72%, 52%)" opacity="0.6" />
              </marker>
              <marker id="arrowhead-dim" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="hsl(215, 12%, 30%)" opacity="0.4" />
              </marker>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Connection lines */}
            {connections.map((conn) => {
              const from = nodePositions[conn.from];
              const to = nodePositions[conn.to];
              const highlighted = isConnectionHighlighted(conn.from, conn.to);
              const key = `${conn.from}-${conn.to}`;

              // Offset line endpoints to not overlap node circles
              const dx = to.x - from.x;
              const dy = to.y - from.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const r = 38;
              const fx = from.x + (dx / dist) * r;
              const fy = from.y + (dy / dist) * r;
              const tx = to.x - (dx / dist) * r;
              const ty = to.y - (dy / dist) * r;

              return (
                <line
                  key={key}
                  x1={fx} y1={fy} x2={tx} y2={ty}
                  stroke={highlighted ? "hsl(174, 72%, 52%)" : "hsl(220, 14%, 22%)"}
                  strokeWidth={highlighted ? 2 : 1}
                  strokeOpacity={highlighted ? 0.7 : 0.25}
                  markerEnd={highlighted ? "url(#arrowhead)" : "url(#arrowhead-dim)"}
                  className="transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredConnection(key)}
                  onMouseLeave={() => setHoveredConnection(null)}
                />
              );
            })}

            {/* Nodes */}
            {frameworkLayers.map((layer) => {
              const pos = nodePositions[layer.id];
              const isActive = activeNode === layer.id;
              const isConnected = activeNode ? activeConnections.some((c) => c.from === layer.id || c.to === layer.id) : false;
              const dimmed = activeNode && !isActive && !isConnected;
              const color = riskColors[layer.riskLevel];

              return (
                <g
                  key={layer.id}
                  className="cursor-pointer"
                  onClick={() => setActiveNode(isActive ? null : layer.id)}
                >
                  {/* Glow ring */}
                  {isActive && (
                    <circle
                      cx={pos.x} cy={pos.y} r={42}
                      fill="none" stroke={color} strokeWidth="2"
                      opacity={0.4} filter="url(#glow)"
                    />
                  )}
                  {/* Node circle */}
                  <circle
                    cx={pos.x} cy={pos.y} r={36}
                    fill={isActive ? color : "hsl(220, 18%, 13%)"}
                    stroke={isActive ? color : dimmed ? "hsl(220, 14%, 18%)" : "hsl(220, 14%, 25%)"}
                    strokeWidth={isActive ? 2 : 1.5}
                    opacity={dimmed ? 0.35 : 1}
                    className="transition-all duration-300"
                  />
                  {/* Risk dot */}
                  <circle cx={pos.x + 26} cy={pos.y - 26} r={5} fill={color} opacity={dimmed ? 0.2 : 0.9} />
                  {/* Label */}
                  <text
                    x={pos.x} y={pos.y + 52}
                    textAnchor="middle"
                    fill={dimmed ? "hsl(215, 12%, 30%)" : "hsl(210, 20%, 82%)"}
                    fontSize="11"
                    fontFamily="'Space Grotesk', sans-serif"
                    fontWeight="500"
                    className="transition-all duration-300 select-none"
                  >
                    {layer.concept}
                  </text>
                  {/* Icon letter */}
                  <text
                    x={pos.x} y={pos.y + 5}
                    textAnchor="middle"
                    fill={isActive ? "hsl(220, 20%, 7%)" : dimmed ? "hsl(215, 12%, 35%)" : "hsl(210, 20%, 85%)"}
                    fontSize="14"
                    fontFamily="'JetBrains Mono', monospace"
                    fontWeight="600"
                    className="select-none"
                  >
                    {layer.concept.split(" ").map(w => w[0]).join("")}
                  </text>
                </g>
              );
            })}

            {/* Hovered connection label */}
            {hoveredConnection && (() => {
              const conn = connections.find(c => `${c.from}-${c.to}` === hoveredConnection);
              if (!conn) return null;
              const from = nodePositions[conn.from];
              const to = nodePositions[conn.to];
              const mx = (from.x + to.x) / 2;
              const my = (from.y + to.y) / 2;
              return (
                <g>
                  <rect x={mx - 120} y={my - 14} width={240} height={24} rx={4} fill="hsl(220, 18%, 10%)" stroke="hsl(174, 72%, 52%)" strokeWidth={0.5} opacity={0.95} />
                  <text x={mx} y={my + 3} textAnchor="middle" fill="hsl(210, 20%, 82%)" fontSize="9" fontFamily="'Space Grotesk', sans-serif">
                    {conn.label}
                  </text>
                </g>
              );
            })()}
          </svg>

          {/* Detail Panel */}
          <AnimatePresence>
            {activeLayer && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-6 p-6 rounded-xl border border-border surface-elevated"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: riskColors[activeLayer.riskLevel] }}
                      />
                      <h3 className="text-lg font-bold">{activeLayer.concept}</h3>
                      <span className="text-xs font-mono px-2 py-0.5 rounded border border-border text-muted-foreground">
                        {activeLayer.riskLevel} risk
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground flex gap-4 mt-1">
                      <span><strong className="text-foreground">Source:</strong> {activeLayer.backendSource}</span>
                      <span><strong className="text-foreground">UI:</strong> {activeLayer.uiRepresentation}</span>
                    </p>
                  </div>
                  <button onClick={() => setActiveNode(null)} className="text-muted-foreground hover:text-foreground">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{activeLayer.description}</p>

                {/* Connected layers */}
                <div>
                  <h4 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">Connected Layers</h4>
                  <div className="space-y-1.5">
                    {activeConnections.map((conn) => {
                      const targetId = conn.from === activeNode ? conn.to : conn.from;
                      const target = frameworkLayers.find((l) => l.id === targetId);
                      const direction = conn.from === activeNode ? "→" : "←";
                      return (
                        <button
                          key={`${conn.from}-${conn.to}`}
                          onClick={() => setActiveNode(targetId)}
                          className="w-full text-left flex items-center gap-2 p-2 rounded-lg hover:bg-secondary/50 transition-colors text-sm"
                        >
                          <span className="font-mono text-primary text-xs">{direction}</span>
                          <span className="text-foreground font-medium">{target?.concept}</span>
                          <span className="text-muted-foreground text-xs ml-auto">{conn.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Architecture;
