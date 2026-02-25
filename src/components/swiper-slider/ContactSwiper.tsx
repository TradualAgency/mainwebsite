'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from 'next/image';
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
                className="p-6 rounded-xl bg-white/5 backdrop-blur-md shadow-lg w-full"
            >
                <section className="flex flex-col justify-between h-full">
                    <div>
                        <Image
                            src="/vercel.svg"
                            alt=""
                            className="w-20 bg-black/20 rounded-2xl p-5"
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className="flex-grow flex items-center justify-center">
                        <p className="text-2xl italic">&quot;Vercel kreeg meer bezoekers en een 30% conversie groei door snellere laadtijden&quot;</p>
                    </div>
                    <div className="h-[20px]"></div> {/* Empty spacer at bottom for balance */}
                </section>
            </SwiperSlide>
            <SwiperSlide
                className="p-6 rounded-xl bg-white/5 backdrop-blur-md shadow-lg w-full"
            >
                <section className="flex flex-col justify-between h-full">
                    <div>
                        <Image
                            src="/vercel.svg"
                            alt=""
                            className="w-20 bg-black/20 rounded-2xl p-5"
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className="flex-grow flex items-center justify-center">
                        <p className="text-2xl italic">&quot;Vercel kreeg meer bezoekers en een 30% conversie groei door snellere laadtijden&quot;</p>
                    </div>
                    <div className="h-[20px]"></div> {/* Empty spacer at bottom for balance */}
                </section>
            </SwiperSlide>
        </Swiper>
    );
}