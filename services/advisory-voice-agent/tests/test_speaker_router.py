import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from speaker_router import SpeakerRouter


class SpeakerRouterTests(unittest.TestCase):
    def test_initial_human_speaker(self):
        router = SpeakerRouter()
        self.assertEqual(router.select(["host"], {"host", "guest"}, 1), "host")

    def test_ignore_agent_and_unknown_participants(self):
        router = SpeakerRouter()
        self.assertIsNone(router.select(["agent", "unknown"], {"host"}, 1))

    def test_keep_existing_active_speaker(self):
        router = SpeakerRouter()
        router.select(["host"], {"host", "guest"}, 1)
        self.assertIsNone(router.select(["host", "guest"], {"host", "guest"}, 4))

    def test_debounce_switch(self):
        router = SpeakerRouter()
        router.select(["host"], {"host", "guest"}, 1)
        self.assertIsNone(router.select(["guest"], {"host", "guest"}, 1.3))
        self.assertEqual(router.select(["guest"], {"host", "guest"}, 2.5), "guest")

    def test_departure_permits_immediate_replacement(self):
        router = SpeakerRouter()
        router.select(["host"], {"host", "guest"}, 1)
        router.departed("host")
        self.assertEqual(router.select(["guest"], {"guest"}, 1.1), "guest")

    def test_empty_active_speaker_update(self):
        router = SpeakerRouter()
        self.assertIsNone(router.select([], {"host"}, 4))


if __name__ == "__main__":
    unittest.main()
