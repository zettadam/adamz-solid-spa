import {
  createResource,
  For,
  Match,
  onCleanup,
  Switch,
  type Component,
  type JSX,
} from 'solid-js'
import { A, useParams } from '@solidjs/router'
import sanitizeHtml from 'sanitize-html'

import { formatDate } from '~/lib/helpers/datetime'
import LinkItemList from '~/features/links/LinkItemList'

import { getManyRecords } from '~/lib/api'
import Error from './Error'
import Loading from './Loading'

const pageSizeMap: Record<string, number> = {
  code: 10,
  events: 100,
  labs: 10,
  links: 100,
  notes: 10,
  posts: 10,
}

const PaginatedListBasic: Component<{
  name: string
}> = (props): JSX.Element => {
  const params = useParams()
  const sortColumn = props.name === 'events' ? 'created' : 'published'

  const [data] = createResource(
    () => (params.page ? parseInt(params.page, 10) : 1),
    async (page) => {
      const ac = new AbortController()
      onCleanup(() => ac.abort())

      const data = await getManyRecords({
        name: props.name,
        options: {
          filter: `${sortColumn} != null`,
          sort: `-${sortColumn}`,
        },
        page,
        size: pageSizeMap[props.name],
      })
      return data
    },
  )

  return (
    <>
      {data.loading ? (
        <Loading name={props.name} />
      ) : data.error ? (
        <Error message={data.error} name={props.name} />
      ) : (
        <ListBasic data={data} name={props.name} />
      )}
    </>
  )
}

export default PaginatedListBasic

function ListBasic(props: { data?: any; name: string }): JSX.Element | null {
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
          <Match when={'links' !== name}>
            <For each={items}>
              {(d) => {
                const abstract = sanitizeHtml(d.abstract)
                return (
                  <li>
                    <time>{formatDate(d.published, 'long')}</time>
                    <h3>
                      <A href={`/${name}/detail/${d.id}`}>{d.title}</A>
                    </h3>
                    <div innerHTML={abstract} />
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
