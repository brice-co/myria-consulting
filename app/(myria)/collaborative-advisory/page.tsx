import { redirect } from "next/navigation";

// Compatibility route for previously issued links without a session identifier.
// The real advisory workspace is /collaborative-advisory/[sessionId].
export default async function CollaborativeAdvisoryEntry({
  searchParams,
}: {
  searchParams: Promise<{ invite?: string }>;
}) {
  const { invite } = await searchParams;
  const nextSessionId = crypto.randomUUID();
  const search = invite ? `?invite=${encodeURIComponent(invite)}` : "";
  redirect(`/collaborative-advisory/${nextSessionId}${search}`);
}
