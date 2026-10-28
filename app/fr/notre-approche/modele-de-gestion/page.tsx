import type { Metadata } from "next";
import { ManagementModelContent } from "@/components/consulting/approach/ManagementModelContent";
export const metadata: Metadata = {
 title:"Modèle de gestion Myria | Myria Conseil",
 description:"Découvrez notre modèle de gestion fondé sur la réflexion approfondie, la structure intelligente et la culture de réflexion pour améliorer la performance des organisations.",
 alternates:{canonical:"/fr/notre-approche/modele-de-gestion",languages:{"fr-CA":"/fr/notre-approche/modele-de-gestion","en-CA":"/our-approach/management-model","x-default":"/our-approach/management-model"}},
 openGraph:{title:"Modèle de gestion Myria | Myria Conseil",description:"Réfléchir en profondeur. Structurer intelligemment. Améliorer continuellement.",url:"/fr/notre-approche/modele-de-gestion",locale:"fr_CA",type:"article"},
};
export default function ModeleDeGestionPage(){return <ManagementModelContent locale="fr" />;}
