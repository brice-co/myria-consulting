import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { publicPageMetadata } from "@/lib/seo";
import { GuideArticle } from "../_components/guide-article";
import { getGuide, guides } from "../_data/guides";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { robots: { index: false, follow: false } };

  return publicPageMetadata({
    title: `${guide.title} | Myria Consulting`,
    description: guide.description,
    pathname: `/resources/guides/${guide.slug}`,
    type: "article",
  });
}

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);

  if (!guide) {
    notFound();
  }

  return <GuideArticle guide={guide} />;
}
