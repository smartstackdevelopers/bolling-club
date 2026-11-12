import Link from "next/link";
import { Heart, Smile, Sparkles, Users } from "lucide-react";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { PhotoCarousel } from "@/components/gallery/PhotoCarousel";
import { HorizontalLookbook } from "@/components/experience/HorizontalLookbook";
import { MaskReveal } from "@/components/experience/MaskReveal";
import { TiltCard } from "@/components/experience/TiltCard";
import { Reveal } from "@/components/animations/Reveal";
import { Hero } from "@/components/sections/Hero";
import { GroupVisits } from "@/components/sections/GroupVisits";
import { SectionHeading } from "@/components/sections/shared";
import { ReviewCarousel } from "@/components/testimonials/ReviewCarousel";
import { ArtFrame } from "@/components/ui/ArtFrame";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { WhatsAppAnchor } from "@/components/ui/WhatsAppAnchor";
import { experiences, reasons } from "@/data/content";
import { faqs } from "@/data/faq";
import { birthdaySlides, clubGallerySlides } from "@/data/photos";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("/");

const reasonIcons = [Users, Smile, Heart, Sparkles];
const ticker = ["Jinnah Park", "Kids bowling", "Family bowling", "Birthday gatherings", "WhatsApp booking"];

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...ticker, ...ticker].map((item, index) => (
            <span key={`${item}-${index}`} className="text-sm font-semibold tracking-[0.16em] text-muted uppercase">
              {item}
            </span>
          ))}
        </div>
      </div>
      <p className="sr-only">Jinnah Park. Kids bowling. Family bowling. Birthday gatherings. WhatsApp booking.</p>

      <section className="section">
        <div className="container-page grid min-w-0 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <SectionHeading
              eyebrow="The club"
              title="Where every game becomes a memory"
              description="Leisure City Bowling Club welcomes families, children, friends and birthday groups in Jinnah Park, Rawalpindi."
            />
            <div className="mt-6 grid gap-4 text-muted leading-7">
              <p>
                Come for the roll of the ball and the cheer when the pins fall. Tell the club who is coming, and they confirm what is possible.
              </p>
              <p>
                Twelve international-standard lanes sit at the heart of the visit. Party prices and session length are confirmed on WhatsApp, not guessed here.
              </p>
            </div>
            <div className="mt-8">
              <Button href="/about" variant="secondary">
                Discover more
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <MaskReveal>
              <ArtFrame
                src="/images/club/lanes/screens.jpg"
                alt="Bowling lanes inside Leisure City Bowling Club"
                caption="The lanes at Leisure City Bowling Club, Jinnah Park."
                ratio="aspect-[16/10]"
                sizes="(min-width: 1024px) 420px, 100vw"
              />
            </MaskReveal>
            <dl className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                ["Lanes", "12 international-standard"],
                ["Place", "Jinnah Park, Rawalpindi"],
                ["Book", "WhatsApp confirmation"],
              ].map(([label, value]) => (
                <div key={label} className="glass-card p-4">
                  <dt className="text-xs font-bold tracking-[0.16em] text-gold uppercase">{label}</dt>
                  <dd className="mt-2 text-sm text-muted">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Choose a lane"
              title="Our experiences"
              description="Three ways to spend time at Leisure City Bowling Club. Each one ends with a WhatsApp request, not an automatic reservation."
            />
          </Reveal>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {experiences.map((experience, index) => (
              <Reveal key={experience.slug} delay={index * 0.06}>
                <TiltCard>
                  <article className="glow-card flex h-full flex-col">
                    <ArtFrame
                      src={experience.image}
                      alt={experience.imageAlt}
                      caption={experience.summary}
                      ratio="aspect-square"
                      sizes="(min-width: 1024px) 320px, 100vw"
                    />
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-display text-xl md:text-2xl">{experience.title}</h3>
                      <p className="mt-3 flex-1 text-sm leading-6 text-muted">{experience.summary}</p>
                      <Link href={experience.href} className="btn btn-secondary mt-5">
                        View details
                      </Link>
                    </div>
                  </article>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-page">
          <Reveal>
            <SectionHeading eyebrow="Why families come" title="Why choose us" />
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {reasons.map((reason, index) => {
              const Icon = reasonIcons[index];
              return (
                <Reveal key={reason.title} delay={index * 0.05}>
                  <article className="glass-card flex h-full gap-4 p-6">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/5 text-gold">
                      <Icon aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg md:text-xl">{reason.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted">{reason.text}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-page grid min-w-0 items-center gap-8 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#2a1438] via-navy-800 to-[#10233d] p-6 md:p-10 lg:grid-cols-2">
          <Reveal className="relative">
            <PhotoCarousel slides={birthdaySlides} label="Birthday party photographs from Leisure City Bowling Club" ratio="aspect-square" cinematic />
          </Reveal>
          <Reveal className="relative" delay={0.08}>
            <p className="eyebrow">Celebrations</p>
            <h2 className="section-title">A birthday, with the pins in on the surprise</h2>
            <p className="mt-4 text-muted leading-7">
              Bring the group for a game and a celebration at Leisure City Bowling Club. Package names, prices and inclusions are confirmed by the club, so this section does not invent them.
            </p>
            <ul className="mt-5 grid gap-2 text-sm text-ink">
              <li className="glass-card px-4 py-3">Package price · ask on WhatsApp</li>
              <li className="glass-card px-4 py-3">Guest count · tell us who is coming</li>
              <li className="glass-card px-4 py-3">What is included · confirmed in the reply</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/birthday-parties/packages" variant="secondary">
                See package frames
              </Button>
              <Button href="/birthday-parties/book">Party enquiry</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <Reveal>
              <SectionHeading
                eyebrow="Lookbook"
                title="Real club photographs"
                description="Lanes, families, kids and celebrations photographed at Leisure City Bowling Club."
              />
            </Reveal>
            <Link href="/gallery" className="btn btn-secondary">
              Open the gallery
            </Link>
          </div>
        </div>
        <div className="mt-8">
          <HorizontalLookbook slides={clubGallerySlides} label="Leisure City Bowling Club gallery carousel" />
        </div>
      </section>

      <GroupVisits />

      <section className="section pt-0">
        <div className="container-page grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Voices"
              title="Guest comments"
              description="These cards are sample layout only. They are not quotes from guests and should be replaced before they are treated as reviews."
            />
          </Reveal>
          <ReviewCarousel />
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-page grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <Reveal>
              <SectionHeading
                eyebrow="Questions"
                title="Before you visit"
                description="Short answers for booking, children, families, birthdays, location and timing."
              />
            </Reveal>
            <Link href="/faq" className="btn btn-secondary mt-6">
              All questions
            </Link>
          </div>
          <FaqAccordion items={faqs.slice(0, 6)} />
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 px-6 py-16 text-center md:px-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.35),transparent_60%)]" />
            <div className="relative">
              <h2 className="section-title">Your next great game starts here</h2>
              <p className="mx-auto mt-4 max-w-xl text-muted">
                Tell Leisure City Bowling Club who is coming. They will reply on WhatsApp with what they can offer.
              </p>
              <div className="mt-8 flex justify-center">
                <Magnetic>
                  <WhatsAppAnchor className="btn btn-whatsapp">Chat with us on WhatsApp</WhatsAppAnchor>
                </Magnetic>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
