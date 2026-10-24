import { publicPageMetadata } from "@/lib/seo";
import { VirtualAdvisoryTeamExperience } from "@/components/virtual-advisory-team/VirtualAdvisoryTeamExperience";
import {Metadata} from "next";

export const metadata = publicPageMetadata({"title":"Virtual Advisory Team | Specialist AI Advisors at Myria","description":"Explore Myria's virtual advisory team, supporting human-led strategy, operations, AI and data, and people and change engagements.","pathname":"/virtual-advisory-team","index":true});

export default function VirtualAdvisoryTeamPage() {
  return (
    <main className="min-h-screen bg-[#050817] text-white">
      <VirtualAdvisoryTeamExperience />
    </main>
  );
}
