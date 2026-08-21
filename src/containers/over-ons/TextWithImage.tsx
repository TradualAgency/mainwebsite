import Image from "next/image";
import { Check } from "lucide-react";
import { Section, type SectionTone } from "@/components/marketing/section";
import { SectionHeading } from "@/components/marketing/section-heading";

type ImageWithTextProps = {
  eyebrow?: string;
  title: string;
  text: string;
  points?: string[];
  imageUrl: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";
  tone?: SectionTone;
};

export default function ImageWithText({
  eyebrow,
  title,
  text,
  points,
  imageUrl,
  imageAlt = "",
  imagePosition = "left",
  tone = "light",
}: ImageWithTextProps) {
  const isImageLeft = imagePosition === "left";

  return (
    <Section tone={tone} innerClassName="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <div className={isImageLeft ? "order-1" : "order-1 lg:order-2"}>
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={900}
          height={700}
          className="w-full h-[400px] md:h-[700px] object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      <div className={isImageLeft ? "order-2 flex items-center" : "order-2 lg:order-1 flex items-center"}>
        <div className="max-w-xl mx-auto">
          <SectionHeading eyebrow={eyebrow} title={title} tone={tone === "dark" ? "dark" : "light"} className="mb-8" />
          <p className="text-body text-base md:text-lg leading-relaxed whitespace-pre-line">{text}</p>
          {points && points.length > 0 && (
            <ul className="mt-6 space-y-4">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-body text-base leading-relaxed">
                  <Check className="text-accent shrink-0 mt-1" size={18} strokeWidth={2} />
                  {point}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Section>
  );
}
