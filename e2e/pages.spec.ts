import { expect, test } from "@playwright/test";

test("giriş → okumaya başla → bölüm 1", async ({ page }) => {
  await page.goto("/");
  // Next.js Link'i hidrasyondan önce tıklamak gezinmeyi kaçırabilir: hidrasyonu bekle.
  await page.waitForLoadState("networkidle");
  await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName("The Broken Knell");
  await page.getByRole("link", { name: "Okumaya başla" }).click();
  await expect(page).toHaveURL(/\/bolum\/1$/);
  await expect(page.locator("[data-panel]").first()).toBeAttached();
});

test("bölümler ve hakkında sayfaları açılır", async ({ page }) => {
  await page.goto("/bolumler");
  await page.waitForLoadState("networkidle");
  await expect(page.getByRole("heading", { name: "Bölümler" })).toBeVisible();
  await page.getByRole("link", { name: /Çanın İlk Yankısı/ }).click();
  await expect(page).toHaveURL(/\/bolum\/1$/);

  await page.goto("/hakkinda");
  await expect(page.getByRole("heading", { name: "Hakkında" })).toBeVisible();
});

test("olmayan bölüm 404 verir", async ({ page }) => {
  const response = await page.goto("/bolum/999");
  expect(response?.status()).toBe(404);
});

test("bölümde hareket katmanı sözleşmesi: her panelde data-layer var", async ({ page }) => {
  await page.goto("/bolum/1");
  const missing = await page
    .locator("[data-panel]")
    .evaluateAll((els) => els.filter((el) => !el.querySelector("[data-layer]")).length);
  expect(missing).toBe(0);
});
