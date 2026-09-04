import { redirect } from "next/navigation";
import { randomUUID } from "crypto";

import { getLabBySlug } from "@/data/labs";

type NewLabSessionPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function NewLabSessionPage({
  params,
}: NewLabSessionPageProps) {
  const { slug } = await params;

  const lab = getLabBySlug(slug);

  if (!lab) {
    redirect("/portal/labs");
  }

  const sessionId = randomUUID();

  redirect(
    `/portal/labs/${lab.slug}/sessions/${sessionId}`,
  );
}