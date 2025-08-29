// components/ImageWithText.tsx
import Image from "next/image";
import React from "react";

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
        <section className="bg-white">
            <div className="mx-auto max-w-7xl flex flex-col md:flex-row">
                {/* Afbeelding - altijd eerst op mobiel */}
                <div
                    className={`relative w-full md:w-1/2 h-64 sm:h-80 md:h-auto ${
                        isImageLeft ? "md:order-1" : "md:order-2"
                    }`}
                >
                    <Image
                        src={imageUrl}
                        alt={imageAlt}
                        width={800}
                        height={600}
                        className={`object-cover w-full h-full md:min-h-[600px] ${
                            isImageLeft 
                                ? "md:rounded-r-lg" 
                                : "md:rounded-l-lg"
                        }`}
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>

                {/* Tekst - altijd tweede op mobiel */}
                <div
                    className={`w-full md:w-1/2 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 md:py-16 ${
                        isImageLeft ? "md:order-2" : "md:order-1"
                    }`}
                >
                    <div className="max-w-lg text-left">
                        <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-semibold text-secondary mb-4">
                            {title}
                        </h2>
                        <p className="text-sm sm:text-base leading-relaxed text-secondary">{text}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
