"use client";

import { useEffect, useState } from "react";
import { readVisualCapability, type VisualCapability } from "@/lib/visual";

const initial: VisualCapability = {
  ready: false,
  reduced: false,
  webgl: false,
  coarse: false,
  saveData: false,
  lowPower: false,
  tier: "css",
  dpr: 1,
  particles: 0,
};

export function useVisualCapability() {
  const [capability, setCapability] = useState<VisualCapability>(initial);

  useEffect(() => {
    const update = () => setCapability(readVisualCapability());
    update();
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(pointer: coarse)");
    const width = window.matchMedia("(max-width: 1023px)");
    motion.addEventListener("change", update);
    pointer.addEventListener("change", update);
    width.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      motion.removeEventListener("change", update);
      pointer.removeEventListener("change", update);
      width.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return capability;
}
