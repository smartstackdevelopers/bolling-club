"use client";

import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import type { FaqItem } from "@/data/faq";
import { scheduleScrollRefresh } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    scheduleScrollRefresh();
  }, [open]);

  return (
    <div className="grid gap-3">
      {items.map((item) => {
        const expanded = open === item.id;
        return (
          <div key={item.id} className="glass-card px-4 md:px-5">
            <h3>
              <button
                type="button"
                className="flex min-h-14 w-full items-center justify-between gap-4 py-3 text-left font-semibold"
                aria-expanded={expanded}
                onClick={() => setOpen(expanded ? null : item.id)}
              >
                <span>{item.question}</span>
                {expanded ? <Minus className="shrink-0" aria-hidden="true" /> : <Plus className="shrink-0" aria-hidden="true" />}
              </button>
            </h3>
            <div className={cn("accordion-panel", expanded && "open")}>
              <div>
                <p className="pb-4 text-sm leading-7 text-muted">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
