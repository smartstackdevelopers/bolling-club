import Link from "next/link";
import { ArtFrame } from "@/components/ui/ArtFrame";
import { MaskReveal } from "@/components/experience/MaskReveal";
import { PhotoCarousel } from "@/components/gallery/PhotoCarousel";
import { CtaBand, PageHero } from "@/components/sections/shared";
import { playAreaSlides } from "@/data/photos";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("/play-area");

const spots = [
  {
    title: "Slides",
    text: "The indoor structure at Leisure City Bowling Club includes slides. It sits inside the club, not at a separate address.",
  },
  {
    title: "Ball pit",
    text: "A ball pit fills the floor under the play structure. It is part of the same kids play area shown in the club photographs.",
  },
  {
    title: "With the lanes",
    text: "Bowling is still here. Younger children can use the play area while the rest of the group is at the club. Ask on WhatsApp how that visit is arranged.",
  },
];

export default function PlayAreaPage() {
  return (
    <>
      <PageHero
        eyebrow="Kids play area"
        title="Indoor play beside the lanes"
        description="Leisure City Bowling Club in Jinnah Park has an indoor kids play area with slides and a ball pit, as well as bowling."
        image="/images/hd/club/play-area/indoor-play.jpg"
        imageAlt="Indoor kids play area with slides and a ball pit at Leisure City Bowling Club"
        items={[{ label: "Kids play area" }]}
      >
        <Link href="/book-now?type=general-visit" className="btn btn-primary">
          Ask about the play area
        </Link>
        <Link href="/kids-bowling" className="btn btn-secondary">
          Kids bowling
        </Link>
      </PageHero>
      <section className="section">
        <div className="container-page grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <MaskReveal>
            <ArtFrame
              src="/images/hd/club/play-area/soft-play.jpg"
              alt="Colourful indoor soft-play structure at Leisure City Bowling Club"
              caption="The kids play area at Leisure City Bowling Club."
              ratio="aspect-square"
              sizes="(min-width: 1024px) 420px, 100vw"
            />
          </MaskReveal>
          <div>
            <h2 className="section-title">What is in the play area</h2>
            <div className="mt-6 grid gap-4">
              {spots.map((spot) => (
                <article key={spot.title} className="border-l-2 border-gold pl-4">
                  <h3 className="font-display text-lg md:text-xl">{spot.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{spot.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section pt-0">
        <div className="container-page">
          <h2 className="section-title">Photographs from the play area</h2>
          <p className="mt-4 max-w-2xl leading-7 text-muted">
            These pictures were taken at Leisure City Bowling Club. Ages, session length and whether play is booked with a game are confirmed by the club.
          </p>
          <div className="mt-8">
            <PhotoCarousel slides={playAreaSlides} label="Kids play area photographs from Leisure City Bowling Club" />
          </div>
        </div>
      </section>
      <CtaBand
        title="Ask the club before you plan around play"
        text="Tell Leisure City Bowling Club the ages of the children and whether you also want a lane. They will say what is possible."
        href="/book-now?type=general-visit"
        primary="Send a play-area enquiry"
      />
    </>
  );
}