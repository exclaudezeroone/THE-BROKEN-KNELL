import { notFound } from "next/navigation";
import { PanelStrip } from "@/components/panel-strip";
import { getChapter, listChapters } from "@/lib/content/load";
import styles from "./chapter.module.css";

type ChapterPageProps = {
  readonly params: Promise<{ readonly no: string }>;
};

function parseChapterNumber(value: string): number | null {
  if (!/^[1-9]\d*$/.test(value)) {
    return null;
  }

  const chapterNo = Number(value);
  return Number.isSafeInteger(chapterNo) ? chapterNo : null;
}

/** Statically declares every published chapter route. */
export async function generateStaticParams() {
  const chapters = await listChapters();
  return chapters.map((chapter) => ({ no: String(chapter.no) }));
}

/** Renders one validated chapter as a continuous vertical panel strip. */
export default async function ChapterPage({ params }: ChapterPageProps) {
  const { no } = await params;
  const chapterNo = parseChapterNumber(no);

  if (chapterNo === null) {
    notFound();
  }

  const chapters = await listChapters();
  if (!chapters.some((chapter) => chapter.no === chapterNo)) {
    notFound();
  }

  const chapter = await getChapter(chapterNo);

  return (
    <main className={styles.chapter}>
      <header className={styles.header}>
        <p>Bölüm {String(chapter.no).padStart(2, "0")}</p>
        <h1>{chapter.title}</h1>
        <span>{chapter.excerpt}</span>
      </header>
      <PanelStrip chapter={chapter} />
    </main>
  );
}
