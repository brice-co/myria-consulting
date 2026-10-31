import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { CuratedStudy } from "@/lib/insights/studies";
import { frenchResearchContent } from "@/components/consulting/home/lower-home-fr";

export function StudyCard({ study, locale = "en" }: { study: CuratedStudy; locale?: "en" | "fr" }) {
  const fr = locale === "fr";
  const translated = fr ? frenchResearchContent[["stanford", "mckinsey", "deloitte"].indexOf(study.id) as 0 | 1 | 2] : undefined;
  return (
    <article className="mc-study-card">
      <div className="mc-study-art">
        <Image
          src={study.image}
          alt={study.imageAlt}
          fill
          sizes="(max-width: 650px) 100vw, (max-width: 1050px) 50vw, 33vw"
        />
      </div>
      <div className="mc-study-body">
        <div className="mc-study-meta">
          <span>{translated?.category ?? study.category}</span>
          <span>{study.year}</span>
        </div>
        <h3>{translated?.title ?? study.title}</h3>
        <p className="mc-study-finding"><strong>{fr ? "Constat de la recherche :" : "Research finding:"}</strong> {translated?.finding ?? study.finding}</p>
        <p className="mc-study-lens"><strong>{fr ? "Perspective de Myria :" : "Myria’s perspective:"}</strong> {translated?.myriaPerspective ?? study.myriaPerspective}</p>
        <div className="mc-study-footer">
          <span>{study.source}</span>
          <a href={study.sourceUrl} target="_blank" rel="noopener noreferrer">
            {fr ? "Lire l’étude originale" : "Read original research"}
            <ArrowUpRight size={16} aria-hidden="true" />
            <span className="sr-only">{fr ? " (s’ouvre dans un nouvel onglet)" : " (opens in a new tab)"}</span>
          </a>
        </div>
      </div>
    </article>
  );
}
