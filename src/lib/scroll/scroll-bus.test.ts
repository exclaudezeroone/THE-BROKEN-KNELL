import { describe, expect, it } from "vitest";
import {
  computeProgress,
  getScrollSnapshot,
  publishScroll,
  resetScroll,
  subscribeScroll,
} from "./scroll-bus";
import { MOTION_NAMES, isMotionName } from "./motion-names";

describe("computeProgress", () => {
  it("0..1 aralığına sıkıştırır", () => {
    expect(computeProgress(50, 100)).toBe(0.5);
    expect(computeProgress(-10, 100)).toBe(0);
    expect(computeProgress(500, 100)).toBe(1);
  });

  it("kaydırılamayan sayfada 0 döner (sıfıra bölme yok)", () => {
    expect(computeProgress(0, 0)).toBe(0);
    expect(computeProgress(10, -5)).toBe(0);
  });
});

describe("scroll-bus", () => {
  it("abone ilk değeri hemen alır, yayınları izler, aboneliği bırakır", () => {
    resetScroll();
    const seen: number[] = [];
    const off = subscribeScroll((s) => seen.push(s.progress));
    publishScroll({ scroll: 25, limit: 100 });
    publishScroll({ scroll: 100, limit: 100 });
    off();
    publishScroll({ scroll: 0, limit: 100 });
    expect(seen).toEqual([0, 0.25, 1]);
    expect(getScrollSnapshot().progress).toBe(0);
  });
});

describe("hareket adları", () => {
  it("geçerli adları tanır, bilinmeyeni reddeder", () => {
    for (const name of MOTION_NAMES) expect(isMotionName(name)).toBe(true);
    expect(isMotionName("spin")).toBe(false);
  });
});
