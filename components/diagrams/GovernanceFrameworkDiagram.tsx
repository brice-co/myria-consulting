export default function GovernanceFrameworkDiagram() {
  const layers = [
    {
      title: "Human Oversight",
      description:
        "Executive accountability, escalation procedures, and human-in-the-loop safeguards for critical decisions.",
      color: "bg-purple-600/20 border-purple-500/40",
    },
    {
      title: "Risk & Compliance Controls",
      description:
        "Privacy protection, regulatory awareness (GDPR/HIPAA environments), and SOC2-aligned operational practices.",
      color: "bg-blue-600/20 border-blue-500/40",
    },
    {
      title: "Operational Monitoring",
      description:
        "System observability, performance metrics, AI behavior monitoring, and continuous improvement loops.",
      color: "bg-green-600/20 border-green-500/40",
    },
    {
      title: "AI System Architecture",
      description:
        "Voice agents, real-time AI infrastructure, and scalable conversational systems deployed responsibly.",
      color: "bg-emerald-600/20 border-emerald-500/40",
    },
  ];

  return (
    <div className="relative max-w-3xl mx-auto my-16">

      {/* Vertical Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2" />

      <div className="space-y-10">
        {layers.map((layer, index) => (
          <div
            key={index}
            className={`relative border rounded-xl p-6 backdrop-blur ${layer.color}`}
          >
            <h3 className="text-lg font-semibold mb-2">{layer.title}</h3>
            <p className="text-sm text-white/70 leading-relaxed">
              {layer.description}
            </p>

            {/* Connector Dot */}
            <div className="absolute left-1/2 -top-5 w-4 h-4 bg-primary rounded-full -translate-x-1/2 border border-white/20" />
          </div>
        ))}
      </div>
    </div>
  );
}