import {
  createAiDataTools,
  createLeadTools,
  createOperationsTools,
  createPeopleChangeTools,
  createSharedTools,
  createStrategyTools,
} from "../tools";
import type { AdvisoryInsight, AdvisoryMemory, SpecialistId, SpecialistOutput, TeamMode } from "../types";
import { createAiDataAgent } from "./ai-data-agent";
import { createLeadAgent } from "./lead-agent";
import { createOperationsAgent } from "./operations-agent";
import { createPeopleChangeAgent } from "./people-change-agent";
import { createStrategyAgent } from "./strategy-agent";

type Options = {
  mode: TeamMode;
  getActiveAgent: () => SpecialistId;
  getMemory: () => AdvisoryMemory;
  setMemoryField: (field: "businessObjective" | "businessChallenge" | "currentWorkflow", value: string) => void;
  appendMemory: (field: "constraints" | "stakeholders" | "systems" | "dataSources" | "opportunities" | "risks" | "decisions" | "nextSteps", value: string) => void;
  onInsight: (insight: AdvisoryInsight) => void;
  onOutput: (output: SpecialistOutput) => void;
};

export function buildAdvisoryAgents(options: Options) {
  const sharedTools = createSharedTools(options);
  const leadTools = createLeadTools({ getMemory: options.getMemory, onOutput: options.onOutput });
  const strategyTools = createStrategyTools({ appendMemory: options.appendMemory, onOutput: options.onOutput });
  const operationsTools = createOperationsTools({ appendMemory: options.appendMemory, onOutput: options.onOutput });
  const peopleChangeTools = createPeopleChangeTools({ appendMemory: options.appendMemory, onOutput: options.onOutput });
  const aiDataTools = createAiDataTools({ appendMemory: options.appendMemory, onOutput: options.onOutput });

  const lead = createLeadAgent(sharedTools, leadTools);
  const strategy = createStrategyAgent(sharedTools, strategyTools);
  const operations = createOperationsAgent(sharedTools, operationsTools);
  const peopleChange = createPeopleChangeAgent(sharedTools, peopleChangeTools);
  const aiData = createAiDataAgent(sharedTools, aiDataTools);

  lead.handoffs = [strategy, operations, peopleChange, aiData];
  strategy.handoffs = [lead, operations, peopleChange, aiData];
  operations.handoffs = [lead, strategy, peopleChange, aiData];
  peopleChange.handoffs = [lead, strategy, operations, aiData];
  aiData.handoffs = [lead, strategy, operations, peopleChange];

  const initialAgent =
    options.mode === "strategy" ? strategy :
    options.mode === "operations" ? operations :
    options.mode === "people-change" ? peopleChange :
    options.mode === "ai-data" ? aiData : lead;

  return { lead, strategy, operations, peopleChange, aiData, initialAgent };
}
