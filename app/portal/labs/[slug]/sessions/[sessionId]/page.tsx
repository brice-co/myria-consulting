import { notFound } from "next/navigation";

import { LabExperience } from "@/components/labs/lab-experience";
import { getLabBySlug } from "@/data/labs";

type LabSessionPageProps = {
  params: Promise<{
    slug: string;
    sessionId: string;
  }>;
};

export default async function LabSessionPage({
  params,
}: LabSessionPageProps) {
  const {
    slug,
    sessionId,
  } = await params;

  const lab = getLabBySlug(slug);

  if (!lab || !sessionId.trim()) {
    notFound();
  }

  const advisors = lab.advisors.map(
    ({ id, name, role }) => ({
      id,
      name,
      role,
    }),
  );

  return (
    <main className="min-h-screen bg-[#f6f1e7]">
      <LabExperience
        sessionId={sessionId}
        labSlug={lab.slug}
        stages={lab.stages}
        advisors={advisors}
    />
    </main>
  );
}