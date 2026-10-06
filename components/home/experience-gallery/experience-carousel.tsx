"use client";

import { ExperienceSelector } from "./experience-selector";
import { ExperienceSlide } from "./experience-slide";
import { useExperienceCarousel } from "./hooks/use-experience-carousel";
import type { ExperienceItem } from "./types/experience";

export function ExperienceCarousel({
  experiences,
}: {
  experiences: ExperienceItem[];
}) {
  const {
    emblaRef,
    selectedIndex,
    progress,
    select,
  } = useExperienceCarousel();

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
      <ExperienceSelector
        experiences={experiences}
        selectedIndex={selectedIndex}
        progress={progress}
        onSelect={select}
      />

      <div>
        <div className="overflow-hidden rounded-[28px] border border-[#173039]/10 bg-[#eeeae2] shadow-[0_28px_70px_rgba(20,45,52,0.10)]">
          <div className="flex items-center justify-between border-b border-[#173039]/10 bg-[#f7f4ee] px-5 py-3">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#c5b8a3]" />
              <span className="h-2 w-2 rounded-full bg-[#c5b8a3]" />
              <span className="h-2 w-2 rounded-full bg-[#b78232]" />
            </div>

            <span className="font-mono text-[7px] uppercase tracking-[0.22em] text-muted-foreground">
              Myria Experience
            </span>

            <span className="flex items-center gap-1.5 text-[8px] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6f948c]" />
              Live
            </span>
          </div>

          <div
            ref={emblaRef}
            className="overflow-hidden"
          >
            <div className="flex">
              {experiences.map(
                (experience, index) => (
                  <ExperienceSlide
                    key={experience.id}
                    experience={experience}
                    priority={index === 0}
                  />
                ),
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between px-1">
          <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-muted-foreground">
            {
              experiences[selectedIndex]
                ?.tag
            }
          </span>

          <span className="font-mono text-[8px] text-muted-foreground">
            {String(selectedIndex + 1).padStart(
              2,
              "0",
            )}
            {" / "}
            {String(experiences.length).padStart(
              2,
              "0",
            )}
          </span>
        </div>
      </div>
    </div>
  );
}