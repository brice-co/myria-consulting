import {
  Zap,
  Cpu,
  Shield,
  Globe,
  Headphones,
  Code,
  Sparkles,
  Badge,
  
} from "lucide-react";

const features = [
  {
    icon: Headphones,
    title: "Voice-First Design",
    description:
      "We design conversations, latency paths, and interruption handling specifically for voice — not adapted from chat.",
  },
  {
    icon: Zap,
    title: "Low-Latency Architectures",
    description:
      "From browser-based voice to realtime WebRTC pipelines, we choose the right stack to match performance and budget.",
  },
  {
    icon: Cpu,
    title: "Best-in-Class AI Models",
    description:
      "Provider-agnostic expertise across OpenAI Realtime, OpenAI STT/TTS, ElevenLabs, Deepgram, and hybrid stacks.",
  },
  {
    icon: Code,
    title: "Custom-Built, Not Generic",
    description:
      "Every voice agent is tailored to your workflows, systems, and business logic — no black-box platforms.",
  },
  {
    icon: Shield,
    title: "Production & Enterprise Ready",
    description:
      "Security, isolation, logging, and compliance are built in from day one — not added later.",
  },
  {
    icon: Globe,
    title: "Designed to Scale with You",
    description:
      "Start with a focused use case, evolve into a broader voice strategy as adoption and trust grow.",
  },
];


const Features = () => {
  return (
    <section id="features" className="py-24 relative bg-background overflow-x-hidden">
      {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 px-4 py-2 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2 inline" />
              Custom AI Solutions
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-foreground">Voice-First AI </span>
              <span className="bg-gradient-to-r from-violet-500 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
                Solutions
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              We design and build production-grade voice systems — from first prototype to real-world deployment.
            </p>
            
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group p-8 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      
    </section>
  );
};

export default Features;
