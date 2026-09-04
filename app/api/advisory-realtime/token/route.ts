import { NextRequest, NextResponse } from "next/server";
import { realtimeRateLimit } from "@/lib/rate-limit/realtime-rate-limit";

export const runtime = "nodejs";

function getClientIp(request: NextRequest) {
  const forwarded =
    request.headers.get("x-forwarded-for");

  return (
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  const { success, limit, remaining, reset } =
    await realtimeRateLimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      {
        error:
          "Too many Voice AI sessions. Please try again shortly.",
      },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": String(limit),
          "X-RateLimit-Remaining": String(remaining),
          "X-RateLimit-Reset": String(reset),
        },
      },
    );
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY is not configured." },
      { status: 500 },
    );
  }

  const response = await fetch(
    "https://api.openai.com/v1/realtime/client_secrets",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session: { type: "realtime", model: "gpt-realtime-mini" },
      }),
      cache: "no-store",
    },
  );

  const data = await response.json();
  if (!response.ok) {
    return NextResponse.json(
      {
        error:
          data?.error?.message ?? "Unable to create Realtime client secret.",
      },
      { status: response.status },
    );
  }

  return NextResponse.json(
    { value: data.value },
    { headers: { "Cache-Control": "no-store" } },
  );
}
