import { notFound } from "next/navigation";

import { LabPublicExperience } from "@/components/labs/public/lab-public-experience";
import { getLabBySlug } from "@/data/labs";
import type { Metadata } from "next";
import { publicPageMetadata } from "@/lib/seo";



type LabPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: LabPageProps): Promise<Metadata> {
  const { slug } = await params;
  const lab = getLabBySlug(slug);

  if (!lab) return { robots: { index: false, follow: false } };

  return publicPageMetadata({
    title: `${lab.title} | Myria Consulting Advisory Labs`,
    description: lab.description,
    pathname: `/labs/${lab.slug}`,
  });
}

export default async function LabPage({
  params,
}: LabPageProps) {
  const { slug } = await params;

  const lab = getLabBySlug(slug);

  if (!lab) {
    notFound();
  }

  return (
    <LabPublicExperience lab={lab} />
  );
}