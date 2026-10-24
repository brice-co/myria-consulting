import type { Metadata } from "next";
import { ConsultingPreviewPage } from "@/components/consulting/preview/ConsultingPreviewPage";
import "@/components/consulting/preview/preview.css";

export const metadata: Metadata = {
  title: "Myria Consulting | New Website Preview",
  description: "An internal design preview of Myria Consulting's simplified advisory website.",
  robots: { index: false, follow: false },
};

export default function RedesignPreviewRoute() {
  return <ConsultingPreviewPage />;
}
