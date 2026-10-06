import { findingAiOpportunitiesGuide } from "./finding-ai-opportunities";

export const guides = [findingAiOpportunitiesGuide];

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
