import Link from "next/link";
import { ArtFrame } from "@/components/ui/ArtFrame";
import { PhotoCarousel } from "@/components/gallery/PhotoCarousel";
import { GroupVisits } from "@/components/sections/GroupVisits";
import { CtaBand, PageHero } from "@/components/sections/shared";
import { familySlides } from "@/data/photos";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("/family-bowling");

const gatherings = [
  {
    title: "A weekend lane",
    text: "Parents and children choosing a game instead of another afternoon at home. Share the size of the family so the club can see if one lane is enough.",
  },
  {
    title: "Cousins and visitors",
    text: "When family is in Rawalpindi for a short stay, a single booking can cover mixed ages. Mention that the group does not all play often.",
  },
  {
    title: "No occasion required",
    text: "Family bowling does not have to be a birthday. If it is a celebration, the birthday pages are the better place to start.",
  },
];

export default function FamilyBowlingPage() {
  return (
    <>
      <PageHero
        eyebrow="Family bowling"
        title="One game, the whole group"
        description="Family bowling at Leisure City Bowling Club is for parents, children and the relatives who come along. The club confirms the group before anyone treats the lane as booked."
        image="/images/family.jpg"
        imageAlt="Guests together at Leisure City Bowling Club"
        items={[{ label: "Family Bowling" }]}
      />
      <section className="section">
        <div className="container-page">
          <div className="grid gap-4 lg:grid-cols-3">
            {gatherings.map((item) => (
              <article key={item.title} className="glass-card p-6">
                <h2 className="font-display text-xl md:text-2xl">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{item.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-10">
            <h2 className="section-title">Family visits, photographed here</h2>
            <p className="mt-4 max-w-2xl leading-7 text-muted">
              Real photographs from Leisure City Bowling Club in Jinnah Park.
            </p>
            <div className="mt-8">
              <PhotoCarousel slides={familySlides} label="Family experience photographs from Leisure City Bowling Club" />
            </div>
          </div>
          <div className="mt-10 grid items-center gap-8 lg:grid-cols-2">
            <ArtFrame
              src="/images/hd/guide-family.jpg"
              alt="A group visiting Leisure City Bowling Club together"
              caption="A family visit at Leisure City Bowling Club."
              ratio="aspect-square"
              sizes="(min-width: 1024px) 420px, 100vw"
            />
            <div>
              <h2 className="section-title">Mixed ages are the point</h2>
              <p className="mt-4 leading-7 text-muted">
                A family booking counts children and adults separately so the club can understand the group. How the game is set up for that mix is part of the reply.
              </p>
              <Link href="/experience/family-bowling" className="btn btn-secondary mt-6">
                Open the visit guide
              </Link>
            </div>
          </div>
        </div>
      </section>
      <GroupVisits />
      <CtaBand
        title="Plan the family lane"
        text="Send the headcount and a preferred time. Leisure City Bowling Club will say whether that visit can happen."
        href="/book-now?type=family-bowling"
        primary="Enquire for the family"
      />
    </>
  );
}
