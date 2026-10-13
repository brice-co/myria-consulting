import { NextRequest, NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { registrationSchema } from "@/features/intelligent-labs/schemas/registration-schema";
import { allowRegistration } from "@/features/intelligent-labs/services/rate-limit";
import { saveRegistration, markConfirmationSent } from "@/features/intelligent-labs/queries/registrations";
import { sendLabConfirmation } from "@/features/intelligent-labs/services/confirmation-email";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const origin = request.headers.get("origin");
    if (origin && origin !== request.nextUrl.origin) {
      return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
    }

    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json({ error: "Expected JSON." }, { status: 415 });
    }

    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (contentLength > 10_000) {
      return NextResponse.json({ error: "Request too large." }, { status: 413 });
    }

    const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const identity = forwarded || "unknown";
    const key = createHash("sha256").update(identity).digest("hex");
    if (!(await allowRegistration(key))) {
      return NextResponse.json({ error: "Please try again later." }, { status: 429 });
    }

    const parsed = registrationSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Please check the registration fields." }, { status: 400 });
    }

    if (parsed.data.website) {
      return NextResponse.json({ ok: true }, { status: 202 });
    }

    const id = await saveRegistration(parsed.data);
    try {
      await sendLabConfirmation(parsed.data);
      await markConfirmationSent(id);
    } catch (error) {
      console.error("Lab confirmation email failed", error);
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Lab registration failed", error);
    return NextResponse.json({ error: "Registration is temporarily unavailable." }, { status: 503 });
  }
}
