import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { consultingServices, getConsultingService } from "@/data/consulting-services";
import { getServiceEditorial } from "@/data/service-editorial";
import { serviceEvidence } from "@/data/service-evidence";
import { frenchServices } from "@/data/consulting-services-fr";
import { publicPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return consultingServices.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getConsultingService(slug);
  if (!service) return { robots: { index: false, follow: false } };
  const translation = frenchServices.find((item) => item.englishSlug === slug);
  return {
    ...publicPageMetadata({
    title: `${service.target} | Myria Consulting`,
    description: `${service.target} from Myria Consulting in Montreal. ${service.intro}`,
    pathname: `/services/${slug}`,
    }),
    ...(translation ? { alternates: { canonical: `/services/${slug}`, languages: { "en-CA": `/services/${slug}`, "fr-CA": `/fr/services/${translation.slug}`, "x-default": `/services/${slug}` } } } : {}),
  };
}

import { ConsultingServiceDetail } from "@/components/consulting/services/ConsultingServiceDetail";

export default async function ServiceDetailPage({params}:Props){const {slug}=await params;return <ConsultingServiceDetail slug={slug} />;}
