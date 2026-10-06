import { experiences } from "./data/experiences";

import { ExperienceCarousel } from "./experience-carousel";
import { ExperienceFooter } from "./experience-footer";
import { ExperienceHeader } from "./experience-header";

export function ExperienceGallery() {
  return (
    <section className="bg-[#f8f5ef] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <ExperienceHeader />

        <div className="mt-16 lg:mt-20">
          <ExperienceCarousel
            experiences={experiences}
          />
        </div>

        <ExperienceFooter />
      </div>
    </section>
  );
}