import { siteConfig } from "@/config/site";

export function JsonLd() {
  const sameAs = [siteConfig.social.facebook, siteConfig.social.instagram].filter(Boolean);

  const data = {
    "@context": "https://schema.org",
    "@type": "BowlingAlley",
    name: siteConfig.name,
    description: siteConfig.description,
    telephone: `+${siteConfig.whatsappNumber}`,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.area,
      addressLocality: siteConfig.city,
      addressCountry: siteConfig.countryCode,
    },
    areaServed: {
      "@type": "City",
      name: siteConfig.city,
    },
    ...(sameAs.length ? { sameAs } : {}),
    ...(siteConfig.publicUrl ? { url: siteConfig.publicUrl } : {}),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
