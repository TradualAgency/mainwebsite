import { type SanityDocument } from "next-sanity";
import {Post} from "@/components/swiper-slider/KennisbankSlider"
import KennisbankSlider from "@/components/swiper-slider/KennisbankSlider";

import { client } from '@/sanity/lib/client';

const POST_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc) [0...12]{_id, title, slug, mainImage, body, excerpt}`;

const options = {next: { revalidate: 30 } };

export default async function Kennisbank() {
  const posts = await client.fetch<SanityDocument[]>(POST_QUERY, {}, options);
  return (
    <section className="info-section my-16 md:my-20 lg:my-24 px-4 sm:px-6 md:px-8 bg-secondary py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-geologica text-2xl md:text-3xl lg:text-4xl pb-5 text-white w-full md:w-[50%]">E-commerce academy</h2>
        <div className="mt-12 md:mt-16 lg:mt-20">
          <KennisbankSlider posts={posts as Post[]}/>
        </div>
      </div>
    </section>
  )
}