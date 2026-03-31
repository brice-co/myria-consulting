import { NextResponse } from "next/server";
import { db } from "@/db";
import { aiArchitectureDiagnosticApplications } from "@/db/schema";
import { Resend } from "resend";
import { scoreArchitectureDiagnostic } from "@/lib/scoreArchitectureDiagnostic";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("📥 Incoming Diagnostic আবেদন:", body);

    // ─────────────────────────────────────────────
    // ✅ VALIDATION
    // ─────────────────────────────────────────────
    if (!body.companyName || !body.email || !body.useCase || !body.budgetRange) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ─────────────────────────────────────────────
    // ✅ SCORING ENGINE
    // ─────────────────────────────────────────────
    const {
      score,
      recommendedPath,
      reasoning,
    } = scoreArchitectureDiagnostic({
      budgetRange: body.budgetRange,
      timeline: body.timeline,
      infrastructure: body.infrastructure,
      realtimeInfra: body.realtimeInfra,
      regulatory: body.regulatory,
      engineeringTeam: body.engineeringTeam,
      realtimeExperience: body.realtimeExperience,
    });

    // ─────────────────────────────────────────────
    // ✅ PRIORITY LOGIC
    // ─────────────────────────────────────────────
    const priority =
      score >= 14
        ? "🔥 STRATEGIC (Ideal Client)"
        : score >= 10
        ? "⚡ QUALIFIED"
        : score >= 6
        ? "🟡 EARLY STAGE"
        : "⚪ NOT READY";

    // ─────────────────────────────────────────────
    // ✅ DATABASE INSERT
    // ─────────────────────────────────────────────
    const [application] = await db
      .insert(aiArchitectureDiagnosticApplications)
      .values({
        companyName: body.companyName,
        email: body.email,
        industry: body.industry,
        orgSize: body.orgSize,
        contactTitle: body.contactTitle,

        useCase: body.useCase,
        aiScope: body.aiScope,
        users: body.users,
        systems: body.systems,

        infrastructure: body.infrastructure,
        architectureMaturity: body.architectureMaturity,

        regulatory: body.regulatory,
        piiLevel: body.piiLevel,

        engineeringTeam: body.engineeringTeam,
        aiExperience: body.aiExperience,

        budgetRange: body.budgetRange,
        timeline: body.timeline,

        score,
        priority,
        recommendedPath,
        reasoning: JSON.stringify(reasoning || {}),

        status: "new",
      })
      .returning();

    console.log("✅ Saved application:", application.id);

    // ─────────────────────────────────────────────
    // 📩 INTERNAL EMAIL
    // ─────────────────────────────────────────────
    try {
      await resend.emails.send({
        from: "Myria <noreply@briceetco.com>",
        to: "info@myriaconsulting.com",
        replyTo: body.email,
        subject: `${priority} — AI Architecture Diagnostic (${body.companyName})`,
        html: `
          <h2>New AI Architecture Diagnostic Application</h2>

          <p><strong>Company:</strong> ${body.companyName}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Role:</strong> ${body.contactTitle || "N/A"}</p>

          <hr/>

          <h3>🧠 Qualification</h3>
          <p><strong>Score:</strong> ${score}</p>
          <p><strong>Priority:</strong> ${priority}</p>
          <p><strong>Recommended Path:</strong> ${recommendedPath}</p>

          <hr/>

          <h3>📌 Use Case</h3>
          <p>${body.useCase}</p>

          <h3>🏗️ Architecture</h3>
          <p><strong>Maturity:</strong> ${body.architectureMaturity || "N/A"}</p>
          <p><strong>Infrastructure:</strong></p>
          <p>${body.infrastructure || "N/A"}</p>

          <h3>🔌 Systems</h3>
          <p>${body.systems || "N/A"}</p>

          <hr/>

          <h3>⚖️ Governance</h3>
          <p><strong>Regulatory:</strong> ${body.regulatory || "N/A"}</p>
          <p><strong>PII Level:</strong> ${body.piiLevel || "N/A"}</p>

          <hr/>

          <h3>👨‍💻 Capability</h3>
          <p><strong>Engineering Team:</strong> ${body.engineeringTeam || "N/A"}</p>
          <p><strong>AI Experience:</strong> ${body.aiExperience || "N/A"}</p>

          <hr/>

          <h3>💰 Investment</h3>
          <p><strong>Budget:</strong> ${body.budgetRange}</p>
          <p><strong>Timeline:</strong> ${body.timeline || "N/A"}</p>
        `,
      });

      console.log("📩 Internal email sent");
    } catch (err) {
      console.error("❌ Internal email failed:", err);
    }

    // ─────────────────────────────────────────────
    // 📩 CLIENT CONFIRMATION
    // ─────────────────────────────────────────────
    try {
      await resend.emails.send({
        from: "Myria <noreply@briceetco.com>",
        to: body.email,
        subject: "Your AI Architecture Diagnostic Application",
        html: `
          <h2>Application Received</h2>

          <p>Thank you for your interest in Myria Consulting.</p>

          <p>Your application for the <strong>AI Architecture Diagnostic Lab</strong> has been received.</p>

          <br/>

          <h3>What happens next:</h3>
          <ul>
            <li>We evaluate your architecture, readiness, and fit</li>
            <li>If aligned, you will receive a private scheduling link</li>
            <li>Typical response time: 2–3 business days</li>
          </ul>

          <br/>

          <p>— Myria Consulting</p>
        `,
      });

      console.log("📩 Client email sent");
    } catch (err) {
      console.error("❌ Client email failed:", err);
    }

    // ─────────────────────────────────────────────
    // ✅ RESPONSE
    // ─────────────────────────────────────────────
    return NextResponse.json({
      success: true,
      id: application.id,
      score,
      priority,
      recommendedPath,
    });

  } catch (error: any) {
    console.error("🔥 AI Diagnostic API Error:", error);

    return NextResponse.json(
      { error: "Internal server error", details: error?.message },
      { status: 500 }
    );
  }
}