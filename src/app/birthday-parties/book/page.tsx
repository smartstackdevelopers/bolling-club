import { Suspense } from "react";
import { BookingForm } from "@/components/booking/BookingForm";
import { PageHero } from "@/components/sections/shared";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("/birthday-parties/book");

export default function BirthdayBookPage() {
  return (
    <>
      <PageHero
        eyebrow="Party enquiry"
        title="Tell the club about the birthday"
        description="The booking type is set to a birthday party. Add the date, the group and a note about the celebration. WhatsApp carries the request. Leisure City Bowling Club confirms it."
        image="/images/birthday.jpg"
        imageAlt="Party balloons at Leisure City Bowling Club"
        items={[{ label: "Birthday Parties", href: "/birthday-parties" }, { label: "Enquiry" }]}
      />
      <section className="section pt-0">
        <div className="container-page grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="glass-card h-fit p-6">
            <h2 className="font-display text-xl md:text-2xl">Useful notes</h2>
            <ul className="mt-4 grid gap-3 text-sm leading-6 text-muted">
              <li>Birthday name, if you want the club to use it.</li>
              <li>Age, if it changes the kind of visit.</li>
              <li>Whether you hope to bring a cake or decorations. The club must agree.</li>
              <li>A second time, in the message, if your first choice might not work.</li>
            </ul>
          </aside>
          <Suspense fallback={<p className="text-muted">Loading the enquiry form…</p>}>
            <BookingForm lockedType="birthday-party" />
          </Suspense>
        </div>
      </section>
    </>
  );
}
