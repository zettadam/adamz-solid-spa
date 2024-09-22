import { For } from 'solid-js'
import { A, useParams } from '@solidjs/router'
import sanitizeHtml from 'sanitize-html'
import { RecordModel } from 'pocketbase'

import { formatDate } from '~/lib/helpers/datetime'

const LinkItemList = (props: { items: RecordModel[] }) => {
  const params = useParams()
  if (!props.items || props.items.length < 1) return null

  const items = groupFn(props.items)

  return (
    <For each={Object.keys(items)}>
      {(d) => {
        return (
          <li>
            {!params.day && <time datetime={d}>{d}</time>}
            <ul>
              <For each={items[d]}>
                {(x) => {
                  const abstract = x.abstract
                    ? sanitizeHtml(x.abstract)
                    : undefined
                  return (
                    <li>
                      <h3>
                        <a href={x.url} target="_blank">
                          {x.title}
                        </a>
                      </h3>
                      <div innerHTML={abstract} />
                      {x.tags && (
                        <nav class="tags">
                          <For each={x.tags}>
                            {(t) =>
                              t === params.tag ? (
                                <b>{t}</b>
                              ) : (
                                <A href={`/links/tags/${t}`}>{t}</A>
                              )
                            }
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

function groupFn(items: RecordModel[]) {
  const output = items.reduce(
    (groups: { [k: string]: RecordModel[] }, item) => {
      const date: string | null = formatDate(item.published, 'medium')
      if (date && !(date in groups)) groups[date] = []
      if (date) groups[date].push(item)
      return groups
    },
    {},
  )

  return output
}
