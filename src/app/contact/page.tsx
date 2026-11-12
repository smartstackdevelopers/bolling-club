import { ContactForm } from "@/components/booking/ContactForm";
import { PageHero } from "@/components/sections/shared";
import { WhatsAppAnchor } from "@/components/ui/WhatsAppAnchor";
import { confirmedText, siteConfig } from "@/config/site";
import { safeEmbedUrl, safeHttpUrl } from "@/lib/utils";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("/contact");

export default function ContactPage() {
  const address = confirmedText(siteConfig.contact.address);
  const email = confirmedText(siteConfig.contact.email);
  const phone = confirmedText(siteConfig.contact.phoneDisplay);
  const hours = confirmedText(siteConfig.contact.openingHours);
  const map = safeEmbedUrl(siteConfig.contact.mapEmbedUrl);
  const mapsLink = safeHttpUrl(siteConfig.contact.mapsUrl);
  const phoneHref = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : null;
  const emailHref = email ? `mailto:${email}` : null;
  const socials = [
    ["Instagram", siteConfig.social.instagram],
    ["Facebook", siteConfig.social.facebook],
    ["TikTok", siteConfig.social.tiktok],
    ["YouTube", siteConfig.social.youtube],
  ] as const;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to Leisure City Bowling Club"
        description="WhatsApp is the fastest way to ask about a game. The club is in Jinnah Park, Rawalpindi."
        image="/images/contact.jpg"
        imageAlt="Exterior of Leisure City Bowling Club at night"
        items={[{ label: "Contact" }]}
        objectPosition="center 70%"
      />
      <section className="section">
        <div className="container-page grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="grid gap-4">
            <article className="glass-card p-5">
              <h2 className="font-display text-xl md:text-2xl">Visit</h2>
              <p className="mt-3 text-muted">{address ?? "Street address to be confirmed"}</p>
              <p className="text-muted">
                {siteConfig.city}, {siteConfig.country}
              </p>
              <p className="mt-3 text-muted">{hours ?? "Opening hours confirmed on WhatsApp"}</p>
              {mapsLink ? (
                <div className="contact-actions">
                  <a href={mapsLink} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                    Open in Google Maps
                  </a>
                </div>
              ) : null}
            </article>
            <article className="glass-card p-5">
              <h2 className="font-display text-xl md:text-2xl">Direct</h2>
              <p className="mt-3 text-sm leading-6 text-muted">Call, email, or message the club. These open your phone, mail app, or WhatsApp.</p>
              <div className="contact-actions">
                {phoneHref ? (
                  <a className="btn btn-secondary" href={phoneHref}>
                    Call {phone}
                  </a>
                ) : (
                  <span className="text-sm text-muted">Phone number to be added</span>
                )}
                {emailHref ? (
                  <a className="btn btn-secondary" href={emailHref}>
                    {email}
                  </a>
                ) : (
                  <span className="text-sm text-muted">Email address to be added</span>
                )}
                <WhatsAppAnchor className="btn btn-whatsapp">WhatsApp the club</WhatsAppAnchor>
              </div>
            </article>
            <article className="glass-card p-5">
              <h2 className="font-display text-xl md:text-2xl">Social</h2>
              <div className="contact-social">
                {socials.map(([label, href]) => {
                  const safe = safeHttpUrl(href);
                  return safe ? (
                    <a key={label} href={safe} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                      {label}
                    </a>
                  ) : (
                    <span key={label} className="text-sm text-muted">
                      {label} · link to be added
                    </span>
                  );
                })}
              </div>
            </article>
            {map ? (
              <iframe
                title="Map showing Leisure City Bowling Club in Jinnah Park"
                src={map}
                className="contact-map h-64 w-full rounded-[1.4rem] border border-white/10"
                loading="lazy"
                referrerPolicy="no-referrer"
                data-lenis-prevent
              />
            ) : (
              <div className="grid h-64 place-items-center rounded-[1.4rem] border border-dashed border-white/20 p-6 text-center text-sm text-muted">
                A map will appear here once a location pin is added in the site settings.
              </div>
            )}
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
