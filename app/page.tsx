import type { Metadata } from "next";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { ConsultingHomePage } from "@/components/consulting/home/ConsultingHomePage";

export const metadata: Metadata = {
  title: "Management Consulting & AI Advisory | Myria Consulting",
  description:
    "Montreal-based management consulting for strategy, operations, business transformation, organizational change and AI advisory. Better decisions. Stronger execution.",
  alternates: { canonical: "/", languages: { "en-CA": "/", "fr-CA": "/fr", "x-default": "/" } },
};

export default function Home() {
  return (
    <>
      <OrganizationJsonLd />
      <ConsultingHomePage />
    </>
  );
}
