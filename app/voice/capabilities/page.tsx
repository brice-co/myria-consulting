import { Metadata } from "next";
import VoiceCapabilities from "@/components/marketing/VoiceCapacities";
import VoiceCapabilityComparison from "@/components/sections/VoiceComparison";

export const metadata: Metadata = {
  title: "Voice AI Capabilities | Custom Voice Systems by Myria",
  description:
    "Explore the voice capabilities Myria designs with — from browser-based voice to real-time conversational systems. Built custom, delivered with confidence.",
};



export default function VoiceCapabilitiesPage() {
  return (
   <><VoiceCapabilities/><VoiceCapabilityComparison/></>
    
  );
}
