// lib/sanity/getPosts.ts
import { client } from '@/sanity/lib/client';
import { type Image, type PortableTextBlock } from '@sanity/types';
import type { Locale } from '@/i18n/routing';
import { LANG_FILTER, TRANSLATIONS_PROJECTION, translatedSlugQuery, type Translation } from './locale';

type PostImage = Image & { alt?: string };

export interface CtaLink {
  label: string;
  href: string;
}

export interface PostFaqItem {
  question: string;
  answer: string;
}

// Query voor alle posts (zonder body — die is alleen nodig op de detailpagina)
const POSTS_QUERY = `*[
  _type == "post"
  && ${LANG_FILTER}
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
  && ${LANG_FILTER}
  && slug.current == $slug
][0] {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  language,
  categories[]->{_id, title},
  author->{name, image},
  body,
  heroCta,
  faqTitle,
  faq[]{question, answer},
  serviceCta,
  seoTitle,
  seoDescription,
  ${TRANSLATIONS_PROJECTION}
}`;

// Max. 3 andere posts: eerst dezelfde categorie, daarna de nieuwste.
const RELATED_POSTS_QUERY = `*[
  _type == "post"
  && ${LANG_FILTER}
  && defined(slug.current)
  && _id != $id
] | order(count((categories[]._ref)[@ in $categoryIds]) desc, publishedAt desc, _createdAt desc)[0...3] {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  categories[]->{_id, title},
  author->{name}
}`;

const SLUGS_QUERY = `*[
  _type == "post"
  && ${LANG_FILTER}
  && defined(slug.current)
].slug.current`;

// Slugs mét vertalingen, voor de sitemap (hreflang-alternates).
const SLUGS_WITH_TRANSLATIONS_QUERY = `*[
  _type == "post"
  && ${LANG_FILTER}
  && defined(slug.current)
]{
  "slug": slug.current,
  "updatedAt": _updatedAt,
  ${TRANSLATIONS_PROJECTION}
}`;

const TRANSLATED_SLUG_QUERY = translatedSlugQuery('post');

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  mainImage?: PostImage;
  publishedAt?: string;
  language?: Locale;
  categories?: { _id: string; title: string }[];
  author?: { name: string; image?: Image };
  body?: PortableTextBlock[];
  heroCta?: CtaLink;
  faqTitle?: string;
  faq?: PostFaqItem[];
  serviceCta?: { eyebrow?: string; heading?: string; body?: string; button?: CtaLink };
  seoTitle?: string;
  seoDescription?: string;
  _translations?: Translation[];
}

export type PostSitemapEntry = { slug: string; updatedAt: string; _translations?: Translation[] };

export async function getPosts(locale: Locale): Promise<Post[]> {
  return await client.fetch<Post[]>(POSTS_QUERY, { locale });
}

export async function getPostBySlug(slug: string, locale: Locale): Promise<Post | null> {
  return await client.fetch<Post | null>(POST_QUERY, { slug, locale });
}

export async function getRelatedPosts(id: string, categoryIds: string[], locale: Locale): Promise<Post[]> {
  return await client.fetch<Post[]>(RELATED_POSTS_QUERY, { id, categoryIds, locale });
}

export async function getPostSlugs(locale: Locale): Promise<string[]> {
  return await client.fetch<string[]>(SLUGS_QUERY, { locale });
}

export async function getPostSlugsWithTranslations(locale: Locale): Promise<PostSitemapEntry[]> {
  return await client.fetch<PostSitemapEntry[]>(SLUGS_WITH_TRANSLATIONS_QUERY, { locale });
}

// Voor een slug die in `locale` niet bestaat: de slug van de vertaling in `locale`, of null.
export async function getTranslatedPostSlug(slug: string, locale: Locale): Promise<string | null> {
  return await client.fetch<string | null>(TRANSLATED_SLUG_QUERY, { slug, locale });
}
