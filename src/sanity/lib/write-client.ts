import 'server-only'
import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

// Enige client met schrijfrechten; alleen in route handlers gebruiken. Token (Editor)
// komt uit SANITY_WRITE_TOKEN en staat nooit in client-code.
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

export function hasWriteToken(): boolean {
  return Boolean(process.env.SANITY_WRITE_TOKEN)
}
