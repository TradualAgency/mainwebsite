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
                        <p className="text-2xl italic text-surface leading-snug">&quot;Faster load times, better tracking, and a more stable Shopify base immediately return more from the same traffic.&quot;</p>
                    </div>
                    <p className="font-heading text-[10px] uppercase tracking-[0.16em] text-surface/40">Tradual infrastructure</p>
                </section>
            </SwiperSlide>
            <SwiperSlide
                className="border border-surface/10 bg-surface/5 p-6 w-full"
            >
                <section className="flex flex-col justify-between h-full">
                    <p className="font-heading text-[10px] uppercase tracking-[0.16em] text-accent">Shopify</p>
                    <div className="flex-grow flex items-center justify-center">
                        <p className="text-2xl italic text-surface leading-snug">&quot;We look at the full store: checkout, data, apps, performance, and the technical choices that make growth possible.&quot;</p>
                    </div>
                    <p className="font-heading text-[10px] uppercase tracking-[0.16em] text-surface/40">E-commerce stack</p>
                </section>
            </SwiperSlide>
        </Swiper>
    );
}
