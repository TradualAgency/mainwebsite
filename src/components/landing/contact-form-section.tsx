import ContactForm from "@/components/contact-form";
import { Section } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";
import type { ContactFormBlock } from "@/sanity/lib/getLandingPages";

export function LandingContactForm({ heading, intro, source }: ContactFormBlock & { source?: string }) {
  return (
    <Section tone="dark">
      <SectionHeading title={heading} intro={intro} tone="dark" className="mb-10" />
      <div className="max-w-xl">
        <ContactForm source={source} />
      </div>
    </Section>
  );
}
