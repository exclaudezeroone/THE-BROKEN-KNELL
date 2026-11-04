/**
 * Hareket sözlüğü adları (repo kit/01-onemli-adresler.md, bölüm 4.2).
 *
 * Bu dosya GSAP içermez: sunucu tarafı (Zod şeması, YAML yükleyici) güvenle
 * içe aktarabilir. Hareketlerin kendisi `motions.ts` içinde, yalnızca istemcide.
 */
export const MOTION_NAMES = [
  "fade-up",
  "stagger",
  "parallax",
  "zoom",
  "shake",
  "speed-lines",
  "onomatope",
  "darken",
  "sticky",
] as const;

export type MotionName = (typeof MOTION_NAMES)[number];

export function isMotionName(value: string): value is MotionName {
  return (MOTION_NAMES as readonly string[]).includes(value);
}
