import MyriaOWASPSecuritySection from "@/components/sections/MyriaOWASPSecuritySection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Security Patterns",
  description: "OWASP-inspired security patterns for AI agents",
  keywords: ["AI security", "OWASP", "security patterns", "AI agents", "Myria"],
};

export default function AISecurityPatternsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <MyriaOWASPSecuritySection />
    </div>
  );
}