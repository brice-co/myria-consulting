import { NextRequest, NextResponse } from "next/server";
import { buildPlaybookEmail } from "@/emails/ai-enabled-enterprise-playbook";
import { getResendClient } from "@/lib/resend/client";
import { checkPlaybookRateLimit } from "@/lib/rate-limit/playbook";
import { DrizzlePlaybookLeadRepository } from "@/lib/resources/playbook/drizzle-playbook-lead-repository";
import { playbookRequestSchema } from "@/lib/validation/playbook-request";


export async function POST(request: NextRequest) {
  try {
    const json = await request.json();
    const parsed = playbookRequestSchema.safeParse(json);
    if (!parsed.success) return NextResponse.json({ error: "Please provide your name, company and a valid business email." }, { status: 400 });
    const { name, company, email, website } = parsed.data;
    if (website) return NextResponse.json({ ok: true });

    const identifier = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const limit = await checkPlaybookRateLimit(identifier);
    if (!limit.success) return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });

    const digitalUrl = process.env.PLAYBOOK_DIGITAL_EDITION_URL;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const from = process.env.PLAYBOOK_FROM_EMAIL;

    if (!digitalUrl || !siteUrl || !from) {
      throw new Error("Playbook delivery environment is incomplete.");
    }

    const repository = new DrizzlePlaybookLeadRepository();
    await repository.save({ name, company, email, source: "ai-enabled-enterprise-playbook" });

    const resend = getResendClient();
    const { error } = await resend.emails.send({
      from,
      to: email,
      subject: "Your AI-Enabled Enterprise Playbook",
      html: buildPlaybookEmail({ name, digitalUrl, labsUrl: `${siteUrl}/labs` }),
    });
    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[playbook-request]", error);
    return NextResponse.json({ error: "We could not send the Playbook right now. Please try again." }, { status: 500 });
  }
}
