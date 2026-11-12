"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { registerGsap, gsap } from "@/components/experience/registerGsap";
import { cn } from "@/lib/utils";

export function MaskReveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const node = ref.current;
      if (!node) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(node, {
          y: 12,
          duration: 0.7,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: node,
            start: "top 90%",
            once: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: ref, revertOnUpdate: true },
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
