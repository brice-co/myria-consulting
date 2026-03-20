import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Svg,
  Circle,
  Path,
  Rect,
  Image,
} from "@react-pdf/renderer";

const colors = {
  bg: "#0a0e1a",
  card: "#111827",
  cardBorder: "#1f2937",
  primary: "#6d5bef",
  primaryLight: "#8b7cf6",
  text: "#f1f5f9",
  muted: "#94a3b8",
  accent: "#38bdf8",
};

const s = StyleSheet.create({
  page: {
    backgroundColor: colors.bg,
    padding: 40,
    fontFamily: "Helvetica",
    color: colors.text,
  },
  // Cover
  coverPage: {
    backgroundColor: colors.bg,
    padding: 40,
    fontFamily: "Helvetica",
    color: colors.text,
    justifyContent: "center",
    alignItems: "center",
  },
  coverIcon: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: "rgba(109,91,239,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  coverLabel: {
    fontSize: 10,
    color: colors.primary,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 3,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  coverTitle: {
    fontSize: 36,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 1.2,
  },
  gradientText: {
    color: colors.primaryLight,
  },
  coverDesc: {
    fontSize: 12,
    color: colors.muted,
    textAlign: "center",
    maxWidth: 400,
    lineHeight: 1.6,
    marginBottom: 24,
  },
  badgeRow: {
    flexDirection: "row",
    gap: 16,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  badgeText: {
    fontSize: 8,
    color: colors.muted,
  },
  // Section headers

  logo: {
  width: 120,          // Adjust size
  height: 40,          // Keep aspect ratio or set height accordingly
  marginBottom: 24,    // Space below logo
  objectFit: "contain" // Ensures logo scales nicely
  },

  sectionLabel: {
    fontSize: 9,
    color: colors.primary,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    marginBottom: 6,
  },
  sectionDesc: {
    fontSize: 10,
    color: colors.muted,
    marginBottom: 20,
    lineHeight: 1.5,
  },
  // Cards grid
  grid2: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  grid3: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  cardHalf: {
    width: "48%",
    backgroundColor: colors.card,
    borderRadius: 8,
    border: `1 solid ${colors.cardBorder}`,
    padding: 14,
    marginBottom: 4,
  },
  cardThird: {
    width: "31%",
    backgroundColor: colors.card,
    borderRadius: 8,
    border: `1 solid ${colors.cardBorder}`,
    padding: 14,
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 8.5,
    color: colors.muted,
    lineHeight: 1.5,
  },
  // Icon placeholder
  iconBox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: "rgba(109,91,239,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  iconDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  // Pipeline
  pipelineContainer: {
    backgroundColor: colors.card,
    borderRadius: 8,
    border: `1 solid ${colors.cardBorder}`,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pipelineStep: {
    alignItems: "center",
    width: "18%",
  },
  pipelineCircle: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "rgba(109,91,239,0.15)",
    border: `1 solid rgba(109,91,239,0.3)`,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  pipelineNum: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: colors.primary,
  },
  pipelineLabel: {
    fontSize: 7,
    color: colors.muted,
    textAlign: "center",
  },
  pipelineArrow: {
    fontSize: 14,
    color: "rgba(109,91,239,0.4)",
  },
  // Tech list
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  listBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  listText: {
    fontSize: 9,
    color: colors.muted,
  },
  // CTA
  ctaBox: {
    backgroundColor: colors.card,
    borderRadius: 8,
    border: `1 solid ${colors.cardBorder}`,
    padding: 30,
    alignItems: "center",
    marginTop: 20,
  },
  ctaTitle: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    marginBottom: 8,
  },
  ctaDesc: {
    fontSize: 10,
    color: colors.muted,
    textAlign: "center",
    maxWidth: 350,
    lineHeight: 1.5,
    marginBottom: 12,
  },
  ctaEmail: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: colors.primary,
  },
  // Footer
  footer: {
    fontSize: 8,
    color: colors.muted,
    textAlign: "center",
    marginTop: "auto",
    paddingTop: 20,
  },

  tierCard: {
  width: "31%",
  backgroundColor: colors.card,
  borderRadius: 10,
  border: `1 solid ${colors.cardBorder}`,
  padding: 16,
},

tierHeader: {
  fontSize: 12,
  fontFamily: "Helvetica-Bold",
  marginBottom: 6,
},

tierSub: {
  fontSize: 8,
  color: colors.primary,
  marginBottom: 8,
},

tierDesc: {
  fontSize: 8.5,
  color: colors.muted,
  marginBottom: 10,
  lineHeight: 1.4,
},

tierFeature: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 4,
},

tierFeatureText: {
  fontSize: 8,
  color: colors.muted,
  marginLeft: 6,
},
});

const capabilities = [
  { 
    title: "AI Voice Support Agents", 
    desc: "24/7 AI-powered voice agents that resolve Tier 1 inquiries, reduce hold times, and deflect up to 70% of inbound calls." 
  },
  { 
    title: "Agent Assist (Real-Time)", 
    desc: "Live call guidance, suggested responses, knowledge retrieval, and automated summaries for human agents." 
  },
  { 
    title: "CRM & Helpdesk Integrations", 
    desc: "Deep integrations with Salesforce, Zendesk, HubSpot, and custom APIs for seamless ticketing and data sync." 
  },
  { 
    title: "Omnichannel Automation", 
    desc: "Unified AI across voice, chat, email, and SMS delivering consistent support experiences." 
  },
  { 
    title: "Intelligent Case Routing", 
    desc: "AI-powered triage and sentiment detection to route tickets to the right team instantly." 
  },
  { 
    title: "Workflow Automation", 
    desc: "Automate refunds, order updates, appointment scheduling, and account actions securely." 
  },
];

const tiers = [
  {
    name: "Tier I — Foundation",
    subtitle: "Voice Pilot Deployment",
    description:
      "Ideal for organizations validating voice-first AI within a focused business function.",
    features: [
      "Single Voice Agent",
      "OpenAI Realtime + ElevenLabs",
      "Basic CRM / Calendar integration",
      "Secure hosting",
      "Core analytics dashboard",
    ],
  },
  {
    name: "Tier II — Acceleration",
    subtitle: "Multi-Agent Expansion",
    description:
      "Designed for operational scaling across departments and advanced workflows.",
    features: [
      "Multi-agent orchestration",
      "Intent routing & escalation",
      "Workflow automation layer",
      "Role-based access control",
      "Advanced observability & logging",
    ],
  },
  {
    name: "Tier III — Enterprise Platform",
    subtitle: "Strategic AI Infrastructure",
    description:
      "Full AI-first platform with governance, compliance, and multi-tenant architecture.",
    features: [
      "Enterprise-grade multi-tenant core",
      "Custom LLM pipelines",
      "Compliance architecture (SOC 2 Mindset)",
      "SIP / PSTN telephony integration",
      "Continuous optimization & scaling",
    ],
  },
];

const useCases = [
  { 
    title: "24/7 Customer Support Automation", 
    desc: "Resolve order status, password resets, billing questions, and FAQs instantly without human escalation." 
  },
  { 
    title: "Global Multilingual Support", 
    desc: "Real-time translation and localized AI support across 30+ languages for global customer bases." 
  },
  { 
    title: "Secure & SOC 2-Aligned Operations", 
    desc: "Enterprise-grade security practices including data encryption, role-based access, audit logging, and PII protection." 
  },
];

const voiceAgentTools = [
  {
    category: "CRM & Customer Data",
    items: [
      "Customer lookup & verification",
      "Ticket creation & updates",
      "Call summaries & notes",
      "Account modification",
    ],
  },
  {
    category: "Helpdesk & Case Management",
    items: [
      "Intent classification",
      "Sentiment-based prioritization",
      "Smart routing",
      "Automated escalations",
    ],
  },
  {
    category: "E-Commerce & Payments",
    items: [
      "Order lookup & tracking",
      "Refund processing",
      "Subscription updates",
      "Payment verification",
    ],
  },
  {
    category: "Knowledge & Policy Systems",
    items: [
      "Semantic policy retrieval",
      "Dynamic FAQ generation",
      "SOP enforcement",
      "Internal documentation search",
    ],
  },
  {
    category: "Scheduling & Booking",
    items: [
      "Check availability",
      "Book & reschedule appointments",
      "Calendar sync",
      "Confirmation notifications",
    ],
  },
  {
    category: "Security & Compliance",
    items: [
      "Role-based access control",
      "PII redaction",
      "Audit logging",
      "Consent capture",
    ],
  },
];

const pipelineSteps = ["User (Voice/Text)", "Voice Engine", "AI Orchestrator", "Tool Layer", "Response"];

const CheckIcon = () => (
  <Svg width={8} height={8} viewBox="0 0 24 24">
    <Circle cx="12" cy="12" r="12" fill={colors.primary} />
    <Path d="M9 12l2 2 4-4" stroke="white" strokeWidth={2.5} fill="none" />
  </Svg>
);

// Lucide SVG icon paths for PDF rendering
const PdfIcon = ({ paths }: { paths: string[] }) => (
  <Svg width={16} height={16} viewBox="0 0 24 24">
    {paths.map((d, i) => (
      <Path key={i} d={d} stroke={colors.primaryLight} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    ))}
  </Svg>
);

// Mic icon
const MicIcon = () => <PdfIcon paths={["M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z", "M19 10v2a7 7 0 0 1-14 0v-2", "M12 19v3"]} />;
// Brain icon
const BrainIcon = () => <PdfIcon paths={["M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z", "M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z", "M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4", "M12 18v-5.5"]} />;
// Plug icon (MCP)
const PlugIcon = () => <PdfIcon paths={["M12 22v-5", "M9 8V2", "M15 8V2", "M18 8v5a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8Z"]} />;
// Users icon
const UsersIcon = () => <PdfIcon paths={["M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", "M9 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z", "M22 21v-2a4 4 0 0 0-3-3.87", "M16 3.13a4 4 0 0 1 0 7.75"]} />;
// Cpu icon
const CpuIcon = () => <PdfIcon paths={["M6 6h12v12H6z", "M6 12H2", "M22 12h-4", "M12 2v4", "M12 18v4", "M9 2v2", "M15 2v2", "M9 20v2", "M15 20v2", "M2 9h2", "M2 15h2", "M20 9h2", "M20 15h2"]} />;
// Workflow (Zap) icon
const WorkflowIcon = () => <PdfIcon paths={["M13 2 3 14h9l-1 8 10-12h-9l1-8z"]} />;
// Phone icon
const PhoneIcon = () => <PdfIcon paths={["M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"]} />;
// Globe icon
const GlobeIcon = () => <PdfIcon paths={["M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z", "M2 12h20", "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z"]} />;
// Shield icon
const ShieldIcon = () => <PdfIcon paths={["M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"]} />;

const capabilityIcons = [MicIcon, BrainIcon, PlugIcon, UsersIcon, CpuIcon, WorkflowIcon];
const useCaseIcons = [PhoneIcon, GlobeIcon, ShieldIcon];

// Static voice waveform for PDF cover using View-based bars
const waveBarHeights = [0.3, 0.5, 0.8, 0.45, 0.95, 0.6, 0.85, 0.4, 0.7, 1, 0.55, 0.9, 0.35, 0.75, 0.5, 0.85, 0.65, 0.95, 0.4, 0.7, 0.55, 0.9, 0.3, 0.8, 0.6, 0.45, 0.95, 0.5, 0.7, 0.85, 0.4, 0.6, 0.9, 0.35, 0.75, 0.55, 0.8, 0.45, 0.65, 0.3];
const PdfVoiceWaveform = () => {
  const maxHeight = 30;
  return (
    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 20, gap: 2, height: maxHeight }}>
      {waveBarHeights.map((h, i) => (
        <View
          key={i}
          style={{
            width: 3,
            height: h * maxHeight,
            borderRadius: 1.5,
            backgroundColor: colors.primaryLight,
            opacity: 0.5 + h * 0.5,
          }}
        />
      ))}
    </View>
  );
};

const BrochurePDF = () => (
  <Document>
    {/* Page 1: Cover */}
    <Page size="A4" style={s.coverPage}>
      <Image src="/Myria.png" style={s.logo} />
      <Text style={s.coverLabel}>Myria Consulting</Text>
      <Text style={s.coverTitle}>
        Voice-First{" "}
        <Text style={s.gradientText}>AI Solutions</Text>
      </Text>
      <PdfVoiceWaveform />
      <Text style={s.coverDesc}>
        AI-powered voice and omnichannel support systems that transform
        customer service operations, reduce costs, and elevate customer experience.
      </Text>
      <View style={s.badgeRow}>
        {["Enterprise-Grade", "SOC 2 Mindset", "Sub-300ms Latency"].map((b) => (
          <View key={b} style={s.badge}>
            <CheckIcon />
            <Text style={s.badgeText}>{b}</Text>
          </View>
        ))}
      </View>
      <Text style={s.footer}>© 2025 Myria Consulting. All rights reserved.
</Text>
    </Page>

    {/* Page 2: Capabilities */}
    <Page size="A4" style={s.page}>
      <Text style={s.sectionLabel}>What We Build</Text>
      <Text style={s.sectionTitle}>
        Core <Text style={s.gradientText}>Capabilities</Text>
      </Text>
      <Text style={s.sectionDesc}>
        End-to-end AI solutions designed for production environments, not prototypes.
      </Text>
      <View style={s.grid2}>
        {capabilities.map((cap, i) => {
          const IconComp = capabilityIcons[i];
          return (
          <View key={cap.title} style={s.cardHalf}>
            <View style={s.iconBox}>
              <IconComp />
            </View>
            <Text style={s.cardTitle}>{cap.title}</Text>
            <Text style={s.cardDesc}>{cap.desc}</Text>
          </View>
          );
        })}
      </View>
      <Text style={s.footer}>© 2025 Myria Consulting. All rights reserved.
</Text>
    </Page>

    {/* ARCHITECTURE DIAGRAM PAGE */}
<Page size="A4" style={s.page}>
  <Text style={s.sectionLabel}>TECHNICAL ARCHITECTURE</Text>
  <Text style={s.sectionTitle}>
    Production-Grade Voice Platform
  </Text>
  <Text style={s.sectionDesc}>
    Secure WebRTC streaming, multi-tenant isolation, server-side governance,
    and enterprise-grade observability.
  </Text>

  <Image
    src="/diagrams/myria-multi-tenants-architecture.png"
    style={{
      width: "100%",
      marginTop: 20,
      borderRadius: 12,
    }}
  />

  <Text style={s.footer}>
    © 2025 Myria Consulting. All rights reserved.
  </Text>
</Page>

{/* Page X: Implementation Model */}
<Page size="A4" style={s.page}>
  <Text style={s.sectionLabel}>Engagement Approach</Text>
  <Text style={s.sectionTitle}>
    3-Tier <Text style={s.gradientText}>Implementation Model</Text>
  </Text>
  <Text style={s.sectionDesc}>
    Structured delivery model allowing enterprises to start lean,
    scale intelligently, and evolve into a fully governed AI platform.
  </Text>

  <View style={s.grid3}>
    {tiers.map((tier) => (
      <View key={tier.name} style={s.tierCard}>
        <Text style={s.tierHeader}>{tier.name}</Text>
        <Text style={s.tierSub}>{tier.subtitle}</Text>
        <Text style={s.tierDesc}>{tier.description}</Text>

        {tier.features.map((feature) => (
          <View key={feature} style={s.tierFeature}>
            <View style={s.listBullet} />
            <Text style={s.tierFeatureText}>{feature}</Text>
          </View>
        ))}
      </View>
    ))}
  </View>

  <Text style={s.footer}>© 2025 Myria Consulting. All rights reserved.
</Text>
</Page>

    {/* Page 4: Use Cases & CTA */}
    <Page size="A4" style={s.page}>
      <Text style={s.sectionLabel}>Real-World Impact</Text>
      <Text style={s.sectionTitle}>
        Use <Text style={s.gradientText}>Cases</Text>
      </Text>
      <View style={s.grid3}>
        {useCases.map((uc, i) => {
          const IconComp = useCaseIcons[i];
          return (
          <View key={uc.title} style={s.cardThird}>
            <View style={s.iconBox}>
              <IconComp />
            </View>
            <Text style={s.cardTitle}>{uc.title}</Text>
            <Text style={s.cardDesc}>{uc.desc}</Text>
          </View>
          );
        })}
      </View>
      <View style={s.ctaBox}>
        <Text style={s.ctaTitle}>Let's Build Together</Text>
        <Text style={s.ctaDesc}>
          Whether you need a single voice agent or a full multi-agent platform,
          we deliver production-ready AI solutions tailored to your business.
        </Text>
        <Text style={s.ctaEmail}>info@myriaconsulting.com</Text>
      </View>
      <Text style={s.footer}>© 2025 Myria Consulting. All rights reserved.
</Text>
    </Page>
  </Document>
);

export default BrochurePDF;
