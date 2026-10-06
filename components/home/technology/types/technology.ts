import type { LucideIcon } from "lucide-react";

export type Technology = {
  name: string;
  shortName?: string;
};

export type TechnologyCapability = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  technologies: Technology[];
};