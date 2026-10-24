import { SITE_URL } from "@/lib/seo";

/** Public, verifiable organization facts only. No fabricated reviews or ratings. */
export function OrganizationJsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Myria Consulting",
        url: SITE_URL,
        logo: `${SITE_URL}/images/myria-logo.png`,
        email: "info@myriaconsulting.com",
        description:
          "Management consulting and intelligent systems advisory focused on strategy, operations, organizational change and practical AI adoption.",
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "Myria Consulting",
        url: SITE_URL,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-CA",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
      }}
    />
  );
}
