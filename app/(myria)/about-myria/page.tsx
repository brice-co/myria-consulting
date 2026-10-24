import { publicPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { AboutMyriaAgentPage } from "@/components/about-myria/about-myria-agent-page";

export const metadata = publicPageMetadata({"title":"About Myria | Our Management Consulting Approach","description":"Meet Myria Consulting and explore how management expertise, advisory labs and intelligent systems support organizational decisions and execution.","pathname":"/about-myria","index":true});

export default function AboutMyriaPage() {
  return <AboutMyriaAgentPage />;
}
