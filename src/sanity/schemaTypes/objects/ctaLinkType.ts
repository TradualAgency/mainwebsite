import { LinkIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const ctaLinkType = defineType({
  name: 'ctaLink',
  title: 'Button',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Link',
      type: 'string',
      description: 'A path like /contact, or a full URL.',
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value) return true
          if (
            value.startsWith('/') ||
            value.startsWith('http://') ||
            value.startsWith('https://') ||
            value.startsWith('mailto:')
          ) {
            return true
          }
          return 'Use a path like /contact or a full URL'
        }),
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'href' },
  },
})
