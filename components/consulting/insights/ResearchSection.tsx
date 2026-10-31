import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { studies } from "@/lib/insights/studies";
import { StudyCard } from "./StudyCard";

/** A curated set, not an automatically scraped feed or a claim of affiliation. */
export function ResearchSection({ locale = "en" }: { locale?: "en" | "fr" }) {
  const fr = locale === "fr";
  return (
    <section id="research" className="mc-section mc-research" aria-labelledby="mc-research-title">
      <div className="mc-container">
        <div className="mc-research-heading">
          <div>
            <p className="mc-eyebrow">{fr ? "07 — RECHERCHES À DÉCOUVRIR" : "07 — RESEARCH WE ARE READING"}</p>
            <h2 id="mc-research-title">{fr ? "Les bonnes décisions s’appuient sur des faits." : "Good decisions start with evidence."}</h2>
          </div>
          <div className="mc-research-intro">
            <p>
              {fr ? "Au-delà des nouveautés technologiques, nous examinons les recherches sur les organisations, le travail et la mise en œuvre. Chaque étude nourrit nos réflexions sur les pratiques de conseil." : "We look beyond new technology to the research on organizations, work and implementation. Each study is paired with the questions it raises for Myria’s advisory practice."}
            </p>
            <Link href={fr ? "/fr/perspectives" : "/insights"}>
              {fr ? "Explorer les recherches et perspectives" : "Explore research & perspectives"} <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="mc-research-grid">
          {studies.slice(0, 3).map((study) => <StudyCard key={study.id} study={study} locale={locale} />)}
        </div>
        <p className="mc-research-note">
          {fr ? "Ces études sont publiées de manière indépendante. Les résumés distinguent les conclusions des auteurs de l’interprétation de Myria et ne supposent ni affiliation ni recommandation." : "Sources are independently published. The summaries distinguish source findings from Myria’s interpretation and do not imply affiliation or endorsement."}
        </p>
      </div>
    </section>
  );
}
