"use client";

import { useEffect, useRef } from "react";
import { subscribeLenis } from "@/lib/smooth-scroll";

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return subscribeLenis((lenis) => {
      const update = () => {
        const progress = lenis ? lenis.progress : (() => {
          const height = document.documentElement.scrollHeight - window.innerHeight;
          return height > 0 ? window.scrollY / height : 0;
        })();
        if (bar.current) bar.current.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
      };
      update();
      if (!lenis) {
        window.addEventListener("scroll", update, { passive: true });
        return () => window.removeEventListener("scroll", update);
      }
      lenis.on("scroll", update);
      return () => lenis.off("scroll", update);
    });
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div ref={bar} className="scroll-progress-bar" />
    </div>
  );
}
