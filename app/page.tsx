import type { Metadata } from "next";
import { ConsultingHomePage } from "@/components/consulting/home/ConsultingHomePage";

export const metadata: Metadata = {
  title: "Myria Consulting | Management Advisory & Intelligent Systems",
  description:
    "Management consulting strengthened by intelligent systems. Myria helps leaders make better decisions, improve operations and turn strategy into execution.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return <ConsultingHomePage />;
}
