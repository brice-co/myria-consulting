import type { Metadata } from "next";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { ConsultingHomePage } from "@/components/consulting/home/ConsultingHomePage";
export const metadata: Metadata = {title:"Conseil en gestion à Montréal | Myria Conseil",description:"Myria Conseil accompagne les organisations en stratégie, excellence opérationnelle, transformation, gestion du changement et intelligence artificielle.",alternates:{canonical:"/fr",languages:{"fr-CA":"/fr","en-CA":"/","x-default":"/"}},openGraph:{title:"Myria Conseil | Conseil en gestion à Montréal",description:"De meilleures décisions. Une exécution plus solide.",locale:"fr_CA",url:"/fr",type:"website"}};
export default function HomeFr(){return <><OrganizationJsonLd/><ConsultingHomePage locale="fr" /></>}
