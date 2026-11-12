"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { galleryCategories, galleryItems, type GalleryCategory, type GalleryItem } from "@/data/gallery";
import { lockPageScroll, scheduleScrollRefresh, unlockPageScroll } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";

export function GalleryBrowser({
  items = galleryItems,
  showFilters = true,
}: {
  items?: GalleryItem[];
  showFilters?: boolean;
}) {
  const [category, setCategory] = useState<GalleryCategory>("All");
  const [activeId, setActiveId] = useState<string | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const reduced = useReducedMotion();
  const visible = category === "All" ? items : items.filter((item) => item.category === category);
  const activeIndex = visible.findIndex((item) => item.id === activeId);
  const active = activeIndex >= 0 ? visible[activeIndex] : null;

  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    if (active && !node.open) node.showModal();
    if (!active && node.open) node.close();
  }, [active]);

  useEffect(() => {
    scheduleScrollRefresh();
  }, [category, visible.length]);

  useEffect(() => {
    if (!activeId) return;
    lockPageScroll();
    return () => unlockPageScroll();
  }, [activeId]);

  function move(direction: -1 | 1) {
    const list = category === "All" ? items : items.filter((item) => item.category === category);
    const current = list.findIndex((item) => item.id === activeId);
    if (!list.length || current < 0) return;
    const next = (current + direction + list.length) % list.length;
    setActiveId(list[next].id);
  }

  useEffect(() => {
    if (!activeId) return;

    function onKey(event: KeyboardEvent) {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      const list = category === "All" ? items : items.filter((item) => item.category === category);
      const current = list.findIndex((item) => item.id === activeId);
      if (!list.length || current < 0) return;
      const step = event.key === "ArrowRight" ? 1 : -1;
      const next = (current + step + list.length) % list.length;
      setActiveId(list[next].id);
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeId, category, items]);

  return (
    <div>
      {showFilters ? (
        <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Gallery categories">
          {galleryCategories.map((item) => (
            <button
              key={item}
              type="button"
              className={cn(
                "min-h-11 rounded-full border px-4 text-sm font-semibold motion-safe:transition",
                category === item ? "border-gold bg-gold text-navy" : "border-white/15 text-ink hover:border-white/35",
              )}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {visible.map((item) => (
          <button
            key={item.id}
            type="button"
            className="mb-4 block w-full overflow-hidden rounded-[1.4rem] text-left break-inside-avoid motion-safe:transition motion-safe:duration-300 motion-safe:hover:-translate-y-1"
            onClick={() => setActiveId(item.id)}
          >
            <span className={cn("relative block overflow-hidden bg-navy-800", item.ratio)}>
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 100vw"
                quality={88}
                className="object-cover motion-safe:transition motion-safe:duration-700 motion-safe:hover:scale-[1.03]"
              />
            </span>
            <span className="mt-3 block px-1">
              <span className="block text-xs font-bold tracking-[0.16em] text-gold uppercase">{item.category}</span>
              <span className="mt-1 block font-semibold">{item.title}</span>
              <span className="mt-1 block text-sm text-muted">{item.caption}</span>
            </span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="lightbox"
        data-lenis-prevent
        onClose={() => setActiveId(null)}
        onCancel={() => setActiveId(null)}
      >
        {active ? (
          <motion.div
            key={active.id}
            className="grid gap-4 p-4 md:p-5"
            initial={reduced ? false : { opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold tracking-[0.16em] text-gold uppercase">{active.category}</p>
                <h2 className="mt-1 font-display text-xl md:text-2xl">{active.title}</h2>
              </div>
              <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15" onClick={() => setActiveId(null)} aria-label="Close image">
                <X aria-hidden="true" />
              </button>
            </div>
            <div className="relative aspect-square max-h-[70vh] overflow-hidden rounded-2xl bg-black sm:aspect-[4/3]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.src}
                  className="absolute inset-0"
                  initial={reduced ? false : { opacity: 0.35, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduced ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image src={active.src} alt={active.alt} fill sizes="(min-width: 768px) 720px, 90vw" quality={88} className="object-contain" />
                </motion.div>
              </AnimatePresence>
            </div>
            <p className="text-sm text-muted">{active.caption}</p>
            <div className="flex gap-2">
              <button type="button" className="btn btn-secondary" onClick={() => move(-1)}>
                <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Previous
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => move(1)}>
                Next <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        ) : null}
      </dialog>
    </div>
  );
}
