import type { Metadata } from "next";

import { FractionalCTOPage } from "@/services/fractional-cto/fractional-cto-page";

export const metadata: Metadata = {
  title: "Fractional CTO | Myria Consulting",
  description:
    "Embedded AI-native CTO partner for founding teams: strategy, hiring, architecture reviews and on-call escalations.",
  openGraph: {
    title: "Fractional CTO | Myria Consulting",
    description:
      "Weekly 1:1s, async architecture reviews, hiring loops, roadmap shaping and on-call escalations for AI-native teams.",
    type: "website",
  },
};

export default function Page() {
  return <FractionalCTOPage />;
}
