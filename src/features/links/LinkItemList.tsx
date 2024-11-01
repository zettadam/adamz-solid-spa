import { For } from 'solid-js'
import { A, useParams } from '@solidjs/router'
import sanitizeHtml from 'sanitize-html'

import { groupByDatetime, type Item } from '~/lib/helpers/array'

const LinkItemList = (props: { items: Item[] }) => {
  const params = useParams()
  if (!props.items || props.items.length < 1) return null

  const items = groupByDatetime(props.items)

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
                      <h4>
                        <a href={x.url} target="_blank">
                          {x.title}
                        </a>
                      </h4>
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
