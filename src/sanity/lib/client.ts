import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

// Zonder CDN: de pagina's zijn statisch gecachet en worden via de webhook
// (/api/revalidate) opnieuw gebouwd. Met het CDN ertussen kan zo'n herbouw nog een
// verouderd antwoord krijgen, dat dan tot de volgende publish blijft staan.
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
})

export const clientFresh = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: 'published',
})
