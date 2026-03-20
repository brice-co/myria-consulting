"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#0b0b0b",
    color: "#ffffff",
    paddingTop: 56,
    paddingBottom: 56,
    paddingHorizontal: 48,
    fontSize: 11,
    lineHeight: 1.6,
  },

  header: {
    marginBottom: 40,
  },

  logo: {
  width: 120,          // Adjust size
  height: 40,          // Keep aspect ratio or set height accordingly
  marginBottom: 24,    // Space below logo
  objectFit: "contain" // Ensures logo scales nicely
},

  eyebrow: {
    fontSize: 9,
    letterSpacing: 1.2,
    color: "#9ca3af",
    textTransform: "uppercase",
    marginBottom: 6,
  },

  cover: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    textAlign: "center",
  },

  coverTitle: {
    fontSize: 32,
    fontWeight: 700,
    marginBottom: 16,
  },

  coverSubtitle: {
    fontSize: 16,
    color: "#d1d5db",
    marginBottom: 12,
  },

  coverTagline: {
    fontSize: 11,
    color: "#9ca3af",
    marginTop: 24,
  },

  title: {
    fontSize: 26,
    fontWeight: 600,
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 13,
    color: "#d1d5db",
    maxWidth: 480,
    marginBottom: 16,
  },

  divider: {
    height: 1,
    backgroundColor: "#1f2933",
    marginVertical: 28,
  },

  section: {
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 10,
  },

  paragraph: {
    color: "#d1d5db",
    marginBottom: 12,
    maxWidth: 460,
  },

  callout: {
    borderLeft: "2 solid #374151",
    paddingLeft: 14,
    marginTop: 16,
    marginBottom: 16,
  },

  calloutText: {
    fontSize: 11,
    color: "#e5e7eb",
  },

  grid: {
    display: "flex",
    flexDirection: "row",
    gap: 24,
    marginTop: 12,
  },

  column: {
    flex: 1,
  },

  bullet: {
    marginBottom: 6,
    color: "#d1d5db",
  },

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

export function TechnologyBrochure() {
  return (
    <Document>
      {/* Page 0 - Cover Page */}
      <Page size="A4" style={styles.page}>
        <View style={styles.cover}>
          <Image src="/Myria.png" style={styles.logo} />
          <Text style={styles.coverTitle}>Myria Consulting</Text>
          <Text style={styles.coverSubtitle}>Scalable AI Platforms</Text>
          <Text style={styles.coverSubtitle}>Technology & Architecture Overview</Text>
          <Text style={styles.coverTagline}>Confidential · © {new Date().getFullYear()}</Text>
        </View>
      </Page>


      {/* Page 1 - Executive Summary */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Technology Perspective</Text>
          <Text style={styles.title}>Designing Scalable AI Platforms</Text>
          <Text style={styles.subtitle}>
            A systems-driven approach to building secure, real-time, multi-tenant AI platforms
            designed for long-term ownership. This brochure provides an executive overview
            of the principles, architecture, and business impact of such platforms.
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Executive Summary</Text>

          <Text style={styles.paragraph}>
            In today’s enterprise landscape, AI is often approached as a series of point solutions.
            Features are added piecemeal, with minimal attention to long-term scalability, security,
            or governance. This results in fragmented systems, operational risks, and inconsistent
            user experiences.
          </Text>

          <Text style={styles.paragraph}>
            Our approach treats AI as an **integrated platform investment**. By considering the
            end-to-end system — from voice and realtime interfaces to core orchestration, data
            integrity, and multi-tenant architecture — we design platforms that are robust, adaptable,
            and future-proof.
          </Text>

          <Text style={styles.paragraph}>
            Key benefits of this approach include predictable performance, strong security posture,
            operational observability, and reduced risk for enterprise deployments. By aligning
            platform design with business strategy, organizations can scale AI initiatives
            confidently and sustainably.
          </Text>

          <View style={styles.callout}>
            <Text style={styles.calloutText}>
              "Successful AI platforms combine strategic architecture with operational rigor, enabling
              sustainable innovation and measurable business outcomes."
            </Text>
          </View>

          <Text style={styles.paragraph}>
            This brochure summarizes the design principles, architecture philosophy,
            and business outcomes associated with building world-class AI platforms.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text>Myria Consulting</Text>
          <Text>Confidential · Technology Perspective</Text>
        </View>
      </Page>

      {/* Page 2 - Platform Principles */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Platform Design Principles</Text>

          <View style={styles.grid}>
            <View style={styles.column}>
              <Text style={styles.bullet}>
                • Real-time interaction as the core experience, not batch processing
              </Text>
              <Text style={styles.bullet}>
                • Separation of interface, intelligence, and tools for clarity
              </Text>
              <Text style={styles.bullet}>
                • Multi-tenant architecture built from the ground up
              </Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.bullet}>
                • Security enforced at every layer, not as an afterthought
              </Text>
              <Text style={styles.bullet}>
                • Observability and auditability across all system components
              </Text>
              <Text style={styles.bullet}>
                • Design for evolution: platforms that adapt without rework
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Architecture Philosophy</Text>
          <Text style={styles.paragraph}>
            Modern AI platforms require a layered architecture. Voice interfaces,
            real-time reasoning, orchestration, and tools all operate in concert while
            maintaining strict security and privacy boundaries.
          </Text>
          <Text style={styles.paragraph}>
            Intelligence must be orchestrated server-side, ephemeral sessions protect sensitive
            data, and role-based access controls ensure enterprise-grade governance.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text>Myria Consulting</Text>
          <Text>Confidential · Technology Perspective</Text>
        </View>
      </Page>

      {/* Page 3 - Business Outcomes */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Business Outcomes Enabled</Text>

          <View style={styles.grid}>
            <View style={styles.column}>
              <Text style={styles.bullet}>• Accelerated deployment of AI use cases</Text>
              <Text style={styles.bullet}>• Reduced operational and compliance risk</Text>
              <Text style={styles.bullet}>• Clear platform ownership and governance</Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.bullet}>• Consistent and reliable user experience</Text>
              <Text style={styles.bullet}>• Long-term extensibility for evolving needs</Text>
              <Text style={styles.bullet}>• Enterprise-grade trust and resilience</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.paragraph}>
              By focusing on platform-level design, organizations can confidently scale AI capabilities,
              mitigate risk, and achieve measurable outcomes. Each layer of the platform is designed
              to support business strategy, operational efficiency, and innovation over the long term.
            </Text>

            <Text style={styles.paragraph}>
              This executive brochure provides the foundation for understanding
              how Myria Consulting approaches AI platform design, enabling informed
              decision-making and alignment across leadership teams.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text>Myria Consulting</Text>
          <Text>Confidential · Technology Perspective</Text>
        </View>
      </Page>

    </Document>
  );
}
