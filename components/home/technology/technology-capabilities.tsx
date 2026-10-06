import { technologyCapabilities } from "./data/technologies";
import { TechnologyCapabilityCard } from "./technology-capability-card";

export function TechnologyCapabilities() {
  return (
    <div className="grid gap-y-10 md:grid-cols-2 lg:grid-cols-5">
      {technologyCapabilities.map(
        (capability, index) => (
          <TechnologyCapabilityCard
            key={capability.id}
            capability={capability}
            index={index}
          />
        ),
      )}
    </div>
  );
}