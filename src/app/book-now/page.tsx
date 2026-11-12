import { Suspense } from "react";
import { BookingForm } from "@/components/booking/BookingForm";
import { PageHero, VisitSteps } from "@/components/sections/shared";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("/book-now");

export default function BookNowPage() {
  return (
    <>
      <PageHero
        eyebrow="Book now"
        title="Send a request, then wait for a yes"
        description="Fill in the group, a preferred date and a preferred time. The button opens WhatsApp with the message ready. Leisure City Bowling Club confirms the booking in the chat."
        image="/images/hero.jpg"
        imageAlt="Bowling lanes at Leisure City Bowling Club"
        items={[{ label: "Book Now" }]}
        objectPosition="center 22%"
      />
      <section className="section pt-0">
        <div className="container-page max-w-3xl">
          <Suspense fallback={<p className="text-muted">Loading the enquiry form…</p>}>
            <BookingForm />
          </Suspense>
        </div>
      </section>
      <VisitSteps title="What happens next" intro="You send the message. The club decides if that visit can happen." />
    </>
  );
}
