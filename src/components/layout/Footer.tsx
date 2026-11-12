import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { footerExperience, footerExplore, legalLinks } from "@/config/navigation";
import { confirmedText, siteConfig } from "@/config/site";
import { Logo } from "@/components/layout/Logo";
import { WhatsAppAnchor } from "@/components/ui/WhatsAppAnchor";
import { safeHttpUrl } from "@/lib/utils";

const socials = [
  ["Instagram", siteConfig.social.instagram],
  ["Facebook", siteConfig.social.facebook],
  ["TikTok", siteConfig.social.tiktok],
  ["YouTube", siteConfig.social.youtube],
] as const;

export function Footer() {
  const address = confirmedText(siteConfig.contact.address);
  const email = confirmedText(siteConfig.contact.email);
  const phone = confirmedText(siteConfig.contact.phoneDisplay);
  const hours = confirmedText(siteConfig.contact.openingHours);
  const maps = safeHttpUrl(siteConfig.contact.mapsUrl);

  return (
    <footer className="relative z-10 border-t border-white/10 bg-navy-900">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
            A kids and family bowling club in Jinnah Park, Rawalpindi. Games, gatherings and birthday celebrations, arranged through WhatsApp and confirmed by the club.
          </p>
          <WhatsAppAnchor className="btn btn-whatsapp mt-5">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Book on WhatsApp
          </WhatsAppAnchor>
        </div>
        <nav aria-label="Footer">
          <h2 className="text-sm font-bold tracking-[0.16em] text-gold uppercase">Quick links</h2>
          <ul className="mt-4 grid gap-2">
            {footerExplore.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-muted hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Experiences">
          <h2 className="text-sm font-bold tracking-[0.16em] text-gold uppercase">Experience</h2>
          <ul className="mt-4 grid gap-2">
            {footerExperience.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-muted hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="text-sm font-bold tracking-[0.16em] text-gold uppercase">Visit</h2>
          <ul className="mt-4 grid gap-3 text-sm text-muted">
            <li>{address ?? "Address to be confirmed"}</li>
            <li>
              {siteConfig.city}, {siteConfig.country}
            </li>
            <li>{hours ?? "Opening hours confirmed on WhatsApp"}</li>
            <li>{phone ?? "Phone number to be added"}</li>
            <li>{email ?? "Email address to be added"}</li>
            {maps ? (
              <li>
                <a href={maps} className="text-muted hover:text-white" target="_blank" rel="noopener noreferrer">
                  Open in Google Maps
                </a>
              </li>
            ) : null}
          </ul>
          <h2 className="mt-6 text-sm font-bold tracking-[0.16em] text-gold uppercase">Social</h2>
          <ul className="mt-3 grid gap-2 text-sm">
            {socials.map(([label, href]) => {
              const safe = safeHttpUrl(href);
              return (
                <li key={label}>
                  {safe ? (
                    <a href={safe} className="text-muted hover:text-white" target="_blank" rel="noopener noreferrer">
                      {label}
                    </a>
                  ) : (
                    <span className="text-muted">{label} link to be added</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-5 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {siteConfig.name}. {siteConfig.area}, {siteConfig.city}, {siteConfig.country}.
          </p>
          <nav aria-label="Legal" className="flex gap-4">
            {legalLinks.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
