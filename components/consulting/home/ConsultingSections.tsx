import Link from "next/link";
import { ArrowUpRight, Compass, Layers3, Network, Users, ShieldCheck } from "lucide-react";
import { challenges, capabilities, philosophy, discoveryStages, insights } from "./content";
import { frenchHomeContent } from "./content-fr";

const disciplineIcons = [Compass, Layers3, Network, Users];

function SectionIntro({ eyebrow, heading, detail, headingId }: { eyebrow: string; heading: string; detail: string; headingId: string }) {
  return (
    <div className="mc-section-heading">
      <div>
        <p className="mc-eyebrow">{eyebrow}</p>
        <h2 id={headingId}>{heading}</h2>
      </div>
      <p>{detail}</p>
    </div>
  );
}

export function ChallengesSection({ locale = "en" }: { locale?: "en" | "fr" }) {
  const fr = locale === "fr";
  return (
    <section id="challenges" className="mc-section mc-challenges" aria-labelledby="mc-challenges-title">
      <div className="mc-container">
        <p className="mc-eyebrow">{fr ? "01 — LES DÉFIS QUE NOUS ABORDONS" : "01 — THE CHALLENGES WE ADDRESS"}</p>
        <div className="mc-two-column-intro">
          <h2 id="mc-challenges-title">{fr ? "La complexité des organisations exige une réflexion intégrée." : "Business complexity deserves connected thinking."}</h2>
          <p>{fr ? "Les défis organisationnels sont rarement isolés. Stratégie, opérations, technologie et personnes s’influencent mutuellement. Notre démarche examine ces relations et les décisions à prendre." : "Organizations rarely struggle with one issue in isolation. Strategy, operations, technology, and people influence each other. Our work starts by understanding those relationships and the decisions leaders need to make."}</p>
        </div>
        <div className="mc-challenge-grid">
          {challenges.map((item, index) => (
            <article className="mc-challenge" key={item.number}>
              <span className="mc-index">{item.number}</span>
              <h3>{fr ? frenchHomeContent.challenges[index][0] : item.title}</h3>
              <p>{fr ? frenchHomeContent.challenges[index][1] : item.description}</p>
              <div className="mc-challenge-response"><span>{fr ? "Notre contribution" : "Where we help"}</span>{fr ? frenchHomeContent.challenges[index][2] : item.response}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CapabilitiesSection({ locale = "en" }: { locale?: "en" | "fr" }) {
  const fr = locale === "fr";
  return (
    <section className="mc-section mc-capabilities" id="capabilities" aria-labelledby="mc-capabilities-title">
      <div className="mc-container">
        <div>
          <SectionIntro headingId="mc-capabilities-title" eyebrow={fr ? "02 — NOS EXPERTISES" : "02 — WHAT WE DO"} heading={fr ? "Des expertises reliées. Des actions concrètes." : "Connected expertise. Practical action."}
            detail={fr ? "Quatre disciplines complémentaires mobilisées selon les enjeux de l’organisation." : "Four complementary advisory disciplines, brought together according to the challenge — not as disconnected service offerings."} />
        </div>
        <div className="mc-capabilities-grid">
          {capabilities.map((item, index) => {
            const Icon = disciplineIcons[index];
            return (
              <article className="mc-capability" key={item.number}>
                <div className="mc-capability-top"><span>{item.number} / 04</span><Icon size={29} strokeWidth={1.4} aria-hidden="true" /></div>
                <div><h3>{fr ? frenchHomeContent.capabilities[index][0] : item.title}</h3><p>{fr ? frenchHomeContent.capabilities[index][1] : item.description}</p><small>{fr ? frenchHomeContent.capabilities[index][2] : item.examples}</small></div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function DifferenceSection({ locale = "en" }: { locale?: "en" | "fr" }) {
  const fr = locale === "fr";
  return (
    <section className="mc-section mc-difference" id="difference" aria-labelledby="mc-difference-title">
      <div className="mc-container">
        <p className="mc-eyebrow">{fr ? "03 — NOTRE PHILOSOPHIE DE GESTION" : "03 — OUR MANAGEMENT PHILOSOPHY"}</p>
        <div className="mc-two-column-intro">
          <h2 id="mc-difference-title">{fr ? "Jugement humain. Soutien intelligent. Exécution coordonnée." : "Human judgment. Intelligent support. Connected execution."}</h2>
          <div>
            <p>{fr ? "Myria Conseil réunit l’expertise en gestion et les systèmes intelligents dans un même processus. Les dirigeants apportent leur contexte et leurs responsabilités. Les conseillers apportent leurs méthodes et leur jugement. Les conseillers IA contribuent à l’analyse et à l’exploration de différentes perspectives." : "Myria brings management consulting and intelligent systems into the same working process. Leaders bring context and accountability. Consultants bring methods and judgment. AI advisors can contribute structured exploration, analysis, and specialist perspectives."}</p>
            <p className="mc-extra-paragraph">{fr ? "Notre approche relie les objectifs de l’organisation à ses personnes, ses décisions, ses processus et ses technologies." : "Our approach connects what an organization wants to achieve with how its people, decisions, workflows, and technology work together."}</p>
          </div>
        </div>
        <div className="mc-philosophy-grid">
          {philosophy.map((item,index) => (
            <article key={item.number}>
              <span className="mc-index">{item.number}</span>
              <h3>{fr ? frenchHomeContent.philosophy[index][0] : item.title}</h3>
              <p>{fr ? frenchHomeContent.philosophy[index][1] : item.description}</p>
            </article>
          ))}
        </div>
        <div className="mc-governance"><ShieldCheck size={21} strokeWidth={1.5} aria-hidden="true" />
          {fr ? "L’IA soutient le conseil; les décisions, les approbations et les responsabilités restent humaines." : "AI strengthens the advisory process; decisions, approvals, and accountability remain with people."}
        </div>
        <Link href="/our-approach/management-model" className="mc-management-link">
          {fr ? "Explorer le modèle de gestion Myria" : "Explore the Myria Management Model"} <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

export function DiscoverySection({ locale = "en" }: { locale?: "en" | "fr" }) {
  const fr = locale === "fr";
  return (
    <section className="mc-section mc-discovery" id="discovery" aria-labelledby="mc-discovery-title">
      <div className="mc-container mc-discovery-grid">
        <div>
          <p className="mc-eyebrow mc-eyebrow-light">{fr ? "04 — NOTRE DÉMARCHE" : "04 — HOW WE WORK"}</p>
          <h2 id="mc-discovery-title">{fr ? "Partir du défi, pas de la solution." : "Start with the challenge, not the solution."}</h2>
          <p className="mc-discovery-description">{fr ? "Le laboratoire de découverte est un point de départ structuré. Nous analysons le contexte d’affaires, formulons les questions importantes et déterminons où concentrer les efforts." : "The Discovery Lab is a structured advisory starting point. We examine the business context, surface important questions, and identify where focused work can create value."}</p>
          <div className="mc-discovery-actions">
            <Link className="mc-button mc-button-white" href="/labs/discovery">{fr ? "Explorer le laboratoire" : "Explore the Discovery Lab"} <ArrowUpRight size={16} /></Link>
            <Link className="mc-inline-link" href={fr ? "/fr/contact" : "/contact-myria"}>{fr ? "Discuter de votre défi" : "Discuss your challenge"} <ArrowUpRight size={15} /></Link>
          </div>
          <div className="mc-governance mc-governance-light"><ShieldCheck size={20} aria-hidden="true" />
            {fr ? "Des conseillers IA spécialisés enrichissent l’exploration sous la direction des personnes." : "Specialist AI advisors support exploration; the work remains human-led."}
          </div>
        </div>
        <div className="mc-stage-list" aria-label={fr ? "Les cinq étapes du laboratoire" : "The five Discovery Lab stages"}>
          {discoveryStages.map((stage,index) => (
            <div key={stage.number} className="mc-stage">
              <span>{stage.number}</span>
              <div><h3>{fr ? frenchHomeContent.discoveryStages[index][0] : stage.title}</h3><p>{fr ? frenchHomeContent.discoveryStages[index][1] : stage.description}</p></div>
            </div>
          ))}
          <div className="mc-stage-result"><strong>{fr ? "Les résultats du laboratoire" : "What the Lab produces"}</strong>
            {fr ? "Une compréhension structurée des défis, des observations, des occasions, des risques, des priorités et des prochaines étapes." : "A structured view of the challenges, key observations, potential opportunities, risks, recommended priorities, and next steps."}
          </div>
        </div>
      </div>
    </section>
  );
}

export function InsightsSection({ locale = "en" }: { locale?: "en" | "fr" }) {
  const fr = locale === "fr";
  return (
    <section className="mc-section mc-insights" id="insights" aria-labelledby="mc-insights-title">
      <div className="mc-container">
        <div>
          <SectionIntro headingId="mc-insights-title" eyebrow={fr ? "06 — PERSPECTIVES ET EXPERTISE" : "06 — INSIGHTS & EXPERTISE"} heading={fr ? "Des idées fondées sur la pratique." : "Ideas grounded in the work."}
            detail={fr ? "Des ressources concrètes sur la stratégie, la transformation et l’utilisation des systèmes intelligents en entreprise." : "Practical resources for leaders exploring strategy, transformation, and the business use of intelligent systems."} />
        </div>
        <div className="mc-insight-grid">
          {insights.map((item) => (
            <article className="mc-insight" key={item.href}>
              <small>{item.type}</small>
              <div><h3>{item.title}</h3><p>{item.summary}</p></div>
              <Link href={item.href}>{item.linkText} <ArrowUpRight size={17} aria-hidden="true" /></Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection({ locale = "en" }: { locale?: "en" | "fr" }) {
  const fr = locale === "fr";
  return (
    <section className="mc-contact" id="contact" aria-labelledby="mc-contact-title">
      <div className="mc-container mc-contact-layout">
        <div>
          <p className="mc-eyebrow mc-eyebrow-light">{fr ? "08 — COMMENÇONS ICI" : "08 — BEGIN HERE"}</p>
          <h2 id="mc-contact-title">{fr ? "Quel défi votre organisation cherche-t-elle à relever?" : "What challenge is your organization working through?"}</h2>
        </div>
        <div className="mc-contact-action">
          <p>{fr ? "Présentez-nous votre enjeu d’affaires. Nous vous aiderons à comprendre la situation, à examiner les possibilités et à déterminer les prochaines étapes." : "Bring us the business question. We will help you understand the situation, explore the possibilities, and determine a meaningful next step."}</p>
          <Link className="mc-button mc-button-white" href="/contact-myria">{fr ? "Entamer une conversation" : "Start a conversation"} <ArrowUpRight size={17} /></Link>
          <a className="mc-email" href="mailto:info@myriaconsulting.com">info@myriaconsulting.com</a>
        </div>
      </div>
    </section>
  );
}
