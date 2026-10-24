import { publicPageMetadata } from "@/lib/seo";
import AdvisorySessionInvite from "@/components/marketing/advisory-session-invite";
import { Metadata } from "next";

export const metadata = publicPageMetadata({"title":"Experience Lab | Discover Myria's Advisory Approach","description":"Explore an interactive view of Myria's management advisory approach and learn how collaborative intelligence supports business decisions.","pathname":"/experience-lab","index":false});

export default function AdvisoryExperienceLabPage() {
  return (    
      
        <AdvisorySessionInvite />
     
  
  );
}