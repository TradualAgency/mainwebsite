import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Analyses zijn per klant en wachtwoord-gated (en al noindex); Studio en API
        // horen niet in een index.
        disallow: ["/api/", "/studio/", "/analysis/", "/nl/analysis/"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
