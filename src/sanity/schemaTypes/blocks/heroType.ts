import { ComposeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const heroType = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  icon: ComposeIcon,
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
      name: 'lede',
      title: 'Lede',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'priceLabel',
      title: 'Price label',
      type: 'string',
      description: 'Optional, e.g. €2,500 – €7,500',
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary button',
      type: 'ctaLink',
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary button',
      type: 'ctaLink',
    }),
  ],
  preview: {
    select: { title: 'heading', subtitle: 'eyebrow' },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Untitled',
        subtitle: subtitle ? `Hero · ${subtitle}` : 'Hero',
        media: ComposeIcon,
      }
    },
  },
})
