import { publicPageMetadata } from "@/lib/seo";
import { LabsHero } from "@/features/intelligent-labs/components/landing/labs-hero";
import { LabsGrid } from "@/features/intelligent-labs/components/landing/labs-grid";

export const metadata = publicPageMetadata({"title":"Intelligent Labs | Explore Practical AI Systems","description":"Experience real AI-enabled workflows and collaborative intelligent systems through Myria Consulting's Intelligent Labs.","pathname":"/experience/intelligent-labs","index":true});

export default function IntelligentLabsPage() {
  return (
    <main className="min-h-screen bg-[#f6f1e7] px-6 py-16 text-[#12313a] lg:py-24">
      <div className="mx-auto max-w-6xl">
        <LabsHero />
        <LabsGrid />
        <p className="mt-9 text-sm leading-7 text-[#5f6b6f]">
          Registration records interest. Session invitations will be sent based on
          availability and relevance.
        </p>
      </div>
    </main>
  );
}
