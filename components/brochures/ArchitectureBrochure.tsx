"use client";

import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#0b0b0b",
    color: "#ffffff",
    paddingTop: 56,
    paddingBottom: 56,
    paddingHorizontal: 48,
    fontSize: 11,
    lineHeight: 1.6,
    position: "relative",
  },

  // Cover
  cover: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    textAlign: "center",
  },
  logo: { width: 120, height: 40, marginBottom: 24, objectFit: "contain" },
  coverTitle: { fontSize: 32, fontWeight: 700, marginBottom: 16, color: "#10b981" },
  coverSubtitle: { fontSize: 16, color: "#d1d5db", marginBottom: 12 },
  coverTagline: { fontSize: 11, color: "#9ca3af", marginTop: 24 },

  // Headers
  header: { marginBottom: 32 },
  title: { fontSize: 24, fontWeight: 600, marginBottom: 6, color: "#10b981" },
  sectionLine: { height: 2, backgroundColor: "#3b82f6", marginBottom: 16, width: 60 },
  subtitle: { fontSize: 12, color: "#d1d5db", marginBottom: 8 },

  section: {
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "flex-start",
  },

  sidebar: {
    width: 6,
    marginRight: 12,
    backgroundColor: "#10b981", // Emerald accent for sidebar bar
    borderRadius: 2,
  },

  sectionContent: { flex: 1 },
  sectionTitle: { fontSize: 14, fontWeight: 600, marginBottom: 6, color: "#3b82f6" }, // Blue accent
  paragraph: { color: "#d1d5db", marginBottom: 12 },

  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#10b981",
    color: "#10b981",
    textAlign: "center",
    fontSize: 12,
    lineHeight: 24,
    marginBottom: 6,
  },

  bullet: { marginBottom: 6, paddingLeft: 12 },

  callout: {
    borderLeft: "3 solid #3b82f6",
    paddingLeft: 14,
    marginTop: 16,
    marginBottom: 16,
  },
  calloutText: { fontSize: 11, color: "#e5e7eb" },

  footer: {
    position: "absolute",
    bottom: 40,
    left: 48,
    right: 48,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 9,
    color: "#9ca3af",
  },
});

const ARCHITECTURE_FLOW = [
  {
    number: "01",
    title: "User Interface Layer",
    description:
      "Voice entry begins at the edge — browser, phone, embedded device, or application interface.",
    points: [
      "WebRTC or telephony integration",
      "Speech-to-Text processing",
      "Interrupt & barge-in handling",
      "Session state initialization",
    ],
  },
  {
    number: "02",
    title: "Orchestration Layer",
    description:
      "Coordinates conversation state, intent routing, and system boundaries.",
    points: [
      "Conversation memory management",
      "Intent classification & routing",
      "Workflow trigger mapping",
      "Fallback & guardrail logic",
    ],
  },
  {
    number: "03",
    title: "Reasoning & Intelligence Layer",
    description:
      "LLM-based reasoning augmented with structured business logic and deterministic controls.",
    points: [
      "Prompt engineering & context injection",
      "Tool selection & validation",
      "Hybrid rule-based + AI logic",
      "Confidence scoring & escalation rules",
    ],
  },
  {
    number: "04",
    title: "Secure Tool Execution Layer",
    description:
      "All external actions execute server-side with validation, logging, and permission boundaries.",
    points: [
      "CRM & database access",
      "Calendar & scheduling systems",
      "Internal APIs & microservices",
      "Structured audit logging",
    ],
  },
  {
    number: "05",
    title: "Observability & Governance Layer",
    description:
      "Continuous monitoring ensures reliability, compliance, and long-term scalability.",
    points: [
      "Structured event logging",
      "Latency & performance tracking",
      "Conversation quality analysis",
      "Versioning & deployment control",
    ],
  },
];

export function ExecutiveArchitectureBrochurePDF() {
  return (
    <Document>
      {/* Cover Page */}
      <Page size="A4" style={styles.page}>
        <View style={styles.cover}>
          <Image src="/Myria.png" style={styles.logo} />
          <Text style={styles.coverTitle}>Myria Consulting</Text>
          <Text style={styles.coverSubtitle}>Scalable AI Platforms</Text>
          <Text style={styles.coverSubtitle}>Architecture & Technology Overview</Text>
          <Text style={styles.coverTagline}>Confidential · © {new Date().getFullYear()}</Text>
        </View>
        <Text style={styles.footer}>Page 1</Text>
      </Page>

      {/* Executive Summary */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Executive Summary</Text>
          <View style={styles.sectionLine} />
        </View>

        <View style={styles.section}>
          <View style={styles.sidebar} />
          <View style={styles.sectionContent}>
            <Text style={styles.paragraph}>
              AI initiatives are often approached as isolated features. We treat AI as a platform investment,
              focusing on scalability, security, and operational reliability across the enterprise.
            </Text>
            <Text style={styles.paragraph}>
              Our design philosophy emphasizes real-time interaction, layered architecture, and multi-tenant isolation,
              ensuring platforms remain robust as business needs evolve.
            </Text>

            <View style={styles.callout}>
              <Text style={styles.calloutText}>
                "Successful AI platforms combine strategic architecture with operational rigor,
                enabling sustainable innovation and measurable business outcomes."
              </Text>
            </View>

            <Text style={styles.paragraph}>
              This brochure provides an executive overview of design principles, architectural philosophy,
              and expected business outcomes.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>Myria Consulting</Text>
          <Text>Page 2 · Executive Summary</Text>
        </View>
      </Page>

      {/* Architecture Flow */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Architecture Flow</Text>
        <View style={styles.sectionLine} />

        {ARCHITECTURE_FLOW.map((layer) => (
          <View key={layer.number} style={styles.section}>
            <View style={styles.sidebar} />
            <View style={styles.sectionContent}>
              <Text style={styles.circle}>{layer.number}</Text>
              <Text style={styles.sectionTitle}>{layer.title}</Text>
              <Text style={styles.paragraph}>{layer.description}</Text>
              {layer.points.map((point, i) => (
                <Text key={i} style={styles.bullet}>
                  • {point}
                </Text>
              ))}
            </View>
          </View>
        ))}

        <View style={styles.footer}>
          <Text>Myria Consulting</Text>
          <Text>Page 3 · Architecture Flow</Text>
        </View>
      </Page>

      {/* System Principles / CTA */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>System Principles & Best Practices</Text>
        <View style={styles.sectionLine} />

        <View style={styles.section}>
          <View style={styles.sidebar} />
          <View style={styles.sectionContent}>
            <Text style={styles.paragraph}>
              Every layer is intentionally isolated. Execution is server-side. Observability is structured.
              Governance is embedded — not bolted on.
            </Text>
            <Text style={styles.paragraph}>
              This ensures voice agents remain predictable, auditable, and adaptable as your organization grows.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sidebar} />
          <View style={styles.sectionContent}>
            <Text style={styles.sectionTitle}>Key Principles</Text>
            <Text style={styles.bullet}>• Real-time interaction at the core</Text>
            <Text style={styles.bullet}>• Clear separation: interface, intelligence, tools</Text>
            <Text style={styles.bullet}>• Multi-tenant by default</Text>
            <Text style={styles.bullet}>• Security enforced at all layers</Text>
            <Text style={styles.bullet}>• Observability & auditability embedded</Text>
            <Text style={styles.bullet}>• Designed for evolution and extensibility</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sidebar} />
          <View style={styles.sectionContent}>
            <Text style={styles.sectionTitle}>Next Steps / CTA</Text>
            <Text style={styles.paragraph}>
              Discuss your architecture with Myria Consulting to ensure your AI platform is scalable,
              secure, and built for long-term success.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>Myria Consulting</Text>
          <Text>Page 4 · System Principles</Text>
        </View>
      </Page>
    </Document>
  );
}
