import { NextRequest, NextResponse } from "next/server";
import { getClientIp } from "@/lib/myria-contact-agent/security/client-ip";
import { hashIdentifier } from "@/lib/myria-contact-agent/security/hash";
import { realtimeTokenRateLimit } from "@/lib/myria-contact-agent/upstash/ratelimit";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "Realtime service is not configured." }, { status: 500 });
  }

  const ip = getClientIp(request);
  const rate = await realtimeTokenRateLimit.limit(hashIdentifier(ip));
  if (!rate.success) {
    return NextResponse.json({ error: "Too many realtime sessions. Please try again later.", reset: rate.reset }, { status: 429 });
  }

  const model = process.env.OPENAI_REALTIME_MODEL ?? "gpt-realtime-2.1";
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
    console.error("Unable to mint OpenAI realtime client secret", payload);
    return NextResponse.json({ error: "Unable to create realtime session." }, { status: 502 });
  }

  return NextResponse.json({ value: payload.value, model }, { headers: { "Cache-Control": "no-store" } });
}
