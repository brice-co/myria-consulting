import { NextResponse } from "next/server";
import OpenAI from "openai";

import type { LabSlug } from "@/data/labs";
import {
  getLabSynthesisConfig,
} from "@/data/lab-synthesis-config";

import type {
  LabSessionAnswer,
  SessionFinding,
} from "@/lib/labs/session-types";

import type {
  LabSessionSynthesis,
  LabSynthesisConfidence,
  LabSynthesisNextStep,
  LabSynthesisRecommendation,
  LabSynthesisSection,
  LabSynthesisSectionKey,
} from "@/lib/labs/synthesis-types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type SynthesizeLabSessionRequest = {
  sessionId: string;
  labSlug: LabSlug;

  answers: Record<
    number,
    LabSessionAnswer
  >;

  findings: SessionFinding[];
};

type StructuredSynthesisResponse = {
  title: string;

  executiveSummary: string;

  sections: Array<{
    key: LabSynthesisSectionKey;
    summary: string;
    items: string[];
  }>;

  recommendations: Array<{
    title: string;
    rationale: string;
    priority:
      | "high"
      | "medium"
      | "low";
    confidence:
      LabSynthesisConfidence;
  }>;

  nextSteps: Array<{
    title: string;
    description: string;
    type:
      | "validate"
      | "analyze"
      | "decide"
      | "plan"
      | "execute"
      | "engage-lab";
    recommendedLabSlug?:
      LabSlug | null;
  }>;
};

export async function POST(
  request: Request,
) {
  try {
    const body =
      (await request.json()) as SynthesizeLabSessionRequest;

    const validationError =
      validateRequest(body);

    if (validationError) {
      return NextResponse.json(
        {
          error:
            validationError,
        },
        {
          status: 400,
        },
      );
    }

    const {
      sessionId,
      labSlug,
      answers,
      findings,
    } = body;

    const config =
      getLabSynthesisConfig(
        labSlug,
      );

    const response =
      await openai.responses.create({
        model:
          process.env
            .OPENAI_LAB_SYNTHESIS_MODEL ??
          "gpt-5-mini",

        instructions: buildInstructions(
          labSlug,
          config,
        ),

        input: [
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: buildSessionEvidence({
                  answers,
                  findings,
                }),
              },
            ],
          },
        ],

        text: {
          format: {
            type: "json_schema",

            name:
              "myria_lab_session_synthesis",

            strict: true,

            schema: {
              type: "object",

              additionalProperties:
                false,

              properties: {
                title: {
                  type: "string",
                },

                executiveSummary: {
                  type: "string",
                },

                sections: {
                  type: "array",

                  minItems:
                    config.sections
                      .length,

                  maxItems:
                    config.sections
                      .length,

                  items: {
                    type: "object",

                    additionalProperties:
                      false,

                    properties: {
                      key: {
                        type: "string",

                        enum:
                          config.sections.map(
                            (
                              section,
                            ) =>
                              section.key,
                          ),
                      },

                      summary: {
                        type: "string",
                      },

                      items: {
                        type: "array",

                        minItems: 1,
                        maxItems: 5,

                        items: {
                          type: "string",
                        },
                      },
                    },

                    required: [
                      "key",
                      "summary",
                      "items",
                    ],
                  },
                },

                recommendations: {
                  type: "array",

                  minItems: 1,
                  maxItems: 4,

                  items: {
                    type: "object",

                    additionalProperties:
                      false,

                    properties: {
                      title: {
                        type: "string",
                      },

                      rationale: {
                        type: "string",
                      },

                      priority: {
                        type: "string",

                        enum: [
                          "high",
                          "medium",
                          "low",
                        ],
                      },

                      confidence: {
                        type: "string",

                        enum: [
                          "high",
                          "medium",
                          "low",
                        ],
                      },
                    },

                    required: [
                      "title",
                      "rationale",
                      "priority",
                      "confidence",
                    ],
                  },
                },

                nextSteps: {
                  type: "array",

                  minItems: 1,
                  maxItems: 4,

                  items: {
                    type: "object",

                    additionalProperties:
                      false,

                    properties: {
                      title: {
                        type: "string",
                      },

                      description: {
                        type: "string",
                      },

                      type: {
                        type: "string",

                        enum: [
                          "validate",
                          "analyze",
                          "decide",
                          "plan",
                          "execute",
                          "engage-lab",
                        ],
                      },

                      recommendedLabSlug: {
                        anyOf: [
                          {
                            type: "string",

                            enum: [
                              "discovery",
                              "strategy",
                              "operations",
                              "ai-data",
                              "people-change",
                            ],
                          },
                          {
                            type: "null",
                          },
                        ],
                      },
                    },

                    required: [
                      "title",
                      "description",
                      "type",
                      "recommendedLabSlug",
                    ],
                  },
                },
              },

              required: [
                "title",
                "executiveSummary",
                "sections",
                "recommendations",
                "nextSteps",
              ],
            },
          },
        },
      });

    if (!response.output_text) {
      return NextResponse.json(
        {
          error:
            "The advisory synthesis did not return a structured result.",
        },
        {
          status: 502,
        },
      );
    }

    const parsed =
      JSON.parse(
        response.output_text,
      ) as StructuredSynthesisResponse;

    const synthesis =
      createLabSessionSynthesis({
        sessionId,
        labSlug,
        parsed,
      });

    return NextResponse.json({
      synthesis,
    });
  } catch (error) {
    console.error(
      "Lab synthesis failed:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Unable to synthesize this advisory session.",
      },
      {
        status: 500,
      },
    );
  }
}

function buildInstructions(
  labSlug: LabSlug,
  config: ReturnType<
    typeof getLabSynthesisConfig
  >,
) {
  const sectionInstructions =
    config.sections
      .map(
        (section) => `
${section.key}
Title: ${section.title}
Purpose: ${section.description}
        `.trim(),
      )
      .join("\n\n");

  return `
You are Myria, the synthesis layer of a virtual management consulting firm.

You are completing a structured ${labSlug} advisory session.

Your role is to transform the evidence gathered during the session into a concise, rigorous management consulting synthesis.

BUSINESS FIRST

Begin with the client's business situation, objectives, decisions, operating issues, organizational realities, or constraints.

Do not introduce technology unless it is relevant to the evidence provided.

EVIDENCE DISCIPLINE

Use only information supported by:

1. the client's answers;
2. findings explicitly identified during the session.

Do not invent:

- financial benefits;
- percentages;
- costs;
- timelines;
- organizational facts;
- technologies;
- data availability;
- root causes;
- stakeholder positions;
- implementation readiness.

When the evidence is incomplete, explicitly frame the issue as something to validate.

Do not turn an inference into an established fact.

SYNTHESIS DISCIPLINE

Do not merely repeat the client's answers.

Synthesize across the entire session.

Identify patterns, relationships, tensions, priorities, dependencies, and implications where the evidence supports them.

Keep the language concise, executive-level, and specific.

Avoid generic consulting language.

Avoid exaggerated claims.

Avoid presenting recommendations with greater certainty than the evidence supports.

SECTION STRUCTURE

Return exactly these sections:

${sectionInstructions}

Every section must contain:

- a concise summary;
- between one and five useful synthesis points.

RECOMMENDATIONS

Provide no more than four recommendations.

Recommendations should represent the most important areas of action, investigation, or decision emerging from the session.

For every recommendation:

- explain why it matters;
- assign priority as high, medium, or low;
- assign confidence as high, medium, or low.

Confidence reflects the strength of evidence available in this session, not how strongly you believe the recommendation is desirable.

NEXT STEPS

Provide concrete next steps.

Each next step must be classified as one of:

- validate
- analyze
- decide
- plan
- execute
- engage-lab

Use "engage-lab" only when a focused Myria Lab is a logical continuation of the work.

When recommending another Lab, use one of:

- discovery
- strategy
- operations
- ai-data
- people-change

Otherwise recommendedLabSlug must be null.

The final result should feel like the conclusion of a structured advisory session, not an AI-generated report.
  `.trim();
}

function buildSessionEvidence({
  answers,
  findings,
}: {
  answers: Record<
    number,
    LabSessionAnswer
  >;
  findings: SessionFinding[];
}) {
  const orderedAnswers =
    Object.values(answers).sort(
      (a, b) =>
        a.stageId -
        b.stageId,
    );

  const answerText =
    orderedAnswers.length > 0
      ? orderedAnswers
          .map(
            (answer) => `
STAGE ${answer.stageId}

CLIENT RESPONSE:
${answer.value}
          `.trim(),
          )
          .join("\n\n")
      : "No client responses were provided.";

  const findingText =
    findings.length > 0
      ? findings
          .map(
            (finding) =>
              [
                `Stage ${finding.stageId}`,
                `[${finding.status}]`,
                `[${finding.category}]`,
                `[source: ${finding.source}]`,
                finding.text,
              ].join(" "),
          )
          .join("\n")
      : "No session findings were recorded.";

  return `
ADVISORY SESSION EVIDENCE

CLIENT RESPONSES

${answerText}

SESSION FINDINGS

${findingText}

Using only the evidence above, produce the final advisory synthesis.
  `.trim();
}

function createLabSessionSynthesis({
  sessionId,
  labSlug,
  parsed,
}: {
  sessionId: string;
  labSlug: LabSlug;
  parsed: StructuredSynthesisResponse;
}): LabSessionSynthesis {
  const config =
    getLabSynthesisConfig(
      labSlug,
    );

  const sections: LabSynthesisSection[] =
    config.sections.map(
      (
        sectionConfig,
        sectionIndex,
      ) => {
        const generated =
          parsed.sections.find(
            (section) =>
              section.key ===
              sectionConfig.key,
          );

        return {
          key:
            sectionConfig.key,

          title:
            sectionConfig.title,

          summary:
            generated?.summary ??
            "",

          items:
            (
              generated?.items ??
              []
            ).map(
              (
                text,
                itemIndex,
              ) => ({
                id: createId(
                  "section",
                  sectionIndex,
                  itemIndex,
                ),

                text,
              }),
            ),
        };
      },
    );

  const recommendations: LabSynthesisRecommendation[] =
    parsed.recommendations.map(
      (
        recommendation,
        index,
      ) => ({
        id: createId(
          "recommendation",
          index,
        ),

        title:
          recommendation.title,

        rationale:
          recommendation.rationale,

        priority:
          recommendation.priority,

        confidence:
          recommendation.confidence,
      }),
    );

  const nextSteps: LabSynthesisNextStep[] =
    parsed.nextSteps.map(
      (
        nextStep,
        index,
      ) => ({
        id: createId(
          "next-step",
          index,
        ),

        title:
          nextStep.title,

        description:
          nextStep.description,

        type:
          nextStep.type,

        recommendedLabSlug:
          nextStep.recommendedLabSlug ??
          undefined,
      }),
    );

  return {
    id: createSynthesisId(
      sessionId,
    ),

    sessionId,

    labSlug,

    title:
      parsed.title ||
      config.title,

    executiveSummary:
      parsed.executiveSummary,

    sections,

    recommendations,

    nextSteps,

    generatedAt:
      new Date().toISOString(),
  };
}

function validateRequest(
  body:
    | SynthesizeLabSessionRequest
    | null
    | undefined,
): string | null {
  if (!body) {
    return "A session is required.";
  }

  if (
    typeof body.sessionId !==
      "string" ||
    !body.sessionId.trim()
  ) {
    return "A valid session ID is required.";
  }

  if (
    !isLabSlug(
      body.labSlug,
    )
  ) {
    return "A valid Lab is required.";
  }

  if (
    !body.answers ||
    typeof body.answers !==
      "object"
  ) {
    return "Session answers are required.";
  }

  if (
    Object.keys(
      body.answers,
    ).length === 0
  ) {
    return "The session does not contain any answers.";
  }

  if (
    !Array.isArray(
      body.findings,
    )
  ) {
    return "Session findings are required.";
  }

  return null;
}

function isLabSlug(
  value: unknown,
): value is LabSlug {
  return (
    value === "discovery" ||
    value === "strategy" ||
    value === "operations" ||
    value === "ai-data" ||
    value === "people-change"
  );
}

function createSynthesisId(
  sessionId: string,
) {
  return `${sessionId}-synthesis`;
}

function createId(
  prefix: string,
  ...indexes: number[]
) {
  return `${prefix}-${indexes
    .map(
      (index) =>
        index + 1,
    )
    .join("-")}`;
}