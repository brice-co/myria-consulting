import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { consultingServices } from "@/data/consulting-services";
import { getServiceEditorial } from "@/data/service-editorial";
import { publicPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...publicPageMetadata({
  title: "Management Consulting Services | Myria Consulting",
  description: "Explore Myria's management consulting in strategy, business transformation, operational excellence, change management, AI advisory and automation.",
  pathname: "/services",
  }),
  alternates: { canonical: "/services", languages: { "en-CA": "/services", "fr-CA": "/fr/services", "x-default": "/services" } },
};

import { ConsultingServicesHub } from "@/components/consulting/services/ConsultingServicesHub";

export default function ServicesPage(){return <ConsultingServicesHub />;}
