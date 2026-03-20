import { type TranscriptEntry } from "@/hooks/useRealtimeWebRTC";

/** OpenAI Realtime tool definitions */
export const AI_TOOLS = [
  {
    type: "function" as const,
    name: "capture_lead",
    description:
      "Capture a prospect's contact details and business interest for Myria Consulting follow-up.",
    parameters: {
      type: "object",
      properties: {
        name: { type: "string", description: "Full name of the prospect" },
        email: { type: "string", description: "Email address of the prospect" },
        company: { type: "string", description: "Company name" },
        role: { type: "string", description: "Job title or role" },
        interest: {
          type: "string",
          description:
            "What the prospect is interested in building or improving",
        },
        notes: {
          type: "string",
          description: "Additional context captured during the conversation",
        },
      },
      required: ["name", "email", "interest"],
    },
  },

  {
    type: "function" as const,
    name: "open_calendly",
    description:
      "Open the official Myria Consulting discovery call booking page.",
    parameters: {
      type: "object",
      properties: {}, // 🔒 no inputs allowed
    },
  },

  {
    type: "function" as const,
    name: "compose_and_send_contact_email",
    description:
      "Draft and send a contact email to info@myriaconsulting.com on behalf of the user after they confirm the message.",
    parameters: {
      type: "object",
      properties: {
        senderName: { type: "string" },
        senderEmail: { type: "string" },
        company: { type: "string" },
        subject: { type: "string" },
        message: {
          type: "string",
          description: "Final approved email body to send",
        },
      },
      required: ["senderName", "senderEmail", "subject", "message"],
    },
  },

  {
    type: "function" as const,
    name: "recommend_engagement_path",
    description:
      "Recommend the most appropriate Myria Consulting engagement path based on the user's goals, technical maturity, budget range, urgency, and risk level.",
    parameters: {
      type: "object",
      properties: {
        recommended_path: {
          type: "string",
        },
        rationale: {
          type: "string",
        },
        readiness_level: {
          type: "string",
        },
      },
      required: ["recommended_path", "rationale", "readiness_level"],
    },
  },

  {
    type: "function" as const,
    name: "submit_diagnostic_application",
    description:
      "Submit an enterprise Voice Architecture Diagnostic application for review.",
    parameters: {
      type: "object",
      properties: {
        name: { type: "string" },
        email: { type: "string" },
        company: { type: "string" },
        use_case: { type: "string" },
        budget_range: { type: "string" },
        timeline: { type: "string" },
        infrastructure: { type: "string" },
      },
      required: ["name", "email", "company", "use_case", "budget_range"],
    },
  },
];

// ─────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────

const DEFAULT_CALENDLY_URL =
  "https://calendly.com/myriaconseil/discovery-call";

// ─────────────────────────────────────────────
// Helper
// ─────────────────────────────────────────────

async function callApi<T = any>(
  url: string,
  body: Record<string, unknown>
): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Request failed");
  }

  return res.json();
}

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

interface RunToolArgs {
  name: string;
  arguments: Record<string, unknown>;
  transcript: TranscriptEntry[];
}

export interface ToolResult {
  success: boolean;
  message: string;
  sideEffect?: { type: "open_url"; url: string };
}

// ─────────────────────────────────────────────
// Dispatcher
// ─────────────────────────────────────────────

export async function runTool({
  name,
  arguments: args,
  transcript,
}: RunToolArgs): Promise<ToolResult> {
  switch (name) {
    case "capture_lead":
      return runCaptureLead(args);

    case "open_calendly":
      return runOpenCalendly(); // ✅ no args

    case "compose_and_send_contact_email":
      return runComposeAndSendContactEmail(args);

    case "recommend_engagement_path":
      return runRecommendEngagementPath(args);

    case "submit_diagnostic_application":
      return runSubmitDiagnosticApplication(args);

    default:
      return { success: false, message: `Unknown tool: ${name}` };
  }
}

// ─────────────────────────────────────────────
// Runners
// ─────────────────────────────────────────────

async function runCaptureLead(
  args: Record<string, unknown>
): Promise<ToolResult> {
  try {
    await callApi("/api/voice-tools/capture-lead", {
      name: args.name,
      email: args.email,
      interest: args.interest || "",
    });

    return {
      success: true,
      message: `Lead captured! Confirmation sent to ${args.email}.`,
    };
  } catch (e: any) {
    console.error("capture_lead error:", e);
    return { success: false, message: e.message };
  }
}

async function runComposeAndSendContactEmail(
  args: Record<string, unknown>
): Promise<ToolResult> {
  try {
    await callApi("/api/voice-tools/send-contact-email", {
      senderName: args.senderName,
      senderEmail: args.senderEmail,
      company: args.company,
      subject: args.subject,
      message: args.message,
    });

    return {
      success: true,
      message: `Contact email sent to ${args.senderEmail}.`,
    };
  } catch (e: any) {
    console.error("compose_and_send_contact_email error:", e);
    return { success: false, message: e.message };
  }
}

function runOpenCalendly(): ToolResult {
  return {
    success: true,
    message: "Opening scheduling link",
    sideEffect: {
      type: "open_url",
      url: DEFAULT_CALENDLY_URL,
    },
  };
}

function runRecommendEngagementPath(
  args: Record<string, unknown>
): ToolResult {
  return {
    success: true,
    message: `Recommended path: ${args.recommended_path}. ${args.rationale}`,
  };
}

async function runSubmitDiagnosticApplication(
  args: Record<string, unknown>
): Promise<ToolResult> {
  try {
    await callApi("/api/voice-diagnostic", {
      name: args.name,
      email: args.email,
      company: args.company,
      useCase: args.use_case,
      budgetRange: args.budget_range,
      timeline: args.timeline || "",
      infrastructure: args.infrastructure || "",
    });

    return {
      success: true,
      message:
        "Your diagnostic application has been submitted successfully. Our team will follow up.",
    };
  } catch (e: any) {
    console.error("submit_diagnostic_application error:", e);
    return { success: false, message: e.message };
  }
}