import { createResource, For, Match, onCleanup, Show, Switch } from 'solid-js'
import { A, useParams } from '@solidjs/router'
import sanitizeHtml from 'sanitize-html'

import { formatDate } from '~/lib/helpers/datetime'
import LinkItemList from '~/features/links/LinkItemList'
import LabItemList from '~/features/labs/LabItemList'

import { CollectionName, getManyRecords } from '~/lib/api'
import Error from './Error'
import Loading from './Loading'

const pageSizeMap: Record<string, number> = {
  code: 10,
  feeds: 100,
  labs: 10,
  links: 100,
  notes: 10,
  posts: 10,
}

const expand: Record<CollectionName, string> = {
  code: '',
  feeds: '',
  labs: 'labs_groups_id',
  links: '',
  notes: '',
  posts: '',
}

const queryFn = async ({
  name,
  query,
  page,
  tag,
  value,
  expand = '',
}: {
  name: CollectionName
  query?: string
  page?: string
  tag?: string
  value?: string
  expand?: string
}) => {
  console.log('tag', tag)
  const ac = new AbortController()
  onCleanup(() => ac.abort())

  const pageNum = page ? parseInt(page, 10) : 1

  const sortColumn = name === 'feeds' ? 'created' : 'published'
  let filter = `${sortColumn} != null`

  if (query) {
    const d = decodeURI(query)
    const q = d ? d.replace(/\s+/g, ' ').replace(/[^a-zA-Z0-9 -]/g, '') : ''
    if (q) {
      filter += ` && (title ?~ "${q}" || abstract ?~ "${q}")`
    }
  }

  if (tag) {
    filter += ` && tags ?~ "${tag}"`
  }

  if (value) {
    if (value !== '0' && value !== '100+') {
      const v = value.split('-')
      if (v.length) {
        filter += ` && (significance >= ${parseInt(v[0], 10)} && significance <= ${parseInt(v[1], 10)})`
      }
    } else if (value === '100+') {
      filter += ` && significance > 100`
    } else {
      filter += ` && significance < 1`
    }
  }

  const options: { expand?: string; filter: string; sort: string } = {
    filter,
    sort: `-${sortColumn}`,
  }
  if (expand !== '') options.expand = expand

  const data = await getManyRecords({
    name,
    options,
    page: pageNum,
    size: pageSizeMap[name],
  })

  return data
}

export default function PaginatedList(props: { name: string }) {
  const params = useParams()

  const [data] = createResource(
    () => ({
      name: props.name as CollectionName,
      query: params.query,
      page: params.page,
      tag: params.tag,
      value: params.value,
      expand: expand[props.name as CollectionName],
    }),
    queryFn,
  )

  return (
    <Switch>
      <Match when={data.loading}>
        <Loading name={props.name} />
      </Match>
      <Match when={data.error}>
        <Error message={data.error} name={props.name} />
      </Match>
      <Match when={data.state === 'ready'}>
        <List data={data} name={props.name} tag={params.tag} />
      </Match>
    </Switch>
  )
}

function List(props: { data?: any; name: string; tag?: string }) {
  if (!props.data || !props.data()) return null

  const items = props.data()?.items ?? []
  const page = props.data()?.page ?? 1
  const totalPages = props.data()?.totalPages ?? 1

  return (
    <>
      <ul class={`${props.name} paginated basic`}>
        <Switch>
          <Match when={'links' === props.name}>
            <LinkItemList items={items} />
          </Match>
          <Match when={'labs' === props.name}>
            <LabItemList items={items} />
          </Match>
          <Match when={['links', 'labs'].indexOf(props.name) < 0}>
            <For each={items}>
              {(d) => {
                const abstract = d.abstract ? sanitizeHtml(d.abstract) : null
                return (
                  <li>
                    <time>{formatDate(d.published || d.created, 'long')}</time>
                    <h4>
                      <A href={`/${props.name}/detail/${d.id}`}>{d.title}</A>
                    </h4>
                    {abstract ? (
                      <div innerHTML={abstract} />
                    ) : (
                      <div>
                        <p>No description</p>
                      </div>
                    )}
                    <Show when={Array.isArray(d.tags) && d.tags.length}>
                      <nav class="tags">
                        <For each={d.tags}>
                          {(t) =>
                            t === props.tag ? (
                              <b>{t}</b>
                            ) : (
                              <A href={`/${props.name}/tags/${t}`}>{t}</A>
                            )
                          }
                        </For>
                      </nav>
                    </Show>
                  </li>
                )
              }}
            </For>
          </Match>
        </Switch>
      </ul>

      <Show when={totalPages > 1}>
        <menu>
          {page > 1 && (
            <li>
              <A href={`/${name}/${page - 1}`}>Previous</A>
            </li>
          )}
          {page < totalPages && (
            <li>
              <A href={`/${name}/${page + 1}`}>Next</A>
            </li>
          )}
        </menu>
      </Show>
    </>
  )
}
