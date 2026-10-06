import type { LucideIcon } from "lucide-react";

export type RhythmStep = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type ContentCard = {
  title: string;
  description: string;
};

export type FractionalCTOContent = {
  eyebrow: string;
  title: string;
  description: string;
  price: string;
  priceSuffix: string;
  engagementSummary: string;
  whatItIs: string[];
  rhythm: RhythmStep[];
  deliverables: string[];
  audiences: ContentCard[];
  reasons: ContentCard[];
};
