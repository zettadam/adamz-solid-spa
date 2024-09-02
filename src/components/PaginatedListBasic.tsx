import { type Component, type JSX, createResource, Show } from 'solid-js'
import type { ListResult, RecordModel } from 'pocketbase'

import { client } from '~/lib/pocketbase'
import { type CollectionName } from '~/lib/api'
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
      <Show when={data.loading}>
        <Loading name={props.name} />
      </Show>
      <Show when={data.error}>
        <Error message={data.error.message} name={props.name} />
      </Show>
      <Show when={data()}>
        <BasicList data={data()} name={props.name} />
      </Show>
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
        items.map((d) => (
          <li>
            {d.title}, {d.published}
          </li>
        ))
      ) : (
        <li>No data.</li>
      )}
    </ul>
  )
}
