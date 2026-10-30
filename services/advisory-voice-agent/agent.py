"""Standalone LiveKit voice-worker foundation; not an all-participant mixer.

The worker runs separately from Next.js/Vercel and joins on explicit dispatch.
A standard AgentSession links to one participant for incoming speech.
Group speech mixing/speaker routing must be added and tested before production use.
"""
import time
from dotenv import load_dotenv
from livekit.agents import Agent, AgentServer, AgentSession, JobContext
from livekit.plugins import openai

load_dotenv()

server = AgentServer()


@server.rtc_session(agent_name="myria-advisory")
async def advisory_session(ctx: JobContext):
    session = AgentSession(
        llm=openai.realtime.RealtimeModel(voice="marin"),
    )
    await session.start(
        room=ctx.room,
        agent=Agent(
            instructions=(
                "You are Myria, an advisory facilitator. Speak naturally and briefly, "
                "ask one question at a time, and allow participants to finish. "
                "You are joining a collaborative workspace. Do not assert that you "
                "heard all room participants unless their speech is actually delivered "
                "to your input track. Do not invent insights or decisions."
            )
        ),
    )
    # Use LiveKit's active-speaker event to link the agent input to whichever
    # human is currently speaking. A small hold-down limits track flapping.
    # This is speaker switching, not simultaneous multichannel understanding.
    last_switch_at = 0.0

    @ctx.room.on("active_speakers_changed")
    def on_active_speakers_changed(speakers):
        nonlocal last_switch_at
        now = time.monotonic()
        if now - last_switch_at < 1.2 or not session.room_io:
            return
        for speaker in speakers:
            if speaker.identity not in ctx.room.remote_participants:
                continue
            if speaker.identity == getattr(session.room_io.linked_participant, "identity", None):
                return
            session.room_io.set_participant(speaker.identity)
            last_switch_at = now
            return

    await session.generate_reply(
        instructions="Briefly introduce yourself and ask what business challenge the group wants to discuss."
    )


if __name__ == "__main__":
    from livekit.agents import cli
    cli.run_app(server)
