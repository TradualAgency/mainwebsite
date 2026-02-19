import { type SanityDocument } from '@sanity/client';
import { client } from '@/sanity/lib/client';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt, mainImage}`;

export default async function Posts() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY);

  return (
    <section className="info-section my-20 px-8">
      <div className="max-w-7xl mx-auto">
        <h1>Posts</h1>
        <ul className='flex flex-col gao-y-5'>
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
    </section>
  )
}