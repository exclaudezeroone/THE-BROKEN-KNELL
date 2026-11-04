"use client";

import { useEffect, useRef } from "react";
import { subscribeScroll } from "@/lib/scroll/scroll-bus";

/**
 * İnce okuma ilerleme çubuğu. Yalnızca `transform: scaleX` değişir;
 * React durumu yoktur, her kaydırmada yeniden render olmaz.
 */
export function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(
    () =>
      subscribeScroll(({ progress }) => {
        const bar = barRef.current;
        if (bar) bar.style.transform = `scaleX(${progress})`;
      }),
    [],
  );

  return (
    <div className="progress" aria-hidden="true">
      <div ref={barRef} className="progress__bar" />
    </div>
  );
}
