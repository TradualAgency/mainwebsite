import type { Locale } from '@/i18n/routing'

// Taalfilter voor GROQ. Documenten zonder `language`-veld zijn de Engelse originelen
// van vóór de i18n-invoering; die tellen als EN totdat scripts/set-default-language.mjs
// is gedraaid. Daarna kan dit worden vereenvoudigd tot `language == $locale`.
export const LANG_FILTER = `(language == $locale || (!defined(language) && $locale == "en"))`

// Projectie van de vertalingen van het huidige document, via het metadata-document
// van @sanity/document-internationalization. Levert per taal de slug op, zodat de
// taalswitcher en hreflang naar het juiste document kunnen verwijzen.
export const TRANSLATIONS_PROJECTION = `"_translations": *[_type == "translation.metadata" && references(^._id)][0]
    .translations[].value->{ "slug": slug.current, language }[defined(slug)]`

// Zoekt, voor een slug die in $locale niet bestaat, het document in een andere taal en
// geeft de slug van de vertaling in $locale terug (of null).
export function translatedSlugQuery(type: string) {
  return `*[_type == "${type}" && slug.current == $slug && language != $locale][0]{
    "slug": *[_type == "translation.metadata" && references(^._id)][0]
      .translations[language == $locale || _key == $locale][0].value->slug.current
  }.slug`
}

export type Translation = { language: Locale; slug: string }
