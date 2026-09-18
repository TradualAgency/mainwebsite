import { defineField, type SlugValidationContext } from 'sanity'

export const SUPPORTED_LANGUAGES = [
  { id: 'en', title: 'English' },
  { id: 'nl', title: 'Nederlands' },
]

// Wordt gezet door @sanity/document-internationalization; de taalbadge in de
// Studio-toolbar toont de waarde, het veld zelf blijft verborgen.
export const languageField = defineField({
  name: 'language',
  title: 'Language',
  type: 'string',
  readOnly: true,
  hidden: true,
})

// Een slug hoeft alleen uniek te zijn binnen dezelfde taal, zodat de NL-vertaling
// van een post dezelfde slug mag hebben als het EN-origineel.
export async function isUniqueWithinLanguage(slug: string, context: SlugValidationContext) {
  const { document, getClient } = context
  const client = getClient({ apiVersion: '2025-04-24' })
  const id = (document?._id ?? '').replace(/^drafts\./, '')
  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
    type: document?._type,
    language: (document as { language?: string } | undefined)?.language ?? null,
  }
  const query = `!defined(*[
    _type == $type
    && !(_id in [$draft, $published])
    && slug.current == $slug
    && language == $language
  ][0]._id)`
  return client.fetch<boolean>(query, params)
}
