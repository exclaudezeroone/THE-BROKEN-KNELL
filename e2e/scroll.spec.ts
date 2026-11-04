import { expect, test } from "@playwright/test";

test("kaydırınca ilerleme çubuğu büyür ve hareketler çalışır", async ({ page }) => {
  await page.goto("/bolum/1");

  const bar = page.locator(".progress__bar");
  const scaleX = async () => bar.evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).a);

  expect(await scaleX()).toBeLessThan(0.05);

  // 3. panele (shake) ve sona kadar kaydır
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect.poll(scaleX, { timeout: 5000 }).toBeGreaterThan(0.95);

  // fade-up: son panel görünür olmalı (opacity 1'e ulaşır)
  const last = page.locator("[data-panel]").last();
  await expect
    .poll(() => last.evaluate((el) => Number(getComputedStyle(el).opacity)), {
      timeout: 5000,
    })
    .toBe(1);
});

test("yatay taşma yok (mobil)", async ({ page }) => {
  await page.goto("/bolum/1");
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

test.describe("hareket azaltılmış", () => {
  test.use({ reducedMotion: "reduce" });

  test("Lenis kapalı, paneller baştan görünür", async ({ page }) => {
    await page.goto("/bolum/1");
    await expect(page.locator("html")).not.toHaveClass(/lenis/);
    const opacities = await page
      .locator("[data-panel]")
      .evaluateAll((els) => els.map((el) => Number(getComputedStyle(el).opacity)));
    expect(opacities.every((o) => o === 1)).toBe(true);
  });
});

test("Lenis açık (hareket serbest)", async ({ page }) => {
  await page.goto("/bolum/1");
  await expect(page.locator("html")).toHaveClass(/lenis/);
});
