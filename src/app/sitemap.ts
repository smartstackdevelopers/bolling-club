import type { MetadataRoute } from "next";
import { pages } from "@/config/pages";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.publicUrl) return [];

  return pages.map((page) => ({
    url: new URL(page.path, siteConfig.publicUrl ?? undefined).toString(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
