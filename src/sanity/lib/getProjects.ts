// lib/sanity/getProjects.ts
import { client } from '@/sanity/lib/client';
import { type Image, type PortableTextBlock } from '@sanity/types';

type ProjectImage = Image & { alt?: string };
// Gallery-items hebben in het schema een caption naast de alt-tekst.
export type GalleryImage = ProjectImage & { caption?: string };

// Query voor alle projecten
const PROJECTS_QUERY = `*[
  _type == "project"
  && defined(slug.current)
] | order(completedAt desc, _createdAt desc) {
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

// Query voor een specifiek project
const PROJECT_QUERY = `*[
  _type == "project"
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
  quote
}`;

// Slugs voor generateStaticParams op /our-work/[id], zelfde patroon als getPostSlugs().
const SLUGS_QUERY = `*[
  _type == "project"
  && defined(slug.current)
].slug.current`;

// Andere cases onderaan een casepagina. Zelfde projectie als PROJECTS_QUERY, want
// ProjectCardGrid verwacht een volledig Project-object.
const RELATED_QUERY = `*[
  _type == "project"
  && defined(slug.current)
  && slug.current != $slug
] | order(featured desc, completedAt desc, _createdAt desc) [0...$limit] {
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
}

export async function getProjects(): Promise<Project[]> {
  return await client.fetch<Project[]>(PROJECTS_QUERY);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return await client.fetch<Project>(PROJECT_QUERY, { slug });
}

export async function getProjectSlugs(): Promise<string[]> {
  return await client.fetch<string[]>(SLUGS_QUERY);
}

export async function getRelatedProjects(slug: string, limit = 3): Promise<Project[]> {
  return await client.fetch<Project[]>(RELATED_QUERY, { slug, limit });
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const FEATURED_QUERY = `*[
    _type == "project"
    && featured == true
    && defined(slug.current)
  ] | order(completedAt desc, _createdAt desc) [0...6] {
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
  
  return await client.fetch<Project[]>(FEATURED_QUERY);
}