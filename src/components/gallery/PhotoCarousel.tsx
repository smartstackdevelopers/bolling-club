"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import type { PhotoSlide } from "@/data/photos";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { lockPageScroll, unlockPageScroll } from "@/lib/smooth-scroll";

export function PhotoCarousel({
  slides,
  label,
  interval = 5500,
  ratio = "aspect-[4/3]",
  className,
  cinematic = false,
}: {
  slides: PhotoSlide[];
  label: string;
  interval?: number;
  ratio?: string;
  className?: string;
  cinematic?: boolean;
}) {
  const reduced = usePrefersReducedMotion();
  const labelId = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: slides.length > 1,
    align: cinematic ? "center" : "start",
    duration: 28,
  });
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState<PhotoSlide | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (reduced || paused || !emblaApi || slides.length < 2) return;
    const timer = window.setInterval(() => emblaApi.scrollNext(), interval);
    return () => window.clearInterval(timer);
  }, [emblaApi, interval, paused, reduced, slides.length]);

  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    if (lightbox && !node.open) node.showModal();
    if (!lightbox && node.open) node.close();
  }, [lightbox]);

  useEffect(() => {
    if (!lightbox) return;
    lockPageScroll();
    return () => unlockPageScroll();
  }, [lightbox]);

  if (!slides.length) return null;

  return (
    <div
      className={cn("group relative min-w-0", className)}
      role="region"
      aria-roledescription="carousel"
      aria-labelledby={labelId}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <p id={labelId} className="sr-only">
        {label}
      </p>
      <div className="overflow-hidden rounded-[1.4rem]" ref={emblaRef} data-lenis-prevent-horizontal>
        <div className="flex">
          {slides.map((slide) => (
            <div
              key={slide.src}
              className={cn("min-w-0", cinematic ? "flex-[0_0_82%] px-2 md:flex-[0_0_58%]" : "flex-[0_0_100%]")}
            >
              <button
                type="button"
                className={cn("relative block w-full overflow-hidden bg-navy-800", cinematic ? "aspect-[16/10] rounded-[1.2rem]" : ratio)}
                onClick={() => setLightbox(slide)}
                aria-label={`Open photograph: ${slide.alt}`}
              >
                <Image src={slide.src} alt={slide.alt} fill sizes="(min-width: 1024px) 640px, 100vw" quality={88} className="object-cover" draggable={false} />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                <span className="absolute right-4 bottom-4 left-4 text-left text-sm leading-6 text-ink/90">{slide.caption}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
      {slides.length > 1 ? (
        <>
          <div className="pointer-events-none absolute inset-y-0 right-3 left-3 flex items-center justify-between">
            <button
              type="button"
              className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-navy/70 text-ink backdrop-blur-md transition hover:border-gold/50"
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Previous photograph"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-navy/70 text-ink backdrop-blur-md transition hover:border-gold/50"
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Next photograph"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-4 flex justify-center gap-2" role="tablist" aria-label={`${label} slides`}>
            {slides.map((item, slideIndex) => (
              <button
                key={item.src}
                type="button"
                role="tab"
                aria-selected={slideIndex === index}
                aria-label={`Show photograph ${slideIndex + 1} of ${slides.length}`}
                className={cn("h-2.5 rounded-full transition-all", slideIndex === index ? "w-8 bg-gold" : "w-2.5 bg-white/25 hover:bg-white/50")}
                onClick={() => emblaApi?.scrollTo(slideIndex)}
              />
            ))}
          </div>
        </>
      ) : null}
      <dialog
        ref={dialog}
        className="lightbox"
        data-lenis-prevent
        onClose={() => setLightbox(null)}
        onCancel={() => setLightbox(null)}
      >
        {lightbox ? (
          <div className="grid gap-4 p-4 md:p-5">
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm text-muted">{lightbox.caption}</p>
              <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15" onClick={() => setLightbox(null)} aria-label="Close image">
                <X aria-hidden="true" />
              </button>
            </div>
            <div className="relative aspect-square max-h-[70vh] overflow-hidden rounded-2xl bg-black sm:aspect-[4/3]">
              <Image src={lightbox.src} alt={lightbox.alt} fill sizes="(min-width: 768px) 720px, 90vw" quality={90} className="object-contain" />
            </div>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
