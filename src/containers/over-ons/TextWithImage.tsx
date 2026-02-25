import Image from "next/image";

type ImageWithTextProps = {
  title: string;
  text: string;
  imageUrl: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";
};

export default function ImageWithText({
  title,
  text,
  imageUrl,
  imageAlt = "",
  imagePosition = "left",
}: ImageWithTextProps) {
  const isImageLeft = imagePosition === "left";

  return (
    <section className="py-20 px-8 bg-surface">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
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
            <h2 className="font-heading text-primary text-[38px] leading-[1.05] md:text-[60px] mb-8">
              {title}
            </h2>
            <p className="text-body text-base md:text-lg leading-relaxed whitespace-pre-line">{text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
