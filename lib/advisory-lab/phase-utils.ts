import { ADVISORY_PHASES, SESSION_DURATION_MS } from "./config";
import type { AdvisoryPhase, AdvisoryPhaseId } from "./types";

export function getSessionProgress(elapsedMs: number) {
  return Math.min(100, Math.max(0, (elapsedMs / SESSION_DURATION_MS) * 100));
}

export function getPhaseFromElapsed(elapsedMs: number): AdvisoryPhase {
  const equivalentFullMinutes = (getSessionProgress(elapsedMs) / 100) * 90;
  return ADVISORY_PHASES.find(
    (phase) => equivalentFullMinutes >= phase.startMinute && equivalentFullMinutes < phase.endMinute,
  ) ?? ADVISORY_PHASES[ADVISORY_PHASES.length - 1];
}

export function getPhaseIndex(phaseId: AdvisoryPhaseId) {
  return Math.max(0, ADVISORY_PHASES.findIndex((phase) => phase.id === phaseId));
}

export function formatElapsed(elapsedMs: number) {
  const totalSeconds = Math.floor(elapsedMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
