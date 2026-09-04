import type { LabSession } from "@/lib/labs/session-types";
import type {
  LabSessionSynthesis,
} from "@/lib/labs/synthesis-types";

type SynthesizeLabSessionInput = {
  session: LabSession;
  signal?: AbortSignal;
};

type SynthesizeLabSessionResponse = {
  synthesis: LabSessionSynthesis;
};

type SynthesizeLabSessionErrorResponse = {
  error?: string;
};

export async function synthesizeLabSession({
  session,
  signal,
}: SynthesizeLabSessionInput): Promise<LabSessionSynthesis> {
  validateSessionForSynthesis(session);

  const response = await fetch(
    "/api/labs/synthesize",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        sessionId: session.id,
        labSlug: session.labSlug,
        answers: session.answers,
        findings: session.findings,
      }),

      signal,
    },
  );

  if (!response.ok) {
    const error =
      await readErrorResponse(
        response,
      );

    throw new Error(
      error ??
        `Unable to synthesize the advisory session. Request failed with status ${response.status}.`,
    );
  }

  const data =
    (await response.json()) as SynthesizeLabSessionResponse;

  if (
    !data ||
    !isValidSynthesis(
      data.synthesis,
    )
  ) {
    throw new Error(
      "The advisory synthesis returned an invalid response.",
    );
  }

  return data.synthesis;
}

function validateSessionForSynthesis(
  session: LabSession,
) {
  if (!session.id.trim()) {
    throw new Error(
      "A valid session ID is required before synthesis.",
    );
  }

  if (
    Object.keys(
      session.answers,
    ).length === 0
  ) {
    throw new Error(
      "The advisory session does not contain any answers.",
    );
  }

  const hasAnsweredStage =
    Object.values(
      session.answers,
    ).some(
      (answer) =>
        answer.value.trim()
          .length > 0,
    );

  if (!hasAnsweredStage) {
    throw new Error(
      "The advisory session does not contain any completed responses.",
    );
  }
}

function isValidSynthesis(
  synthesis: unknown,
): synthesis is LabSessionSynthesis {
  if (
    !synthesis ||
    typeof synthesis !==
      "object"
  ) {
    return false;
  }

  const value =
    synthesis as Partial<LabSessionSynthesis>;

  return (
    typeof value.id ===
      "string" &&
    typeof value.sessionId ===
      "string" &&
    typeof value.labSlug ===
      "string" &&
    typeof value.title ===
      "string" &&
    typeof value.executiveSummary ===
      "string" &&
    Array.isArray(
      value.sections,
    ) &&
    Array.isArray(
      value.recommendations,
    ) &&
    Array.isArray(
      value.nextSteps,
    ) &&
    typeof value.generatedAt ===
      "string"
  );
}

async function readErrorResponse(
  response: Response,
): Promise<string | null> {
  try {
    const data =
      (await response.json()) as SynthesizeLabSessionErrorResponse;

    if (
      typeof data.error ===
        "string" &&
      data.error.trim()
    ) {
      return data.error;
    }
  } catch {
    // The server may return a non-JSON error response.
  }

  return null;
}