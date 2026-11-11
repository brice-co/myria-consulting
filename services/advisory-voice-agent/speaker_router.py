"""Deterministic active-speaker selection, independent of LiveKit runtime."""
from dataclasses import dataclass


@dataclass
class SpeakerRouter:
    switch_delay: float = 1.2
    linked_identity: str | None = None
    last_switch_at: float = -10_000.0

    def select(self, speakers: list[str], humans: set[str], now: float) -> str | None:
        """Returns a new participant identity only when switching is warranted."""
        available = [identity for identity in speakers if identity in humans]
        if not available:
            return None
        # Do not switch while the existing speaker is still active.
        if self.linked_identity in available:
            return None
        if now - self.last_switch_at < self.switch_delay:
            return None
        target = available[0]
        if target == self.linked_identity:
            return None
        self.linked_identity = target
        self.last_switch_at = now
        return target

    def departed(self, identity: str) -> None:
        if identity == self.linked_identity:
            self.linked_identity = None
            # Permit immediate replacement when the linked participant leaves.
            self.last_switch_at = -10_000.0
