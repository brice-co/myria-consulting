"use client";

import Link from "next/link";
import { ArrowRight, Shield, AlertTriangle, CheckCircle2, XCircle, TrendingUp, Users, FileText, BarChart3, Target } from "lucide-react";

const SampleDeliverable = () => {
  const overallScore = 62;
  const recommendedTier = "Tier 2";

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-gradient-primary" />
            <span className="font-semibold text-foreground tracking-tight">VoiceArch</span>
          </Link>
          <Link href="/realtime-voice-diagnostic" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Back to Diagnostic
          </Link>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Document Header */}
          <div className="mb-12 pb-8 border-b border-border/50">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary">Sample Deliverable</span>
              <span className="text-xs text-muted-foreground">• Preview Only</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-3">
              Voice Architecture Readiness Summary
            </h1>
            <p className="text-muted-foreground text-sm mb-6">
              This is a representative sample. Your actual deliverable will be customized to your organization's specific context, infrastructure, and objectives.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Client", value: "Acme Financial Services" },
                { label: "Industry", value: "Financial Services" },
                { label: "Date", value: "February 2026" },
                { label: "Prepared By", value: "VoiceArch Advisory" },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-md bg-secondary border border-border/50">
                  <span className="text-xs text-muted-foreground block mb-1">{item.label}</span>
                  <span className="text-sm font-medium text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Executive Summary */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-serif font-bold text-foreground">Executive Summary</h2>
            </div>
            <div className="p-6 rounded-lg bg-card border border-border/50">
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Acme Financial Services is positioned for a <strong className="text-foreground">Tier 2 (Managed Infrastructure)</strong> voice 
                AI implementation. The organization demonstrates strong existing cloud infrastructure and clear business 
                objectives, but faces meaningful gaps in WebRTC engineering expertise, real-time compliance monitoring, 
                and concurrent session management capabilities.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                With targeted investment in specialized engineering talent and a phased implementation approach, 
                production readiness is achievable within <strong className="text-foreground">4–6 months</strong>. We recommend a partner-assisted 
                build strategy with structured knowledge transfer to develop internal capability.
              </p>
            </div>
          </section>

          {/* Readiness Score */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-serif font-bold text-foreground">Infrastructure Readiness Score</h2>
            </div>
            <div className="p-6 rounded-lg bg-card border border-border/50">
              <div className="flex items-center gap-8 mb-6">
                <div className="relative w-32 h-32 flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
                    <circle
                      cx="60" cy="60" r="52" fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="8"
                      strokeDasharray={`${(overallScore / 100) * 327} 327`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-foreground">{overallScore}</span>
                    <span className="text-xs text-muted-foreground">/ 100</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-foreground mb-1">Conditionally Ready</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Your organization meets baseline requirements but has critical gaps that must be 
                    addressed before production deployment. Estimated remediation: 8–12 weeks.
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { domain: "Cloud Infrastructure", score: 82, status: "strong" },
                  { domain: "Security & Compliance", score: 58, status: "needs-work" },
                  { domain: "Engineering Capability", score: 45, status: "critical" },
                  { domain: "Operational Readiness", score: 64, status: "needs-work" },
                  { domain: "Data Governance", score: 71, status: "adequate" },
                  { domain: "Business Alignment", score: 88, status: "strong" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-md bg-secondary border border-border/50">
                    <span className="text-sm text-foreground">{item.domain}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            item.score >= 75 ? "bg-primary" : item.score >= 55 ? "bg-accent" : "bg-destructive"
                          }`}
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-muted-foreground w-8 text-right">{item.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Session Part Scoring Breakdown */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-serif font-bold text-foreground">Session Scoring Breakdown</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Each diagnostic session part is independently scored, contributing to the overall readiness assessment.
            </p>
            <div className="space-y-3">
              {[
                {
                  part: "Part 1",
                  title: "Context Clarification",
                  score: 78,
                  findings: [
                    "Clear executive sponsorship and defined business objectives",
                    "Success criteria well-articulated but lacks quantitative KPIs",
                    "Use case prioritization needs refinement — 3 competing initiatives identified",
                  ],
                },
                {
                  part: "Part 2",
                  title: "Architecture Deep Dive",
                  score: 52,
                  findings: [
                    "No existing WebRTC infrastructure — greenfield build required",
                    "Current cloud setup supports horizontal scaling but lacks session affinity",
                    "No experience with real-time token streaming or backpressure management",
                  ],
                },
                {
                  part: "Part 3",
                  title: "Governance & Risk",
                  score: 58,
                  findings: [
                    "GDPR-aware but missing voice-specific data retention policies",
                    "No incident response playbook for real-time voice systems",
                    "Vendor risk assessment for OpenAI not yet initiated",
                  ],
                },
                {
                  part: "Part 4",
                  title: "Cost Modeling",
                  score: 65,
                  findings: [
                    "Budget envelope defined but not stress-tested against peak scenarios",
                    "No real-time token metering or cost alerting infrastructure in place",
                    "ROI framework exists at business level but not mapped to technical costs",
                  ],
                },
                {
                  part: "Part 5",
                  title: "Capability Gaps",
                  score: 41,
                  findings: [
                    "Zero in-house WebRTC or real-time voice AI expertise",
                    "DevOps team unfamiliar with TURN/STUN server operations",
                    "No Voice UX design capability — will require external partner",
                  ],
                },
              ].map((item, i) => (
                <div key={i} className="p-5 rounded-lg bg-card border border-border/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-accent tracking-wider uppercase">{item.part}</span>
                      <h4 className="font-sans font-semibold text-foreground text-sm">{item.title}</h4>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-28 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            item.score >= 75 ? "bg-primary" : item.score >= 55 ? "bg-accent" : "bg-destructive"
                          }`}
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                      <span className={`text-sm font-bold w-8 text-right ${
                        item.score >= 75 ? "text-primary" : item.score >= 55 ? "text-accent" : "text-destructive"
                      }`}>
                        {item.score}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1.5 ml-0.5">
                    {item.findings.map((finding, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-muted-foreground">{finding}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Architecture Recommendation */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-serif font-bold text-foreground">Architecture Tier Recommendation</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { tier: "Tier 1", name: "API Relay", fit: false, desc: "Insufficient for regulatory requirements and concurrency targets." },
                { tier: "Tier 2", name: "Managed Infrastructure", fit: true, desc: "Recommended. Balances control, compliance, and implementation velocity." },
                { tier: "Tier 3", name: "Full Sovereign", fit: false, desc: "Premature. Consider after 12 months of Tier 2 operational maturity." },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`p-5 rounded-lg border ${
                    item.fit
                      ? "bg-card border-primary/30 shadow-glow"
                      : "bg-secondary border-border/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground">{item.tier}</span>
                    {item.fit ? (
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">Recommended</span>
                    ) : (
                      <XCircle className="w-4 h-4 text-muted-foreground/50" />
                    )}
                  </div>
                  <h4 className="font-sans font-semibold text-foreground text-sm mb-2">{item.name}</h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Risk Assessment */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-serif font-bold text-foreground">Risk Assessment</h2>
            </div>
            <div className="p-6 rounded-lg bg-card border border-border/50">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left py-3 pr-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Risk</th>
                      <th className="text-left py-3 pr-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Severity</th>
                      <th className="text-left py-3 pr-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Likelihood</th>
                      <th className="text-left py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Mitigation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {[
                      { risk: "Voice data PII exposure in transit", severity: "Critical", likelihood: "Medium", mitigation: "Implement end-to-end encryption via SRTP; avoid server-side audio logging" },
                      { risk: "WebRTC session concurrency failure above 200", severity: "High", likelihood: "High", mitigation: "Deploy regional TURN clusters with auto-scaling; implement circuit breakers" },
                      { risk: "Token cost overrun during peak hours", severity: "Medium", likelihood: "High", mitigation: "Implement token budget caps, real-time cost monitoring, and auto-throttling" },
                      { risk: "Compliance gap: GDPR consent for voice biometrics", severity: "Critical", likelihood: "Low", mitigation: "Deploy explicit consent flows; implement data retention policies; legal review" },
                      { risk: "Single point of failure in STT pipeline", severity: "High", likelihood: "Medium", mitigation: "Multi-provider fallback architecture with health-check routing" },
                    ].map((item, i) => (
                      <tr key={i}>
                        <td className="py-3 pr-4 text-foreground">{item.risk}</td>
                        <td className="py-3 pr-4">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                            item.severity === "Critical" ? "bg-destructive/10 text-destructive" :
                            item.severity === "High" ? "bg-accent/10 text-accent" :
                            "bg-primary/10 text-primary"
                          }`}>
                            {item.severity}
                          </span>
                        </td>
                        <td className="py-3 pr-4 text-muted-foreground">{item.likelihood}</td>
                        <td className="py-3 text-muted-foreground text-xs">{item.mitigation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Governance Gaps */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-serif font-bold text-foreground">Governance Gap Matrix</h2>
            </div>
            <div className="p-6 rounded-lg bg-card border border-border/50">
              <div className="space-y-3">
                {[
                  { area: "Voice Data Retention Policy", current: "No formal policy", required: "Defined retention schedule with automated purge", priority: "P0" },
                  { area: "Real-time Consent Management", current: "Basic web consent banner", required: "Voice-specific opt-in with recording disclosure", priority: "P0" },
                  { area: "Incident Response for Voice Systems", current: "General IT incident process", required: "Voice-specific runbook with escalation paths", priority: "P1" },
                  { area: "Vendor Risk Assessment (OpenAI)", current: "Not completed", required: "Full vendor security questionnaire + DPA review", priority: "P1" },
                  { area: "Internal Access Controls for Audio Data", current: "Role-based (broad)", required: "Least-privilege with audit logging", priority: "P2" },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-md bg-secondary border border-border/50">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-sans font-semibold text-foreground text-sm">{item.area}</h4>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                        item.priority === "P0" ? "bg-destructive/10 text-destructive" :
                        item.priority === "P1" ? "bg-accent/10 text-accent" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {item.priority}
                      </span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-muted-foreground">Current State:</span>
                        <p className="text-foreground mt-0.5">{item.current}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Required State:</span>
                        <p className="text-foreground mt-0.5">{item.required}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Cost Model */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-serif font-bold text-foreground">Three-Scenario Cost Model</h2>
            </div>
            <div className="p-6 rounded-lg bg-card border border-border/50">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left py-3 pr-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Category</th>
                      <th className="text-right py-3 pr-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Conservative</th>
                      <th className="text-right py-3 pr-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Expected</th>
                      <th className="text-right py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Peak</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {[
                      { category: "Monthly Token Costs", conservative: "$4,200", expected: "$12,800", peak: "$34,500" },
                      { category: "Infrastructure (TURN/Media)", conservative: "$1,800", expected: "$4,200", peak: "$11,000" },
                      { category: "Monitoring & Observability", conservative: "$600", expected: "$1,200", peak: "$2,400" },
                      { category: "Compliance & Security Tooling", conservative: "$1,000", expected: "$1,000", peak: "$1,500" },
                      { category: "Total Monthly Run Rate", conservative: "$7,600", expected: "$19,200", peak: "$49,400" },
                    ].map((item, i) => (
                      <tr key={i} className={i === 4 ? "font-semibold" : ""}>
                        <td className="py-3 pr-4 text-foreground">{item.category}</td>
                        <td className="py-3 pr-4 text-right text-muted-foreground">{item.conservative}</td>
                        <td className="py-3 pr-4 text-right text-primary">{item.expected}</td>
                        <td className="py-3 text-right text-muted-foreground">{item.peak}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border/50">
                Based on estimated 50–200 concurrent sessions, average 4-minute duration, using OpenAI Realtime API (gpt-4o-realtime). 
                Infrastructure costs assume AWS us-east-1 with managed TURN via Twilio.
              </p>
            </div>
          </section>

          {/* Capability Gaps */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-serif font-bold text-foreground">Capability Gap Analysis</h2>
            </div>
            <div className="p-6 rounded-lg bg-card border border-border/50">
              <div className="space-y-3">
                {[
                  { skill: "WebRTC Protocol Engineering", current: "None", required: "Advanced", gap: "critical" },
                  { skill: "Real-time Audio Processing", current: "Basic", required: "Intermediate", gap: "moderate" },
                  { skill: "OpenAI Realtime API Integration", current: "None", required: "Advanced", gap: "critical" },
                  { skill: "Token Streaming Architecture", current: "None", required: "Intermediate", gap: "critical" },
                  { skill: "Voice UX Design", current: "None", required: "Intermediate", gap: "critical" },
                  { skill: "Real-time Systems DevOps", current: "Basic", required: "Advanced", gap: "moderate" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-md bg-secondary border border-border/50">
                    <div className="flex-1">
                      <span className="text-sm text-foreground">{item.skill}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="text-muted-foreground w-20 text-right">{item.current}</span>
                      <span className="text-muted-foreground">→</span>
                      <span className="text-foreground w-24">{item.required}</span>
                      <span className={`px-2 py-0.5 rounded font-medium ${
                        item.gap === "critical" ? "bg-destructive/10 text-destructive" : "bg-accent/10 text-accent"
                      }`}>
                        {item.gap}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 rounded-md bg-primary/5 border border-primary/20">
                <h4 className="font-sans font-semibold text-foreground text-sm mb-2">Recommended Resourcing Strategy</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Partner-Assisted Build</strong> — Engage implementation partner for initial Tier 2 build 
                  (estimated 3–4 months), with structured knowledge transfer program to develop internal WebRTC and voice AI 
                  capabilities. Hire 1 senior real-time systems engineer within 60 days to lead internal capability development.
                </p>
              </div>
            </div>
          </section>

          {/* Roadmap */}
          <section className="mb-10">
            <h2 className="text-xl font-serif font-bold text-foreground mb-4">Recommended Implementation Roadmap</h2>
            <div className="space-y-3">
              {[
                { phase: "Phase 1", title: "Foundation", timeline: "Weeks 1–4", items: ["Hire senior real-time engineer", "Complete vendor DPA with OpenAI", "Establish voice data governance policies", "Deploy dev environment with TURN infrastructure"] },
                { phase: "Phase 2", title: "Core Build", timeline: "Weeks 5–12", items: ["Implement WebRTC session management", "Build token streaming pipeline", "Deploy consent and compliance flows", "Integrate monitoring and cost alerting"] },
                { phase: "Phase 3", title: "Hardening", timeline: "Weeks 13–16", items: ["Load testing at target concurrency", "Security penetration testing", "Incident response runbook creation", "Staged rollout to pilot users"] },
                { phase: "Phase 4", title: "Production", timeline: "Weeks 17–20", items: ["Full production deployment", "Knowledge transfer completion", "Operational handoff to internal team", "30-day post-launch support"] },
              ].map((item, i) => (
                <div key={i} className="p-5 rounded-lg bg-card border border-border/50">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">{item.phase}</span>
                    <h4 className="font-sans font-semibold text-foreground text-sm">{item.title}</h4>
                    <span className="text-xs text-muted-foreground ml-auto">{item.timeline}</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-2">
                    {item.items.map((step, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span className="text-xs text-muted-foreground">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Next Steps */}
          <section className="mb-12">
            <div className="p-6 rounded-lg bg-card border border-primary/20 shadow-glow">
              <h3 className="font-serif font-bold text-foreground text-lg mb-3">Recommended Path Forward</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Based on this assessment, we recommend proceeding with a <strong className="text-foreground">Tier 2 Managed Infrastructure</strong> implementation 
                via partner-assisted build. Your diagnostic engagement investment will be credited toward the implementation proposal.
              </p>
              <div className="flex items-center gap-3 p-3 rounded-md bg-secondary border border-border/50">
                <div className="flex-1">
                  <span className="text-sm font-medium text-foreground">Implementation Proposal</span>
                  <p className="text-xs text-muted-foreground mt-0.5">Detailed scope, timeline, and investment for Tier 2 build</p>
                </div>
                <span className="text-xs text-accent font-medium">Available upon request</span>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center py-8 mb-8">
            <p className="text-sm text-muted-foreground mb-4">Ready to receive your own Readiness Summary?</p>
            <Link
              href="/voice-diagnostic/apply"
              className="inline-flex items-center gap-2 bg-chart-1 text-white px-8 py-3.5 rounded-md font-medium text-sm hover:opacity-90 transition-opacity shadow-glow"
            >
              Apply for Your Diagnostic
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default SampleDeliverable;
