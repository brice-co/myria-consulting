import { NextResponse } from "next/server";
import * as z from "zod";
import { db } from "@/db";
import { aiArchitectureDiagnosticApplications } from "@/db/schema";
import { Resend } from "resend";
import { scoreArchitectureDiagnostic } from "@/lib/scoreArchitectureDiagnostic";
import {
  diagnosticSchema,
  toDiagnosticDbValues,
  type DiagnosticInput,
} from "@/lib/validation/diagnostic";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const INTERNAL_EMAIL_TO =
  process.env.DIAGNOSTIC_INTERNAL_TO || "info@myriaconsulting.com";

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Myria <info@briceetco.com>";

function escapeHtml(input: string): string {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getFieldErrors(error: z.ZodError) {
  return z.flattenError(error).fieldErrors;
}

function buildInternalEmailHtml(params: {
  companyName: string;
  email: string;
  contactTitle: string | null;
  useCase: string;
  architectureMaturity: string | null;
  infrastructure: string | null;
  systems: string | null;
  regulatory: string | null;
  piiLevel: string | null;
  engineeringTeam: string | null;
  aiExperience: string | null;
  budgetRange: string;
  timeline: string | null;
  score: number;
  priority: string;
  recommendedPath: string;
}) {
  return `
    <h2>New AI Architecture Diagnostic Application</h2>

    <p><strong>Company:</strong> ${escapeHtml(params.companyName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(params.email)}</p>
    <p><strong>Role:</strong> ${escapeHtml(params.contactTitle ?? "N/A")}</p>

    <hr />

    <h3>Qualification</h3>
    <p><strong>Score:</strong> ${params.score}</p>
    <p><strong>Priority:</strong> ${escapeHtml(params.priority)}</p>
    <p><strong>Recommended Path:</strong> ${escapeHtml(params.recommendedPath)}</p>

    <hr />

    <h3>Use Case</h3>
    <p>${escapeHtml(params.useCase)}</p>

    <h3>Architecture</h3>
    <p><strong>Maturity:</strong> ${escapeHtml(params.architectureMaturity ?? "N/A")}</p>
    <p><strong>Infrastructure:</strong></p>
    <p>${escapeHtml(params.infrastructure ?? "N/A")}</p>

    <h3>Systems</h3>
    <p>${escapeHtml(params.systems ?? "N/A")}</p>

    <hr />

    <h3>Governance</h3>
    <p><strong>Regulatory:</strong> ${escapeHtml(params.regulatory ?? "N/A")}</p>
    <p><strong>PII Level:</strong> ${escapeHtml(params.piiLevel ?? "N/A")}</p>

    <hr />

    <h3>Capability</h3>
    <p><strong>Engineering Team:</strong> ${escapeHtml(params.engineeringTeam ?? "N/A")}</p>
    <p><strong>AI Experience:</strong> ${escapeHtml(params.aiExperience ?? "N/A")}</p>

    <hr />

    <h3>Investment</h3>
    <p><strong>Budget:</strong> ${escapeHtml(params.budgetRange)}</p>
    <p><strong>Timeline:</strong> ${escapeHtml(params.timeline ?? "N/A")}</p>
  `;
}

function buildClientEmailHtml() {
  return `
    <h2>Application Received</h2>

    <p>Thank you for your interest in Myria Consulting.</p>

    <p>Your application for the <strong>AI Architecture Diagnostic Lab</strong> has been received.</p>

    <h3>What happens next</h3>
    <ul>
      <li>We evaluate your architecture, readiness, and fit</li>
      <li>If aligned, you will receive a private scheduling link</li>
      <li>Typical response time: 2 to 3 business days</li>
    </ul>

    <p>— Myria Consulting</p>
  `;
}

function getPriority(score: number) {
  if (score >= 14) return "STRATEGIC";
  if (score >= 10) return "QUALIFIED";
  if (score >= 6) return "EARLY_STAGE";
  return "NOT_READY";
}

export async function POST(req: Request) {
  try {
    let rawBody: unknown;

    try {
      rawBody = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const parsed = diagnosticSchema.safeParse(rawBody);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          fieldErrors: getFieldErrors(parsed.error),
        },
        { status: 400 }
      );
    }

    const body: DiagnosticInput = parsed.data;

    // Honeypot: quietly accept to avoid teaching bots how to bypass it
    if (body.website && body.website.length > 0) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const dbValues = toDiagnosticDbValues(body);

    const { score, recommendedPath, reasoning } = scoreArchitectureDiagnostic({
      budgetRange: body.budgetRange,
      timeline: body.timeline || undefined,
      infrastructure: body.infrastructure || undefined,
      regulatory: body.regulatory || undefined,
      engineeringTeam: body.engineeringTeam || undefined,
      realtimeInfra: undefined,
      realtimeExperience: undefined,
    });

    const priority = getPriority(score);

    const [application] = await db
      .insert(aiArchitectureDiagnosticApplications)
      .values({
        ...dbValues,
        score,
        priority,
        recommendedPath,
        reasoning: JSON.stringify(reasoning ?? {}),
        status: "new",
      })
      .returning({
        id: aiArchitectureDiagnosticApplications.id,
      });

    if (resend) {
      const internalHtml = buildInternalEmailHtml({
        companyName: dbValues.companyName,
        email: dbValues.email,
        contactTitle: dbValues.contactTitle,
        useCase: dbValues.useCase,
        architectureMaturity: dbValues.architectureMaturity,
        infrastructure: dbValues.infrastructure,
        systems: dbValues.systems,
        regulatory: dbValues.regulatory,
        piiLevel: dbValues.piiLevel,
        engineeringTeam: dbValues.engineeringTeam,
        aiExperience: dbValues.aiExperience,
        budgetRange: dbValues.budgetRange,
        timeline: dbValues.timeline,
        score,
        priority,
        recommendedPath,
      });

      const emailResults = await Promise.allSettled([
        resend.emails.send({
          from: FROM_EMAIL,
          to: INTERNAL_EMAIL_TO,
          replyTo: dbValues.email,
          subject: `${priority} | AI Architecture Diagnostic | ${dbValues.companyName}`,
          html: internalHtml,
        }),
        resend.emails.send({
          from: FROM_EMAIL,
          to: dbValues.email,
          subject: "Your AI Architecture Diagnostic Application",
          html: buildClientEmailHtml(),
        }),
      ]);

      for (const result of emailResults) {
        if (result.status === "rejected") {
          console.error("Diagnostic email failed", result.reason);
        }
      }
    }

    return NextResponse.json(
      {
        success: true,
        id: application.id,
        score,
        priority,
        recommendedPath,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("AI diagnostic route failed", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}