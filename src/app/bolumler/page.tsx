import type { Metadata } from "next";
import Link from "next/link";
import { loadSiteContent } from "@/lib/content/load";

export const metadata: Metadata = { title: "Bölümler · The Broken Knell" };

/** Bölüm listesi: yalnızca yayımlanmış bölümler, numaralı ve adlı. */
export default async function ChaptersPage() {
  const site = await loadSiteContent();
  const published = site.chapters.filter((chapter) => chapter.published);

  return (
    <main className="page">
      <h1 className="page__title">Bölümler</h1>
      <ol className="chapter-list">
        {published.map((chapter) => (
          <li key={chapter.no}>
            <Link href={`/bolum/${chapter.no}`} className="chapter-list__item">
              <span className="chapter-list__no">{String(chapter.no).padStart(2, "0")}</span>
              <span className="chapter-list__body">
                <span className="chapter-list__title">{chapter.title}</span>
                <span className="chapter-list__excerpt">{chapter.excerpt}</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
