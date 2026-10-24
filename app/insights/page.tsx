import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { studies } from "@/lib/insights/studies";
import { StudyCard } from "@/components/consulting/insights/StudyCard";
import { publicPageMetadata } from "@/lib/seo";

export const metadata: Metadata = publicPageMetadata({
  title: "Research & Insights | Myria Consulting",
  description:
    "Myria's perspective on 2026 research from Stanford HAI, McKinsey, Deloitte Canada, and Stanford Digital Economy Lab, alongside our own management frameworks.",
  pathname: "/insights",
});

const ourThinking = [
  {
    title: "The Myria Management Model",
    text: "In-Depth Thinking, Intelligent Structure and Thinking Culture as mutually reinforcing management capabilities.",
    href: "/our-approach/management-model",
    label: "Explore the model",
  },
  {
    title: "Finding the right AI opportunities",
    text: "An original practical guide that begins with business objectives, decisions, exceptions and workflows.",
    href: "/resources/guides/finding-ai-opportunities",
    label: "Read the guide",
  },
  {
    title: "AI-Enabled Enterprise Playbook",
    text: "Explore the management, operating and governance questions behind AI-enabled organizational change.",
    href: "/resources/playbook",
    label: "Explore the playbook",
  },
] as const;

export default function InsightsPage() {
  return (
    <main className="myria-consulting mc-insights-page">
      <header className="mc-insights-hero">
        <div className="mc-container">
          <p className="mc-eyebrow">MYRIA / RESEARCH & INSIGHTS</p>
          <h1>Ideas worth examining.<br /><em>Decisions worth improving.</em></h1>
          <p>
            Research from respected independent institutions and industry
            practitioners, considered alongside Myria's own management
            frameworks and practical approaches.
          </p>
        </div>
      </header>
      <section className="mc-section mc-research" aria-labelledby="independent-research-heading">
        <div className="mc-container">
          <div className="mc-research-heading">
            <div>
              <p className="mc-eyebrow">INDEPENDENT SOURCES / CURATED OCTOBER 2026</p>
              <h2 id="independent-research-heading">What the research is telling us.</h2>
            </div>
            <p className="mc-research-intro">
              These links open the original publisher's work. Our interpretations
              are identified separately from the findings.
            </p>
          </div>
          <div className="mc-research-grid">
            {studies.map((study) => <StudyCard key={study.id} study={study} />)}
          </div>
          <p className="mc-research-note">
            Research belongs to its original publishers. Myria is not affiliated
            with or endorsed by these publishers. This is a curated collection,
            not a live feed; entries are reviewed before publication.
          </p>
        </div>
      </section>
      <section className="mc-section mc-owned-insights" aria-labelledby="our-thinking-title">
        <div className="mc-container">
          <p className="mc-eyebrow">OUR THINKING / APPLIED FRAMEWORKS</p>
          <h2 id="our-thinking-title">How we put those ideas to work.</h2>
          <div className="mc-owned-grid">
            {ourThinking.map((item) => (
              <article className="mc-owned-card" key={item.href}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <Link href={item.href}>
                  {item.label} <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
