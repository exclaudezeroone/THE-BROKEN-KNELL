import { describe, expect, it } from "vitest";
import { getChapter, listChapters, loadSiteContent } from "./load";

describe("içerik yükleyici (gerçek YAML dosyaları)", () => {
  it("site içeriği şemaya uyar", async () => {
    const site = await loadSiteContent();
    expect(site.title).toBeTruthy();
    expect(site.chapters.some((c) => c.no === site.firstChapter)).toBe(true);
  });

  it("bölüm listesi yayımlanmış bölümleri verir ve her biri yüklenir", async () => {
    const chapters = await listChapters();
    expect(chapters.length).toBeGreaterThan(0);
    for (const { no } of chapters) {
      const chapter = await getChapter(no);
      expect(chapter.no).toBe(no);
      expect(chapter.panels.length).toBeGreaterThan(0);
    }
  });
});
