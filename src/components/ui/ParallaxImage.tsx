"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

export function ParallaxImage({
  src,
  alt,
  sizes,
  preload = false,
  objectPosition = "center",
  className = "object-cover",
}: {
  src: string;
  alt: string;
  sizes: string;
  preload?: boolean;
  objectPosition?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div className="absolute -inset-[10%] motion-reduce:inset-0 motion-reduce:transform-none" style={{ y }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          preload={preload}
          quality={90}
          className={className}
          style={{ objectPosition }}
        />
      </motion.div>
    </div>
  );
}
