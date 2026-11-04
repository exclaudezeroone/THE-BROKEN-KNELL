/**
 * Kaydırma ilerlemesinin TEK kaynağı.
 *
 * ScrollProvider, her kaydırmada (Lenis ya da yerel kaydırma) yalnızca burayı
 * besler. Okuyucular (ilerleme çubuğu, ses, vb.) buraya abone olur; kendi
 * scroll dinleyicisi açmaz. Abonelik React durumu değildir: yeniden render
 * tetiklemez, abone doğrudan DOM'a (transform) yazar.
 */

export type ScrollSnapshot = {
  /** Mevcut kaydırma konumu (px). */
  readonly scroll: number;
  /** Kaydırılabilir en büyük konum (px). İçerik ekrana sığıyorsa 0. */
  readonly limit: number;
  /** 0..1. limit 0 ise 0. */
  readonly progress: number;
  /** Piksel/sn. Pozitif aşağı. */
  readonly velocity: number;
  /** 1 aşağı, -1 yukarı, 0 duruyor. */
  readonly direction: -1 | 0 | 1;
};

export type ScrollListener = (snapshot: ScrollSnapshot) => void;

const EMPTY: ScrollSnapshot = {
  scroll: 0,
  limit: 0,
  progress: 0,
  velocity: 0,
  direction: 0,
};

export function computeProgress(scroll: number, limit: number): number {
  if (limit <= 0) return 0;
  return Math.min(1, Math.max(0, scroll / limit));
}

let current: ScrollSnapshot = EMPTY;
const listeners = new Set<ScrollListener>();

export function getScrollSnapshot(): ScrollSnapshot {
  return current;
}

export function publishScroll(input: {
  scroll: number;
  limit: number;
  velocity?: number;
  direction?: -1 | 0 | 1;
}): void {
  current = {
    scroll: input.scroll,
    limit: input.limit,
    progress: computeProgress(input.scroll, input.limit),
    velocity: input.velocity ?? 0,
    direction: input.direction ?? 0,
  };
  for (const listener of listeners) listener(current);
}

export function resetScroll(): void {
  current = EMPTY;
  for (const listener of listeners) listener(current);
}

/** Abone olur ve ilk değeri hemen verir. Dönen fonksiyon aboneliği bitirir. */
export function subscribeScroll(listener: ScrollListener): () => void {
  listeners.add(listener);
  listener(current);
  return () => {
    listeners.delete(listener);
  };
}
