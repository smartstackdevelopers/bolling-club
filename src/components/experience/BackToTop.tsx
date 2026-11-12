"use client";

import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { scrollToTarget, subscribeLenis } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    return subscribeLenis((lenis) => {
      const update = () => {
        const y = lenis?.scroll ?? window.scrollY;
        setVisible(y > 640);
      };
      update();
      window.addEventListener("scroll", update, { passive: true });
      if (lenis) lenis.on("scroll", update);
      return () => {
        window.removeEventListener("scroll", update);
        lenis?.off("scroll", update);
      };
    });
  }, []);

  return (
    <button
      type="button"
      className={cn("back-to-top", visible && "is-visible")}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      onClick={() => scrollToTarget(0, { offset: 0 })}
    >
      <ChevronUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
