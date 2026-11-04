import { describe, expect, it } from "vitest";
import { getChapter, listChapters } from "./load";
import { PanelSchema } from "./schema";

const VALID_PANEL = {
  id: "test-panel",
  alt: "Test panelinin anlamlı alternatif metni",
  ratio: {
    mobile: "9 / 16",
    desktop: "16 / 9",
  },
  motion: "fade-up",
  placeholder: "ink",
  layers: [],
} as const;

describe("YAML content loader", () => {
  it("lists only published chapters with navigation fields", async () => {
    await expect(listChapters()).resolves.toEqual([{ no: 1, title: "Çanın İlk Yankısı" }]);
  });

  it("loads and validates the first chapter", async () => {
    const chapter = await getChapter(1);

    expect(chapter.no).toBe(1);
    expect(chapter.panels).toHaveLength(5);
    expect(chapter.panels.every((panel) => panel.alt.length > 0)).toBe(true);
  });

  it("rejects invalid chapter numbers before touching the filesystem", async () => {
    await expect(getChapter(0)).rejects.toThrow(TypeError);
    await expect(getChapter(Number.NaN)).rejects.toThrow(
      "Bolum numarasi pozitif bir tam sayi olmali",
    );
  });
});

describe("PanelSchema", () => {
  it("accepts the shared motion contract", () => {
    expect(PanelSchema.safeParse(VALID_PANEL).success).toBe(true);
  });

  it("rejects unknown motion names", () => {
    const result = PanelSchema.safeParse({
      ...VALID_PANEL,
      motion: "spin",
    });

    expect(result.success).toBe(false);
  });

  it("rejects malformed aspect ratios and unknown fields", () => {
    const result = PanelSchema.safeParse({
      ...VALID_PANEL,
      ratio: { mobile: "portrait", desktop: "16 / 9" },
      typo: true,
    });

    expect(result.success).toBe(false);
  });
});
