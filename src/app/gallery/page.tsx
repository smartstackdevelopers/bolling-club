import { GalleryBrowser } from "@/components/gallery/GalleryBrowser";
import { PhotoCarousel } from "@/components/gallery/PhotoCarousel";
import { PageHero } from "@/components/sections/shared";
import { clubGallerySlides } from "@/data/photos";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("/gallery");

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Lanes, games and gatherings"
        description="Original photographs from Leisure City Bowling Club in Jinnah Park. Filter by lanes, kids, families or birthdays, then open an image."
        image="/images/gallery-1.jpg"
        imageAlt="Bowling lanes inside Leisure City Bowling Club"
        items={[{ label: "Gallery" }]}
        objectPosition="center 30%"
      />
      <section className="section pt-0">
        <div className="container-page">
          <PhotoCarousel
            slides={clubGallerySlides}
            label="Cinematic photographs from Leisure City Bowling Club"
            cinematic
          />
          <div className="mt-12">
            <GalleryBrowser />
          </div>
        </div>
      </section>
    </>
  );
}
