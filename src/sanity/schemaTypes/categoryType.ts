import {TagIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {isUniqueWithinLanguage, languageField} from './shared/language'

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: TagIcon,
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
      name: 'description',
      type: 'text',
    }),
  ],
})
