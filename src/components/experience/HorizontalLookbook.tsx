import Image from "next/image";
import type { PhotoSlide } from "@/data/photos";

export function HorizontalLookbook({ slides, label }: { slides: PhotoSlide[]; label: string }) {
  return (
    <div className="lookbook" role="region" aria-label={label}>
      <div className="lookbook-viewport" data-lenis-prevent>
        <div className="lookbook-track">
          {slides.map((slide) => (
            <figure key={slide.src} className="lookbook-card">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem] bg-navy-800">
                <Image src={slide.src} alt={slide.alt} fill sizes="(min-width: 1024px) 28vw, 80vw" quality={75} className="object-cover" />
              </div>
              <figcaption className="mt-3 text-sm text-muted">{slide.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
