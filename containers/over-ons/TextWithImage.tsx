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
        <section className="bg-white my-20">
            <div className="mx-auto max-w-7xl flex flex-col md:flex-row">
                {/* Afbeelding */}
                <div
                    className={`relative w-full md:w-1/2 h-64 md:h-auto ${
                        isImageLeft ? "order-1" : "order-2"
                    }`}
                >
                    <Image
                        src={imageUrl}
                        alt={imageAlt}
                        width={800}
                        height={600}
                        className={`object-cover w-full h-full min-h-[600px] ${isImageLeft ? "rounded-r-lg" : "rounded-l-lg" } `}
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>

                {/* Tekst */}
                <div
                    className={`w-full md:w-1/2 flex items-center justify-center px-6 py-12 md:py-0 ${
                        isImageLeft ? "order-2" : "order-1"
                    }`}
                >
                    <div className="max-w-lg text-center md:text-left">
                        <h2 className="text-3xl font-semibold text-secondary mb-4">
                            {title}
                        </h2>
                        <p className="text-sm/6 text-secondary">{text}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
