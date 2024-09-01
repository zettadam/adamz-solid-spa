import { createResource } from 'solid-js'

import { client } from './pocketbase'

export type CollectionName =
  | 'code'
  | 'events'
  | 'labs'
  | 'links'
  | 'notes'
  | 'posts'

export function createPaginatedListResource({
  name = 'posts',
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
