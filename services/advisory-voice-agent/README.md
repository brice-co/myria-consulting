# Myria Advisory — Server Voice Agent (foundation only)

The existing web-hosted OpenAI Realtime conversation hears only the local browser microphone. LiveKit is used separately for conference participants. A separate LiveKit agent worker lets an agent publish **one shared audible output** in the meeting, but the stock voice session links its **input** to one participant. Therefore **this folder is not a working 4–8 person AI moderator yet**.

## Setup

Run this worker on a long-running LiveKit Agents deployment, Railway, or container service, **not as a Vercel request handler**.

```bash
cd services/advisory-voice-agent
python -m venv .venv
pip install -r requirements.txt
python agent.py dev
```

The runtime needs `LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`, and `OPENAI_API_KEY`. The LiveKit dispatch name is `myria-advisory`. An authorized server-side dispatch to `myria-advisory:<sessionId>` must be implemented before this can join a meeting. Do not put those credentials in the browser.

## Production gates (not implemented yet)

1. Explicitly dispatch exactly one worker to a validated, authenticated session.
2. Implement tested multi-participant capture, including correct per-speaker audio routing and interruption behavior. The default linked-participant input is **insufficient**.
3. Replace browser Realtime microphone and browser SpeechRecognition relay, avoiding duplicate AI replies.
4. Publish the agent's output once through LiveKit, with participant audio playback unlock and feedback suppression.
5. Port and test Myria advisory tools and Liveblocks writes with a server-side authorization boundary.
6. Add session/worker expiry, access revocation, monitoring, and 2-device then 4–8-device end-to-end tests.

This worker is intentionally **not wired into the live frontend**. Shipping it as the active AI without the production gates would repeat the existing failure.
