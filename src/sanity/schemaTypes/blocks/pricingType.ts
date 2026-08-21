import { TagIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const pricingType = defineType({
  name: 'pricing',
  title: 'Pricing',
  type: 'object',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Offer label',
      type: 'string',
      description: 'Shown above the price, e.g. Revenue Leak Audit',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'priceLabel',
      title: 'Price',
      type: 'string',
      description: 'e.g. €2,500 – €7,500',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'determinants',
      title: 'What determines the price',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'priceLabel' },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Untitled',
        subtitle: subtitle ? `Pricing · ${subtitle}` : 'Pricing',
        media: TagIcon,
      }
    },
  },
})
