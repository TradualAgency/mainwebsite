// lib/sanity/getProjects.ts
import { client } from '@/sanity/lib/client';
import { type Image, type PortableTextBlock } from '@sanity/types';

type ProjectImage = Image & { alt?: string };

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
  gallery
}`;

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
  gallery?: ProjectImage[];
}

export async function getProjects(): Promise<Project[]> {
  return await client.fetch<Project[]>(PROJECTS_QUERY);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return await client.fetch<Project>(PROJECT_QUERY, { slug });
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