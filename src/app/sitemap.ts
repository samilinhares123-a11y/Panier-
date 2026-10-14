import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/diagnostic", "/mentions-legales", "/cgv", "/confidentialite"].map((p) => ({ url: `${site.url}${p}` }));
}
