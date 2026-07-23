import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/precos", "/para-equipes", "/termos", "/privacidade"],
        disallow: ["/api/", "/app", "/conta", "/equipe", "/admin"],
      },
    ],
    sitemap: "/sitemap.xml",
  };
}
