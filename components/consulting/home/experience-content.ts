/**
 * Configure the Experience Gallery in one place.
 *
 * To add footage, put .mp4/.webm files in public/videos and update videoSrc
 * with a public path (for example /videos/myria-advisory-lab.mp4).
 * Poster images are optional public URLs, e.g. /images/advisory-lab-poster.webp.
 * With videoSrc=null, a designed, NON-INTERACTIVE visual appears; there is
 * never a fake play button or a broken player.
 */
export type ExperienceId = "advisory" | "team" | "workspace";

export type Experience = {
  id: ExperienceId;
  number: string;
  format: string;
  title: string;
  description: string;
  outcome: string;
  href: string;
  linkLabel: string;
  videoSrc: string | null;
  posterSrc: string | null;
};

export const myriaExperiences: readonly Experience[] = [
  {
    id: "advisory",
    number: "01",
    format: "STRUCTURED EXPLORATION",
    title: "Advisory Lab",
    description:
      "Explore a business challenge through a facilitated, structured session. Move from context and questions to a more focused picture of where to act.",
    outcome: "Understand → Explore → Focus",
    href: "/advisory-lab",
    linkLabel: "Explore the Advisory Lab",
    videoSrc: null,
    posterSrc: null,
  },
  {
    id: "team",
    number: "02",
    format: "SPECIALIST INTELLIGENCE",
    title: "Virtual Advisory Team",
    description:
      "Meet specialist AI advisors working across strategy, operations, AI and data, and people and change to contribute perspectives to a human-led engagement.",
    outcome: "Different perspectives. One business question.",
    href: "/virtual-advisory-team",
    linkLabel: "Meet the virtual advisors",
    videoSrc: null,
    posterSrc: null,
  },
  {
    id: "workspace",
    number: "03",
    format: "COLLABORATIVE WORKING SESSION",
    title: "Collaborative Workspace",
    description:
      "See how people and intelligent advisors can bring observations, decisions and actions into a shared working environment during a meeting.",
    outcome: "From discussion to shared decisions.",
    href: "/collaborative-advisory/demo-session",
    linkLabel: "Explore the workspace",
    videoSrc: null,
    posterSrc: null,
  },
];
