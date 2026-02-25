// components/CaseStudies.tsx
'use client';
import { useState } from 'react';

type Slide = {
    id: string;
    quote: string;
    author: string;
    role: string;
    company: string;
    companySize: string;
    industry: string;
    cta: string;
};

const SLIDES: Slide[] = [
    {
        id: '1',
        quote:
            'De nieuwe headless setup maakt alles deelbaar en herbruikbaar. We rollen campagnes nu in uren uit in plaats van dagen, en leren sneller wat werkt.',
        author: 'Sanne de Vries',
        role: 'E-commerce Lead',
        company: 'Nordic Goods',
        companySize: 'Scale-up',
        industry: 'Retail / Lifestyle',
        cta: 'Lees case',
    },
    {
        id: '2',
        quote:
            'Door automatisering en een snellere checkout besparen we supporturen en stijgt onze conversie. Het is veel makkelijker geworden om te schalen.',
        author: 'Mehmet Kaya',
        role: 'Operations Manager',
        company: 'Urban Outfitters NL',
        companySize: 'Enterprise',
        industry: 'Fashion / Retail',
        cta: 'Bekijk resultaten',
    },
];

export default function CaseStudies() {
    return (
        <section className="max-w-7xl mx-auto py-12 px-6 my-20">
            {/* Titel + button */}
            <div className="w-full md:w-[50%] mb-10">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 text-secondary">
                    Klanten die met ons groeien
                </h2>
                <button className="bg-secondary text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition">
                    Ontdek hoe
                </button>
            </div>

            {/* Slider */}
            <CaseStudySlider />
        </section>
    );
}

function CaseStudySlider() {
    const [index, setIndex] = useState(0);
    const total = SLIDES.length;

    const prev = () => setIndex((i) => (i - 1 + total) % total);
    const next = () => setIndex((i) => (i + 1) % total);

    const slide = SLIDES[index];

    return (
        <div className="relative">
            {/* Navigatie knoppen rechtsboven */}
            <div className="absolute right-2 -top-20 flex items-center gap-2">
                <button
                    aria-label="Vorige"
                    onClick={prev}
                    className="h-10 w-10 rounded-full border border-gray-300 bg-white hover:bg-gray-50 grid place-items-center"
                >
                    {/* Left arrow */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <button
                    aria-label="Volgende"
                    onClick={next}
                    className="h-10 w-10 rounded-full bg-black text-white hover:opacity-90 grid place-items-center"
                >
                    {/* Right arrow */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>

            {/* Slide card (layout geïnspireerd op je screenshot) */}
            <div className="rounded-2xl border border-gray-200 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] min-h-[600px] md:min-h-[700px]">
                    {/* Linkerkolom: meta */}
                    <div className="bg-white p-8">
                        <div className="h-48 md:h-full flex flex-col justify-end">
                            <div className="pt-8 border-t border-gray-200">
                                <div className="text-xs uppercase text-gray-500 mb-1">Company size</div>
                                <div className="text-gray-900 mb-4">{slide.companySize}</div>
                                <div className="text-xs uppercase text-gray-500 mb-1">Industry</div>
                                <div className="text-gray-900">{slide.industry}</div>
                            </div>
                        </div>
                    </div>

                    {/* Rechterkolom: quote */}
                    <div className="bg-secondary/10 p-8 md:p-12 relative flex flex-col justify-between">
                        <div>
                            <div className="text-5xl text-secondary/70 leading-none mb-4">“</div>
                            <p className="text-xl md:text-2xl text-[#243B6B] leading-relaxed">
                                {slide.quote}
                            </p>

                            <div className="mt-8 text-[#243B6B]">
                                <div className="font-semibold">{slide.author}</div>
                                <div className="text-sm opacity-80">
                                    {slide.role}, {slide.company}
                                </div>
                            </div>
                        </div>

                        <button className="inline-flex self-end items-center gap-2 rounded-full border border-[#9DBAE8] bg-white px-5 py-3 text-[#243B6B] hover:bg-[#f7fbff]">
                            {slide.cta}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Dots */}
            <div className="mt-6 flex justify-center gap-2">
                {SLIDES.map((s, i) => (
                    <button
                        key={s.id}
                        onClick={() => setIndex(i)}
                        aria-label={`Ga naar slide ${i + 1}`}
                        className={`h-2.5 w-2.5 rounded-full transition ${
                            i === index ? 'bg-black' : 'bg-gray-300'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
