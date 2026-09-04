import { notFound } from "next/navigation";

import { LabPublicExperience } from "@/components/labs/public/lab-public-experience";
import { getLabBySlug } from "@/data/labs";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Myria Consulting | Advisory Lab",
  description: "Myria Advisory Lab",
  keywords: ["Myria", "Myria Consulting", "Virtual Management Consulting", "Virtual Advisory Service", "Distributed Systems", "Management Consulting", "Advisory Service"],
};

type LabPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

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