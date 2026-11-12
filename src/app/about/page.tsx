import { AskTheClub, CtaBand, PageHero, RelatedLinks, VisitSteps } from "@/components/sections/shared";
import { StickyStory } from "@/components/experience/StickyStory";
import { PhotoCarousel } from "@/components/gallery/PhotoCarousel";
import { Reveal } from "@/components/animations/Reveal";
import { clubGallerySlides } from "@/data/photos";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("/about");

const values = [
  {
    title: "Fun, kept generous",
    text: "The club is for excitement that still feels comfortable for children and the adults looking after them.",
  },
  {
    title: "Premium, not loud for its own sake",
    text: "Light, colour and a well-kept lane should feel like a night out, even when the guests are small.",
  },
  {
    title: "Safe and easy to approach",
    text: "A clear enquiry, a human reply, and no pretend confirmation. If a detail is unknown, the site says so.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the club"
        title="A family bowling club in Jinnah Park"
        description="Leisure City Bowling Club exists for children, parents, friends and birthday groups. The story on this page stays with what the club is."
        image="/images/about.jpg"
        imageAlt="Bowling lanes inside Leisure City Bowling Club"
        items={[{ label: "About" }]}
      />
      <section className="section">
        <div className="container-page">
          <StickyStory src="/images/club/lanes/screens.jpg" alt="Bowling lanes inside Leisure City Bowling Club">
            <Reveal>
              <p className="eyebrow">The idea</p>
              <h2 className="section-title">Time together, with a game in the middle</h2>
              <div className="mt-5 grid gap-4 leading-7 text-muted">
                <p>
                  Families in Rawalpindi do not need a complicated plan to spend an hour well. A lane, a ball and a group that already knows each other is enough of an occasion.
                </p>
                <p>
                  Leisure City Bowling Club is that place in Jinnah Park. Birthdays can grow around the same game. The website’s job is to help you ask for a time, not to pretend the diary is already yours.
                </p>
                <p>
                  Twelve international-standard lanes and a kids play area are part of the club. Founding dates, awards and staff names are not published here because they have not been supplied for this site.
                </p>
              </div>
            </Reveal>
            <ol className="grid gap-4">
              {values.map((value) => (
                <li key={value.title} className="glass-card p-5">
                  <h3 className="font-display text-lg md:text-xl">{value.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{value.text}</p>
                </li>
              ))}
            </ol>
          </StickyStory>
        </div>
      </section>
      <section className="section pt-0">
        <div className="container-page grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 md:p-10">
            <p className="eyebrow">Jinnah Park</p>
            <h2 className="section-title max-w-3xl">Local to Rawalpindi, easy to find</h2>
            <p className="mt-4 max-w-3xl leading-7 text-muted">
              Leisure City Bowling Club is in Jinnah Park, Rawalpindi, Pakistan. Open the map on the contact page, or ask for the easiest way to arrive in the same WhatsApp chat as your booking request.
            </p>
          </div>
          <PhotoCarousel slides={clubGallerySlides} label="Photographs of Leisure City Bowling Club" ratio="aspect-[4/3]" />
        </div>
      </section>
      <VisitSteps title="From a message to a confirmed game" intro="This is the whole booking system. There is no separate checkout." />
      <AskTheClub />
      <CtaBand
        title="Come and see what the club can host"
        text="Tell them the shape of your visit. Kids, family or a birthday — the reply is what counts."
      />
      <RelatedLinks
        links={[
          { href: "/experience", title: "The experience", text: "How kids, family and birthday visits differ." },
          { href: "/contact", title: "Contact", text: "WhatsApp, map and the details you need to arrive." },
          { href: "/faq", title: "Questions", text: "Booking, timing and location, answered honestly." },
        ]}
      />
    </>
  );
}
