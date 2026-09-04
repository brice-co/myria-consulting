import type { AdvisoryInsight, AdvisoryMemory, SpecialistOutput } from "../types";

export function createInitialAdvisoryMemory(): AdvisoryMemory {
  return {
    businessObjective: null,
    businessChallenge: null,
    currentWorkflow: null,
    constraints: [],
    stakeholders: [],
    systems: [],
    dataSources: [],
    opportunities: [],
    risks: [],
    decisions: [],
    nextSteps: [],
    insights: [],
    outputs: [],
  };
}

export class AdvisoryMemoryStore {
  private memory: AdvisoryMemory = createInitialAdvisoryMemory();

  getSnapshot(): AdvisoryMemory {
    return structuredClone(this.memory);
  }

  reset() {
    this.memory = createInitialAdvisoryMemory();
  }

  setField(
    field: "businessObjective" | "businessChallenge" | "currentWorkflow",
    value: string,
  ) {
    this.memory[field] = value;
  }

  append(
    field:
      | "constraints"
      | "stakeholders"
      | "systems"
      | "dataSources"
      | "opportunities"
      | "risks"
      | "decisions"
      | "nextSteps",
    value: string,
  ) {
    if (!this.memory[field].includes(value)) {
      this.memory[field].push(value);
    }
  }

  addInsight(insight: AdvisoryInsight) {
    this.memory.insights.unshift(insight);
  }

  addOutput(output: SpecialistOutput) {
    this.memory.outputs.unshift(output);
  }
}
