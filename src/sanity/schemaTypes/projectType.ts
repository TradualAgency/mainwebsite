import {ProjectsIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {isUniqueWithinLanguage, languageField} from './shared/language'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: ProjectsIcon,
  groups: [
    {name: 'content', title: 'Content'},
    {name: 'results', title: 'Resultaten'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    languageField,
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
        isUnique: isUniqueWithinLanguage,
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
      name: 'industry',
      title: 'Branche',
      description: 'Bijvoorbeeld Fashion. Hoort niet in de diensten-tags.',
      type: 'string',
    }),
    defineField({
      name: 'tags',
      title: 'Diensten (tags)',
      description: 'Bijvoorbeeld Stack Rebuild, Redesign. Worden als "Diensten" in de hero getoond.',
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
    // Hoofdstukken (Revenue Leak / Rebuild / Resultaat). Leeg = de pagina valt terug op
    // het oudere vrije `content`-veld hieronder.
    defineField({
      name: 'sections',
      title: 'Hoofdstukken',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'caseSection',
          fields: [
            defineField({name: 'heading', title: 'Kop', type: 'string', validation: Rule => Rule.required()}),
            defineField({name: 'body', title: 'Tekst', type: 'blockContent'}),
          ],
          preview: {select: {title: 'heading'}},
        }),
      ],
    }),
    defineField({
      name: 'content',
      title: 'Project Content (oud)',
      description: 'Alleen gebruikt als er geen hoofdstukken zijn.',
      type: 'blockContent',
      group: 'content',
    }),
    defineField({
      name: 'metrics',
      title: 'Meetresultaten (voor / na)',
      type: 'array',
      group: 'results',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'caseMetric',
          fields: [
            defineField({name: 'label', title: 'Meting', type: 'string', validation: Rule => Rule.required()}),
            defineField({name: 'before', title: 'Voor', type: 'string'}),
            defineField({name: 'after', title: 'Na', type: 'string', validation: Rule => Rule.required()}),
            defineField({name: 'change', title: 'Verschil', type: 'string'}),
          ],
          preview: {
            select: {label: 'label', before: 'before', after: 'after', change: 'change'},
            prepare({label, before, after, change}) {
              return {title: label, subtitle: [before && `${before} → ${after ?? ''}`, change].filter(Boolean).join(' · ')}
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'metricsNote',
      title: 'Toelichting meting',
      description: 'Periode en bron, bijvoorbeeld "30 dagen na livegang. Bron: GA4."',
      type: 'text',
      rows: 2,
      group: 'results',
    }),
    defineField({
      name: 'resultClosing',
      title: 'Slotzin',
      description: 'Uitgelichte zin onder de meetresultaten.',
      type: 'string',
      group: 'results',
    }),
    // De vorm is bewust gelijk aan StatBandItem (components/marketing/stat-band.tsx),
    // zodat de casepagina dit veld rechtstreeks in StatBand kan gooien zonder mapping.
    defineField({
      name: 'results',
      title: 'Resultaattegels',
      group: 'results',
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
              validation: Rule => Rule.custom((value, ctx) => {
                const parent = ctx.parent as {display?: string} | undefined
                return value != null || parent?.display ? true : 'Vul een getal of een weergavetekst in.'
              })
            }),
            defineField({
              name: 'display',
              title: 'Weergavetekst',
              description: 'Optioneel, vervangt het getal (zonder optel-animatie). Bijvoorbeeld "2,8s → 1,2s".',
              type: 'string',
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
            select: { value: 'value', display: 'display', prefix: 'prefix', suffix: 'suffix', label: 'label' },
            prepare({ value, display, prefix, suffix, label }) {
              return { title: display || `${prefix ?? ''}${value ?? ''}${suffix ?? ''}`, subtitle: label }
            },
          },
        })
      ],
      validation: Rule => Rule.max(3)
    }),
    defineField({
      name: 'quote',
      title: 'Pull quote',
      group: 'results',
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
    }),
    defineField({
      name: 'seoTitle',
      title: 'Meta title',
      description: 'Leeg = titel van het project. Max. 60 tekens.',
      type: 'string',
      group: 'seo',
      validation: (rule) => rule.max(60).warning('Langer dan 60 tekens wordt in Google afgekapt.'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'Meta description',
      description: 'Leeg = korte omschrijving. Max. 155 tekens.',
      type: 'text',
      rows: 3,
      group: 'seo',
      validation: (rule) => rule.max(155).warning('Langer dan 155 tekens wordt in Google afgekapt.'),
    }),
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