import Link from "next/link";
import { ArtFrame } from "@/components/ui/ArtFrame";
import { PhotoCarousel } from "@/components/gallery/PhotoCarousel";
import { PageHero } from "@/components/sections/shared";
import { birthdaySlides } from "@/data/photos";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("/birthday-parties");

const notes = [
  { title: "The game stays central", text: "A bowling birthday is still a bowling visit. The lane is the reason the group is together." },
  { title: "The package is not invented here", text: "Prices, cakes, decorations and private time are blank until Leisure City Bowling Club confirms them." },
  { title: "The enquiry is specific", text: "Tell them the birthday name, the age if you want to, and how many children and adults are invited." },
];

export default function BirthdayPage() {
  return (
    <>
      <PageHero
        eyebrow="Birthday parties"
        title="Celebrate, then knock the pins down"
        description="Leisure City Bowling Club hosts birthday gatherings for children, friends and families in Jinnah Park. The party is requested on WhatsApp and confirmed by the club."
        image="/images/birthday.jpg"
        imageAlt="Party balloons beside a Leisure City Bowling Club banner"
        items={[{ label: "Birthday Parties" }]}
      >
        <Link href="/birthday-parties/book" className="btn btn-primary">
          Party enquiry
        </Link>
        <Link href="/birthday-parties/packages" className="btn btn-secondary">
          Package frames
        </Link>
      </PageHero>
      <section className="section">
        <div className="container-page grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-4">
            {notes.map((note) => (
              <article key={note.title} className="glass-card p-6">
                <h2 className="font-display text-xl md:text-2xl">{note.title}</h2>
                <p className="mt-3 text-muted leading-7">{note.text}</p>
              </article>
            ))}
          </div>
          <ArtFrame
            src="/images/hd/packages.jpg"
            alt="Players celebrating together at Leisure City Bowling Club"
            caption="A celebration at Leisure City Bowling Club."
            ratio="aspect-square"
            sizes="(min-width: 1024px) 380px, 100vw"
          />
        </div>
      </section>
      <section className="section pt-0">
        <div className="container-page">
          <h2 className="section-title">Birthday photographs</h2>
          <p className="mt-4 max-w-2xl leading-7 text-muted">
            Real photographs from gatherings at Leisure City Bowling Club. Ask what the club can host for your group.
          </p>
          <div className="mt-8">
            <PhotoCarousel slides={birthdaySlides} label="Birthday party photographs from Leisure City Bowling Club" />
          </div>
        </div>
      </section>
      <section className="section pt-0">
        <div className="container-page rounded-[2rem] border border-gold/30 p-6 md:flex md:items-center md:justify-between md:gap-8 md:p-10">
          <div>
            <h2 className="section-title">Ready when the club is</h2>
            <p className="mt-3 max-w-xl text-muted">
              The package page has three empty frames. They are not offers. They are the layout the real packages will use.
            </p>
          </div>
          <Link href="/birthday-parties/packages" className="btn btn-primary mt-6 md:mt-0">
            View the frames
          </Link>
        </div>
      </section>
    </>
  );
}
