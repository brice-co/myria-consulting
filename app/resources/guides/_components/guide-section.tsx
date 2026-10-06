import type { GuideSection as GuideSectionType } from "../_types/guide";
import styles from "./guide.module.css";

export function GuideSection({ section }: { section: GuideSectionType }) {
  return (
    <section className={styles.section} id={section.id}>
      <header className={styles.sectionHeader}>
        <span className={styles.sectionNumber}>{section.number}</span>
        <div>
          <h2>{section.title}</h2>
          <p>{section.summary}</p>
        </div>
      </header>

      <div className={styles.sectionContent}>
        {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}

        {section.bullets ? (
          <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>
        ) : null}

        {section.questions ? (
          <aside className={styles.questions}>
            <p className={styles.panelEyebrow}>Questions to ask</p>
            {section.questions.map((question) => (
              <div className={styles.question} key={question}>{question}</div>
            ))}
          </aside>
        ) : null}

        {section.example ? (
          <aside className={styles.example}>
            <p className={styles.panelEyebrow}>Applied example</p>
            <h3>{section.example.title}</h3>
            {section.example.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </aside>
        ) : null}
      </div>
    </section>
  );
}
