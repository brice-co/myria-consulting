"""Standalone LiveKit voice-worker foundation; not an all-participant mixer.

The worker runs separately from Next.js/Vercel and joins on explicit dispatch.
A standard AgentSession links to one participant for incoming speech.
Group speech mixing/speaker routing must be added and tested before production use.
"""
from dotenv import load_dotenv
from livekit.agents import Agent, AgentServer, AgentSession, JobContext, room_io
from speaker_router import SpeakerRouter
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
        room_options=room_io.RoomOptions(close_on_disconnect=False),
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
    # Route the Realtime input to the current human speaker. This deliberately
    # cannot handle overlapping speech, which needs a production floor policy.
    router = SpeakerRouter()

    @ctx.room.on("active_speakers_changed")
    def on_active_speakers_changed(speakers):
        if not session.room_io:
            return
        import time
        humans = set(ctx.room.remote_participants.keys())
        target = router.select([s.identity for s in speakers], humans, time.monotonic())
        if target:
            session.room_io.set_participant(target)

    @ctx.room.on("participant_disconnected")
    def on_participant_disconnected(participant):
        router.departed(participant.identity)

    await session.generate_reply(
        instructions="Briefly introduce yourself and ask what business challenge the group wants to discuss."
    )


if __name__ == "__main__":
    from livekit.agents import cli
    cli.run_app(server)
