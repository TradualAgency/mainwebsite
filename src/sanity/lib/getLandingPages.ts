import { client } from '@/sanity/lib/client'
import { type Image } from '@sanity/types'
import { type PortableTextBlock } from '@portabletext/types'

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
  priceLabel?: string
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

export type PricingBlock = {
  _type: 'pricing'
  _key: string
  eyebrow?: string
  title: string
  label: string
  priceLabel: string
  determinants?: string[]
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
  | PricingBlock
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
}

const LANDING_PAGE_QUERY = `*[
  _type == "landingPage"
  && slug.current == $slug
][0] {
  _id,
  title,
  slug,
  seo,
  pageBuilder[]{
    ...,
    _key,
    _type
  }
}`

const LANDING_PAGE_SLUGS_QUERY = `*[
  _type == "landingPage"
  && defined(slug.current)
]{
  "slug": slug.current
}`

const options = { next: { revalidate: 60 } }

export async function getLandingPageBySlug(slug: string): Promise<LandingPage | null> {
  return await client.fetch<LandingPage | null>(LANDING_PAGE_QUERY, { slug }, options)
}

export async function getLandingPageSlugs(): Promise<string[]> {
  const rows = await client.fetch<{ slug: string }[]>(LANDING_PAGE_SLUGS_QUERY, {}, options)
  return (rows ?? []).map((row) => row.slug).filter(Boolean)
}
