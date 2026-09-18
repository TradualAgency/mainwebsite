// lib/sanity/getProjects.ts
import { client } from '@/sanity/lib/client';
import { type Image, type PortableTextBlock } from '@sanity/types';
import type { Locale } from '@/i18n/routing';
import { LANG_FILTER, TRANSLATIONS_PROJECTION, translatedSlugQuery, type Translation } from './locale';

type ProjectImage = Image & { alt?: string };
// Gallery-items hebben in het schema een caption naast de alt-tekst.
export type GalleryImage = ProjectImage & { caption?: string };

// Gedeelde kaartprojectie: ProjectCardGrid verwacht een volledig Project-object.
const CARD_PROJECTION = `{
  _id,
  title,
  slug,
  description,
  mainImage,
  tags,
  featured,
  completedAt,
  client,
  projectUrl
}`;

// Query voor alle projecten
const PROJECTS_QUERY = `*[
  _type == "project"
  && ${LANG_FILTER}
  && defined(slug.current)
] | order(completedAt desc, _createdAt desc) ${CARD_PROJECTION}`;

// Query voor een specifiek project
const PROJECT_QUERY = `*[
  _type == "project"
  && ${LANG_FILTER}
  && slug.current == $slug
][0] {
  _id,
  title,
  slug,
  description,
  mainImage,
  tags,
  featured,
  completedAt,
  client,
  projectUrl,
  content,
  gallery,
  results,
  quote,
  language,
  ${TRANSLATIONS_PROJECTION}
}`;

// Slugs voor generateStaticParams op /our-work/[id], zelfde patroon als getPostSlugs().
const SLUGS_QUERY = `*[
  _type == "project"
  && ${LANG_FILTER}
  && defined(slug.current)
].slug.current`;

const SLUGS_WITH_TRANSLATIONS_QUERY = `*[
  _type == "project"
  && ${LANG_FILTER}
  && defined(slug.current)
]{
  "slug": slug.current,
  "updatedAt": _updatedAt,
  ${TRANSLATIONS_PROJECTION}
}`;

// Andere cases onderaan een casepagina.
const RELATED_QUERY = `*[
  _type == "project"
  && ${LANG_FILTER}
  && defined(slug.current)
  && slug.current != $slug
] | order(featured desc, completedAt desc, _createdAt desc) [0...$limit] ${CARD_PROJECTION}`;

const FEATURED_QUERY = `*[
  _type == "project"
  && ${LANG_FILTER}
  && featured == true
  && defined(slug.current)
] | order(completedAt desc, _createdAt desc) [0...6] ${CARD_PROJECTION}`;

const TRANSLATED_SLUG_QUERY = translatedSlugQuery('project');

// Gelijk aan StatBandItem, zodat results zonder mapping in StatBand kan.
export interface ProjectResult {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  mainImage: ProjectImage;
  tags: string[];
  featured: boolean;
  completedAt: string;
  client: string;
  projectUrl: string;
  content?: PortableTextBlock[];
  gallery?: GalleryImage[];
  results?: ProjectResult[];
  quote?: { text?: string; attribution?: string };
  language?: Locale;
  _translations?: Translation[];
}

export type ProjectSitemapEntry = { slug: string; updatedAt: string; _translations?: Translation[] };

export async function getProjects(locale: Locale): Promise<Project[]> {
  return await client.fetch<Project[]>(PROJECTS_QUERY, { locale });
}

export async function getProjectBySlug(slug: string, locale: Locale): Promise<Project | null> {
  return await client.fetch<Project | null>(PROJECT_QUERY, { slug, locale });
}

export async function getProjectSlugs(locale: Locale): Promise<string[]> {
  return await client.fetch<string[]>(SLUGS_QUERY, { locale });
}

export async function getProjectSlugsWithTranslations(locale: Locale): Promise<ProjectSitemapEntry[]> {
  return await client.fetch<ProjectSitemapEntry[]>(SLUGS_WITH_TRANSLATIONS_QUERY, { locale });
}

export async function getRelatedProjects(slug: string, locale: Locale, limit = 3): Promise<Project[]> {
  return await client.fetch<Project[]>(RELATED_QUERY, { slug, locale, limit });
}

export async function getFeaturedProjects(locale: Locale): Promise<Project[]> {
  return await client.fetch<Project[]>(FEATURED_QUERY, { locale });
}

export async function getTranslatedProjectSlug(slug: string, locale: Locale): Promise<string | null> {
  return await client.fetch<string | null>(TRANSLATED_SLUG_QUERY, { slug, locale });
}
