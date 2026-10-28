import type { Metadata } from "next";
import { frenchServices, getFrenchService } from "@/data/consulting-services-fr";
import { ConsultingServiceDetail } from "@/components/consulting/services/ConsultingServiceDetail";
type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return frenchServices.map(s=>({slug:s.slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {slug}=await params;const s=getFrenchService(slug);
 if(!s)return {robots:{index:false,follow:false}};
 return {title:`${s.title} | Myria Conseil`,description:`${s.intro} Découvrez notre approche et nos services-conseils.`,alternates:{canonical:`/fr/services/${s.slug}`,languages:{"fr-CA":`/fr/services/${s.slug}`,"en-CA":`/services/${s.englishSlug}`,"x-default":`/services/${s.englishSlug}`}},openGraph:{title:`${s.title} | Myria Conseil`,description:s.intro,locale:"fr_CA",url:`/fr/services/${s.slug}`,type:"website"}};
}
export default async function FrenchServiceDetail({params}:Props){const {slug}=await params;return <ConsultingServiceDetail slug={slug} locale="fr" />;}
