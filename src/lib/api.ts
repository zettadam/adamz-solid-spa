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

export async function getAllRecords({
  name = 'posts',
  options,
}: {
  name: CollectionName
  options?: {
    fields?: string
    filter?: string
    perPage?: number
    resourceKey?: string
    sort?: string
  }
}) {
  const data = await client.collection(name).getFullList(
    options
      ? { perPage: 1000000, requestKey: `${name}-all`, ...options }
      : {
          filter: 'created != null',
          perPage: 1000000,
          requestKey: `${name}-all`,
          sort: '-created',
        },
  )
  return data
}

export async function getManyRecords({
  name = 'posts',
  options,
  page = 1,
  size = 10,
}: {
  name: string
  options?: {
    expand?: string
    fields?: string
    filter?: string
    resourceKey?: string
    sort?: string
  }
  page?: number
  size?: number
}) {
  const result = await client.collection(name).getList(
    page,
    size,
    options
      ? options
      : {
          filter: 'created != null',
          sort: '-created',
        },
  )

  return result
}

export async function getRecord({
  name = 'posts',
  where,
}: {
  name: CollectionName
  where: string
}) {
  const data = await client.collection(name).getOne(where)

  return data
}
