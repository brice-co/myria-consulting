import type { ReactNode } from "react";
import { ConsultingHeader } from "./consulting-header";

/** One public navigation across the homepage and marketing routes. */
export default function SiteHeader({ children }: { children?: ReactNode }) {
  return (
    <>
      <ConsultingHeader />
      {children}
    </>
  );
}
