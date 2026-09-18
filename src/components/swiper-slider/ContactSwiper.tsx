'use client';
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import styles from '../../app/styles/Contact-swiper.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

type Slide = { label: string; quote: string; source: string };

export default function ContactSwiper() {
    const t = useTranslations("ContactSwiper");
    const slides = t.raw("slides") as Slide[];

    return (
        <Swiper
            modules={[Navigation]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            className={`h-full w-full ${styles.contactSwiper}`}
        >
            {slides.map((slide) => (
                <SwiperSlide
                    key={slide.label}
                    className="border border-surface/10 bg-surface/5 p-6 w-full"
                >
                    <section className="flex flex-col justify-between h-full">
                        <p className="font-heading text-[10px] uppercase tracking-[0.16em] text-accent">{slide.label}</p>
                        <div className="flex-grow flex items-center justify-center">
                            <p className="text-2xl italic text-surface leading-snug">&ldquo;{slide.quote}&rdquo;</p>
                        </div>
                        <p className="font-heading text-[10px] uppercase tracking-[0.16em] text-surface/40">{slide.source}</p>
                    </section>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
