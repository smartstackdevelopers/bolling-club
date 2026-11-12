import Link from "next/link";
import { offerSlots } from "@/data/offers";
import { PageHero } from "@/components/sections/shared";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("/offers");

export default function OffersPage() {
  return (
    <>
      <PageHero
        eyebrow="Offers"
        title="Nothing is on sale until the club says so"
        description="These cards reserve space for real offers at Leisure City Bowling Club. There is no price here because none has been supplied."
        image="/images/offers.jpg"
        imageAlt="Entrance of Leisure City Bowling Club in Jinnah Park"
        items={[{ label: "Offers" }]}
      />
      <section className="section">
        <div className="container-page grid gap-5 md:grid-cols-2">
          {offerSlots.map((offer) => (
            <article key={offer.id} className="glass-card flex flex-col p-6">
              <p className="text-xs font-bold tracking-[0.16em] text-electric uppercase">{offer.audience}</p>
              <h2 className="mt-3 font-display text-xl md:text-2xl">{offer.title}</h2>
              <p className="mt-3 flex-1 text-muted leading-7">{offer.summary}</p>
              <dl className="mt-6 grid grid-cols-3 gap-3 text-sm">
                {["Price", "Includes", "Valid"].map((label) => (
                  <div key={label}>
                    <dt className="text-muted">{label}</dt>
                    <dd className="mt-1 font-semibold">Ask on WhatsApp</dd>
                  </div>
                ))}
              </dl>
              <Link href={`/book-now?type=${offer.bookingType}`} className="btn btn-primary mt-6">
                Ask what is available
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
