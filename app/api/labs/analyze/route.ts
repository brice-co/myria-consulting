import { NextResponse } from "next/server";
import OpenAI from "openai";

import type { LabSlug } from "@/data/labs";
import type {
  SessionFinding,
  SessionFindingCategory,
  SessionFindingStatus,
} from "@/lib/labs/session-types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type AnalyzeLabStageRequest = {
  labSlug: LabSlug;
  stageId: number;
  question: string;
  answer: string;
  previousFindings?: SessionFinding[];
};

type AnalysisResponse = {
  findings: Array<{
    category: SessionFindingCategory;
    text: string;
    status: SessionFindingStatus;
  }>;
};

export async function POST(request: Request) {
  try {
    const body =
      (await request.json()) as AnalyzeLabStageRequest;

    const {
      labSlug,
      stageId,
      question,
      answer,
      previousFindings = [],
    } = body;

    if (!labSlug) {
      return NextResponse.json(
        {
          error: "Missing labSlug.",
        },
        {
          status: 400,
        },
      );
    }

    if (!stageId) {
      return NextResponse.json(
        {
          error: "Missing stageId.",
        },
        {
          status: 400,
        },
      );
    }

    if (!question?.trim()) {
      return NextResponse.json(
        {
          error: "Missing question.",
        },
        {
          status: 400,
        },
      );
    }

    if (!answer?.trim()) {
      return NextResponse.json(
        {
          error: "Missing answer.",
        },
        {
          status: 400,
        },
      );
    }

    const response = await openai.responses.create({
      model:
        process.env.OPENAI_LAB_ANALYSIS_MODEL ??
        "gpt-5-mini",

      instructions: `
You are Myria, the synthesis layer of a virtual management consulting firm.

Your job is to analyze one stage of a structured advisory session.

BUSINESS FIRST

Do not begin with technology unless the client's situation specifically
requires it.

Your task is not to give a final recommendation yet.

Extract a small number of useful advisory findings from the client's
response.

Each finding must be one of:

- context
- challenge
- opportunity
- risk
- direction

Each finding must also be classified as:

- observed:
  directly supported by what the client said.

- inferred:
  a reasonable interpretation supported by the client's response.

- to-validate:
  an important hypothesis or issue that should be tested before treating
  it as established.

DISCIPLINE

Do not invent facts.

Do not fabricate financial benefits, percentages, timelines, technologies,
organizational conditions, or root causes that the client did not provide.

Separate observation from inference.

Prefer concise management consulting language.

Return no more than four findings.

Avoid generic statements.

Focus on what would actually help clarify the business challenge.
      `.trim(),

      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `
LAB
${labSlug}

STAGE
${stageId}

ADVISORY QUESTION
${question}

CLIENT RESPONSE
${answer}

PREVIOUS SESSION FINDINGS
${
  previousFindings.length > 0
    ? previousFindings
        .map(
          (finding) =>
            `- [${finding.status}] ${finding.category}: ${finding.text}`,
        )
        .join("\n")
    : "None yet."
}

Analyze this response and return structured advisory findings.
              `.trim(),
            },
          ],
        },
      ],

      text: {
        format: {
          type: "json_schema",
          name: "myria_stage_analysis",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,

            properties: {
              findings: {
                type: "array",
                minItems: 1,
                maxItems: 4,

                items: {
                  type: "object",
                  additionalProperties: false,

                  properties: {
                    category: {
                      type: "string",
                      enum: [
                        "context",
                        "challenge",
                        "opportunity",
                        "risk",
                        "direction",
                      ],
                    },

                    text: {
                      type: "string",
                    },

                    status: {
                      type: "string",
                      enum: [
                        "observed",
                        "inferred",
                        "to-validate",
                      ],
                    },
                  },

                  required: [
                    "category",
                    "text",
                    "status",
                  ],
                },
              },
            },

            required: ["findings"],
          },
        },
      },
    });

    if (!response.output_text) {
      return NextResponse.json(
        {
          error:
            "The analysis did not return structured findings.",
        },
        {
          status: 502,
        },
      );
    }

    const parsed = JSON.parse(
      response.output_text,
    ) as AnalysisResponse;

    const findings: SessionFinding[] =
      parsed.findings.map((finding, index) => ({
        id: createFindingId(
          labSlug,
          stageId,
          index,
        ),

        stageId,

        category: finding.category,

        text: finding.text,

        source: "myria",

        status: finding.status,
      }));

    return NextResponse.json({
      findings,
    });
  } catch (error) {
    console.error(
      "Lab analysis failed:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Unable to analyze this stage.",
      },
      {
        status: 500,
      },
    );
  }
}

function createFindingId(
  labSlug: LabSlug,
  stageId: number,
  index: number,
) {
  return `${labSlug}-${stageId}-myria-${index + 1}`;
}