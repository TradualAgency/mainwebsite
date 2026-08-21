import { EnvelopeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const contactFormType = defineType({
  name: 'contactForm',
  title: 'Contact form',
  type: 'object',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Shown to the right of the form. Falls back to a brand photo if empty.',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return {
        title: title || 'Untitled',
        subtitle: 'Contact form',
        media: EnvelopeIcon,
      }
    },
  },
})
