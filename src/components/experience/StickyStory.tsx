"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { registerGsap, gsap } from "@/components/experience/registerGsap";

export function StickyStory({
  src,
  alt,
  children,
}: {
  src: string;
  alt: string;
  children: ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      const frame = image.current;
      if (!root.current || !frame) return;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          frame,
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top 18%",
              end: "bottom bottom",
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      return () => mm.revert();
    },
    { scope: root, revertOnUpdate: true },
  );

  return (
    <div ref={root} className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="lg:sticky lg:top-24">
        <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-navy-800">
          <div ref={image} className="absolute -inset-[8%]">
            <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 42vw, 100vw" quality={88} className="object-cover" />
          </div>
        </div>
      </div>
      <div className="grid min-w-0 gap-5">{children}</div>
    </div>
  );
}
