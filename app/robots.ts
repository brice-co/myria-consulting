import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const isPreview = process.env.VERCEL_ENV === "preview";
  return {
    rules: isPreview ? { userAgent: "*", disallow: "/" } : {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/auth/",
        "/admin/",
        "/portal/",
        "/workspace/",
        "/advisory-experience/invite",
        "/experience/intelligent-labs/register",
        "/collaborative-advisory/",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
