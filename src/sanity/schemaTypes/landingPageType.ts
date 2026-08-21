import { DocumentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

const RESERVED_SLUGS = [
  'about',
  'contact',
  'services',
  'projects',
  'posts',
  'analysis',
  'analyse',
  'diensten',
  'over-ons',
  'studio',
  'revenue-leak',
  'api',
]

export const landingPageType = defineType({
  name: 'landingPage',
  title: 'Landing page',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      description: 'Internal name and default page title.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      description: 'The page will live at tradual.nl/{slug}. Reserved paths like /about cannot be used.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) =>
        rule.required().custom((slug) => {
          const current = slug?.current
          if (!current) return 'Required'
          if (RESERVED_SLUGS.includes(current)) {
            return `"${current}" is a reserved path`
          }
          return true
        }),
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page content',
      type: 'pageBuilder',
      group: 'content',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      group: 'seo',
      fields: [
        defineField({
          name: 'title',
          title: 'SEO title',
          type: 'string',
          description: 'Defaults to the page title if empty.',
        }),
        defineField({
          name: 'description',
          title: 'SEO description',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'ogImage',
          title: 'Open Graph image',
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            }),
          ],
        }),
        defineField({
          name: 'noIndex',
          title: 'Hide from search engines',
          type: 'boolean',
          description: 'Use for ads-only pages that should not compete with service pages.',
          initialValue: false,
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({ title, slug }) {
      return {
        title: title || 'Untitled',
        subtitle: slug ? `/${slug}` : 'No slug',
      }
    },
  },
})
