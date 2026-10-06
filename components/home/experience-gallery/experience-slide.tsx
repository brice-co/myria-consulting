import Image from "next/image";

import type { ExperienceItem } from "./types/experience";

export function ExperienceSlide({
  experience,
  priority = false,
}: {
  experience: ExperienceItem;
  priority?: boolean;
}) {
  return (
    <div className="relative min-w-0 flex-[0_0_100%]">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#eeeae2]">
        <Image
          src={experience.src}
          alt={experience.alt}
          fill
          priority={priority}
          className="object-contain p-4 md:p-7"
          sizes="(max-width: 1024px) 100vw, 760px"
        />
      </div>
    </div>
  );
}