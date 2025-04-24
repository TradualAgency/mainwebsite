import Link from "next/link"
import { type SanityDocument } from "next-sanity"

import { client } from '@/sanity/lib/client';
import { urlFor } from "@/sanity/lib/image";




const POST_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc) [0...12]{_id, title, slug, mainImage, body}`;

const options = {next: { revalidate: 30 } };

export default async function Kennisbank() {
  const posts = await client.fetch<SanityDocument[]>(POST_QUERY, {}, options);
  return (
    <section className="info-section my-20 px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-geologica text-8xl pb-5">Kennisbank</h2>
        <div>
          <ul>
            {posts.map((post) => (
              <li key={post._id}>
                <Link href={`/${post.slug.current}`}>
                  <img src={urlFor(post.mainImage).width(200).url()} alt="" />
                  <h2>{post.title}</h2>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}