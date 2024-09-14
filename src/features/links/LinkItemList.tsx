import { RecordModel } from 'pocketbase'
import { For, type Component, type JSX } from 'solid-js'
import sanitizeHtml from 'sanitize-html'

import { formatDate } from '~/lib/helpers/datetime'

const LinkItemList: Component<{
  items: RecordModel[]
}> = (props): JSX.Element | null => {
  if (!props.items || props.items.length < 1) return null

  const groupedItems = props.items.reduce(
    (groups: { [k: string]: RecordModel[] }, item) => {
      const date: string | null = formatDate(item.published, 'medium')
      if (date && !(date in groups)) groups[date] = []
      if (date) groups[date].push(item)
      return groups
    },
    {},
  )

  return (
    <For each={Object.keys(groupedItems)}>
      {(d) => {
        return (
          <li>
            <time datetime={d}>{d}</time>
            <ul>
              <For each={groupedItems[d]}>
                {(x) => {
                  const abstract = x.abstract
                    ? sanitizeHtml(x.abstract)
                    : undefined
                  return (
                    <li>
                      <a href={x.url}>{x.title}</a>
                      <div innerHTML={abstract} />
                    </li>
                  )
                }}
              </For>
            </ul>
          </li>
        )
      }}
    </For>
  )
}

export default LinkItemList
