import Link from "next/link";
import { PageHero, SectionHeading } from "@/components/sections/shared";
import { Button } from "@/components/ui/Button";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("/experience/kids-bowling");

const prepare = [
  "How many children are coming, and their ages if you are happy to share them.",
  "How many adults will be with them.",
  "A preferred date and a preferred time.",
  "Whether the visit is a first try, a regular game, or part of a birthday.",
  "Any question about bumpers, shoes, food or timing that you need answered before you travel.",
];

export default function KidsGuidePage() {
  return (
    <>
      <PageHero
        eyebrow="Session guide"
        title="Arrange kids bowling without guesswork"
        description="This page is the practical companion to kids bowling at Leisure City Bowling Club. It lists what to send. It does not invent house rules."
        image="/images/guide-kids.jpg"
        imageAlt="Kids play area at Leisure City Bowling Club"
        items={[{ label: "Experience", href: "/experience" }, { label: "Kids guide" }]}
      />
      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Before you write"
            title="Have this ready"
            description="The form will ask for the numbers. These notes help the message itself."
          />
          <ol className="grid gap-3">
            {prepare.map((item, index) => (
              <li key={item} className="glass-card grid grid-cols-[auto_1fr] gap-4 p-4">
                <span className="font-display text-2xl text-gold">{index + 1}</span>
                <p className="self-center text-sm leading-6">{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section pt-0">
        <div className="container-page rounded-[2rem] bg-gradient-to-r from-[#3b1630] to-navy-800 p-6 md:p-10">
          <h2 className="section-title">What this guide will not pretend</h2>
          <p className="mt-4 max-w-3xl leading-7 text-muted">
            It will not tell you a minimum age, a shoe size range, or that bumpers are available. Those answers belong to Leisure City Bowling Club. If a reply does not cover something you need, ask again before you travel.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/book-now?type=kids-bowling">Write the enquiry</Button>
            <Link href="/kids-bowling" className="btn btn-secondary">
              Back to kids bowling
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
