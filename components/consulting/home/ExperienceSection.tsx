import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { myriaExperiences } from "./experience-content";
import { ExperienceMedia } from "./ExperienceMedia";
import { frenchExperienceContent } from "./lower-home-fr";

export function ExperienceSection({ locale = "en" }: { locale?: "en" | "fr" }) {
  const fr = locale === "fr";
  return (
    <section
      className="mc-section mc-experience"
      id="experience"
      aria-labelledby="mc-experience-title"
    >
      <div className="mc-container">
        <div className="mc-experience-heading">
          <div>
            <p className="mc-eyebrow">{fr ? "05 — DÉCOUVREZ NOTRE FAÇON DE TRAVAILLER" : "05 — EXPERIENCE HOW MYRIA WORKS"}</p>
            <h2 id="mc-experience-title">
              {fr ? <>Découvrez comment les expertises <em>se rejoignent.</em></> : <>See how the work <em>comes together.</em></>}
            </h2>
          </div>
          <div className="mc-experience-intro">
            <p>
              {fr ? "Notre façon de travailler fait partie de ce qui distingue Myria Conseil. Découvrez comment les séances structurées, les conseillers IA spécialisés et les environnements collaboratifs contribuent à de meilleures décisions." : "The way we work is part of what makes Myria different. Explore how structured advisory sessions, specialist AI advisors and collaborative environments contribute to better decisions."}
            </p>
            <span>{fr ? "Le jugement humain. L’intelligence en soutien. L’exécution en priorité." : "Human-led. Intelligence-enabled. Focused on execution."}</span>
          </div>
        </div>

        <div className="mc-experience-grid">
          {myriaExperiences.map((item, index) => (
            <article className="mc-experience-card" key={item.id}>
              <ExperienceMedia experience={item} locale={locale} />
              <div className="mc-experience-card-copy">
                <div className="mc-experience-meta">
                  <span>{item.number} / 03</span>
                  <span>{fr ? frenchExperienceContent[index].format : item.format}</span>
                </div>
                <h3>{fr ? frenchExperienceContent[index].title : item.title}</h3>
                <p>{fr ? frenchExperienceContent[index].description : item.description}</p>
                <div className="mc-experience-foot">
                  <span>{fr ? frenchExperienceContent[index].outcome : item.outcome}</span>
                  <Link href={item.href}>
                    {fr ? frenchExperienceContent[index].linkLabel : item.linkLabel}
                    <ArrowUpRight size={17} strokeWidth={1.8} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mc-experience-note">
          {fr ? "Ces expériences illustrent différentes dimensions de l’approche de Myria Conseil. Chaque mandat est adapté aux objectifs et au contexte du client." : "These experiences illustrate different parts of Myria’s advisory approach. Engagements are shaped around the client’s objectives and context."}
        </p>
      </div>
    </section>
  );
}
