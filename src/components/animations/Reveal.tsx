"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { registerGsap, gsap } from "@/components/experience/registerGsap";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const node = ref.current;
      if (!node) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(node, {
          y: 16,
          duration: 0.6,
          delay,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: node,
            start: "top 92%",
            once: true,
          },
        });
      });

      return () => mm.revert();
    },
    { dependencies: [delay], scope: ref, revertOnUpdate: true },
  );

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
