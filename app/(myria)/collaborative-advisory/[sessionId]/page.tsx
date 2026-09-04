import { Metadata } from "next";

import "@liveblocks/react-ui/styles.css";
import { CollaborativeAdvisoryRoom } from "@/components/collaborative-advisory/CollaborativeAdvisoryRoom";

type Props = { params: Promise<{ sessionId: string }> };

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

export default async function Page({ params }: Props) {
  const { sessionId } = await params;
  return (
    <main className="min-h-screen bg-[#050817] text-white">
      <CollaborativeAdvisoryRoom sessionId={sessionId} />
    </main>
  );
}
