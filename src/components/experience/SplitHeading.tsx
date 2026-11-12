"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { registerGsap, gsap } from "@/components/experience/registerGsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

export function SplitHeading({
  text,
  as: Tag = "h2",
  className,
}: {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduced = usePrefersReducedMotion();
  const words = text.split(" ");

  useGSAP(
    () => {
      registerGsap();
      const node = ref.current;
      if (!node || reduced) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(node.querySelectorAll("[data-word]"), {
          yPercent: 18,
          duration: 0.7,
          stagger: 0.04,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: node,
            start: "top 86%",
            once: true,
          },
        });
      });
      return () => mm.revert();
    },
    { dependencies: [reduced, text], scope: ref, revertOnUpdate: true },
  );

  return (
    <Tag ref={ref} className={cn(className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
            <span data-word className="inline-block will-change-transform">
              {word}
              {index < words.length - 1 ? "\u00A0" : ""}
            </span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
