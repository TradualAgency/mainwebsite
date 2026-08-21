import type {StructureResolver} from 'sanity/structure'

const listedTypes = ['landingPage', 'post', 'category', 'author']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('landingPage').title('Landing pages'),
      S.divider(),
      S.documentTypeListItem('post').title('Posts'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('author').title('Authors'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !listedTypes.includes(item.getId()!),
      ),
    ])
