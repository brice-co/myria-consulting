import { NextRequest, NextResponse } from "next/server";
import { AccessToken, RoomServiceClient } from "livekit-server-sdk";
import { verifyAdvisoryInviteToken } from "@/lib/advisory-invite/token";

export const runtime = "nodejs";

const SESSION_ID = /^[0-9a-f]{8}-[0-9a-f-]{27,36}$/i;
const MAX_PARTICIPANTS = 8;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { sessionId?: string; invite?: string; name?: string };
    if (!body.sessionId || !SESSION_ID.test(body.sessionId)) {
      return NextResponse.json({ error: "Invalid room identifier." }, { status: 400 });
    }
    if (!body.invite || !verifyAdvisoryInviteToken(body.invite)) {
      return NextResponse.json({ error: "An active invitation is required to join this video room." }, { status: 403 });
    }

    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;
    const serverUrl = process.env.LIVEKIT_URL || process.env.NEXT_PUBLIC_LIVEKIT_URL;
    if (!apiKey || !apiSecret || !serverUrl) {
      return NextResponse.json({ error: "LiveKit is not configured." }, { status: 503 });
    }

    const room = `myria-advisory:${body.sessionId}`;
    const serviceUrl = serverUrl.replace(/^wss:/, "https:").replace(/^ws:/, "http:");
    const service = new RoomServiceClient(serviceUrl, apiKey, apiSecret);
    try {
      const members = await service.listParticipants(room);
      if (members.length >= MAX_PARTICIPANTS) {
        return NextResponse.json({ error: "This conference is full (8 participants)." }, { status: 409 });
      }
    } catch {
      // A not-yet-created room has no participant list.
    }

    const name = (body.name || "Guest").trim().slice(0, 60) || "Guest";
    const identity = crypto.randomUUID();
    const token = new AccessToken(apiKey, apiSecret, {
      identity,
      name,
      ttl: "15m",
    });
    token.addGrant({
      roomJoin: true,
      room,
      canPublish: true,
      canSubscribe: true,
      canPublishData: true,
    });
    return NextResponse.json({ token: await token.toJwt() }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Unable to issue conference credentials." }, { status: 400 });
  }
}
