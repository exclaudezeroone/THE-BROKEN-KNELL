import type { Metadata } from "next";
import { loadSiteContent } from "@/lib/content/load";

export const metadata: Metadata = { title: "Hakkında · The Broken Knell" };

export default async function AboutPage() {
  const site = await loadSiteContent();

  return (
    <main className="page">
      <h1 className="page__title">Hakkında</h1>
      <div className="prose">
        {site.about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </main>
  );
}
