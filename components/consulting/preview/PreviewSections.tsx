import Link from "next/link";
import { ArrowUpRight, Compass, Layers3, Network, Users, ShieldCheck } from "lucide-react";
import { challenges, capabilities, philosophy, discoveryStages, insights } from "./content";

const disciplineIcons = [Compass, Layers3, Network, Users];

function SectionIntro({ eyebrow, heading, detail }: { eyebrow: string; heading: string; detail: string }) {
  return (
    <div className="mc-section-heading">
      <div>
        <p className="mc-eyebrow">{eyebrow}</p>
        <h2>{heading}</h2>
      </div>
      <p>{detail}</p>
    </div>
  );
}

export function ChallengesSection() {
  return (
    <section id="challenges" className="mc-section mc-challenges" aria-labelledby="mc-challenges-title">
      <div className="mc-container">
        <p className="mc-eyebrow">01 — THE CHALLENGES WE ADDRESS</p>
        <div className="mc-two-column-intro">
          <h2 id="mc-challenges-title">Business complexity deserves connected thinking.</h2>
          <p>Organizations rarely struggle with one issue in isolation. Strategy, operations, technology,
            and people influence each other. Our work starts by understanding those relationships
            and the decisions leaders need to make.</p>
        </div>
        <div className="mc-challenge-grid">
          {challenges.map((item) => (
            <article className="mc-challenge" key={item.number}>
              <span className="mc-index">{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="mc-challenge-response"><span>Where we help</span>{item.response}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CapabilitiesSection() {
  return (
    <section className="mc-section mc-capabilities" id="capabilities" aria-labelledby="mc-capabilities-title">
      <div className="mc-container">
        <div id="mc-capabilities-title">
          <SectionIntro eyebrow="02 — WHAT WE DO" heading="Connected expertise. Practical action."
            detail="Four complementary advisory disciplines, brought together according to the challenge — not as disconnected service offerings." />
        </div>
        <div className="mc-capabilities-grid">
          {capabilities.map((item, index) => {
            const Icon = disciplineIcons[index];
            return (
              <article className="mc-capability" key={item.number}>
                <div className="mc-capability-top"><span>{item.number} / 04</span><Icon size={29} strokeWidth={1.4} aria-hidden="true" /></div>
                <div><h3>{item.title}</h3><p>{item.description}</p><small>{item.examples}</small></div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function DifferenceSection() {
  return (
    <section className="mc-section mc-difference" id="difference" aria-labelledby="mc-difference-title">
      <div className="mc-container">
        <p className="mc-eyebrow">03 — OUR MANAGEMENT PHILOSOPHY</p>
        <div className="mc-two-column-intro">
          <h2 id="mc-difference-title">Human judgment. Intelligent support. Connected execution.</h2>
          <div>
            <p>Myria brings management consulting and intelligent systems into the same working process.
              Leaders bring context and accountability. Consultants bring methods and judgment.
              AI advisors can contribute structured exploration, analysis, and specialist perspectives.</p>
            <p className="mc-extra-paragraph">Our approach connects what an organization wants to achieve with how
              its people, decisions, workflows, and technology work together.</p>
          </div>
        </div>
        <div className="mc-philosophy-grid">
          {philosophy.map((item) => (
            <article key={item.number}>
              <span className="mc-index">{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
        <div className="mc-governance"><ShieldCheck size={21} strokeWidth={1.5} aria-hidden="true" />
          AI strengthens the advisory process; decisions, approvals, and accountability remain with people.
        </div>
      </div>
    </section>
  );
}

export function DiscoverySection() {
  return (
    <section className="mc-section mc-discovery" id="discovery" aria-labelledby="mc-discovery-title">
      <div className="mc-container mc-discovery-grid">
        <div>
          <p className="mc-eyebrow mc-eyebrow-light">04 — HOW WE WORK</p>
          <h2 id="mc-discovery-title">Start with the challenge, not the solution.</h2>
          <p className="mc-discovery-description">The Discovery Lab is a structured advisory starting point.
            We examine the business context, surface important questions, and identify where focused work can create value.</p>
          <div className="mc-discovery-actions">
            <Link className="mc-button mc-button-white" href="/labs/discovery">Explore the Discovery Lab <ArrowUpRight size={16} /></Link>
            <Link className="mc-inline-link" href="/contact-myria">Discuss your challenge <ArrowUpRight size={15} /></Link>
          </div>
          <div className="mc-governance mc-governance-light"><ShieldCheck size={20} aria-hidden="true" />
            Specialist AI advisors support exploration; the work remains human-led.
          </div>
        </div>
        <div className="mc-stage-list" aria-label="The five Discovery Lab stages">
          {discoveryStages.map((stage) => (
            <div key={stage.number} className="mc-stage">
              <span>{stage.number}</span>
              <div><h3>{stage.title}</h3><p>{stage.description}</p></div>
            </div>
          ))}
          <div className="mc-stage-result"><strong>What the Lab produces</strong>
            A structured view of the challenges, key observations, potential opportunities, risks,
            recommended priorities, and next steps.
          </div>
        </div>
      </div>
    </section>
  );
}

export function InsightsSection() {
  return (
    <section className="mc-section mc-insights" id="insights" aria-labelledby="mc-insights-title">
      <div className="mc-container">
        <div id="mc-insights-title">
          <SectionIntro eyebrow="06 — INSIGHTS & EXPERTISE" heading="Ideas grounded in the work."
            detail="Practical resources for leaders exploring strategy, transformation, and the business use of intelligent systems." />
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

export function ContactSection() {
  return (
    <section className="mc-contact" id="contact" aria-labelledby="mc-contact-title">
      <div className="mc-container mc-contact-layout">
        <div>
          <p className="mc-eyebrow mc-eyebrow-light">07 — BEGIN HERE</p>
          <h2 id="mc-contact-title">What challenge is your organization working through?</h2>
        </div>
        <div className="mc-contact-action">
          <p>Bring us the business question. We will help you understand the situation,
            explore the possibilities, and determine a meaningful next step.</p>
          <Link className="mc-button mc-button-white" href="/contact-myria">Start a conversation <ArrowUpRight size={17} /></Link>
          <a className="mc-email" href="mailto:info@myriaconsulting.com">info@myriaconsulting.com</a>
        </div>
      </div>
    </section>
  );
}
