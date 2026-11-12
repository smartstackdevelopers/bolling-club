"use client";

import { useMemo, useState } from "react";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { faqTopics, faqs, type FaqTopic } from "@/data/faq";
import { cn } from "@/lib/utils";

export function FaqExplorer() {
  const [topic, setTopic] = useState<(typeof faqTopics)[number]>("All");
  const visible = useMemo(
    () => (topic === "All" ? faqs : faqs.filter((item) => item.topic === (topic as FaqTopic))),
    [topic],
  );

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Question topics">
        {faqTopics.map((item) => (
          <button
            key={item}
            type="button"
            className={cn(
              "min-h-11 rounded-full border px-4 text-sm font-semibold",
              topic === item ? "border-gold bg-gold text-navy" : "border-white/15",
            )}
            aria-pressed={topic === item}
            onClick={() => setTopic(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <FaqAccordion items={visible} />
    </div>
  );
}
