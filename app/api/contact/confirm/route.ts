import { NextRequest, NextResponse } from "next/server";
import { confirmationRequestSchema } from "@/lib/myria-contact-agent/contact/schema";
import { createConfirmation } from "@/lib/myria-contact-agent/contact/confirmation";
import { getClientIp } from "@/lib/myria-contact-agent/security/client-ip";
import { hashIdentifier } from "@/lib/myria-contact-agent/security/hash";
import { confirmationRateLimit } from "@/lib/myria-contact-agent/upstash/ratelimit";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const rate = await confirmationRateLimit.limit(hashIdentifier(ip));
  if (!rate.success) {
    return NextResponse.json({ error: "Too many confirmation attempts.", reset: rate.reset }, { status: 429 });
  }

  const parsed = confirmationRequestSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "The inquiry is incomplete or invalid." }, { status: 400 });
  }

  const { inquiry } = parsed.data;
  if (
  !inquiry.name.trim() ||
  !inquiry.email.trim() ||
  !inquiry.company.trim() ||
  !inquiry.role.trim()
) {
  return NextResponse.json(
    {
      error:
        "Name, email, company, and role are required before sending.",
    },
    { status: 400 },
  );
}

  const confirmation = await createConfirmation(inquiry);
  return NextResponse.json(confirmation, { headers: { "Cache-Control": "no-store" } });
}
