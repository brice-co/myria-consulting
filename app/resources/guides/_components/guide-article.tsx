import Link from "next/link";
import type { Guide } from "../_types/guide";
import { GuideSection } from "./guide-section";
import { GuideSidebar } from "./guide-sidebar";
import styles from "./guide.module.css";

export function GuideArticle({ guide }: { guide: Guide }) {
  return (
    <main className={styles.page}>
      <div className={styles.topbar}>
        <Link href="/resources/guides">← Back to guides</Link>
        <span>Myria Consulting</span>
      </div>

      <header className={styles.hero}>
        <p className={styles.eyebrow}>{guide.eyebrow}</p>
        <h1>{guide.title}</h1>
        <p className={styles.description}>{guide.description}</p>
        <div className={styles.meta}>
          <span>{guide.readingTime}</span>
          <span>{guide.audience}</span>
        </div>
      </header>

      <div className={styles.layout}>
        <GuideSidebar guide={guide} />

        <article className={styles.article}>
          <section className={styles.introduction}>
            <p className={styles.panelEyebrow}>Purpose of this guide</p>
            {guide.introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <div className={styles.outcome}>
              <strong>By the end of this guide</strong>
              <p>{guide.outcome}</p>
            </div>
          </section>

          <div className={styles.flow}>
            <span>Objective</span><b>→</b><span>Value chain</span><b>→</b>
            <span>Process</span><b>→</b><span>Decision</span><b>→</b>
            <span>Exception</span><b>→</b><span>Intelligence</span><b>→</b><span>Value</span>
          </div>

          {guide.sections.map((section) => (
            <GuideSection key={section.id} section={section} />
          ))}

          <section className={styles.appendix} id="intelligence-pattern">
            <header className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>A</span>
              <div>
                <p className={styles.panelEyebrow}>Decision framework</p>
                <h2>Choose the right intelligence pattern</h2>
                <p>Use the simplest mechanism that can reliably perform the work.</p>
              </div>
            </header>
            <div className={styles.tableWrap}>
              <table>
                <thead><tr><th>Signal</th><th>Consider</th><th>Examples</th></tr></thead>
                <tbody>
                  {guide.intelligencePatterns.map((item) => (
                    <tr key={item.approach}>
                      <td>{item.signal}</td><td><strong>{item.approach}</strong></td><td>{item.examples}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={styles.appendix} id="opportunity-canvas">
            <header className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>B</span>
              <div>
                <p className={styles.panelEyebrow}>Working canvas</p>
                <h2>AI Opportunity Canvas</h2>
                <p>Summarize one opportunity before moving into architecture or implementation.</p>
              </div>
            </header>
            <div className={styles.canvas}>
              {guide.worksheet.map((field, index) => (
                <div className={styles.canvasField} key={field.label}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{field.label}</h3>
                  <p>{field.prompt}</p>
                  <i /><i /><i />
                </div>
              ))}
            </div>
          </section>

          <section className={styles.appendix} id="checklist">
            <header className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>C</span>
              <div>
                <p className={styles.panelEyebrow}>Readiness check</p>
                <h2>Before moving into solution design</h2>
              </div>
            </header>
            <div className={styles.checklist}>
              {guide.checklist.map((item) => (
                <div className={styles.checkItem} key={item.title}>
                  <span className={styles.checkbox} />
                  <div><h3>{item.title}</h3><p>{item.description}</p></div>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.cta}>
            <p className={styles.eyebrow}>From guide to working session</p>
            <h2>Bring the opportunity into the Myria Lab.</h2>
            <p>Use a guided Discovery Lab session to map the operating problem, decisions, exceptions, data, intelligence and architecture required for a practical pilot.</p>
            <Link href="/labs">Explore the Myria Labs →</Link>
          </section>
        </article>
      </div>
    </main>
  );
}
