// lib/sanity/getPosts.ts
import { client } from '@/sanity/lib/client';
import { type Image, type PortableTextBlock } from '@sanity/types';

type PostImage = Image & { alt?: string };

// Query voor alle posts (zonder body — die is alleen nodig op de detailpagina)
const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
] | order(publishedAt desc, _createdAt desc) {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  categories[]->{_id, title},
  author->{name}
}`;

// Query voor een specifieke post
const POST_QUERY = `*[
  _type == "post"
  && slug.current == $slug
][0] {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  categories[]->{_id, title},
  author->{name},
  body
}`;

const SLUGS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
].slug.current`;

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  mainImage?: PostImage;
  publishedAt?: string;
  categories?: { _id: string; title: string }[];
  author?: { name: string };
  body?: PortableTextBlock[];
}

export async function getPosts(): Promise<Post[]> {
  return await client.fetch<Post[]>(POSTS_QUERY);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return await client.fetch<Post>(POST_QUERY, { slug });
}

export async function getPostSlugs(): Promise<string[]> {
  return await client.fetch<string[]>(SLUGS_QUERY);
}
