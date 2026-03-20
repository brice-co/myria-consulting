import { NextResponse } from "next/server";
import { db } from "@/db";
import { voiceDiagnosticApplications } from "@/db/schema";
import { Resend } from "resend";
import { scoreVoiceDiagnostic } from "@/lib/voice-diagnostic-score";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ✅ Validation
    if (!body.companyName || !body.email || !body.useCase || !body.budgetRange) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ SCORING
    const { score, recommendedPath } = scoreVoiceDiagnostic({
      budgetRange: body.budgetRange,
      timeline: body.timeline,
      infrastructure: body.infrastructure,
    });

    // ✅ Insert into DB
    const [application] = await db
      .insert(voiceDiagnosticApplications)
      .values({
        companyName: body.companyName,
        email: body.email,
        industry: body.industry,
        orgSize: body.orgSize,
        contactTitle: body.contactTitle,

        useCase: body.useCase,
        channel: body.channel,
        monthlyInteractions: body.monthlyInteractions,
        concurrentSessions: body.concurrentSessions,

        infrastructure: body.infrastructure,
        realtimeInfra: body.realtimeInfra,

        regulatory: body.regulatory,
        piiLevel: body.piiLevel,

        engineeringTeam: body.engineeringTeam,
        realtimeExperience: body.realtimeExperience,

        budgetRange: body.budgetRange,
        timeline: body.timeline,

        score,
        recommendedPath,
      })
      .returning();

    // ✅ PRIORITY
    const priority =
      score >= 10
        ? "🔥 HIGH PRIORITY"
        : score >= 7
        ? "⚡ MEDIUM PRIORITY"
        : "Standard";

    // ─────────────────────────────────────────────
    // 📩 INTERNAL EMAIL (safe)
    // ─────────────────────────────────────────────
    try {
      const internalEmail = await resend.emails.send({
        from: "Myria <noreply@briceetco.com>",
        to: "info@myriaconsulting.com",
        replyTo: body.email, // ✅ critical
        subject: `${priority} — New Diagnostic Application (${body.companyName})`,
        html: `
          <h2>New Voice Diagnostic Application</h2>

          <p><strong>Company:</strong> ${body.companyName}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Contact Title:</strong> ${body.contactTitle || "N/A"}</p>

          <hr/>

          <h3>🧠 AI Qualification</h3>
          <p><strong>Score:</strong> ${score}</p>
          <p><strong>Recommended Path:</strong> ${recommendedPath}</p>

          <hr/>

          <h3>📌 Use Case</h3>
          <p>${body.useCase}</p>

          <h3>⚙️ Technical Context</h3>
          <p><strong>Infrastructure:</strong></p>
          <p>${body.infrastructure || "N/A"}</p>

          <p><strong>Realtime Infra:</strong> ${body.realtimeInfra || "N/A"}</p>

          <hr/>

          <h3>💰 Investment</h3>
          <p><strong>Budget:</strong> ${body.budgetRange}</p>
          <p><strong>Timeline:</strong> ${body.timeline || "N/A"}</p>

          <hr/>

          <h3>🏢 Organization</h3>
          <p><strong>Industry:</strong> ${body.industry || "N/A"}</p>
          <p><strong>Size:</strong> ${body.orgSize || "N/A"}</p>
        `,
      });

      console.log("Internal email sent:", internalEmail);
    } catch (err) {
      console.error("Internal email failed:", err);
    }

    // ─────────────────────────────────────────────
    // 📩 CLIENT CONFIRMATION (safe)
    // ─────────────────────────────────────────────
    try {
      const clientEmail = await resend.emails.send({
        from: "Myria <noreply@briceetco.com>",
        to: body.email,
        subject: "Your Voice Architecture Diagnostic Application",
        html: `
          <h2>Application Received</h2>

          <p>Thank you for your interest in Myria Consulting.</p>

          <p>We have received your diagnostic application and our team is currently reviewing it.</p>

          <br/>

          <h3>What happens next:</h3>
          <ul>
            <li>We evaluate your technical and business readiness</li>
            <li>If aligned, we will send you a private scheduling link</li>
            <li>Typical response time: 2–3 business days</li>
          </ul>

          <br/>

          <p>— Myria Consulting</p>
        `,
      });

      console.log("Client email sent:", clientEmail);
    } catch (err) {
      console.error("Client email failed:", err);
    }

    // ✅ FINAL RESPONSE
    return NextResponse.json({
      success: true,
      id: application.id,
      score,
      recommendedPath,
    });

  } catch (error: any) {
    console.error("voice-diagnostic error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}