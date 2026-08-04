import { brand } from "@/lib/assets";
import { absoluteUrl, site } from "@/lib/site";

export function JsonLdOrganization() {
  const orgId = absoluteUrl("/#organization");
  const assessmentId = absoluteUrl("/#assessment");

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: site.name,
        url: site.url,
        email: site.contactEmail,
        description: site.description,
        logo: absoluteUrl(brand.paths.badge),
        areaServed: {
          "@type": "Country",
          name: "Canada",
        },
      },
      {
        "@type": "Service",
        "@id": assessmentId,
        name: "AI Tools Assessment",
        description:
          "A fixed-fee diagnostic that maps your biggest time-drains to the right tools — with a 5-hours-a-week guarantee. Fully credited toward any build booked within 90 days.",
        provider: { "@id": orgId },
        areaServed: {
          "@type": "Country",
          name: "Canada",
        },
        offers: {
          "@type": "Offer",
          name: "AI Tools Assessment",
          price: site.assessmentPriceAmount,
          priceCurrency: "CAD",
          url: absoluteUrl("/#assessment"),
          availability: "https://schema.org/LimitedAvailability",
          description:
            "45-minute discovery call, written report, and review call. Five reclaimable hours per week identified, or a full refund.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
