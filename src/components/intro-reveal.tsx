"use client";

import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useRef, type ReactNode } from "react";
import { gsap, registerGsap } from "@/lib/scroll/gsap-setup";
import { useUiStore } from "@/lib/stores/ui-store";

registerGsap();
gsap.registerPlugin(SplitText);

type IntroRevealProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Giriş başlığı: kelimeler sırayla yukarıdan belirir (SplitText).
 * Erişilebilirlik: SplitText `aria: "auto"` ile orijinal metni aria-label'da korur.
 * Hareket azaltılmışsa metin olduğu gibi kalır.
 */
export function IntroReveal({ children, className }: IntroRevealProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduced = useUiStore((s) => s.reducedMotion);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced) return;
      const split = SplitText.create(el, { type: "words", aria: "auto" });
      gsap.from(split.words, {
        yPercent: 60,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.12,
      });
      return () => split.revert();
    },
    { scope: ref, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <h1 ref={ref} className={className}>
      {children}
    </h1>
  );
}
