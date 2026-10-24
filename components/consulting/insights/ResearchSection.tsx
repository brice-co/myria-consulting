import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { studies } from "@/lib/insights/studies";
import { StudyCard } from "./StudyCard";

/** A curated set, not an automatically scraped feed or a claim of affiliation. */
export function ResearchSection() {
  return (
    <section id="research" className="mc-section mc-research" aria-labelledby="mc-research-title">
      <div className="mc-container">
        <div className="mc-research-heading">
          <div>
            <p className="mc-eyebrow">07 — RESEARCH WE ARE READING</p>
            <h2 id="mc-research-title">Good decisions start with evidence.</h2>
          </div>
          <div className="mc-research-intro">
            <p>
              We look beyond new technology to the research on organizations,
              work and implementation. Each study is paired with the questions it
              raises for Myria's advisory practice.
            </p>
            <Link href="/insights">
              Explore research &amp; perspectives <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="mc-research-grid">
          {studies.slice(0, 3).map((study) => <StudyCard key={study.id} study={study} />)}
        </div>
        <p className="mc-research-note">
          Sources are independently published. The summaries distinguish source findings
          from Myria's interpretation and do not imply affiliation or endorsement.
        </p>
      </div>
    </section>
  );
}
