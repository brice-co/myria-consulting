import type { Metadata } from "next";

export const SITE_URL = "https://myriaconsulting.com";
export const SITE_NAME = "Myria Consulting";

type PublicPageOptions = {
  title: string;
  description: string;
  pathname: string;
  type?: "website" | "article";
  index?: boolean;
};

export function publicPageMetadata({
  title,
  description,
  pathname,
  type = "website",
  index = true,
}: PublicPageOptions): Metadata {
  const url = new URL(pathname, SITE_URL).toString();
  return {
    title,
    description,
    alternates: { canonical: pathname },
    robots: { index, follow: index },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_CA",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export const privateMetadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};
