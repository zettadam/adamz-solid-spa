import {
  type Component,
  type JSX,
  createResource,
  Match,
  Suspense,
  Switch,
} from 'solid-js'
import { A } from '@solidjs/router'
import type { ListResult, RecordModel } from 'pocketbase'
import sanitizeHtml from 'sanitize-html'

import { client } from '~/lib/pocketbase'
import { type CollectionName } from '~/lib/api'
import { formatDate } from '~/lib/helpers/datetime'

import Error from './Error'
import Loading from './Loading'

const PaginatedListBasic: Component<{
  name: CollectionName
  page?: number
  size?: number
}> = (props): JSX.Element => {
  const p = props.page ?? 1
  const s = props.size ?? 10
  const f =
    props.name === 'events' || props.name === 'labs' ? 'created' : 'published'

  const [data] = createResource(() =>
    client.collection(props.name).getList(p, s, {
      filter: `${f} != null`,
      sort: `-${f}`,
    }),
  )

  return (
    <>
      <Suspense fallback={<Loading name={props.name} />}>
        <Switch>
          <Match when={data.error}>
            <Error message={data.error()} name={props.name} />
          </Match>
          <Match when={data()}>
            <BasicList data={data()} name={props.name} />
          </Match>
        </Switch>
      </Suspense>
    </>
  )
}

export default PaginatedListBasic

function BasicList({
  data,
  name = 'posts',
}: {
  data?: ListResult<RecordModel>
  name: CollectionName
}): JSX.Element | null {
  if (!data) return null

  const { items } = data

  return (
    <ul class={`${name} paginated basic`}>
      {Array.isArray(items) && items.length > 0 ? (
        items.map((d) => {
          const abstract = sanitizeHtml(d.abstract)
          return (
            <li>
              <time>{formatDate(d.published, 'long')}</time>
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
  )
}
