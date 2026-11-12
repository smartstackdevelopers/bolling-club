import Link from "next/link";
import { experiences } from "@/data/content";
import { ArtFrame } from "@/components/ui/ArtFrame";
import { MaskReveal } from "@/components/experience/MaskReveal";
import { Reveal } from "@/components/animations/Reveal";
import { CtaBand, PageHero, VisitSteps } from "@/components/sections/shared";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("/experience");

export default function ExperiencePage() {
  return (
    <>
      <PageHero
        eyebrow="Our experience"
        title="Three reasons to take a lane"
        description="Kids bowling, family bowling and birthday gatherings share one club and one way to book. The difference is who you are bringing and what you want the hour to feel like."
        image="/images/experience.jpg"
        imageAlt="Players on the lanes at Leisure City Bowling Club"
        items={[{ label: "Experience" }]}
      />
      <div>
        {experiences.map((experience, index) => (
          <section key={experience.slug} className="section border-t border-white/10">
            <div className={`container-page grid items-center gap-8 lg:grid-cols-2 ${index % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <Reveal>
                <MaskReveal>
                  <ArtFrame
                    src={experience.image}
                    alt={experience.imageAlt}
                    caption={experience.summary}
                    ratio="aspect-square"
                    sizes="(min-width: 1024px) 420px, 100vw"
                  />
                </MaskReveal>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="eyebrow">The visit</p>
                <h2 className="section-title">{experience.title}</h2>
                <p className="mt-4 leading-7 text-muted">{experience.summary}</p>
                <p className="mt-3 leading-7 text-muted">{experience.detail}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={experience.href} className="btn btn-primary">
                    View details
                  </Link>
                  <Link href={experience.detailHref} className="btn btn-secondary">
                    Planning guide
                  </Link>
                </div>
              </Reveal>
            </div>
          </section>
        ))}
      </div>
      <VisitSteps />
      <CtaBand
        title="Not sure which visit fits?"
        text="Send a general enquiry and describe the group. Leisure City Bowling Club can point you to the right kind of booking."
        href="/book-now?type=general-visit"
      />
    </>
  );
}
