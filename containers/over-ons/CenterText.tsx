// components/CenterText.tsx
import Image from "next/image";
import React from "react";

type CenterTextProps = {
    logoSrc?: string;
    text?: string;
};

export default function CenterText({
                                       logoSrc = "/images/logo-tradual.svg",
                                       text = "<b>Our story is your story.</b> You want to do good work. You're motivated by mission and purpose. And you want your work to make a difference. We want the same thing.",
                                   }: CenterTextProps) {
    return (
        <section
            id="centerText"
            className="bg-white py-8 md:py-12 lg:py-16"
            aria-label="Center text section"
        >
            <div className="max-w-3xl mx-auto px-6 text-center ">
                <header>
                    <div className="mb-8 flex flex-row items-center justify-center">
                        <Image
                            src={logoSrc}
                            alt="Tradual logo"
                            width={50}
                            height={50}
                        />
                        <p className="text-secondary font-geologica text-xl uppercase font-bold ml-4">
                            Tradual
                        </p>
                    </div>
                    <h3
                        className="text-lg text-neutral-800 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: text }}
                    />
                </header>
            </div>
        </section>
    );
}
