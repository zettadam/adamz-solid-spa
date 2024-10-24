import { createResource, For, Match, onCleanup, Switch } from 'solid-js'
import { A, useParams, type Params } from '@solidjs/router'
import sanitizeHtml from 'sanitize-html'

import { formatDate } from '~/lib/helpers/datetime'
import LinkItemList from '~/features/links/LinkItemList'
import LabItemList from '~/features/labs/LabItemList'

import { CollectionName, getManyRecords } from '~/lib/api'
import Error from './Error'
import Loading from './Loading'
import CodeItemList from '~/features/code/CodeItemList'

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
  params,
  expand = '',
}: {
  name: CollectionName
  params: Params
  expand?: string
}) => {
  const ac = new AbortController()
  onCleanup(() => ac.abort())

  const page = params.page ? parseInt(params.page, 10) : 1

  const sortColumn = name === 'feeds' ? 'created' : 'published'
  let filter = `${sortColumn} != null`

  if (params.query) {
    const d = decodeURI(params.query)
    const q = d ? d.replace(/\s+/g, ' ').replace(/[^a-zA-Z0-9 -]/g, '') : ''
    if (q) {
      filter += ` && (title ?~ "${q}" || abstract ?~ "${q}")`
    }
  }

  if (params.tag) {
    filter += ` && tags ?~ "${params.tag}"`
  }

  if (params.value) {
    if (params.value !== '0' && params.value !== '100+') {
      const v = params.value.split('-')
      if (v.length) {
        filter += ` && (significance >= ${parseInt(v[0], 10)} && significance <= ${parseInt(v[1], 10)})`
      }
    } else if (params.value === '100+') {
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
    page,
    size: pageSizeMap[name],
  })

  return data
}

export default function PaginatedList(props: { name: string }) {
  const params = useParams()

  const [data] = createResource(
    () => ({
      name: props.name as CollectionName,
      params,
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
        <List data={data} name={props.name} />
      </Match>
    </Switch>
  )
}

function List(props: { data?: any; name: string }) {
  if (!props.data || !props.data()) return null

  const name = props.name
  const items = props.data()?.items ?? []
  const page = props.data()?.page ?? 1
  const totalPages = props.data()?.totalPages ?? 1

  return (
    <>
      <ul class={`${name} paginated basic`}>
        <Switch>
          <Match when={'links' === name}>
            <LinkItemList items={items} />
          </Match>
          <Match when={'code' === name}>
            <CodeItemList items={items} />
          </Match>
          <Match when={'labs' === name}>
            <LabItemList items={items} />
          </Match>
          <Match when={['links', 'code', 'labs'].indexOf(name) < 0}>
            <For each={items}>
              {(d) => {
                const abstract = d.abstract ? sanitizeHtml(d.abstract) : null
                return (
                  <li>
                    <time>{formatDate(d.published || d.created, 'long')}</time>
                    <h3>
                      <A href={`/${name}/detail/${d.id}`}>{d.title}</A>
                    </h3>
                    {abstract ? (
                      <div innerHTML={abstract} />
                    ) : (
                      <div>
                        <p>No description</p>
                      </div>
                    )}
                  </li>
                )
              }}
            </For>
          </Match>
        </Switch>
      </ul>

      {totalPages > 1 && (
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
      )}
    </>
  )
}
