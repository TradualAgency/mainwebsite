import { client } from '@/sanity/lib/client'
import { type Image } from '@sanity/types'
import { type PortableTextBlock } from '@portabletext/types'
import type { Locale } from '@/i18n/routing'
import { LANG_FILTER, TRANSLATIONS_PROJECTION, translatedSlugQuery, type Translation } from './locale'

type SeoImage = Image & { alt?: string }

export type CtaLink = {
  _type?: 'ctaLink'
  label: string
  href: string
}

export type HeroBlock = {
  _type: 'hero'
  _key: string
  eyebrow?: string
  heading: string
  lede?: string
  primaryCta?: CtaLink
  secondaryCta?: CtaLink
}

export type AudienceBlock = {
  _type: 'audience'
  _key: string
  eyebrow?: string
  title: string
  forWho: string[]
  notForWho?: string[]
}

export type ChecklistBlock = {
  _type: 'checklist'
  _key: string
  eyebrow?: string
  title: string
  items: string[]
}

export type ProcessBlock = {
  _type: 'process'
  _key: string
  eyebrow?: string
  title: string
  steps: { _key: string; title: string; body: string }[]
}

export type FaqsBlock = {
  _type: 'faqs'
  _key: string
  eyebrow?: string
  title: string
  items: { _key: string; question: string; answer: string }[]
}

export type CtaBlock = {
  _type: 'cta'
  _key: string
  eyebrow?: string
  heading: string
  body?: string
  primaryCta: CtaLink
  secondaryCta?: CtaLink
}

export type ContactFormBlock = {
  _type: 'contactForm'
  _key: string
  heading: string
  intro?: string
  image?: SeoImage
}

export type RichTextBlock = {
  _type: 'richText'
  _key: string
  eyebrow?: string
  title?: string
  body: PortableTextBlock[]
}

export type F1StoryBlock = {
  _type: 'f1Story'
  _key: string
  eyebrow?: string
  heading: string
  body: string
  quote?: string
}

export type PageBuilderBlock =
  | HeroBlock
  | F1StoryBlock
  | AudienceBlock
  | ChecklistBlock
  | ProcessBlock
  | FaqsBlock
  | CtaBlock
  | ContactFormBlock
  | RichTextBlock

export type LandingPage = {
  _id: string
  title: string
  slug: { current: string }
  seo?: {
    title?: string
    description?: string
    ogImage?: SeoImage
    noIndex?: boolean
  }
  pageBuilder?: PageBuilderBlock[]
  language?: Locale
  _translations?: Translation[]
}

export type LandingPageSitemapEntry = { slug: string; updatedAt: string; noIndex?: boolean; _translations?: Translation[] }

const LANDING_PAGE_QUERY = `*[
  _type == "landingPage"
  && ${LANG_FILTER}
  && slug.current == $slug
][0] {
  _id,
  title,
  slug,
  seo,
  language,
  pageBuilder[]{
    ...,
    _key,
    _type
  },
  ${TRANSLATIONS_PROJECTION}
}`

const LANDING_PAGE_SLUGS_QUERY = `*[
  _type == "landingPage"
  && ${LANG_FILTER}
  && defined(slug.current)
]{
  "slug": slug.current
}`

const LANDING_PAGE_SLUGS_WITH_TRANSLATIONS_QUERY = `*[
  _type == "landingPage"
  && ${LANG_FILTER}
  && defined(slug.current)
]{
  "slug": slug.current,
  "updatedAt": _updatedAt,
  "noIndex": seo.noIndex,
  ${TRANSLATIONS_PROJECTION}
}`

const TRANSLATED_SLUG_QUERY = translatedSlugQuery('landingPage')

const options = { next: { revalidate: 60 } }

export async function getLandingPageBySlug(slug: string, locale: Locale): Promise<LandingPage | null> {
  return await client.fetch<LandingPage | null>(LANDING_PAGE_QUERY, { slug, locale }, options)
}

export async function getLandingPageSlugs(locale: Locale): Promise<string[]> {
  const rows = await client.fetch<{ slug: string }[]>(LANDING_PAGE_SLUGS_QUERY, { locale }, options)
  return (rows ?? []).map((row) => row.slug).filter(Boolean)
}

export async function getLandingPageSlugsWithTranslations(locale: Locale): Promise<LandingPageSitemapEntry[]> {
  return await client.fetch<LandingPageSitemapEntry[]>(LANDING_PAGE_SLUGS_WITH_TRANSLATIONS_QUERY, { locale }, options)
}

export async function getTranslatedLandingPageSlug(slug: string, locale: Locale): Promise<string | null> {
  return await client.fetch<string | null>(TRANSLATED_SLUG_QUERY, { slug, locale }, options)
}
