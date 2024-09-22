import { For } from 'solid-js'
import { A, useParams } from '@solidjs/router'
import sanitizeHtml from 'sanitize-html'
import { RecordModel } from 'pocketbase'

const CodeItemList = (props: { items: RecordModel[] }) => {
  const params = useParams()
  if (!props.items || props.items.length < 1) return null

  return (
    <For each={props.items}>
      {(x) => {
        const abstract = x.abstract ? sanitizeHtml(x.abstract) : undefined
        return (
          <li>
            <h3>
              <A href={`/code/detail/${x.id}`}>{x.title}</A>
            </h3>
            <div innerHTML={abstract} />
            <div>
              {x.tags && (
                <nav class="tags">
                  <For each={x.tags}>
                    {(t) =>
                      t === params.tag ? (
                        <b>{t}</b>
                      ) : (
                        <A href={`/code/tags/${t}`}>{t}</A>
                      )
                    }
                  </For>
                </nav>
              )}
            </div>
          </li>
        )
      }}
    </For>
  )
}

export default CodeItemList
