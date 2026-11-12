import Link from "next/link";
import { PageHero } from "@/components/sections/shared";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("/terms-and-conditions");

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Terms"
        title="Using this website"
        description="These draft terms explain the enquiry flow. Leisure City Bowling Club should review them with a legal adviser and add any house rules the club actually uses."
        image="/images/about.jpg"
        imageAlt="Bowling lanes at Leisure City Bowling Club"
        items={[{ label: "Terms and Conditions" }]}
      />
      <article className="section pt-0">
        <div className="prose-club container-page max-w-3xl">
          <p className="rounded-2xl border border-gold/30 bg-gold/10 p-4 text-sm text-[#fde68a]">
            Draft for business review. Last updated 10 November 2026. House rules, prices and opening hours are not included because they have not been confirmed for this page.
          </p>
          <h2>The website</h2>
          <p>
            This website introduces Leisure City Bowling Club, a kids and family bowling club in Jinnah Park, Rawalpindi, Pakistan. It helps you prepare a WhatsApp message. It is not a checkout and it does not reserve a lane by itself.
          </p>
          <h2>Enquiries are requests</h2>
          <p>
            A completed form, a button press, or an opened WhatsApp chat is a request. A visit, party or price is confirmed only when the club agrees in reply. If WhatsApp does not open, the request has not been sent.
          </p>
          <h2>Information that may change</h2>
          <p>
            Opening hours, prices, packages, age guidance and some facilities are shown only when the club has provided them. Photographs on this website are original pictures from Leisure City Bowling Club. If a page says a detail is still to be confirmed, that detail is not an offer.
          </p>
          <h2>Your message</h2>
          <p>
            You are responsible for the details you send. Please send an enquiry as an adult, even when the visit is for children. Read the{" "}
            <Link href="/privacy-policy">privacy policy</Link> for how the form works.
          </p>
          <h2>Club rules</h2>
          <p>
            Conduct, clothing, food, cancellations and supervision of children will be the club’s own rules. They will be added here when the club writes them. Until then, ask before you rely on an assumption.
          </p>
          <h2>The site itself</h2>
          <p>
            The pages are provided in good faith. Links to WhatsApp leave this website. Leisure City Bowling Club can update these terms by publishing a new version on this page.
          </p>
        </div>
      </article>
    </>
  );
}
