import { For, type Component, type JSX } from 'solid-js'
import { A } from '@solidjs/router'
import sanitizeHtml from 'sanitize-html'
import { RecordModel } from 'pocketbase'

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
                      {x.tags && (
                        <nav class="tags">
                          <For each={x.tags}>
                            {(t) => <A href={`/links/tag/${t}`}>{t}</A>}
                          </For>
                        </nav>
                      )}
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
