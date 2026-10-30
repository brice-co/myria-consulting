# Myria Advisory LiveKit agent — integration preview

This branch implements a **feature-gated integration path**, not a verified production-ready 4–8 participant AI meeting.

## Components

- Python agent worker `agent.py`: joins LiveKit as an explicit `myria-advisory` dispatch, publishes one shared AI voice, and switches its incoming linked audio to the active room speaker (1.2-second hold-down to reduce rapid switching).
- Next.js endpoint `POST /api/advisory-conference/agent`: validates the signed invitation and session UUID; checks for an existing dispatch before creating one.
- Conference interface: `Invite shared AI advisor` control. In unified mode, the browser-hosted OpenAI microphone client and the browser speech transcription relay are hidden.

## Worker

The worker runs in a persistent LiveKit Agents deployment, Railway, or container—not a Vercel request handler.

```bash
cd services/advisory-voice-agent
python -m venv .venv
pip install -r requirements.txt
python agent.py dev
```

Worker variables: `LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`, `OPENAI_API_KEY`.

Web server variables: `LIVEKIT_URL` or `NEXT_PUBLIC_LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`, `ADVISORY_INVITE_SECRET`.

**Only in a test deployment with an active worker**, set both:

```env
ADVISORY_LIVEKIT_AGENT_ENABLED=true
NEXT_PUBLIC_ADVISORY_UNIFIED_AGENT_ENABLED=true
```

When these are unset, the previous web-AI path remains active. Do **not** enable just one of the flags. To revert, unset both flags and redeploy.

## Validation and limitations

1. Verify worker Python syntax and package compatibility after installing pinned dependencies; run Next.js TypeScript and build checks.
2. Dispatch to a valid invite room and assert exactly one agent joins. Confirm server-side entitlement and rate limit before public release; the current signed invitation is not bound to a particular room and the dispatch check is best-effort under concurrency.
3. Two separate devices: verify human-to-human and AI-to-both audio; test each device speaking to AI in turn. Use headphones.
4. Test all 4–8 humans; overlapping speech, interruptions, VAD attribution, mute, reconnect, leave/rejoin, and rapid speaker switches. The simple active-speaker switch is not a production-grade floor controller; some speech may be clipped during switches.
5. Port existing Myria advisory tools and Liveblocks workspace persistence to the worker. These are currently **not integrated**, so real insights/actions will not yet be created by the worker.
6. Implement durable worker lifecycle, observability, moderation and session authorization before production.
7. Make sure the agent is not counted against the eight human participant slots when enforcing capacity.

**The branch has not been built or tested in a deployed LiveKit room. Keep PR #15 draft until these checks pass.**
