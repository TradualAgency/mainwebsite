import { BoltIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const ctaType = defineType({
  name: 'cta',
  title: 'CTA',
  type: 'object',
  icon: BoltIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary button',
      type: 'ctaLink',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary button',
      type: 'ctaLink',
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return {
        title: title || 'Untitled',
        subtitle: 'CTA',
        media: BoltIcon,
      }
    },
  },
})
