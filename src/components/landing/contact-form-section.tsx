import Image from "next/image";
import ContactForm from "@/components/contact-form";
import { Section } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";
import { urlFor } from "@/sanity/lib/image";
import type { ContactFormBlock } from "@/sanity/lib/getLandingPages";

const FALLBACK_IMAGE = {
  src: "/images/Chapter-Two.png",
  alt: "Abstract architectural interior in dark green marble with gold edges",
};

export function LandingContactForm({
  heading,
  intro,
  image,
  source,
}: ContactFormBlock & { source?: string }) {
  const imageSrc = image?.asset ? urlFor(image).width(1400).url() : FALLBACK_IMAGE.src;
  const imageAlt = image?.alt || FALLBACK_IMAGE.alt;

  return (
    <Section tone="dark">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
        <div>
          <SectionHeading title={heading} intro={intro} tone="dark" className="mb-10" />
          <ContactForm source={source} />
        </div>
        <div className="relative min-h-[22rem] lg:min-h-full overflow-hidden border border-surface/10">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </Section>
  );
}
