import Link from "next/link";
import { FaqExplorer } from "@/components/faq/FaqExplorer";
import { PageHero } from "@/components/sections/shared";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("/faq");

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Questions, with the gaps left visible"
        description="Filter by booking, kids, families, birthdays, location or timing. If an answer depends on Leisure City Bowling Club, the text says so."
        image="/images/experience.jpg"
        imageAlt="Players bowling at Leisure City Bowling Club"
        items={[{ label: "FAQ" }]}
      />
      <section className="section pt-0">
        <div className="container-page grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <aside className="h-fit glass-card p-6">
            <h2 className="font-display text-xl md:text-2xl">Still stuck?</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              The form is the fastest way to ask something this page cannot answer, such as a price or whether a particular hour is open.
            </p>
            <Link href="/contact" className="btn btn-secondary mt-5">
              Contact the club
            </Link>
          </aside>
          <FaqExplorer />
        </div>
      </section>
    </>
  );
}
