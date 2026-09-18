import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import {SUPPORTED_LANGUAGES} from './schemaTypes/shared/language'

const listedTypes = ['landingPage', 'post', 'project', 'category', 'author', 'translation.metadata']
const apiVersion = '2025-04-24'

// Eén item per type met daaronder "Alle", en per taal een gefilterde lijst.
function localizedType(S: StructureBuilder, type: string, title: string) {
  return S.listItem()
    .id(type)
    .title(title)
    .child(
      S.list()
        .title(title)
        .items([
          S.listItem()
            .id(`${type}-all`)
            .title(`All ${title.toLowerCase()}`)
            .child(S.documentTypeList(type).title(`All ${title.toLowerCase()}`)),
          S.divider(),
          ...SUPPORTED_LANGUAGES.map((lang) =>
            S.listItem()
              .id(`${type}-${lang.id}`)
              .title(`${title} (${lang.id.toUpperCase()})`)
              .child(
                S.documentList()
                  .id(`${type}-${lang.id}-list`)
                  .title(`${title} (${lang.title})`)
                  .apiVersion(apiVersion)
                  .filter('_type == $type && language == $language')
                  .params({type, language: lang.id}),
              ),
          ),
        ]),
    )
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      localizedType(S, 'landingPage', 'Landing pages'),
      S.divider(),
      localizedType(S, 'post', 'Posts'),
      localizedType(S, 'category', 'Categories'),
      S.documentTypeListItem('author').title('Authors'),
      S.divider(),
      localizedType(S, 'project', 'Projects'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !listedTypes.includes(item.getId()!),
      ),
    ])
