import { CalendarIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

// De eigen boekingskalender (zelfde widget als /book-a-call) als blok op een landingspagina,
// zodat bezoekers direct een gesprek inplannen zonder door te klikken.
export const bookingType = defineType({
  name: 'booking',
  title: 'Meeting (booking calendar)',
  type: 'object',
  icon: CalendarIcon,
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
      title: 'Intro',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'panelTitle',
      title: 'Calendar panel title',
      type: 'string',
      description: 'Shown in the side panel of the calendar, e.g. "Kennismaking". Falls back to the default title.',
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return {
        title: title || 'Untitled',
        subtitle: 'Meeting (booking calendar)',
        media: CalendarIcon,
      }
    },
  },
})
