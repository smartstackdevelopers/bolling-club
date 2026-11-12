import type { Metadata } from "next";
import { getPage } from "@/config/pages";
import { siteConfig } from "@/config/site";

export function createPageMetadata(path: string): Metadata {
  const page = getPage(path);
  const canonical = siteConfig.publicUrl ? new URL(page.path, siteConfig.publicUrl).toString() : undefined;

  return {
    title: page.absoluteTitle ? { absolute: page.title } : page.title,
    description: page.description,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title: page.title,
      description: page.description,
      type: "website",
      locale: "en_PK",
      siteName: siteConfig.name,
      url: canonical,
      images: [
        {
          url: "/images/og.jpg",
          width: 1200,
          height: 630,
          alt: "Bowling lanes at Leisure City Bowling Club in Jinnah Park",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: ["/images/og.jpg"],
    },
  };
}
