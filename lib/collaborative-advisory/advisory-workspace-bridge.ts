import type {
  AdvisoryInsight,
  AdvisoryMemory,
  SpecialistId,
} from "@/lib/virtual-advisory-team/types";
import type {
  WorkspaceCategory,
  WorkspaceItem,
  WorkspaceSource,
} from "./types";

function sourceForAgent(agent: SpecialistId): WorkspaceSource {
  return agent === "lead" ? "myria" : agent;
}

function stableId(category: WorkspaceCategory, value: string) {
  let hash = 2166136261;
  const input = `${category}:${value}`;

  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return `advisory-${category}-${(hash >>> 0).toString(36)}`;
}

function titleAndDescription(category: WorkspaceCategory, value: string) {
  const clean = value.trim();
  const colon = clean.indexOf(":");

  if (colon > 2 && colon < 80) {
    return {
      title: clean.slice(0, colon).trim(),
      description: clean.slice(colon + 1).trim() || clean,
    };
  }

  const fallback =
    category === "opportunity"
      ? "Opportunity identified"
      : category === "decision"
        ? "Decision captured"
        : category === "action"
          ? "Next action"
          : "Advisory insight";

  return {
    title: clean.length <= 72 ? clean : `${clean.slice(0, 69).trimEnd()}…`,
    description: clean || fallback,
  };
}

export class AdvisoryWorkspaceBridge {
  private synced = {
    opportunities: new Set<string>(),
    decisions: new Set<string>(),
    nextSteps: new Set<string>(),
  };

  reset() {
    this.synced = {
      opportunities: new Set<string>(),
      decisions: new Set<string>(),
      nextSteps: new Set<string>(),
    };
  }

  fromInsight(insight: AdvisoryInsight): WorkspaceItem {
    return {
      id: insight.id,
      category: "insight",
      title: insight.label,
      description: insight.value,
      status: "needs-validation",
      source: sourceForAgent(insight.sourceAgent),
      createdAt: insight.createdAt,
    };
  }

  fromMemory(memory: AdvisoryMemory, activeAgent: SpecialistId): WorkspaceItem[] {
    return [
      ...this.collect("opportunity", memory.opportunities, this.synced.opportunities, activeAgent),
      ...this.collect("decision", memory.decisions, this.synced.decisions, activeAgent),
      ...this.collect("action", memory.nextSteps, this.synced.nextSteps, activeAgent),
    ];
  }

  private collect(
    category: "opportunity" | "decision" | "action",
    values: string[],
    seen: Set<string>,
    activeAgent: SpecialistId,
  ): WorkspaceItem[] {
    const items: WorkspaceItem[] = [];

    for (const value of values) {
      const clean = value.trim();
      if (!clean || seen.has(clean)) continue;

      seen.add(clean);
      const content = titleAndDescription(category, clean);

      items.push({
        id: stableId(category, clean),
        category,
        title: content.title,
        description: content.description,
        status: "needs-validation",
        source: sourceForAgent(activeAgent),
        createdAt: Date.now(),
      });
    }

    return items;
  }
}
