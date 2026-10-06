export type GuideSection = {
  id: string;
  number: string;
  title: string;
  summary: string;
  body: string[];
  questions?: string[];
  bullets?: string[];
  example?: { title: string; body: string[] };
};

export type Guide = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  readingTime: string;
  audience: string;
  outcome: string;
  introduction: string[];
  sections: GuideSection[];
  intelligencePatterns: {
    signal: string;
    approach: string;
    examples: string;
  }[];
  worksheet: {
    label: string;
    prompt: string;
  }[];
  checklist: {
    title: string;
    description: string;
  }[];
};
