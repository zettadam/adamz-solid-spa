import { For, type Component, type JSX } from 'solid-js'
import { A } from '@solidjs/router'

import { type CollectionName } from '~/lib/api'

const TagMatrix: Component<{
  data?: any
  name: CollectionName
  year?: boolean
}> = (props): JSX.Element | null => {
  if (!props.data || !props.data()) return null

  const name = props.name
  const data = props.data() ?? []

  const items = groupFn(data)

  return (
    <menu class="tag-index">
      <For
        each={Object.entries(items).sort((a, b) =>
          a[1] < b[1] ? 1 : a[1] > b[1] ? -1 : 0,
        )}>
        {([t, count]) => (
          <li>
            <A href={`/${name}/tags/${t}`}>{t}</A> {count}
          </li>
        )}
      </For>
    </menu>
  )
}

export default TagMatrix

function groupFn(data: []): Record<string, number> {
  return data.reduce((acc: any, i: { tags: string[] }): any => {
    i.tags.forEach((t) => {
      if (!acc[t]) acc[t] = 0
      acc[t]++
    })
    return acc
  }, {})
}
