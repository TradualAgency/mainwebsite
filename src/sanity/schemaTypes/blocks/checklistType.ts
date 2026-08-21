import { CheckmarkIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const checklistType = defineType({
  name: 'checklist',
  title: 'Checklist',
  type: 'object',
  icon: CheckmarkIcon,
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
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return {
        title: title || 'Untitled',
        subtitle: 'Checklist',
        media: CheckmarkIcon,
      }
    },
  },
})
