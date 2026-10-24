import { publicPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

import { AIEnablementHero } from "@/components/ai-enablement/ai-enablement-hero";
import { ArchitectureExperience } from "@/components/ai-enablement/architecture-experience";
import { AutonomyScale } from "@/components/ai-enablement/autonomy-scale";
import { OperatingLoop } from "@/components/ai-enablement/operating-loop";
import { OperatingModelPath } from "@/components/ai-enablement/operating-model-path";

export const metadata = publicPageMetadata({"title":"AI Enablement Architecture | Myria Consulting","description":"Understand how AI-enabled operating capabilities connect decisions, processes, systems, people, data and governance.","pathname":"/ai-enablement","index":true});

export default function AIEnablementPage() {
  return (
    <main className="min-h-screen bg-[#f7f3ec] text-[#17313a]">
      <AIEnablementHero />

      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-8 lg:px-10">
        <ArchitectureExperience />
        <OperatingLoop />
        <AutonomyScale />
        <OperatingModelPath />
      </section>
    </main>
  );
}
