import { ArchitectureHero } from "./ArchitectureHero";
import { ArchitectureLayers } from "./ArchitectureLayers";
import { ArchitectureTrace } from "./ArchitectureTrace";
import { ArchitecturePatterns } from "./ArchitecturePatterns";
import { OperatingPrinciples } from "./OperatingPrinciples";

export function ArchitecturePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <ArchitectureHero />

      <ArchitectureLayers />

      <ArchitectureTrace />

      <ArchitecturePatterns />

      <OperatingPrinciples />
    </main>
  );
}