import AdvisorySessionInvite from "@/components/marketing/advisory-session-invite";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Myria Consulting | Experience Lab",
  description: "Explore the Myria Consulting Experience Lab to learn more about our innovative solutions.",
};

export default function AdvisoryExperienceLabPage() {
  return (    
      
        <AdvisorySessionInvite />
     
  
  );
}