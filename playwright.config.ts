import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  reporter: "list",
  use: { baseURL: `http://localhost:${PORT}` },
  webServer: {
    command: `corepack pnpm exec next start -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: true,
    timeout: 60_000,
  },
  projects: [
    { name: "mobil", use: { ...devices["Pixel 7"] } },
    { name: "masaustu", use: { ...devices["Desktop Chrome"] } },
  ],
});
