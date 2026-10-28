import type { Metadata } from "next";
export const metadata: Metadata = {
 title:"Services de conseil en gestion à Montréal | Myria Conseil",
 description:"Myria accompagne les organisations en conseil en gestion, transformation organisationnelle, excellence opérationnelle, gestion du changement et stratégie IA à Montréal.",
 alternates:{canonical:"/fr/services",languages:{"fr-CA":"/fr/services","en-CA":"/services","x-default":"/services"}},
 openGraph:{title:"Services de conseil en gestion | Myria Conseil",description:"Conseil en gestion et transformation des organisations au Québec et au Canada.",locale:"fr_CA",url:"/fr/services",type:"website"},
};
import { ConsultingServicesHub } from "@/components/consulting/services/ConsultingServicesHub";
export default function FrenchServicesPage(){return <ConsultingServicesHub locale="fr" />;}
