import Link from "next/link";
import { packageSlots } from "@/data/offers";
import { PageHero } from "@/components/sections/shared";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("/birthday-parties/packages");

const blanks = ["Name", "Price", "Guest count", "Duration", "Inclusions"];

export default function PackagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Packages"
        title="Birthday packages, waiting for the real ones"
        description="These frames are deliberately empty. Publishing a price or a list of inclusions before Leisure City Bowling Club confirms them would be misleading."
        image="/images/packages.jpg"
        imageAlt="Players celebrating at Leisure City Bowling Club"
        items={[{ label: "Birthday Parties", href: "/birthday-parties" }, { label: "Packages" }]}
      />
      <section className="section">
        <div className="container-page grid gap-5 lg:grid-cols-3">
          {packageSlots.map((slot) => (
            <article key={slot.id} className="glow-card flex flex-col p-6">
              <p className="text-xs font-bold tracking-[0.16em] text-gold uppercase">{slot.kicker}</p>
              <h2 className="mt-3 font-display text-xl md:text-2xl">{slot.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{slot.text}</p>
              <dl className="mt-6 grid gap-3">
                {blanks.map((label) => (
                  <div key={label} className="flex items-center justify-between gap-3 border-b border-white/10 pb-2 text-sm">
                    <dt>{label}</dt>
                    <dd className="text-muted">Not published</dd>
                  </div>
                ))}
              </dl>
              <Link href="/birthday-parties/book" className="btn btn-secondary mt-6">
                Ask about this frame
              </Link>
            </article>
          ))}
        </div>
        <p className="container-page mt-8 text-sm text-muted">
          When a package is confirmed, replace the title and the “Not published” lines in the offers data file. Leave a line blank rather than guessing.
        </p>
      </section>
    </>
  );
}
