import type { LabSlug } from "@/data/labs";
import type { SessionFinding } from "@/lib/labs/session-types";

type AnalyzeLabStageInput = {
  labSlug: LabSlug;
  stageId: number;
  question: string;
  answer: string;
  previousFindings?: SessionFinding[];
  signal?: AbortSignal;
};

type AnalyzeLabStageResponse = {
  findings: SessionFinding[];
};

type AnalyzeLabStageErrorResponse = {
  error?: string;
};

export async function analyzeLabStage({
  labSlug,
  stageId,
  question,
  answer,
  previousFindings = [],
  signal,
}: AnalyzeLabStageInput): Promise<SessionFinding[]> {
  const normalizedQuestion = question.trim();
  const normalizedAnswer = answer.trim();

  if (!normalizedQuestion) {
    throw new Error(
      "A question is required before the stage can be analyzed.",
    );
  }

  if (!normalizedAnswer) {
    throw new Error(
      "An answer is required before the stage can be analyzed.",
    );
  }

  const response = await fetch("/api/labs/analyze", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      labSlug,
      stageId,
      question: normalizedQuestion,
      answer: normalizedAnswer,
      previousFindings,
    }),

    signal,
  });

  if (!response.ok) {
    const error = await readErrorResponse(response);

    throw new Error(
      error ??
        `Unable to analyze the advisory stage. Request failed with status ${response.status}.`,
    );
  }

  const data =
    (await response.json()) as AnalyzeLabStageResponse;

  if (!Array.isArray(data.findings)) {
    throw new Error(
      "The advisory analysis returned an invalid findings response.",
    );
  }

  return data.findings;
}

async function readErrorResponse(
  response: Response,
): Promise<string | null> {
  try {
    const data =
      (await response.json()) as AnalyzeLabStageErrorResponse;

    if (
      typeof data.error === "string" &&
      data.error.trim()
    ) {
      return data.error;
    }
  } catch {
    // The server may have returned a non-JSON error response.
  }

  return null;
}