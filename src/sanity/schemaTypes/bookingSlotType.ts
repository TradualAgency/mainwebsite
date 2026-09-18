import { CalendarIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

// Bezette tijdslots voor de kennismakings-call (/book-a-call). Bewust géén naam of e-mail:
// de dataset is publiek leesbaar via de API, dus persoonsgegevens horen hier niet. Die
// staan alleen in de mails. Handmatig een document met status "blocked" maken (en
// publiceren) blokkeert een tijd; "cancelled" geeft een slot weer vrij.
export const bookingSlotType = defineType({
  name: 'bookingSlot',
  title: 'Booking slot',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'start',
      title: 'Start',
      type: 'datetime',
      description: 'Start of the blocked or booked time.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'end',
      title: 'End',
      type: 'datetime',
      description: 'Leave empty for a single slot; set a later time to block a longer stretch.',
      validation: (rule) =>
        rule.custom((end, context) => {
          const start = (context.document as { start?: string } | undefined)?.start
          if (!end || !start) return true
          return new Date(end) > new Date(start) ? true : 'End must be after start'
        }),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'blocked',
      options: {
        list: [
          { title: 'Confirmed (booked via the site)', value: 'confirmed' },
          { title: 'Blocked (not available)', value: 'blocked' },
          { title: 'Cancelled (slot is free again)', value: 'cancelled' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'locale', title: 'Language', type: 'string', readOnly: true }),
    defineField({ name: 'source', title: 'Source', type: 'string', readOnly: true }),
    defineField({ name: 'createdAt', title: 'Created', type: 'datetime', readOnly: true }),
  ],
  orderings: [{ title: 'Start', name: 'startAsc', by: [{ field: 'start', direction: 'asc' }] }],
  preview: {
    select: { start: 'start', end: 'end', status: 'status' },
    prepare({ start, end, status }) {
      const fmt = (iso?: string) =>
        iso
          ? new Date(iso).toLocaleString('nl-NL', { timeZone: 'Europe/Amsterdam', dateStyle: 'medium', timeStyle: 'short' })
          : null
      const from = fmt(start) ?? '—'
      const to = fmt(end)
      return { title: to ? `${from} → ${to}` : from, subtitle: status }
    },
  },
})
