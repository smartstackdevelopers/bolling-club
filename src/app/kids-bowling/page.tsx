import Link from "next/link";
import { ArtFrame } from "@/components/ui/ArtFrame";
import { MaskReveal } from "@/components/experience/MaskReveal";
import { PhotoCarousel } from "@/components/gallery/PhotoCarousel";
import { CtaBand, FacilityList, PageHero } from "@/components/sections/shared";
import { kidsSlides } from "@/data/photos";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("/kids-bowling");

const moments = [
  { title: "A first roll", text: "Some children are here to try bowling for the first time. Say so in the enquiry so the club can prepare the reply." },
  { title: "A grown-up nearby", text: "Kids visits are planned with adults in the group. Add both counts when you write to Leisure City Bowling Club." },
  { title: "A calmer kind of fun", text: "There is a kids play area at the club. Bumper rails, ball weights and shoes are confirmed in the WhatsApp reply." },
];

export default function KidsBowlingPage() {
  return (
    <>
      <PageHero
        eyebrow="Kids bowling"
        title="Built around children"
        description="Kids bowling at Leisure City Bowling Club is for children visiting Jinnah Park with the adults who look after them."
        image="/images/kids.jpg"
        imageAlt="A child bowling at Leisure City Bowling Club"
        items={[{ label: "Kids Bowling" }]}
      >
        <Link href="/book-now?type=kids-bowling" className="btn btn-primary">
          Enquire for kids
        </Link>
        <Link href="/experience/kids-bowling" className="btn btn-secondary">
          Session guide
        </Link>
      </PageHero>
      <section className="section">
        <div className="container-page grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <MaskReveal>
            <ArtFrame
              src="/images/hd/guide-kids.jpg"
              alt="Indoor kids play area at Leisure City Bowling Club"
              caption="Kids play area at Leisure City Bowling Club."
              ratio="aspect-square"
              sizes="(min-width: 1024px) 380px, 100vw"
            />
          </MaskReveal>
          <div>
            <h2 className="section-title">What a kids visit is for</h2>
            <div className="mt-6 grid gap-4">
              {moments.map((moment) => (
                <article key={moment.title} className="border-l-2 border-pink pl-4">
                  <h3 className="font-display text-lg md:text-xl">{moment.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{moment.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section pt-0">
        <div className="container-page">
          <h2 className="section-title">Kids at the club</h2>
          <p className="mt-4 max-w-2xl leading-7 text-muted">
            Photographs from Leisure City Bowling Club: children on the lanes and the play area beside them.
          </p>
          <div className="mt-8">
            <PhotoCarousel slides={kidsSlides} label="Kids bowling photographs from Leisure City Bowling Club" />
          </div>
        </div>
      </section>
      <section className="section pt-0">
        <div className="container-page grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="section-title">Details the club still owns</h2>
            <p className="mt-4 leading-7 text-muted">
              Ages, bumpers, ball weights and shoes change how comfortable a child feels. They are listed only when Leisure City Bowling Club has confirmed them.
            </p>
          </div>
          <FacilityList />
        </div>
      </section>
      <CtaBand
        title="Tell the club the ages, not just the headcount"
        text="A kids enquiry is easier to confirm when you mention how old the children are and whether it is someone’s first game."
        href="/book-now?type=kids-bowling"
        primary="Start a kids enquiry"
      />
    </>
  );
}
