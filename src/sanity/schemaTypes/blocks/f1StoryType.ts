import { PlayIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const f1StoryType = defineType({
  name: 'f1Story',
  title: 'F1 story',
  type: 'object',
  icon: PlayIcon,
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
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return {
        title: title || 'Untitled',
        subtitle: 'F1 story',
        media: PlayIcon,
      }
    },
  },
})
