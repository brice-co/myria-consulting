import type { AdvisoryLab } from "@/data/labs";

import { LabAdvisorsSection } from "./lab-advisors-section";
import { LabChallengesSection } from "./lab-challenges-section";
import { LabExploreSection } from "./lab-explore-section";
import { LabOutcomesSection } from "./lab-outcomes-section";
import { LabPortalCta } from "./lab-portal-cta";
import { LabProcessSection } from "./lab-process-section";
import { LabPublicHero } from "./lab-public-hero";

type LabPublicExperienceProps = {
  lab: AdvisoryLab;
};

export function LabPublicExperience({
  lab,
}: LabPublicExperienceProps) {
  return (
    <main>
      <LabPublicHero
        title={lab.title}
        tagline={lab.tagline}
        description={lab.description}
      />

      <LabChallengesSection
        challenges={lab.challenges}
      />

      <LabExploreSection
        explore={lab.explore}
      />

      <LabProcessSection
        stages={lab.stages}
      />

      <LabAdvisorsSection
        advisors={lab.advisors}
      />

      <LabOutcomesSection
        outcomes={lab.outcomes}
      />

      <LabPortalCta
        title={lab.title}
        slug={lab.slug}
      />
    </main>
  );
}