import type { LabSlug } from "@/data/labs";

import type {
  SessionFinding,
  SessionFindingCategory,
} from "@/lib/labs/session-types";

type DeriveSessionFindingsInput = {
  labSlug: LabSlug;
  stageId: number;
  answer: string;
};

export function deriveSessionFindings({
  labSlug,
  stageId,
  answer,
}: DeriveSessionFindingsInput): SessionFinding[] {
  const normalizedAnswer = answer.trim();

  if (!normalizedAnswer) {
    return [];
  }

  const category = getFindingCategory(
    labSlug,
    stageId,
  );

  const userFinding: SessionFinding = {
    id: createFindingId(
      labSlug,
      stageId,
      "user",
    ),
    stageId,
    category,
    text: normalizedAnswer,
    source: "user",
    status: "observed",
  };

  const interpretation =
    getLocalInterpretation({
      labSlug,
      stageId,
      answer: normalizedAnswer,
    });

  if (!interpretation) {
    return [userFinding];
  }

  const myriaFinding: SessionFinding = {
    id: createFindingId(
      labSlug,
      stageId,
      "myria",
    ),
    stageId,
    category,
    text: interpretation,
    source: "myria",
    status: "inferred",
  };

  return [
    userFinding,
    myriaFinding,
  ];
}

function getFindingCategory(
  labSlug: LabSlug,
  stageId: number,
): SessionFindingCategory {
  if (labSlug === "discovery") {
    switch (stageId) {
      case 1:
        return "context";

      case 2:
        return "challenge";

      case 3:
      case 4:
        return "opportunity";

      case 5:
        return "direction";

      default:
        return "context";
    }
  }

  if (labSlug === "strategy") {
    switch (stageId) {
      case 1:
        return "context";

      case 2:
        return "challenge";

      case 3:
        return "opportunity";

      case 4:
        return "risk";

      case 5:
        return "direction";

      default:
        return "context";
    }
  }

  if (labSlug === "operations") {
    switch (stageId) {
      case 1:
        return "context";

      case 2:
        return "challenge";

      case 3:
      case 4:
        return "opportunity";

      case 5:
        return "direction";

      default:
        return "context";
    }
  }

  if (labSlug === "ai-data") {
    switch (stageId) {
      case 1:
      case 2:
        return "context";

      case 3:
        return "opportunity";

      case 4:
        return "risk";

      case 5:
        return "direction";

      default:
        return "context";
    }
  }

  if (labSlug === "people-change") {
    switch (stageId) {
      case 1:
        return "context";

      case 2:
      case 3:
        return "challenge";

      case 4:
        return "opportunity";

      case 5:
        return "direction";

      default:
        return "context";
    }
  }

  return "context";
}

function getLocalInterpretation({
  labSlug,
  stageId,
  answer,
}: {
  labSlug: LabSlug;
  stageId: number;
  answer: string;
}) {
  const shortAnswer = truncateAnswer(
    answer,
    180,
  );

  if (labSlug === "discovery") {
    switch (stageId) {
      case 1:
        return `The organization appears to be focused on ${shortAnswer}`;

      case 2:
        return `A key barrier or source of friction appears to involve ${shortAnswer}`;

      case 3:
        return `This suggests an area that may require deeper examination: ${shortAnswer}`;

      case 4:
        return `The desired business impact appears to center on ${shortAnswer}`;

      case 5:
        return `Moving forward will likely require greater clarity around ${shortAnswer}`;
    }
  }

  if (labSlug === "strategy") {
    switch (stageId) {
      case 1:
        return `The strategic discussion appears to be driven by ${shortAnswer}`;

      case 2:
        return `The central strategic question appears to involve ${shortAnswer}`;

      case 3:
        return `One or more strategic paths are emerging around ${shortAnswer}`;

      case 4:
        return `The decision may require explicit trade-offs involving ${shortAnswer}`;

      case 5:
        return `Leadership direction will likely need to clarify ${shortAnswer}`;
    }
  }

  if (labSlug === "operations") {
    switch (stageId) {
      case 1:
        return `The operational area requiring attention appears to involve ${shortAnswer}`;

      case 2:
        return `Operational friction appears to be concentrated around ${shortAnswer}`;

      case 3:
        return `A better operating state may require improvements around ${shortAnswer}`;

      case 4:
        return `The highest-value operational opportunities may involve ${shortAnswer}`;

      case 5:
        return `Execution may depend on resolving or enabling ${shortAnswer}`;
    }
  }

  if (labSlug === "ai-data") {
    switch (stageId) {
      case 1:
        return `The AI and data discussion is anchored in the business outcome of ${shortAnswer}`;

      case 2:
        return `The current workflow and information environment appears to involve ${shortAnswer}`;

      case 3:
        return `A potential AI or data opportunity may exist around ${shortAnswer}`;

      case 4:
        return `Value and feasibility will likely depend on ${shortAnswer}`;

      case 5:
        return `The strongest candidate for validation currently appears to involve ${shortAnswer}`;
    }
  }

  if (labSlug === "people-change") {
    switch (stageId) {
      case 1:
        return `The change appears to be driven by ${shortAnswer}`;

      case 2:
        return `The most significant people impacts appear to involve ${shortAnswer}`;

      case 3:
        return `Adoption risk may be influenced by ${shortAnswer}`;

      case 4:
        return `Successful mobilization may require stronger support around ${shortAnswer}`;

      case 5:
        return `Evidence of successful adoption may include ${shortAnswer}`;
    }
  }

  return null;
}

function truncateAnswer(
  answer: string,
  maxLength: number,
) {
  if (answer.length <= maxLength) {
    return answer;
  }

  return `${answer.slice(0, maxLength).trim()}…`;
}

function createFindingId(
  labSlug: LabSlug,
  stageId: number,
  source: "user" | "myria",
) {
  return `${labSlug}-${stageId}-${source}`;
}