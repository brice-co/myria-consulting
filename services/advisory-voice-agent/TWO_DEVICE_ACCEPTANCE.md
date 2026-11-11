# Two-device LiveKit + Myria AI integration acceptance

**Not a production launch checklist.** Do not enable Vercel Production unified flags until all steps pass. The worker requires a separately deployed LiveKit Agents service.

## Before the test

1. The GitHub Actions worker validation checks must pass on the exact PR commit. A Python import test does not prove a functional live connection.
2. Deploy `services/advisory-voice-agent/agent.py` to a nonproduction LiveKit Agents worker with matching LIVEKIT credentials and an OPENAI_API_KEY.
3. In a **Preview** Vercel deployment only, set `ADVISORY_LIVEKIT_AGENT_ENABLED=true` and `NEXT_PUBLIC_ADVISORY_UNIFIED_AGENT_ENABLED=true`, and the existing LiveKit + invitation settings.
4. Create a *fresh* invitation. Join with two browsers on **different physical devices**, both with headphones.
5. Record the test room ID, preview URL, worker build revision, timestamp, and any error messages; do not record invitation tokens or API keys.

## Pass/fail (run in order)

- [ ] Both devices connect to the **same** LiveKit room; host and guest can hear each other.
- [ ] On the preview only, the old standalone browser AI voice panel and speech-transcript relay are absent.
- [ ] A participant clicks **Invite shared AI advisor**. Exactly one LiveKit agent joins. The agent is audible on **both** devices.
- [ ] Host speaks an ordinary question; AI gives an intelligible contextual answer.
- [ ] Guest speaks the next question **using their own microphone**, out of earshot of the host's microphone; AI answers the guest.
- [ ] Switch between host and guest for at least 10 turns. Measure clipped words, lost utterances, duplicate replies, and audio glitches.
- [ ] Host leaves while guest remains. Agent continues and guest can address it.
- [ ] Rejoin host; agent hears both participants in turn without duplicate AI agents.
- [ ] Test mute, browser audio unlock, microphone denial, and disconnect/reconnect.
- [ ] Confirm the meeting ends cleanly; no orphaned worker/room after the configured lifecycle ends.

## Known incomplete behavior

- Active-speaker switching is provisional; overlapping speakers, interruption policy, and audio handover quality are **not** established.
- The worker does **not** yet invoke the existing Myria Strategy / Operations / People & Change / AI & Data specialist tools, nor write findings back into Liveblocks.
- Dispatch authorization is invitation-gated but not restricted to a host role, and rate limiting/deduplication requires further hardening.
- The LiveKit deployment and two-device test must be observed before a claim of working multiparty AI audio.

## Stop conditions

Stop the test and keep the PR draft if any guest cannot speak directly to the AI or the AI is audible on only one device. Do not enable unified flags on the production Vercel project as a workaround.
