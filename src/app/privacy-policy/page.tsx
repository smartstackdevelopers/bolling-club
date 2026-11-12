import Link from "next/link";
import { PageHero } from "@/components/sections/shared";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("/privacy-policy");

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="How this website treats your details"
        description="This is a draft notice for Leisure City Bowling Club to review with a legal adviser before the site is public. It describes how this website actually works."
        image="/images/contact.jpg"
        imageAlt="Exterior of Leisure City Bowling Club at night"
        items={[{ label: "Privacy Policy" }]}
        objectPosition="center 70%"
      />
      <article className="section pt-0">
        <div className="prose-club container-page max-w-3xl">
          <p className="rounded-2xl border border-gold/30 bg-gold/10 p-4 text-sm text-[#fde68a]">
            Draft for business review. Last updated 10 November 2026. It is not a substitute for legal advice.
          </p>
          <h2>Who this notice is for</h2>
          <p>
            This notice is for people using the Leisure City Bowling Club website. Leisure City Bowling Club is a kids and family bowling club in Jinnah Park, Rawalpindi, Pakistan.
          </p>
          <h2>What this site does not store</h2>
          <p>
            The website has no customer accounts and no booking database. When you use an enquiry form, the message is composed in your browser. If you continue, you send it yourself through WhatsApp. This website does not receive or keep a copy of that form.
          </p>
          <h2>What you may choose to share</h2>
          <ul>
            <li>Your name</li>
            <li>Your phone number</li>
            <li>A preferred date and time</li>
            <li>How many children and adults are in the group</li>
            <li>The type of visit and any note you add</li>
          </ul>
          <h2>WhatsApp</h2>
          <p>
            WhatsApp is a separate service. Once you open it, their own terms and privacy policy apply to the message, your account and anything the club replies. The club should keep booking messages only for as long as they need them to arrange or record the visit.
          </p>
          <h2>Payments</h2>
          <p>This website does not take payment. Any price or payment method is agreed with the club, not processed here.</p>
          <h2>Children</h2>
          <p>
            The club welcomes children, but the enquiry should be sent by a parent or another adult. Do not put a child’s full contact details in the message unless the club has asked for them.
          </p>
          <h2>Asking about your information</h2>
          <p>
            To ask what the club holds from a WhatsApp conversation, contact them on the same WhatsApp number, or through the details on the{" "}
            <Link href="/contact">contact page</Link>.
          </p>
        </div>
      </article>
    </>
  );
}
