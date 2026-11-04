import Link from "next/link";
import { IntroReveal } from "@/components/intro-reveal";
import { loadSiteContent } from "@/lib/content/load";

/** Giriş: hikâye adı, tek cümle, "Okumaya başla". Metinler content/site.yaml'dan gelir. */
export default async function Home() {
  const site = await loadSiteContent();

  return (
    <main className="intro">
      <IntroReveal className="intro__title">{site.title}</IntroReveal>
      <p className="intro__tagline">{site.tagline}</p>
      <Link href={`/bolum/${site.firstChapter}`} className="intro__cta">
        Okumaya başla
      </Link>
    </main>
  );
}
