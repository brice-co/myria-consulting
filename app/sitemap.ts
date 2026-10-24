import type { MetadataRoute } from "next";
import { advisoryLabs } from "@/data/labs";
import { useCases } from "@/data/use-cases";
import { guides } from "@/app/resources/guides/_data/guides";
import { SITE_URL } from "@/lib/seo";

/** Only stable, public, canonical content belongs in the sitemap. */
const publicPaths = [
  "/",
  "/our-approach/management-model",
  "/resources/brochures",
  "/resources/brochures/strategic-clarity",
  "/resources/brochures/ai-governance",
  "/resources/guides",
  "/resources/playbook",
  "/insights",
  "/about-myria",
  "/contact-myria",
  "/client-portal",
  "/labs",
  "/advisory-lab",
  "/virtual-advisory-team",
  "/use-cases",
  "/ai-enablement",
  "/experience/intelligent-labs",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...publicPaths,
    ...advisoryLabs.map((lab) => `/labs/${lab.slug}`),
    ...guides.map((guide) => `/resources/guides/${guide.slug}`),
    ...useCases.map((useCase) => `/use-cases/${useCase.slug}`),
  ];

  return [...new Set(routes)].map((pathname) => ({
    url: new URL(pathname, SITE_URL).toString(),
  }));
}
