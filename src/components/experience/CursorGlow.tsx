"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    const node = glow.current;
    if (node) node.style.opacity = "1";

    function move(event: PointerEvent) {
      if (!glow.current) return;
      glow.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    }

    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return <div ref={glow} className="cursor-glow" aria-hidden="true" />;
}
