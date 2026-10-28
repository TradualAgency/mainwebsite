import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {isUniqueWithinLanguage, languageField} from './shared/language'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: DocumentTextIcon,
  // Alleen een SEO-groep: zonder default-groep toont de Studio standaard "All fields".
  groups: [{name: 'seo', title: 'SEO'}],
  fields: [
    languageField,
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        isUnique: isUniqueWithinLanguage,
      },
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'mainImage',
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
      ]
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'category'}})],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      description: 'Intro onder de titel in de hero, en tekst op de overzichtskaart.',
    }),
    defineField({
      name: 'heroCta',
      title: 'Button in de hero (optioneel)',
      type: 'ctaLink',
    }),
    defineField({
      name: 'faqTitle',
      title: 'FAQ-titel (optioneel)',
      type: 'string',
    }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      description: 'Wordt onder het artikel getoond en als FAQPage-schema meegestuurd.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'question', title: 'Vraag', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'answer', title: 'Antwoord', type: 'text', rows: 4, validation: (rule) => rule.required()}),
          ],
          preview: {select: {title: 'question'}},
        }),
      ],
    }),
    defineField({
      name: 'serviceCta',
      title: 'CTA onderaan (optioneel)',
      description: 'Leeg laten = standaard CTA naar het Revenue Leak Report.',
      type: 'object',
      options: {collapsible: true, collapsed: true},
      fields: [
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
        defineField({name: 'heading', title: 'Titel', type: 'string'}),
        defineField({name: 'body', title: 'Tekst', type: 'text', rows: 3}),
        defineField({name: 'button', title: 'Button', type: 'ctaLink'}),
      ],
    }),
    defineField({
      name: 'seoTitle',
      title: 'Meta title',
      description: 'Leeg = titel van de post. Max. 60 tekens.',
      type: 'string',
      group: 'seo',
      validation: (rule) => rule.max(60).warning('Langer dan 60 tekens wordt in Google afgekapt.'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'Meta description',
      description: 'Leeg = excerpt. Max. 155 tekens.',
      type: 'text',
      rows: 3,
      group: 'seo',
      validation: (rule) => rule.max(155).warning('Langer dan 155 tekens wordt in Google afgekapt.'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
