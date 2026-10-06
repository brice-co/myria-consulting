import type { Guide } from "../_types/guide";
import styles from "./guide.module.css";

export function GuideSidebar({ guide }: { guide: Guide }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarInner}>
        <p className={styles.sidebarEyebrow}>In this guide</p>
        <nav aria-label="Guide table of contents">
          <ol className={styles.sidebarList}>
            {guide.sections.map((section) => (
              <li key={section.id}>
                <a className={styles.sidebarLink} href={`#${section.id}`}>
                  <span>{section.number}</span>
                  <span>{section.title}</span>
                </a>
              </li>
            ))}
            <li><a className={styles.sidebarLink} href="#intelligence-pattern"><span>A</span><span>Choose the intelligence pattern</span></a></li>
            <li><a className={styles.sidebarLink} href="#opportunity-canvas"><span>B</span><span>AI Opportunity Canvas</span></a></li>
            <li><a className={styles.sidebarLink} href="#checklist"><span>C</span><span>Readiness checklist</span></a></li>
          </ol>
        </nav>
      </div>
    </aside>
  );
}
