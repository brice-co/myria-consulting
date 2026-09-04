import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { aboutMyriaRealtimeRateLimit } from "@/lib/about-myria/upstash/ratelimit";

export const runtime = "nodejs";

function ip(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

function hash(value: string) {
  return createHash("sha256")
    .update(`${process.env.RATE_LIMIT_SALT ?? "myria"}:${value}`)
    .digest("hex");
}

export async function POST(request: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "Realtime service is not configured." }, { status: 500 });
  }

  const rate = await aboutMyriaRealtimeRateLimit.limit(hash(ip(request)));

  if (!rate.success) {
    return NextResponse.json({ error: "Too many About Myria sessions. Please try again later." }, { status: 429 });
  }

  const model = process.env.OPENAI_REALTIME_MODEL ?? "gpt-realtime-mini";

  const response = await fetch("https://api.openai.com/v1/realtime/client_secrets", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ session: { type: "realtime", model } }),
    cache: "no-store",
  });

  const payload = await response.json();

  if (!response.ok || typeof payload?.value !== "string") {
    return NextResponse.json({ error: "Unable to create realtime session." }, { status: 502 });
  }

  return NextResponse.json({ value: payload.value, model }, {
    headers: { "Cache-Control": "no-store" },
  });
}
