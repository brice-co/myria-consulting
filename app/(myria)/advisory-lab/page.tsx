import { publicPageMetadata } from "@/lib/seo";
import { AdvisoryLabExperience } from "@/components/advisory-lab/AdvisoryLabExperience";
import {Metadata} from "next";

export const metadata = publicPageMetadata({"title":"Advisory Lab Experience | Myria Consulting","description":"Explore the Myria Advisory Lab: a structured, human-led way to understand business challenges with specialist AI perspectives.","pathname":"/advisory-lab","index":true});

export default function AdvisoryLabPage() {
  return (
    <main className="min-h-screen bg-[#050817] text-white">
      <AdvisoryLabExperience />
    </main>
  );
}
