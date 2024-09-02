import { createResource } from 'solid-js'

import { client } from './pocketbase'

export type CollectionName =
  | 'code'
  | 'events'
  | 'labs'
  | 'links'
  | 'notes'
  | 'posts'

export type Post = {
  id: string
  title: string
  slug: string
  abstract?: string
  significance: number
  body?: string
  published?: string
  tags?: string
  created: string
  updated: string
}

export function createPaginatedListResource({
  name,
  page = 1,
  size = 10,
}: {
  name: CollectionName
  page?: number
  size?: number
}) {
  const f = name === 'events' || name === 'labs' ? 'created' : 'published'
  const [data, { mutate, refetch }] = createResource(() =>
    client.collection(name).getList(page, size, {
      filter: `${f} != null`,
      sort: `-${f}`,
    }),
  )

  return [data, { mutate, refetch }]
}

export function createDetailResource({
  identifier,
  name,
}: {
  identifier: string
  name: CollectionName
}) {
  const f = name === 'events' || name === 'labs' ? 'id' : 'slug'
  const [data, { mutate, refetch }] = createResource(() =>
    client.collection(name).getFirstListItem(`${f}=${identifier}`),
  )

  return [data, { mutate, refetch }]
}
