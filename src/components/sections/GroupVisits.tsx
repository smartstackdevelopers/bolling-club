import { PhotoCarousel } from "@/components/gallery/PhotoCarousel";
import { Reveal } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/sections/shared";
import { Button } from "@/components/ui/Button";
import { groupSlides } from "@/data/photos";

export function GroupVisits() {
  return (
    <section className="section pt-0">
      <div className="container-page grid min-w-0 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal>
          <SectionHeading
            eyebrow="Groups"
            title="Friends, families and school outings"
            description="Class groups, friends and mixed-age visits can enquire the same way as a family game. Headcount, ages and a preferred time go in the WhatsApp request. What the visit includes is confirmed by Leisure City Bowling Club — this site does not list school packages, discounts or special arrangements."
          />
          <p className="mt-4 max-w-xl text-[0.95rem] leading-7 text-muted">
            Photographs here are real club visits. They are not labelled as a specific school trip. Teachers and group organisers can describe the outing in the enquiry.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button href="/book-now?type=school-group">School group enquiry</Button>
            <Button href="/book-now?type=friends-group" variant="secondary">
              Friends or group outing
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <PhotoCarousel slides={groupSlides} label="Group visit photographs from Leisure City Bowling Club" />
        </Reveal>
      </div>
    </section>
  );
}
