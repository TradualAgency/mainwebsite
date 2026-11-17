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
      description: 'A path like /contact, a full URL, or an anchor on this page like #book (the meeting calendar).',
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value) return true
          // "/#book" is de homepage plus anker, niet een sectie op deze pagina.
          if (value.startsWith('/#')) return 'For a section on this page use #book, without the leading /'
          if (
            value.startsWith('#') ||
            value.startsWith('/') ||
            value.startsWith('http://') ||
            value.startsWith('https://') ||
            value.startsWith('mailto:')
          ) {
            return true
          }
          return 'Use a path like /contact, a full URL or an anchor like #book'
        }),
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'href' },
  },
})
