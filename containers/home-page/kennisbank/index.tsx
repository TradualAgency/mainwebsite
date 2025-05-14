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
    <section className="info-section my-20 pl-8">
      <div className="pl-[calc((100vw-1360px)/2)] pr-0">
        <h2 className="font-geologica text-5xl md:text-8xl pb-5">Kennisbank</h2>
        <div className="mt-14 md:mt-0 ">
          <KennisbankSlider posts={posts as Post[]}/>
        </div>
      </div>
    </section>
  )
}