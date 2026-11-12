"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    for (const node of [ring.current, dot.current]) {
      if (node) node.style.opacity = "1";
    }

    function move(event: PointerEvent) {
      const transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      if (ring.current) ring.current.style.transform = transform;
      if (dot.current) dot.current.style.transform = transform;
    }

    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" style={{ opacity: 0 }} aria-hidden="true" />
      <div ref={dot} className="cursor-dot" style={{ opacity: 0 }} aria-hidden="true" />
    </>
  );
}
