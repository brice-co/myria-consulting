import { AdvisoryLabExperience } from "@/components/advisory-lab/AdvisoryLabExperience";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Myria Consulting| Advisory Lab",
  description: "Myria Advisory Lab",
  keywords: ["Myria", "Myria Consulting", "Virtual Management Consulting", "Virtual Advisory Service", "Distributed Systems", "Management Consulting", "Advisory Service"],
};

export default function AdvisoryLabPage() {
  return (
    <main className="min-h-screen bg-[#050817] text-white">
      <AdvisoryLabExperience />
    </main>
  );
}
