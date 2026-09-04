import { VirtualAdvisoryTeamExperience } from "@/components/virtual-advisory-team/VirtualAdvisoryTeamExperience";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Myria Consulting | Virtual Advisory Team",
  description: "Meet the Myria Virtual Advisory Team and learn how we can help your organization.",
  keywords: ["Myria", "Myria Consulting", "Virtual Management Consulting", "Virtual Advisory Service", "Distributed Systems", "Management Consulting", "Advisory Service"],
};

export default function VirtualAdvisoryTeamPage() {
  return (
    <main className="min-h-screen bg-[#050817] text-white">
      <VirtualAdvisoryTeamExperience />
    </main>
  );
}
