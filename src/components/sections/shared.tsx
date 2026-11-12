import Link from "next/link";
import type { ReactNode } from "react";
import { questionsForTheClub, visitSteps } from "@/data/content";
import { confirmedText, siteConfig } from "@/config/site";
import { ArtFrame } from "@/components/ui/ArtFrame";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { WhatsAppAnchor } from "@/components/ui/WhatsAppAnchor";
import { Reveal } from "@/components/animations/Reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <header className={cn(align === "center" && "mx-auto max-w-3xl text-center")}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {description ? <p className="mt-3 max-w-2xl text-[0.95rem] leading-7 text-muted md:text-base">{description}</p> : null}
    </header>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  const crumbs = [{ label: "Home", href: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
        {crumbs.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 ? <span aria-hidden="true">/</span> : null}
            {item.href && index < crumbs.length - 1 ? (
              <Link href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  image: _image,
  imageAlt,
  items,
  children,
  objectPosition: _objectPosition = "center",
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  items: { label: string; href?: string }[];
  children?: ReactNode;
  objectPosition?: string;
}) {
  return (
    <header className="relative overflow-hidden pt-24 pb-12 md:pt-32 md:pb-16">
      <div className="absolute inset-0">
        <ParallaxImage
          src="/images/hero.jpg"
          alt={imageAlt}
          sizes="100vw"
          preload
          objectPosition="center 35%"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/86 to-navy/45" />
      </div>
      <div className="container-page relative z-10">
        <Breadcrumbs items={items} />
        <Reveal>
          <p className="eyebrow mt-5">{eyebrow}</p>
          <h1 className="page-title mt-2 max-w-3xl">{title}</h1>
          <p className="mt-3 max-w-xl text-[0.95rem] leading-7 text-muted md:text-base">{description}</p>
          {children ? <div className="mt-6 flex flex-wrap gap-3">{children}</div> : null}
        </Reveal>
      </div>
    </header>
  );
}

export function RelatedLinks({
  links,
}: {
  links: { href: string; title: string; text: string }[];
}) {
  return (
    <section className="section pt-0">
      <div className="container-page">
        <SectionHeading eyebrow="Continue" title="Related pages" />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="glass-card block p-6">
              <h3 className="font-display text-xl">{link.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{link.text}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaBand({
  title,
  text,
  primary = "Book your game",
  href = "/book-now",
}: {
  title: string;
  text: string;
  primary?: string;
  href?: string;
}) {
  return (
    <section className="section pt-0">
      <div className="container-page">
        <Reveal>
          <div className="glass-card px-6 py-12 text-center md:px-12">
            <div>
              <h2 className="section-title">{title}</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted">{text}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Magnetic>
                  <Button href={href}>{primary}</Button>
                </Magnetic>
                <WhatsAppAnchor className="btn btn-secondary">Chat with us on WhatsApp</WhatsAppAnchor>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function VisitSteps({
  title = "How a visit is arranged",
  intro = "Four clear steps. The last one belongs to the club.",
}: {
  title?: string;
  intro?: string;
}) {
  return (
    <section className="section">
      <div className="container-page">
        <SectionHeading eyebrow="Booking" title={title} description={intro} />
        <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {visitSteps.map((step, index) => (
            <li key={step.title}>
              <Reveal delay={index * 0.06}>
                <div className="glass-card h-full p-5">
                  <span className="mb-3 block h-px w-10 bg-gold" />
                  <h3 className="text-base font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{step.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function AskTheClub() {
  return (
    <section className="section pt-0">
      <div className="container-page grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <SectionHeading
          eyebrow="Still open"
          title="Ask the club before you assume"
          description="These answers are not on the website yet. Put them in your WhatsApp message."
        />
        <ul className="grid gap-3">
          {questionsForTheClub.map((question) => (
            <li key={question} className="glass-card px-4 py-3 text-sm leading-6">
              {question}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const facilityFields = [
  ["Lanes", siteConfig.facilities.laneCount],
  ["Help for children", siteConfig.facilities.bumperLanes],
  ["Bowling shoes", siteConfig.facilities.shoeRental],
  ["Food and drinks", siteConfig.facilities.foodAndDrinks],
  ["Party space", siteConfig.facilities.partyRoom],
  ["Parking", siteConfig.facilities.parking],
  ["Age guidance", siteConfig.facilities.ageGuidance],
  ["Session length", siteConfig.facilities.sessionLength],
  ["What to wear", siteConfig.facilities.whatToWear],
  ["Payment", siteConfig.facilities.paymentMethods],
  ["Changes and cancellations", siteConfig.facilities.cancellation],
] as const;

export function FacilityList() {
  return (
    <div className="overflow-hidden rounded-[1.4rem] border border-white/10">
      <table className="w-full text-left text-sm">
        <caption className="sr-only">Club details</caption>
        <tbody>
          {facilityFields.map(([label, value]) => (
            <tr key={label} className="border-b border-white/10 last:border-0">
              <th scope="row" className="w-1/2 px-4 py-3 font-semibold">
                {label}
              </th>
              <td className="px-4 py-3 text-muted">{confirmedText(value) ?? "To be confirmed"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SplitStory({
  eyebrow,
  title,
  children,
  image,
  imageAlt,
  caption,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
  image: string;
  imageAlt: string;
  caption: string;
}) {
  return (
    <section className="section">
      <div className="container-page grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <ArtFrame src={image} alt={imageAlt} caption={caption} sizes="(min-width: 1024px) 50vw, 100vw" />
        </Reveal>
        <Reveal delay={0.08}>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="section-title">{title}</h2>
          <div className="mt-5 grid gap-4 text-muted leading-7">{children}</div>
        </Reveal>
      </div>
    </section>
  );
}
