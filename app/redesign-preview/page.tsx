import { redirect } from "next/navigation";

/** The approved redesign now lives at the canonical homepage. */
export default function RetiredRedesignPreview() {
  redirect("/");
}
