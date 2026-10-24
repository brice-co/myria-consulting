import { publicPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { ContactAgentPage } from "@/components/contact-agent/contact-agent-page";

export const metadata = publicPageMetadata({"title":"Contact Myria Consulting | Management & AI Advisory","description":"Discuss a strategy, organizational change, operations or AI challenge with Myria Consulting, and explore a practical next step.","pathname":"/contact-myria","index":true});

export default function ContactMyriaPage() { return <ContactAgentPage />; }
