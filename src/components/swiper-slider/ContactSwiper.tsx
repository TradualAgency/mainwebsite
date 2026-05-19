'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import styles from '../../app/styles/Contact-swiper.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


export default function ContactSwiper() {

    return (
        <Swiper
            modules={[Navigation]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            className={`h-full w-full ${styles.contactSwiper}`}
        >
            <SwiperSlide
                className="border border-surface/10 bg-surface/5 p-6 w-full"
            >
                <section className="flex flex-col justify-between h-full">
                    <p className="font-heading text-[10px] uppercase tracking-[0.16em] text-accent">Performance</p>
                    <div className="flex-grow flex items-center justify-center">
                        <p className="text-2xl italic text-surface leading-snug">&quot;Snellere laadtijden, betere tracking en een stabielere Shopify-basis zorgen direct voor meer rendement uit hetzelfde verkeer.&quot;</p>
                    </div>
                    <p className="font-heading text-[10px] uppercase tracking-[0.16em] text-surface/40">Tradual infrastructuur</p>
                </section>
            </SwiperSlide>
            <SwiperSlide
                className="border border-surface/10 bg-surface/5 p-6 w-full"
            >
                <section className="flex flex-col justify-between h-full">
                    <p className="font-heading text-[10px] uppercase tracking-[0.16em] text-accent">Shopify</p>
                    <div className="flex-grow flex items-center justify-center">
                        <p className="text-2xl italic text-surface leading-snug">&quot;We kijken naar de volledige store: checkout, data, apps, performance en de technische keuzes die groei mogelijk maken.&quot;</p>
                    </div>
                    <p className="font-heading text-[10px] uppercase tracking-[0.16em] text-surface/40">E-commerce stack</p>
                </section>
            </SwiperSlide>
        </Swiper>
    );
}
