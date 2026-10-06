import type { LucideIcon } from "lucide-react";

export type LayerId =
  | "experience"
  | "agents"
  | "intelligence"
  | "realtime"
  | "knowledge"
  | "runtime";

export type ArchitecturePattern = {
  name: string;
  detail: string;
};

export type ArchitectureLayer = {
  id: LayerId;
  index: string;
  name: string;
  tag: string;
  icon: LucideIcon;
  role: string;
  holds: string[];
  patterns: ArchitecturePattern[];
};

export type TraceStep = {
  layer: LayerId;
  label: string;
  detail: string;
};

export type ArchitectureTrace = {
  id: string;
  name: string;
  icon: LucideIcon;
  summary: string;
  steps: TraceStep[];
};

export type PatternTab = {
  id: string;
  label: string;
  icon: LucideIcon;
  intro: string;
  patterns: ArchitecturePattern[];
};

export type OperatingPrinciple = {
  n: string;
  title: string;
  body: string;
};