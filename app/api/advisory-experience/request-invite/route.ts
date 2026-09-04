import { NextRequest, NextResponse } from "next/server";

import { advisoryInviteRequestSchema } from "@/lib/advisory-invite/schema";
import { createAdvisoryInviteToken } from "@/lib/advisory-invite/token";
import { buildAdvisoryInviteEmail } from "@/lib/email/build-advisory-invite-email";
import { getResend } from "@/lib/email/resend";

export const runtime = "nodejs";

export async function POST(
  request: NextRequest,
) {
  try {
    const body = await request.json();

    const parsed =
      advisoryInviteRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error:
            parsed.error.issues[0]?.message ??
            "Invalid request.",
        },
        {
          status: 400,
        },
      );
    }

    const { email, company } = parsed.data;

    const token = createAdvisoryInviteToken({
      email,
      company,
    });

    const invitationUrl = new URL(
      `/advisory-experience/invite?token=${encodeURIComponent(
        token,
      )}`,
      request.nextUrl.origin,
    ).toString();

    const from =
      process.env.RESEND_FROM_EMAIL;

    if (!from) {
      throw new Error(
        "RESEND_FROM_EMAIL is not configured.",
      );
    }

    const resend = getResend();

    const { error } = await resend.emails.send({
      from,
      to: email,
      subject:
        "Your Myria advisory session invitation",
      html: buildAdvisoryInviteEmail({
        invitationUrl,
        company,
      }),
    });

    if (error) {
      console.error(
        "Resend advisory invitation error:",
        error,
      );

      return NextResponse.json(
        {
          error:
            "We could not send your invitation right now. Please try again shortly.",
        },
        {
          status: 502,
        },
      );
    }

    return NextResponse.json({
      message:
        "Your invitation is on its way. Check your email for your private participation link.",
    });
  } catch (error) {
    console.error(
      "Advisory invitation request failed:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Unable to send your invitation right now.",
      },
      {
        status: 500,
      },
    );
  }
}
