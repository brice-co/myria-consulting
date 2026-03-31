"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle2,
  Cpu,
  Database,
  Filter,
  RefreshCcw,
  Scale,
  ShieldCheck,
  Stethoscope,
  TrendingDown,
  TrendingUp,
  Workflow,
  XCircle,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";

// ─── Recharts-safe literal colors ─────────────────────────────────────────────
// Recharts renders inside SVG. SVG cannot resolve CSS variables or hsl(var(--x)).
// All colors passed to Recharts components MUST be literal values.
const CHART = {
  primary:        "#00d4aa",   // neon teal — main radar/line color
  primaryFaint:   "#00d4aa30", // radar fill
  grid:           "#ffffff14", // polar/cartesian grid lines
  axis:           "#7a8fa6",   // axis tick labels
  axisLine:       "#ffffff18", // axis lines
  tooltipBg:      "#141428",   // tooltip background
  tooltipBorder:  "#ffffff18", // tooltip border
  tooltipText:    "#e8eaf6",   // tooltip text
};

// ─── Risk color scale (all literal) ───────────────────────────────────────────
function getRiskColor(pct: number) {
  if (pct >= 76) return "#22d3a0"; // teal-green  — low risk
  if (pct >= 51) return "#00c4f0"; // cyan        — moderate
  if (pct >= 26) return "#f59e0b"; // amber       — elevated
  return "#ef4444";                // red         — critical
}

function getRiskLabel(pct: number) {
  if (pct >= 76) return "Low Risk";
  if (pct >= 51) return "Moderate";
  if (pct >= 26) return "Elevated";
  return "Critical";
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface StoredResult {
  id: string;
  client_name: string;
  overall_percentage: number;
  result_label: string;
  result_summary: string;
  category_scores: {
    id: string;
    label: string;
    percentage: number;
    insights: string[];
  }[];
  recommendations: string[];
  created_at: string;
}

type TimeFilter = "7d" | "30d" | "90d" | "all";

const DB_NAME    = "ai-diagnostic-db";
const DB_VERSION = 1;
const STORE_NAME = "diagnostic_results";

const categoryIcons: Record<string, typeof Brain> = {
  "ai-design":           Brain,
  "agent-orchestration": Workflow,
  "data-architecture":   Database,
  "security-posture":    ShieldCheck,
  resilience:            RefreshCcw,
  governance:            Scale,
  "model-management":    Cpu,
  observability:         Activity,
};

// ─── IndexedDB helpers ────────────────────────────────────────────────────────

function openDiagnosticDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !("indexedDB" in window)) {
      reject(new Error("IndexedDB is not available in this environment."));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
        store.createIndex("created_at", "created_at", { unique: false });
        store.createIndex("client_name", "client_name", { unique: false });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror  = () => reject(request.error ?? new Error("Failed to open IndexedDB."));
  });
}

async function getAllDiagnosticResults(): Promise<StoredResult[]> {
  const db = await openDiagnosticDB();
  return new Promise((resolve, reject) => {
    const tx      = db.transaction(STORE_NAME, "readonly");
    const store   = tx.objectStore(STORE_NAME);
    const request = store.getAll();
    request.onsuccess = () => {
      const rows = (request.result as StoredResult[]) ?? [];
      rows.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      resolve(rows);
    };
    request.onerror = () => reject(request.error ?? new Error("Failed to read results."));
  });
}

async function seedDemoResultsIfEmpty() {
  const existing = await getAllDiagnosticResults();
  if (existing.length > 0) return;

  const demoData: StoredResult[] = [
    {
      id: crypto.randomUUID(),
      client_name: "Acme Industries",
      overall_percentage: 68,
      result_label: "Maturing Architecture",
      result_summary: "Solid architecture foundation with meaningful gaps remaining in governance and security hardening.",
      category_scores: [
        { id: "ai-design",           label: "AI System Design",         percentage: 74, insights: ["Prompt versioning should be formalized."] },
        { id: "agent-orchestration", label: "Agent Orchestration",       percentage: 66, insights: ["Some tools remain over-permissioned."] },
        { id: "data-architecture",   label: "Data Architecture",         percentage: 71, insights: ["Data lineage remains partial."] },
        { id: "security-posture",    label: "Security Posture",          percentage: 57, insights: ["Adversarial testing is not continuous."] },
        { id: "resilience",          label: "Resilience & Recovery",     percentage: 61, insights: ["Failover drills are infrequent."] },
        { id: "governance",          label: "AI Governance",             percentage: 54, insights: ["Change governance needs formalization."] },
        { id: "model-management",    label: "Model Management",          percentage: 67, insights: ["Cost routing is only partly automated."] },
        { id: "observability",       label: "Observability & Monitoring",percentage: 79, insights: ["Strongest current area."] },
      ],
      recommendations: [
        "Formalize AI governance across prompts, models, and deployments.",
        "Implement least-privilege access for all tools and sensitive actions.",
        "Automate adversarial testing and runtime anomaly detection.",
        "Run monthly failover drills and rollback validation.",
      ],
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(),
    },
    {
      id: crypto.randomUUID(),
      client_name: "Acme Industries",
      overall_percentage: 73,
      result_label: "Maturing Architecture",
      result_summary: "Maturity is improving with better observability and stronger model operations.",
      category_scores: [
        { id: "ai-design",           label: "AI System Design",         percentage: 78, insights: ["Context handling is strong."] },
        { id: "agent-orchestration", label: "Agent Orchestration",       percentage: 69, insights: ["Supervisor controls still need deeper enforcement."] },
        { id: "data-architecture",   label: "Data Architecture",         percentage: 75, insights: ["Retrieval quality has improved."] },
        { id: "security-posture",    label: "Security Posture",          percentage: 63, insights: ["Output controls improved."] },
        { id: "resilience",          label: "Resilience & Recovery",     percentage: 66, insights: ["Provider fallback is better defined."] },
        { id: "governance",          label: "AI Governance",             percentage: 61, insights: ["Auditability is improving."] },
        { id: "model-management",    label: "Model Management",          percentage: 72, insights: ["Evaluation coverage is stronger."] },
        { id: "observability",       label: "Observability & Monitoring",percentage: 82, insights: ["Excellent dashboard coverage."] },
      ],
      recommendations: [
        "Complete audit trail immutability for AI decisions.",
        "Expand benchmark coverage to include adversarial scenarios.",
        "Tie user feedback signals into retraining and prioritization.",
        "Harden escalation workflows for sensitive AI outputs.",
      ],
      created_at: new Date().toISOString(),
    },
  ];

  const db = await openDiagnosticDB();
  await new Promise<void>((resolve, reject) => {
    const tx    = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    for (const row of demoData) store.put(row);
    tx.oncomplete = () => resolve();
    tx.onerror    = () => reject(tx.error ?? new Error("Failed to seed demo data."));
  });
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const router = useRouter();
  const [results,    setResults]    = useState<StoredResult[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("all");

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        await seedDemoResultsIfEmpty();
        const data = await getAllDiagnosticResults();
        if (isMounted) setResults(data);
      } catch (error) {
        console.error("Failed to load diagnostic results from IndexedDB:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => { isMounted = false; };
  }, []);

  const filteredResults = useMemo(() => {
    if (timeFilter === "all") return results;
    const days   = timeFilter === "7d" ? 7 : timeFilter === "30d" ? 30 : 90;
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    return results.filter((r) => new Date(r.created_at) >= cutoff);
  }, [results, timeFilter]);

  const latest   = filteredResults[0];
  const previous = filteredResults[1];

  const avgScore = useMemo(() => {
    if (!filteredResults.length) return 0;
    return Math.round(filteredResults.reduce((s, r) => s + r.overall_percentage, 0) / filteredResults.length);
  }, [filteredResults]);

  const trend = latest && previous ? latest.overall_percentage - previous.overall_percentage : 0;

  const categoryAverages = useMemo(() => {
    if (!filteredResults.length) return [];
    const map: Record<string, { total: number; count: number; label: string }> = {};
    filteredResults.forEach((result) => {
      result.category_scores.forEach((cat) => {
        if (!map[cat.id]) map[cat.id] = { total: 0, count: 0, label: cat.label };
        map[cat.id].total += cat.percentage;
        map[cat.id].count += 1;
      });
    });
    return Object.entries(map).map(([id, v]) => ({
      id,
      label: v.label,
      percentage: Math.round(v.total / v.count),
      fullMark: 100,
    }));
  }, [filteredResults]);

  const timelineData = useMemo(() =>
    [...filteredResults].reverse().map((r) => ({
      date:  new Date(r.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      score: r.overall_percentage,
      label: r.result_label,
    })),
  [filteredResults]);

  const weakestCategories = useMemo(() => {
    if (!latest) return [];
    return [...latest.category_scores].sort((a, b) => a.percentage - b.percentage).slice(0, 3);
  }, [latest]);

  const actionItems = useMemo(() => {
    if (!latest) return [];
    return latest.recommendations.map((text, index) => ({
      id:       index,
      text,
      priority: index < 2 ? "critical" : index < 4 ? "high" : "medium",
    }));
  }, [latest]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Activity className="h-5 w-5 animate-pulse text-primary" />
          <span className="font-mono">Loading dashboard…</span>
        </div>
      </div>
    );
  }

  if (!results.length) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="max-w-md space-y-4 text-center">
          <Stethoscope className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="text-xl font-bold">No Diagnostic Data Yet</h2>
          <p className="text-sm text-muted-foreground">
            Complete an AI Architecture Diagnostic to populate this dashboard with actionable insights.
          </p>
          <Button onClick={() => router.push("/diagnostic")} className="gap-2">
            Start Diagnostic <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-6 py-10">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between mt-15">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
              <BarChart3 className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-mono text-muted-foreground">Executive Dashboard</span>
            </div>
            <h1 className="text-2xl font-bold md:text-3xl">AI Architecture Health</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {filteredResults.length} assessment{filteredResults.length !== 1 ? "s" : ""} analyzed
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            {(["7d", "30d", "90d", "all"] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setTimeFilter(filter)}
                className={`rounded-md border px-3 py-1.5 text-xs font-mono transition-colors ${
                  timeFilter === filter
                    ? "border-primary/30 bg-primary/10 text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {filter === "all" ? "All" : filter}
              </button>
            ))}
          </div>
        </div>

        {/* Summary cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard label="Overall Score"  value={`${latest?.overall_percentage ?? 0}%`} sub={latest?.result_label ?? "N/A"} color={getRiskColor(latest?.overall_percentage ?? 0)} icon={<ShieldCheck className="h-4 w-4" />} />
          <SummaryCard label="Average Score"  value={`${avgScore}%`}                         sub={getRiskLabel(avgScore)}                                                                color={getRiskColor(avgScore)}                                    icon={<BarChart3 className="h-4 w-4" />} />
          <SummaryCard label="Trend"           value={`${trend >= 0 ? "+" : ""}${trend}%`}    sub={trend >= 0 ? "Improving" : "Declining"}                                              color={trend >= 0 ? "#22d3a0" : "#ef4444"}                        icon={trend >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />} />
          <SummaryCard label="Assessments"     value={String(filteredResults.length)}          sub="Completed"                                                                          color="#00c4f0"                                                   icon={<Activity className="h-4 w-4" />} />
        </div>

        {/* Radar + Line charts */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* Category Breakdown — Radar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-sm font-mono uppercase tracking-wider text-muted-foreground">
              Category Breakdown
            </h3>
            {categoryAverages.length > 0 && (
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={categoryAverages}>
                  {/* Literal values only — CSS vars don't work inside SVG/Recharts */}
                  <PolarGrid stroke={CHART.grid} />
                  <PolarAngleAxis
                    dataKey="label"
                    tick={{ fill: CHART.axis, fontSize: 10 }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{ fill: CHART.axis, fontSize: 9 }}
                  />
                  <Radar
                    name="Score"
                    dataKey="percentage"
                    stroke={CHART.primary}
                    fill={CHART.primary}
                    fillOpacity={0.22}
                    strokeWidth={2}
                    dot={{ fill: CHART.primary, r: 3 }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            )}
          </motion.div>

          {/* Score Trend Over Time — Line */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-sm font-mono uppercase tracking-wider text-muted-foreground">
              Score Trend Over Time
            </h3>
            {timelineData.length > 1 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timelineData}>
                  <CartesianGrid stroke={CHART.grid} strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: CHART.axis, fontSize: 10 }}
                    axisLine={{ stroke: CHART.axisLine }}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tick={{ fill: CHART.axis, fontSize: 10 }}
                    axisLine={{ stroke: CHART.axisLine }}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: CHART.tooltipBg,
                      border:          `1px solid ${CHART.tooltipBorder}`,
                      borderRadius:    "8px",
                      fontSize:        "12px",
                      color:           CHART.tooltipText,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke={CHART.primary}
                    strokeWidth={2.5}
                    dot={{ fill: CHART.primary, r: 4, strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: CHART.primary, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
                Complete more assessments to see trends
              </div>
            )}
          </motion.div>
        </div>

        {/* Dimension Scores bar + Priority Areas */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Horizontal bar chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-xl border border-border bg-card p-6 lg:col-span-2">
            <h3 className="mb-4 text-sm font-mono uppercase tracking-wider text-muted-foreground">
              Dimension Scores (Latest)
            </h3>
            {latest && (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={latest.category_scores} layout="vertical" margin={{ left: 120 }}>
                  <CartesianGrid stroke={CHART.grid} strokeDasharray="3 3" horizontal={false} />
                  <XAxis
                    type="number"
                    domain={[0, 100]}
                    tick={{ fill: CHART.axis, fontSize: 10 }}
                    axisLine={{ stroke: CHART.axisLine }}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="label"
                    tick={{ fill: CHART.axis, fontSize: 11 }}
                    axisLine={{ stroke: CHART.axisLine }}
                    tickLine={false}
                    width={110}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: CHART.tooltipBg,
                      border:          `1px solid ${CHART.tooltipBorder}`,
                      borderRadius:    "8px",
                      fontSize:        "12px",
                      color:           CHART.tooltipText,
                    }}
                  />
                  <Bar dataKey="percentage" radius={[0, 4, 4, 0]}>
                    {latest.category_scores.map((cat, index) => (
                      <Cell key={index} fill={getRiskColor(cat.percentage)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </motion.div>

          {/* Priority Areas */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-sm font-mono uppercase tracking-wider text-muted-foreground">
              Priority Areas
            </h3>
            <div className="space-y-4">
              {weakestCategories.map((category) => {
                const Icon  = categoryIcons[category.id] || AlertTriangle;
                const color = getRiskColor(category.percentage);
                return (
                  <div key={category.id} className="flex items-start gap-3">
                    <div
                      className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${color}22` }}
                    >
                      <Icon className="h-4 w-4" style={{ color }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="truncate text-sm font-medium">{category.label}</span>
                        <span className="ml-2 font-mono text-sm font-bold" style={{ color }}>
                          {category.percentage}%
                        </span>
                      </div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${category.percentage}%`, backgroundColor: color }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Recommendations */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-8 rounded-xl border border-border bg-card p-6">
          <h3 className="mb-4 text-sm font-mono uppercase tracking-wider text-muted-foreground">
            Actionable Recommendations
          </h3>
          <div className="space-y-3">
            {actionItems.map((item) => (
              <div key={item.id} className="flex items-start gap-3 rounded-lg border border-border bg-background/50 p-3">
                <div className="mt-0.5 flex-shrink-0">
                  {item.priority === "critical" ? (
                    <XCircle className="h-4 w-4 text-destructive" />
                  ) : item.priority === "high" ? (
                    <AlertTriangle className="h-4 w-4" style={{ color: "#f59e0b" }} />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  )}
                </div>
                <span className="min-w-0 flex-1 text-sm leading-relaxed">{item.text}</span>
                <span className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-mono uppercase ${
                  item.priority === "critical"
                    ? "bg-destructive/15 text-destructive"
                    : item.priority === "high"
                    ? "bg-amber-500/15 text-amber-500"
                    : "bg-primary/15 text-primary"
                }`}>
                  {item.priority}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Footer actions */}
        

      </div>
    </div>
  );
}

// ─── SummaryCard ──────────────────────────────────────────────────────────────

function SummaryCard({
  label, value, sub, color, icon,
}: {
  label: string; value: string; sub: string; color: string; icon: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-border bg-card p-5"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{label}</span>
        <div style={{ color }} className="opacity-70">{icon}</div>
      </div>
      <div className="text-2xl font-bold" style={{ color }}>{value}</div>
      <span className="mt-1 text-xs text-muted-foreground">{sub}</span>
    </motion.div>
  );
}