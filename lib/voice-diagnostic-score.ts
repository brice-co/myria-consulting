export function scoreVoiceDiagnostic(input: {
  budgetRange: string;
  timeline?: string;
  infrastructure?: string;
}) {
  const budget = (input.budgetRange || "").toLowerCase();
  const timeline = (input.timeline || "").toLowerCase();
  const infra = (input.infrastructure || "").toLowerCase();

  let score = 0;

  // budget
  if (budget.includes("500")) score += 5;
  else if (budget.includes("150")) score += 4;
  else if (budget.includes("50")) score += 2;
  else score += 1;

  // timeline urgency / seriousness
  if (timeline.includes("immediate")) score += 4;
  else if (timeline.includes("1-3")) score += 3;
  else if (timeline.includes("3-6")) score += 2;
  else score += 1;

  // infrastructure maturity
  if (
    infra.includes("webrtc") ||
    infra.includes("realtime") ||
    infra.includes("websocket")
  ) {
    score += 4;
  } else if (
    infra.includes("next.js") ||
    infra.includes("node") ||
    infra.includes("api")
  ) {
    score += 2;
  } else {
    score += 1;
  }

  let recommendedPath = "Voice Strategy Assessment";

  if (score <= 4) recommendedPath = "Browser Validation";
  else if (score <= 8) recommendedPath = "Voice Strategy Assessment";
  else if (score <= 11) recommendedPath = "Voice Architecture Diagnostic";
  else recommendedPath = "Direct Custom Build";

  return { score, recommendedPath };
}