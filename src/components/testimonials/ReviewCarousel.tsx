"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { sampleReviews } from "@/data/reviews";

export function ReviewCarousel() {
  const [index, setIndex] = useState(0);
  const review = sampleReviews[index];

  function move(direction: -1 | 1) {
    setIndex((current) => (current + direction + sampleReviews.length) % sampleReviews.length);
  }

  return (
    <div className="glass-card p-6 md:p-10">
      <p className="inline-flex rounded-full bg-rose/15 px-3 py-1 text-xs font-bold tracking-[0.14em] text-rose uppercase">
        Sample content · not a real review
      </p>
      <figure className="mt-6" aria-live="polite">
        <blockquote className="font-display text-lg leading-snug md:text-2xl">{review.quote}</blockquote>
        <figcaption className="mt-6 text-sm text-muted">
          <span className="block font-semibold text-ink">{review.name}</span>
          {review.detail}
        </figcaption>
      </figure>
      <div className="mt-8 flex gap-2">
        <button type="button" className="btn btn-secondary" onClick={() => move(-1)} aria-label="Previous sample review">
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => move(1)} aria-label="Next sample review">
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
