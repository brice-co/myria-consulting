import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Voice Capability Comparison | Myria Consulting",
  description:
    "Compare Voice AI implementation approaches—from browser-based voice to real-time WebRTC systems—designed and delivered by Myria Consulting.",
};

const FEATURES = [
  {
    label: "Setup Complexity",
    essential: "Very Low",
    professional: "Low",
    realtime: "Medium",
  },
  {
    label: "Latency",
    essential: "Medium",
    professional: "Low",
    realtime: "Ultra-Low",
  },
  {
    label: "Barge-In / Interruptions",
    essential: "Not supported",
    professional: "Not supported",
    realtime: "Fully supported",
  },
  {
    label: "Voice Naturalness",
    essential: "Good",
    professional: "Very Good",
    realtime: "Excellent",
  },
  {
    label: "Browser Dependency",
    essential: "High",
    professional: "Low",
    realtime: "None",
  },
  {
    label: "Production Readiness",
    essential: "Limited",
    professional: "Production-ready",
    realtime: "Production-grade",
  },
  {
    label: "Ideal Use Case",
    essential: "MVP / Validation",
    professional: "Core Business Flows",
    realtime: "Sales & Support at Scale",
  },
];

export default function VoiceCapabilityComparisonPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-24">
      {/* Header */}
      <section className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Voice Capability Comparison
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Different voice implementations serve different business needs.
          We design the right approach based on experience goals, latency
          requirements, and operational maturity.
        </p>
      </section>

      {/* Context */}
      <section className="mt-10 max-w-3xl text-sm text-muted-foreground">
        <p>
          Voice AI is not one-size-fits-all. Some use cases require fast
          validation, others demand reliability, scale, and natural
          conversational flow.
        </p>
        <p className="mt-3">
          Below is a comparison of the three main voice capability tiers we
          design and implement for our clients.
        </p>
      </section>

      {/* Table */}
      <section className="mt-16 overflow-x-auto">
        <table className="w-full border-collapse rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-white/10">
              <th className="px-4 py-4 text-left text-sm font-medium text-white">
                Feature
              </th>
              <th className="px-4 py-4 text-sm font-medium text-white">
                Essential Voice
              </th>
              <th className="px-4 py-4 text-sm font-medium text-white">
                Professional Voice
              </th>
              <th className="px-4 py-4 text-sm font-medium text-white">
                Realtime Voice
              </th>
            </tr>
          </thead>
          <tbody>
            {FEATURES.map((row) => (
              <tr
                key={row.label}
                className="border-t border-white/10"
              >
                <td className="px-4 py-4 text-sm text-white">
                  {row.label}
                </td>
                <td className="px-4 py-4 text-sm text-muted-foreground">
                  {row.essential}
                </td>
                <td className="px-4 py-4 text-sm text-muted-foreground">
                  {row.professional}
                </td>
                <td className="px-4 py-4 text-sm text-emerald-400 font-medium">
                  {row.realtime}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Interpretation */}
      <section className="mt-20 grid gap-6 md:grid-cols-3">
        <CapabilityCard
          title="Essential Voice"
          description="Best suited for early validation, demos, and low-risk experimentation."
          points={[
            "Browser-based STT/TTS",
            "Minimal infrastructure",
            "Good for proof-of-concept",
          ]}
        />

        <CapabilityCard
          title="Professional Voice"
          description="Designed for real business workflows with better control and reliability."
          points={[
            "Server-assisted processing",
            "Lower latency and better stability",
            "Suitable for production use",
          ]}
        />

        <CapabilityCard
          title="Realtime Voice"
          description="A voice-first system for natural, interruptible conversations at scale."
          points={[
            "WebRTC-based streaming",
            "Barge-in & turn-taking",
            "Sales, support, and high-touch interactions",
          ]}
          highlight
        />
      </section>

      {/* CTA */}
      <section className="mt-24 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <a
          href="/work-with-us/engagement-models"
          className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-6 py-3 text-sm font-medium text-black hover:bg-emerald-400 transition"
        >
          Discuss the Right Voice Approach
        </a>

        
      </section>
    </main>
  );
}

function CapabilityCard({
  title,
  description,
  points,
  highlight,
}: {
  title: string;
  description: string;
  points: string[];
  highlight?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-2xl border p-6",
        highlight
          ? "border-emerald-400/40 bg-emerald-400/10"
          : "border-white/15 bg-white/5",
      ].join(" ")}
    >
      <h3 className="text-lg font-semibold text-white">
        {title}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        {description}
      </p>

      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {points.map((p) => (
          <li key={p}>• {p}</li>
        ))}
      </ul>
    </div>
  );
}
