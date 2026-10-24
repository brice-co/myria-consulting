import { publicPageMetadata } from "@/lib/seo";
export const metadata = publicPageMetadata({title:"AI Systems Architecture | Myria Consulting",description:"Explore technical architecture for intelligent workflows, agent orchestration and enterprise integration.",pathname:"/resources/architecture",index:false});
import { ArchitecturePage } from "@/app/resources/architecture/components/architecture/ArchitecturePage";

export default function ArchitectureRoute() {
  return <ArchitecturePage />;
}