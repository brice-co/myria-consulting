import type { Metadata } from "next";
import { ContactAgentPage } from "@/components/contact-agent/contact-agent-page";

export const metadata: Metadata = {
  title: "Myria Consulting | Contact Myria",
  description: "Speak or type with the Myria Contact Advisor to structure, review, and securely send your inquiry to Myria Consulting.",
};

export default function ContactMyriaPage() { return <ContactAgentPage />; }
