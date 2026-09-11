import {ProjectsIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: ProjectsIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        })
      ],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [defineArrayMember({
        type: 'string'
      })],
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'completedAt',
      title: 'Completion Date',
      type: 'datetime',
    }),
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
    }),
    defineField({
      name: 'projectUrl',
      title: 'Project URL',
      type: 'url',
    }),
    defineField({
      name: 'content',
      title: 'Project Content',
      type: 'blockContent',
    }),
    // De vorm is bewust gelijk aan StatBandItem (components/marketing/stat-band.tsx),
    // zodat de casepagina dit veld rechtstreeks in StatBand kan gooien zonder mapping.
    defineField({
      name: 'results',
      title: 'Results',
      description: 'Meetbare uitkomsten van de case. Max 3, worden als cijferband getoond.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'number',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'prefix',
              title: 'Prefix',
              description: 'Bijvoorbeeld + of -',
              type: 'string',
            }),
            defineField({
              name: 'suffix',
              title: 'Suffix',
              description: 'Bijvoorbeeld %, x of dagen',
              type: 'string',
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: Rule => Rule.required()
            }),
          ],
          preview: {
            select: { value: 'value', prefix: 'prefix', suffix: 'suffix', label: 'label' },
            prepare({ value, prefix, suffix, label }) {
              return { title: `${prefix ?? ''}${value ?? ''}${suffix ?? ''}`, subtitle: label }
            },
          },
        })
      ],
      validation: Rule => Rule.max(3)
    }),
    defineField({
      name: 'quote',
      title: 'Pull quote',
      description: 'Eén regel die groot uitgelicht wordt. Aanhalingstekens horen in de tekst zelf.',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Quote',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'attribution',
          title: 'Attribution',
          description: 'Bijvoorbeeld een naam en functie, of de klantnaam.',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Image Gallery',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            }),
            defineField({
              name: 'caption',
              type: 'string',
              title: 'Caption',
            })
          ]
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      client: 'client',
      media: 'mainImage',
    },
    prepare(selection) {
      const {client} = selection
      return {...selection, subtitle: client && `Client: ${client}`}
    },
  },
})