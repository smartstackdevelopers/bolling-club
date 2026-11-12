import Link from "next/link";
import { AskTheClub, PageHero, SectionHeading } from "@/components/sections/shared";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("/experience/family-bowling");

const checklist = [
  { label: "Group", detail: "Children and adults, counted separately." },
  { label: "Timing", detail: "A date and a preferred time. The club confirms whether that slot is free." },
  { label: "Occasion", detail: "Weekend game, visitors in town, or something you want marked as a celebration." },
  { label: "Practical questions", detail: "Parking, food, shoes and session length, asked openly because they are not published." },
];

export default function FamilyGuidePage() {
  return (
    <>
      <PageHero
        eyebrow="Visit guide"
        title="Planning a family booking"
        description="Use this when the group is mixed and you want the WhatsApp message to Leisure City Bowling Club to be useful the first time."
        image="/images/guide-family.jpg"
        imageAlt="A family group at Leisure City Bowling Club"
        items={[{ label: "Experience", href: "/experience" }, { label: "Family guide" }]}
      />
      <section className="section">
        <div className="container-page">
          <SectionHeading eyebrow="Checklist" title="Four lines that make the reply easier" />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {checklist.map((item) => (
              <article key={item.label} className="rounded-[1.5rem] border border-electric/30 bg-electric/5 p-6">
                <h2 className="font-display text-xl text-electric md:text-2xl">{item.label}</h2>
                <p className="mt-3 text-muted">{item.detail}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-muted leading-7">
            If the gathering is really a birthday, switch to the party enquiry so the club sees that from the start. Family bowling and birthday parties are related, and they are not the same request.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/book-now?type=family-bowling" className="btn btn-primary">
              Family enquiry
            </Link>
            <Link href="/birthday-parties" className="btn btn-secondary">
              It is a birthday
            </Link>
          </div>
        </div>
      </section>
      <AskTheClub />
    </>
  );
}
