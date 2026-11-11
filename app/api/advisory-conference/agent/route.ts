import { NextRequest, NextResponse } from "next/server";
import { AgentDispatchClient } from "livekit-server-sdk";
import { verifyAdvisoryInviteToken } from "@/lib/advisory-invite/token";

export const runtime = "nodejs";
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const AGENT_NAME = "myria-advisory";

export async function POST(request: NextRequest) {
  if (process.env.ADVISORY_LIVEKIT_AGENT_ENABLED !== "true") {
    return NextResponse.json({ error: "LiveKit advisory agent is not enabled." }, { status: 503 });
  }
  try {
    const { sessionId, invite } = await request.json() as { sessionId?: string; invite?: string };
    if (!sessionId || !UUID.test(sessionId) || !invite || !verifyAdvisoryInviteToken(invite)) {
      return NextResponse.json({ error: "A valid session and invitation are required." }, { status: 403 });
    }
    const key = process.env.LIVEKIT_API_KEY;
    const secret = process.env.LIVEKIT_API_SECRET;
    const websocketUrl = process.env.LIVEKIT_URL || process.env.NEXT_PUBLIC_LIVEKIT_URL;
    if (!key || !secret || !websocketUrl) {
      return NextResponse.json({ error: "LiveKit server is not configured." }, { status: 503 });
    }
    const url = websocketUrl.replace(/^wss:/, "https:").replace(/^ws:/, "http:");
    const roomName = `myria-advisory:${sessionId}`;
    const client = new AgentDispatchClient(url, key, secret);
    const existing = await client.listDispatch(roomName);
    const active = existing.find((entry) => entry.agentName === AGENT_NAME);
    if (active) {
      return NextResponse.json({ status: "already_dispatched", dispatchId: active.id }, { headers: { "Cache-Control": "no-store" } });
    }
    const dispatch = await client.createDispatch(roomName, AGENT_NAME);
    return NextResponse.json({ status: "dispatched", dispatchId: dispatch.id }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Unable to dispatch the LiveKit AI worker. Confirm that the worker is deployed and registered." }, { status: 502 });
  }
}
