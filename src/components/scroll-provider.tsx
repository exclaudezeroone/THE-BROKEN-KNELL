"use client";

import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import { applyMotions } from "@/lib/scroll/motions";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/scroll/gsap-setup";
import { publishScroll, resetScroll } from "@/lib/scroll/scroll-bus";
import { useUiStore } from "@/lib/stores/ui-store";

registerGsap();

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function readLimit(): number {
  const doc = document.documentElement;
  return Math.max(0, doc.scrollHeight - window.innerHeight);
}

/**
 * Kaydırmanın tek merkezi.
 *  - Lenis yumuşak kaydırmayı yapar (dokunmatikte yerel kaydırma kalır: mobil akıcılık).
 *  - Lenis'i GSAP ticker sürer, her kaydırmada ScrollTrigger.update çağrılır.
 *  - Kaydırma ilerlemesi yalnızca scroll-bus'a yazılır.
 *  - prefers-reduced-motion: Lenis kapalı, hareketler bağlanmaz.
 */
export function ScrollProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useUiStore((s) => s.reducedMotion);
  const setReducedMotion = useUiStore((s) => s.setReducedMotion);

  // prefers-reduced-motion'ı izle
  useEffect(() => {
    const query = window.matchMedia(REDUCED_QUERY);
    setReducedMotion(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, [setReducedMotion]);

  // Kaydırma motoru: Lenis (hareket serbestse) ya da yerel kaydırma (azaltılmışsa)
  useEffect(() => {
    if (reduced) {
      const onScroll = () => publishScroll({ scroll: window.scrollY, limit: readLimit() });
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        resetScroll();
      };
    }

    const lenis = new Lenis({ autoRaf: false, lerp: 0.1, syncTouch: false });

    lenis.on("scroll", (instance: Lenis) => {
      ScrollTrigger.update();
      publishScroll({
        scroll: instance.scroll,
        limit: instance.limit,
        velocity: instance.velocity,
        direction: instance.direction,
      });
    });

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    publishScroll({ scroll: lenis.scroll, limit: lenis.limit });

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      resetScroll();
    };
  }, [reduced]);

  // Hareketleri bağla: rota ya da azaltılmış hareket tercihi değişince yeniden kur
  useGSAP(
    () => {
      const root = wrapRef.current;
      if (!root) return;
      applyMotions(root, { reduced });
      ScrollTrigger.refresh();
    },
    { scope: wrapRef, dependencies: [pathname, reduced], revertOnUpdate: true },
  );

  // Rota değişince en üste dön. İlk açılış atlanır: yenilemede tarayıcı konumu korunur.
  const previousPath = useRef(pathname);
  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    window.scrollTo(0, 0);
  }, [pathname]);

  return <div ref={wrapRef}>{children}</div>;
}
