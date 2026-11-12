"use client";

import Image from "next/image";
import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import type { PhotoSlide } from "@/data/photos";

export function HorizontalLookbook({ slides, label }: { slides: PhotoSlide[]; label: string }) {
  const viewport = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = viewport.current;
    if (!node) return;

    let startX = 0;
    let startY = 0;
    let axis: "x" | "y" | null = null;

    const onStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      startX = touch.clientX;
      startY = touch.clientY;
      axis = null;
      node.style.overflowX = "";
    };

    const onMove = (event: TouchEvent) => {
      if (axis) return;
      const touch = event.touches[0];
      if (!touch) return;
      const dx = Math.abs(touch.clientX - startX);
      const dy = Math.abs(touch.clientY - startY);
      if (dx < 8 && dy < 8) return;
      axis = dy > dx ? "y" : "x";
      if (axis === "y") node.style.overflowX = "hidden";
    };

    const onEnd = () => {
      axis = null;
      node.style.overflowX = "";
    };

    node.addEventListener("touchstart", onStart, { passive: true });
    node.addEventListener("touchmove", onMove, { passive: true });
    node.addEventListener("touchend", onEnd, { passive: true });
    node.addEventListener("touchcancel", onEnd, { passive: true });
    return () => {
      node.removeEventListener("touchstart", onStart);
      node.removeEventListener("touchmove", onMove);
      node.removeEventListener("touchend", onEnd);
      node.removeEventListener("touchcancel", onEnd);
    };
  }, []);

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const node = viewport.current;
    if (!node) return;

    const startX = event.clientX;
    const startY = event.clientY;
    const startScroll = node.scrollLeft;
    let dragging = false;

    const onMove = (move: PointerEvent) => {
      const dx = move.clientX - startX;
      const dy = move.clientY - startY;
      if (!dragging) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
        if (Math.abs(dy) > Math.abs(dx)) {
          onUp(move);
          return;
        }
        dragging = true;
        node.classList.add("is-dragging");
        node.setPointerCapture(move.pointerId);
      }
      node.scrollLeft = startScroll - dx;
    };
    const onUp = (up: PointerEvent) => {
      dragging = false;
      node.classList.remove("is-dragging");
      if (node.hasPointerCapture(up.pointerId)) node.releasePointerCapture(up.pointerId);
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerup", onUp);
      node.removeEventListener("pointercancel", onUp);
    };

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerup", onUp);
    node.addEventListener("pointercancel", onUp);
  }

  return (
    <div className="lookbook" role="region" aria-label={label}>
      <div ref={viewport} className="lookbook-viewport" onPointerDown={onPointerDown}>
        <div className="lookbook-track">
          {slides.map((slide) => (
            <figure key={slide.src} className="lookbook-card">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem] bg-navy-800">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(min-width: 1024px) 28vw, 80vw"
                  quality={75}
                  draggable={false}
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-sm text-muted">{slide.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
