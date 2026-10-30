import { Metadata } from "next";
import { redirect } from "next/navigation";

import "@liveblocks/react-ui/styles.css";
import { CollaborativeAdvisoryRoom } from "@/components/collaborative-advisory/CollaborativeAdvisoryRoom";

type Props = { params: Promise<{ sessionId: string }>; searchParams: Promise<{ invite?: string }> };

export const metadata: Metadata = {
  title: "Myria Consulting | Collaborative Advisory",
  description:
    "Myria Consulting Collaborative Advisory Room. Join a collaborative advisory session with Myria's virtual specialist team and Advisory Labs.",
  keywords: [
    "Myria",
    "Myria Consulting",
    "Virtual Management Consulting",
    "Virtual Advisory Service",
    "Distributed Systems",
    "Management Consulting",
    "Advisory Service",
  ],
};

export default async function Page({ params, searchParams }: Props) {
  const { sessionId } = await params;
  // An old invitation was configured with the literal Next.js route placeholder.
  // Redirect it to a real, unique Liveblocks room rather than reusing shared storage.
  if (sessionId === "[sessionId]" || sessionId === "%5BsessionId%5D") {
    const { invite } = await searchParams;
    const query = invite ? `?invite=${encodeURIComponent(invite)}` : "";
    redirect(`/collaborative-advisory/${crypto.randomUUID()}${query}`);
  }
  return (
    <main className="min-h-screen bg-[#050817] text-white">
      <CollaborativeAdvisoryRoom sessionId={sessionId} />
    </main>
  );
}
