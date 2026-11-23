import Link from "next/link";
import { ArrowUpRight, Compass, Layers3, Network, Users, ShieldCheck } from "lucide-react";
import { challenges, capabilities, philosophy, discoveryStages, insights } from "./content";

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

export function ChallengesSection() {
  return (
    <section id="challenges" className="mc-section mc-challenges" aria-labelledby="mc-challenges-title">
      <div className="mc-container">
        <p className="mc-eyebrow">THE VALUE WE CREATE</p>
        <div className="mc-two-column-intro">
          <h2 id="mc-challenges-title">How we create business value.</h2>
          <p>We help organizations improve how they perform, make decisions, execute priorities, and adapt to change. Our work considers how strategy, operations, people, and technology influence one another.</p>
        </div>
        <div className="mc-challenge-grid">
          {challenges.map((item) => (
            <article className="mc-challenge" key={item.number}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="mc-challenge-response"><span>How we help</span>{item.response}</div>
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
        <div>
          <SectionIntro headingId="mc-capabilities-title" eyebrow="OUR EXPERTISE" heading="Integrated expertise. Practical execution."
            detail="We bring together management, operations, organizational transformation, and intelligent systems to address business needs in their broader context." />
        </div>
        <div className="mc-capabilities-grid">
          {capabilities.map((item, index) => {
            const Icon = disciplineIcons[index];
            return (
              <article className="mc-capability" key={item.number}>
                <div className="mc-capability-top"><Icon size={29} strokeWidth={1.4} aria-hidden="true" /></div>
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
        <p className="mc-eyebrow">OUR APPROACH</p>
        <div className="mc-two-column-intro">
          <h2 id="mc-difference-title">Think deeper. Organize intelligently. Improve continuously.</h2>
          <div>
            <p>Guided by in-depth thinking, we challenge assumptions, deepen understanding, and identify opportunities for improvement.</p>
            <p className="mc-extra-paragraph">We rethink organizational structures, design better ways of working, and align people, processes, technology, information, and decision-making around shared business objectives—supporting implementation and continuous improvement.</p>
          </div>
        </div>
        <div className="mc-philosophy-grid">
          {philosophy.map((item) => (
            <article key={item.number}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
        <div className="mc-governance"><ShieldCheck size={21} strokeWidth={1.5} aria-hidden="true" />
          AI strengthens the advisory process; decisions, approvals, and accountability remain with people.
        </div>
        <Link href="/our-approach/management-model" className="mc-management-link">
          Explore the Myria Management Model <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

export function DiscoverySection() {
  return (
    <section className="mc-section mc-discovery" id="discovery" aria-labelledby="mc-discovery-title">
      <div className="mc-container mc-discovery-grid">
        <div>
          <p className="mc-eyebrow mc-eyebrow-light">HOW WE WORK</p>
          <h2 id="mc-discovery-title">Start with understanding.</h2>
          <p className="mc-discovery-description">Our Discovery Lab offers a structured way to examine a business challenge, question assumptions, and identify practical next steps before committing to a solution.</p>
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
        <div>
          <SectionIntro headingId="mc-insights-title" eyebrow="INSIGHTS & EXPERTISE" heading="Ideas grounded in the work."
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
          <p className="mc-eyebrow mc-eyebrow-light">START A CONVERSATION</p>
          <h2 id="mc-contact-title">Let's discuss your priorities.</h2>
        </div>
        <div className="mc-contact-action">
          <p>Whether you're improving operations, managing transformation, or exploring new opportunities, we can help you evaluate the options and define a practical way forward.</p>
          <Link className="mc-button mc-button-white" href="/contact-myria">Start a conversation <ArrowUpRight size={17} /></Link>
          <a className="mc-email" href="mailto:info@myriaconsulting.com">info@myriaconsulting.com</a>
        </div>
      </div>
    </section>
  );
}
