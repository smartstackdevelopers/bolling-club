"use client";

import { useEffect, useState } from "react";
import { subscribeLenis } from "@/lib/smooth-scroll";

export function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    return subscribeLenis((lenis) => {
      const update = () => {
        const y = lenis?.scroll ?? window.scrollY;
        setScrolled(y > threshold);
      };
      update();
      if (!lenis) {
        window.addEventListener("scroll", update, { passive: true });
        return () => window.removeEventListener("scroll", update);
      }
      lenis.on("scroll", update);
      return () => lenis.off("scroll", update);
    });
  }, [threshold]);

  return scrolled;
}
