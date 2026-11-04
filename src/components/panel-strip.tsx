import type { Chapter } from "@/lib/content/schema";
import { Panel } from "./panel";
import styles from "./panel.module.css";

type PanelStripProps = {
  readonly chapter: Chapter;
};

/** Renders a chapter as one uninterrupted vertical story strip. */
export function PanelStrip({ chapter }: PanelStripProps) {
  return (
    <article className={styles.strip} aria-label={`${chapter.no}. bölüm: ${chapter.title}`}>
      {chapter.panels.map((panel) => (
        <Panel key={panel.id} panel={panel} />
      ))}
    </article>
  );
}
