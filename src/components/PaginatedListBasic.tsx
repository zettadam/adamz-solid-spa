import {
  createResource,
  type Component,
  type JSX,
  type Resource,
} from 'solid-js'
import { A, useParams } from '@solidjs/router'
import type { ListResult, RecordModel } from 'pocketbase'
import sanitizeHtml from 'sanitize-html'

import { getManyRecords } from '~/lib/api'
import { formatDatetime } from '~/lib/helpers/datetime'

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
    (page) =>
      getManyRecords({
        name: props.name,
        options: {
          filter: `${sortColumn} != null`,
          sort: `-${sortColumn}`,
        },
        page,
        size: pageSizeMap[props.name],
      }),
  )

  return (
    <>
      {data.loading ? (
        <Loading name={props.name} />
      ) : data.error ? (
        <Error message={data.error} name={props.name} />
      ) : (
        <BasicList data={data} name={props.name} />
      )}
    </>
  )
}

export default PaginatedListBasic

function BasicList(props: {
  data?: Resource<ListResult<RecordModel>>
  name: string
}): JSX.Element | null {
  if (!props.data) return null
  if (!props.data()) return null

  const name = props.name
  const items = props.data()?.items ?? []
  const page = props.data()?.page ?? 1
  const totalPages = props.data()?.totalPages ?? 1

  return (
    <>
      <ul class={`${name} paginated basic`}>
        {Array.isArray(items) && items.length > 0 ? (
          items.map((d) => {
            const abstract = sanitizeHtml(d.abstract)
            return (
              <li>
                <time>{formatDatetime(d.published, 'long')}</time>
                <h4>
                  <A href={`/${name}/detail/${d.id}`}>{d.title}</A>
                </h4>
                <div innerHTML={abstract} />
              </li>
            )
          })
        ) : (
          <li>No data.</li>
        )}
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
