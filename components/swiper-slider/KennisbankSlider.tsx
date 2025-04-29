'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import {urlFor} from "@/sanity/lib/image";
import Link from "next/link";
import {SanityDocument} from "next-sanity";

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
                            className="w-full h-[300px] object-cover"
                            src={urlFor(post.mainImage).url()} alt=""
                            />
                            <div className="flex flex-col gap-6 mt-6">
                                <h2 className="font-geologica font-bold text-xl">{post.title}</h2>
                                <p>{post.excerpt}</p>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
        )
}