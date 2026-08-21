import { defineArrayMember, defineType } from 'sanity'

export const pageBuilderType = defineType({
  name: 'pageBuilder',
  title: 'Page content',
  type: 'array',
  of: [
    defineArrayMember({ type: 'hero' }),
    defineArrayMember({ type: 'audience' }),
    defineArrayMember({ type: 'checklist' }),
    defineArrayMember({ type: 'process' }),
    defineArrayMember({ type: 'pricing' }),
    defineArrayMember({ type: 'faqs' }),
    defineArrayMember({ type: 'cta' }),
    defineArrayMember({ type: 'contactForm' }),
    defineArrayMember({ type: 'richText' }),
  ],
})
