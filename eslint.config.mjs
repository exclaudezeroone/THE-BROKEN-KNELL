import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // CLAUDE.md bölüm 6: `any` kullanılmaz.
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
  globalIgnores([".next/**", "out/**", "next-env.d.ts", "repo kit/**", "test-results/**"]),
]);
