import {defineType, defineArrayMember} from 'sanity'
import {BlockquoteIcon, ImageIcon, LinkIcon, TextIcon} from '@sanity/icons'

/**
 * This is the schema type for block content used in the post document type
 * Importing this type into the studio configuration's `schema` property
 * lets you reuse it in other document types with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */

export const blockContentType = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      // Styles let you define what blocks can be marked up as. The default
      // set corresponds with HTML tags, but you can set any title or value
      // you want, and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      // Marks let you mark up inline text in the Portable Text Editor
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    // "Titel + tekst": één klik voor een nette sectie (kop + alinea's/lijsten),
    // zodat een artikel uit zoveel secties kan bestaan als nodig.
    defineArrayMember({
      name: 'textSection',
      title: 'Titel + tekst',
      type: 'object',
      icon: TextIcon,
      fields: [
        {name: 'title', title: 'Titel', type: 'string', validation: (rule) => rule.required()},
        {
          name: 'level',
          title: 'Kopniveau',
          type: 'string',
          options: {list: [{title: 'H2', value: 'h2'}, {title: 'H3', value: 'h3'}], layout: 'radio', direction: 'horizontal'},
          initialValue: 'h2',
        },
        {
          name: 'body',
          title: 'Tekst',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'block',
              styles: [{title: 'Normal', value: 'normal'}],
              lists: [
                {title: 'Bullet', value: 'bullet'},
                {title: 'Numbered', value: 'number'},
              ],
              marks: {
                decorators: [
                  {title: 'Strong', value: 'strong'},
                  {title: 'Emphasis', value: 'em'},
                ],
                annotations: [
                  {title: 'URL', name: 'link', type: 'object', fields: [{title: 'URL', name: 'href', type: 'url'}]},
                ],
              },
            }),
          ],
        },
      ],
      preview: {
        select: {title: 'title', level: 'level'},
        prepare: ({title, level}) => ({title, subtitle: `Titel + tekst (${(level ?? 'h2').toUpperCase()})`}),
      },
    }),
    // Uitgelichte zin ("Kernzin", "Toonregel" uit de copy-briefs).
    defineArrayMember({
      name: 'callout',
      title: 'Uitgelichte zin',
      type: 'object',
      icon: BlockquoteIcon,
      fields: [
        {name: 'label', title: 'Label (optioneel)', type: 'string', description: 'Bijv. "Kernzin"'},
        {name: 'text', title: 'Tekst', type: 'text', rows: 3, validation: (rule) => rule.required()},
      ],
      preview: {
        select: {title: 'text', subtitle: 'label'},
        prepare: ({title, subtitle}) => ({title, subtitle: subtitle || 'Uitgelichte zin'}),
      },
    }),
    // Losse button (tekst + URL), overal in de tekst te plaatsen.
    defineArrayMember({
      name: 'button',
      title: 'Button',
      type: 'ctaLink',
      icon: LinkIcon,
    }),
    defineArrayMember({
      type: 'image',
      icon: ImageIcon,
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ]
    }),
  ],
})
