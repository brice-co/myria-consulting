// /lib/scoreArchitectureDiagnostic.ts

type Input = {
  budgetRange?: string;
  timeline?: string;
  infrastructure?: string;
  realtimeInfra?: string;
  regulatory?: string;
  engineeringTeam?: string;
  realtimeExperience?: string;
};

type Output = {
  score: number;
  priority: "STRATEGIC" | "QUALIFIED" | "EARLY" | "NOT_READY";
  recommendedPath:
    | "Architecture Diagnostic"
    | "Strategy Call"
    | "Education / Nurture";
  reasoning: string[];
};

export function scoreArchitectureDiagnostic(input: Input): Output {
  let score = 0;
  const reasoning: string[] = [];

  /* -------------------------------------------------
    💰 BUDGET (0–5)
  -------------------------------------------------- */
  switch (input.budgetRange) {
    case "500k+":
      score += 5;
      reasoning.push("Strong enterprise budget");
      break;
    case "150k–500k":
      score += 4;
      reasoning.push("Solid mid-market budget");
      break;
    case "50k–150k":
      score += 2;
      reasoning.push("Limited but viable budget");
      break;
    case "<50k":
      score += 0;
      reasoning.push("Budget likely too low for architecture work");
      break;
    default:
      reasoning.push("No clear budget defined");
  }

  /* -------------------------------------------------
    ⏱️ TIMELINE (0–3)
  -------------------------------------------------- */
  switch (input.timeline) {
    case "Immediate":
      score += 3;
      reasoning.push("High urgency");
      break;
    case "1–3 months":
      score += 2;
      reasoning.push("Near-term execution window");
      break;
    case "3–6 months":
      score += 1;
      reasoning.push("Mid-term planning");
      break;
    default:
      reasoning.push("Timeline unclear");
  }

  /* -------------------------------------------------
    🏗️ INFRASTRUCTURE MATURITY (0–4)
  -------------------------------------------------- */
  if (input.infrastructure) {
    const infra = input.infrastructure.toLowerCase();

    if (
      infra.includes("microservices") ||
      infra.includes("event") ||
      infra.includes("distributed")
    ) {
      score += 4;
      reasoning.push("Mature distributed architecture");
    } else if (
      infra.includes("api") ||
      infra.includes("cloud") ||
      infra.includes("backend")
    ) {
      score += 2;
      reasoning.push("Basic backend infrastructure present");
    } else {
      score += 1;
      reasoning.push("Limited infrastructure maturity");
    }
  }

  /* -------------------------------------------------
    ⚡ REALTIME INFRA (0–3)
  -------------------------------------------------- */
  switch (input.realtimeInfra) {
    case "Event-driven architecture implemented":
      score += 3;
      reasoning.push("Advanced realtime/event-driven infra");
      break;
    case "WebRTC experience":
      score += 2;
      reasoning.push("Realtime experience (WebRTC)");
      break;
    case "WebSocket only":
      score += 1;
      reasoning.push("Basic realtime capability");
      break;
    case "None":
      score += 0;
      reasoning.push("No realtime infrastructure");
      break;
  }

  /* -------------------------------------------------
    ⚖️ GOVERNANCE / REGULATORY COMPLEXITY (0–3)
    (Higher = more valuable client if capable)
  -------------------------------------------------- */
  switch (input.regulatory) {
    case "Multiple regulatory constraints":
      score += 3;
      reasoning.push("High governance complexity (enterprise)");
      break;
    case "SOC 2 required":
      score += 2;
      reasoning.push("Security/compliance requirements");
      break;
    case "HIPAA exposure":
    case "GDPR considerations":
      score += 2;
      reasoning.push("Sensitive data environment");
      break;
    case "None":
      score += 0;
      reasoning.push("Low governance complexity");
      break;
  }

  /* -------------------------------------------------
    👩‍💻 ENGINEERING TEAM (0–3)
  -------------------------------------------------- */
  switch (input.engineeringTeam) {
    case "Enterprise":
      score += 3;
      reasoning.push("Large engineering org");
      break;
    case "10–50":
      score += 2;
      reasoning.push("Mid-size engineering team");
      break;
    case "<10":
      score += 1;
      reasoning.push("Small engineering team");
      break;
    case "None":
      score += 0;
      reasoning.push("No internal technical team");
      break;
  }

  /* -------------------------------------------------
    🧠 REALTIME EXPERIENCE (0–2)
  -------------------------------------------------- */
  switch (input.realtimeExperience) {
    case "WebRTC":
      score += 2;
      reasoning.push("Advanced realtime experience");
      break;
    case "WebSocket":
      score += 1;
      reasoning.push("Basic realtime knowledge");
      break;
    case "Limited":
    case "None":
      score += 0;
      reasoning.push("Limited realtime experience");
      break;
  }

  /* -------------------------------------------------
    🎯 FINAL CLASSIFICATION
  -------------------------------------------------- */

  let priority: Output["priority"];
  let recommendedPath: Output["recommendedPath"];

  if (score >= 14) {
    priority = "STRATEGIC";
    recommendedPath = "Architecture Diagnostic";
  } else if (score >= 10) {
    priority = "QUALIFIED";
    recommendedPath = "Architecture Diagnostic";
  } else if (score >= 6) {
    priority = "EARLY";
    recommendedPath = "Strategy Call";
  } else {
    priority = "NOT_READY";
    recommendedPath = "Education / Nurture";
  }

  return {
    score,
    priority,
    recommendedPath,
    reasoning,
  };
}