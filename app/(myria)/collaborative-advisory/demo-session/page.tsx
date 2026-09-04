import { Metadata } from "next";
import "@liveblocks/react-ui/styles.css";
import { CollaborativeAdvisoryRoom } from "@/components/collaborative-advisory/CollaborativeAdvisoryRoom";

export const metadata = {
  title: "Myria Consulting | Demo Session",
  description: "Join our demo session to experience the Myria Consulting Collaborative Advisory Room.",
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

export default function Page() {
  return (
    <main className="min-h-screen bg-[#050817] text-white">
      <CollaborativeAdvisoryRoom sessionId="demo-session" />
    </main>
  );
}
