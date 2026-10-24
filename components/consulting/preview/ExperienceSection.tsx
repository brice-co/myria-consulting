import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { myriaExperiences } from "./experience-content";
import { ExperienceMedia } from "./ExperienceMedia";

export function ExperienceSection() {
  return (
    <section
      className="mc-section mc-experience"
      id="experience"
      aria-labelledby="mc-experience-title"
    >
      <div className="mc-container">
        <div className="mc-experience-heading">
          <div>
            <p className="mc-eyebrow">05 — EXPERIENCE HOW MYRIA WORKS</p>
            <h2 id="mc-experience-title">
              See how the work <em>comes together.</em>
            </h2>
          </div>
          <div className="mc-experience-intro">
            <p>
              The way we work is part of what makes Myria different.
              Explore how structured advisory sessions, specialist AI advisors
              and collaborative environments contribute to better decisions.
            </p>
            <span>Human-led. Intelligence-enabled. Focused on execution.</span>
          </div>
        </div>

        <div className="mc-experience-grid">
          {myriaExperiences.map((item) => (
            <article className="mc-experience-card" key={item.id}>
              <ExperienceMedia experience={item} />
              <div className="mc-experience-card-copy">
                <div className="mc-experience-meta">
                  <span>{item.number} / 03</span>
                  <span>{item.format}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="mc-experience-foot">
                  <span>{item.outcome}</span>
                  <Link href={item.href}>
                    {item.linkLabel}
                    <ArrowUpRight size={17} strokeWidth={1.8} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mc-experience-note">
          These experiences illustrate different parts of Myria&apos;s
          advisory approach. Engagements are shaped around the
          client&apos;s objectives and context.
        </p>
      </div>
    </section>
  );
}
