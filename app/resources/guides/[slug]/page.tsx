import { notFound } from "next/navigation";
import { GuideArticle } from "../_components/guide-article";
import { getGuide, guides } from "../_data/guides";

type Props = {
  params: Promise<{ slug: string }>;
};

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
