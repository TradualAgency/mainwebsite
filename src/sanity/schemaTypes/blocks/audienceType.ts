import { UsersIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const audienceType = defineType({
  name: 'audience',
  title: 'Audience',
  type: 'object',
  icon: UsersIcon,
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
      name: 'forWho',
      title: 'Who this is for',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'notForWho',
      title: 'Who this is not for',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return {
        title: title || 'Untitled',
        subtitle: 'Audience',
        media: UsersIcon,
      }
    },
  },
})
