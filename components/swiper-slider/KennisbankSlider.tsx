'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import {urlFor} from "@/sanity/lib/image";
import Link from "next/link";
import {type SanityDocument} from "@sanity/client";

import 'swiper/css';
import 'swiper/css/navigation'
import {Navigation} from "swiper/modules";

export type Post = SanityDocument & {
    slug: {
        current: string;
    };
    mainImage: HTMLImageElement;
    title: string;
    excerpt: string;
};

export default function KennisbankSlider({posts} : { posts: Post[]  }) {
    return (
        <>
            <Swiper
                modules={[Navigation]}
                spaceBetween={50}
                slidesPerView={3.5}
                navigation
                breakpoints={{
                    320: {
                        slidesPerView: 1.2,
                        spaceBetween: 20
                    },
                    768: {
                        slidesPerView: 2.2,
                        spaceBetween: 40
                    },
                    1024: {
                        slidesPerView: 3.2,
                        spaceBetween: 50
                    }
                }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {posts.map((post) => (
                    <SwiperSlide key={post._id}>
                        <Link href={`/${post.slug.current}`}>
                            <img
                            className="w-full h-[300px] object-cover rounded-lg"
                            src={urlFor(post.mainImage).url()} alt=""
                            />
                            <div className="flex flex-col gap-6 mt-6">
                                <h2 className="font-geologica font-bold text-xl text-[#defff6]">{post.title}</h2>
                                <p className="text-[#defff6]">{post.excerpt}</p>
                            </div>
                            <div className="flex items-center gap-2 mt-10">
                                <span className="text-[#defff6] text-sm">Lees meer</span>
                                <div className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center shrink-0">
                                    <svg
                                        width="12"
                                        height="12"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M5 12h14M13 5l7 7-7 7"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
        )
}