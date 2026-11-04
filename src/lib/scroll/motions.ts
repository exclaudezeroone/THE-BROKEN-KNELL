import { gsap } from "./gsap-setup";
import { isMotionName, type MotionName } from "./motion-names";

/**
 * Hareketleri DOM özniteliklerinden bağlar.
 *
 * SÖZLEŞME (panel bileşeni bunu üretir, GSAP kodu bileşende yazılmaz):
 *   [data-panel]                 panel kökü
 *   data-motion="fade-up"        hareket adı (motion-names.ts). Boşlukla birden fazla olabilir.
 *   [data-layer]                 panelin iç katmanı (görsel buna konur). `zoom` ve `shake`
 *                                için ZORUNLU: panelin kendisi ölçeklenirse komşu panellere
 *                                ve yatay kaydırmaya taşar. Panel `overflow: hidden` olmalı;
 *                                katman payı için `position:absolute; inset:-3%` önerilir.
 *                                `fade-up`, `darken`, `stagger` katman yoksa panele uygulanır.
 *   [data-layer][data-depth=".3"] parallax derinliği (0..1, varsayılan 0.2)
 *   [data-item]                  `stagger` ve `onomatope` için sırayla beliren alt öğeler
 *
 * Yalnızca `transform` ve `opacity` animasyonlanır (CLAUDE.md bölüm 6).
 * Bu fonksiyon bir gsap.context / useGSAP içinde çağrılmalıdır; temizlik
 * oradan gelir.
 */

type MotionContext = {
  panel: HTMLElement;
  /** İlk [data-layer]; yoksa null. */
  layer: HTMLElement | null;
  /** layer ?? panel: taşma riski olmayan hareketler (opacity, küçük y) için. */
  target: HTMLElement;
};

type MotionFn = (ctx: MotionContext) => void;

const warned = new Set<string>();

function warnOnce(key: string, message: string): void {
  if (process.env.NODE_ENV === "production" || warned.has(key)) return;
  warned.add(key);
  console.warn(message);
}

const MISSING_LAYER = (name: string): string =>
  `[motions] "${name}" için panelde [data-layer] gerekli; hareket atlandı.`;

const MOTIONS: Partial<Record<MotionName, MotionFn>> = {
  "fade-up": ({ panel, target }) => {
    gsap.from(target, {
      opacity: 0,
      y: 48,
      duration: 0.9,
      ease: "power2.out",
      scrollTrigger: { trigger: panel, start: "top 85%", once: true },
    });
  },

  stagger: ({ panel }) => {
    const items = panel.querySelectorAll<HTMLElement>("[data-item]");
    if (items.length === 0) return;
    gsap.from(items, {
      opacity: 0,
      y: 28,
      duration: 0.7,
      ease: "power2.out",
      stagger: 0.14,
      scrollTrigger: { trigger: panel, start: "top 75%", once: true },
    });
  },

  parallax: ({ panel }) => {
    const layers = panel.querySelectorAll<HTMLElement>("[data-layer]");
    for (const layer of layers) {
      const depth = Number(layer.dataset.depth ?? "0.2");
      const amount = (Number.isFinite(depth) ? depth : 0.2) * 30;
      gsap.fromTo(
        layer,
        { yPercent: -amount },
        {
          yPercent: amount,
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }
  },

  zoom: ({ panel, layer }) => {
    if (!layer) return warnOnce("layer:zoom", MISSING_LAYER("zoom"));
    gsap.fromTo(
      layer,
      { scale: 1 },
      {
        scale: 1.18,
        ease: "none",
        scrollTrigger: {
          trigger: panel,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  },

  shake: ({ panel, layer }) => {
    if (!layer) return warnOnce("layer:shake", MISSING_LAYER("shake"));
    gsap
      .timeline({
        scrollTrigger: { trigger: panel, start: "top 60%", once: true },
      })
      .to(layer, {
        keyframes: [
          { x: -9, y: 4, duration: 0.05 },
          { x: 8, y: -5, duration: 0.05 },
          { x: -6, y: 3, duration: 0.05 },
          { x: 5, y: -2, duration: 0.05 },
          { x: -3, y: 1, duration: 0.05 },
          { x: 0, y: 0, duration: 0.08 },
        ],
      });
  },

  onomatope: ({ panel }) => {
    const items = panel.querySelectorAll<HTMLElement>("[data-item]");
    if (items.length === 0) return;
    gsap.from(items, {
      opacity: 0,
      scale: 0.5,
      rotation: -6,
      duration: 0.55,
      ease: "back.out(2.4)",
      stagger: 0.12,
      scrollTrigger: { trigger: panel, start: "top 65%", once: true },
    });
  },

  darken: ({ panel, target }) => {
    gsap.fromTo(
      target,
      { opacity: 1 },
      {
        opacity: 0.12,
        ease: "none",
        scrollTrigger: {
          trigger: panel,
          start: "center 35%",
          end: "bottom 10%",
          scrub: true,
        },
      },
    );
  },
};

export type ApplyMotionsOptions = {
  /** true ise hiçbir hareket bağlanmaz; içerik olduğu gibi kalır. */
  reduced: boolean;
};

/** `root` altındaki tüm `[data-panel][data-motion]` öğelerine hareket bağlar. */
export function applyMotions(root: ParentNode, { reduced }: ApplyMotionsOptions): void {
  if (reduced) return;

  const panels = root.querySelectorAll<HTMLElement>("[data-panel][data-motion]");
  for (const panel of panels) {
    const names = (panel.dataset.motion ?? "").split(/\s+/).filter(Boolean);
    const layer = panel.querySelector<HTMLElement>("[data-layer]");
    const target = layer ?? panel;

    for (const name of names) {
      if (!isMotionName(name)) {
        warnOnce(`unknown:${name}`, `[motions] Bilinmeyen hareket: "${name}"`);
        continue;
      }
      const run = MOTIONS[name];
      if (!run) {
        warnOnce(`todo:${name}`, `[motions] "${name}" henüz uygulanmadı.`);
        continue;
      }
      run({ panel, layer, target });
    }
  }
}
