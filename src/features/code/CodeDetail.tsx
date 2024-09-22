import { For } from 'solid-js'
import { A } from '@solidjs/router'
import sanitize from 'sanitize-html'
import { type RecordModel } from 'pocketbase'

import { formatDatetime } from '~/lib/helpers/datetime'

const CodeDetail = (props: { data?: RecordModel }) => {
  if (!props?.data || Object.keys(props?.data).length < 1) return null

  const item = props.data

  const published = item.published
    ? formatDatetime(item.published, 'long')
    : null
  const abstract = item.abstract ? sanitize(item.abstract) : null
  const body = item.body ? sanitize(item.body) : null

  return (
    <article>
      <header>
        <h1>{item.title}</h1>
        {published && <time>{published}</time>}
        {item.tags && (
          <nav class="tags">
            <For each={item.tags}>
              {(t: string) => <A href={`/code/tags/${t}`}>{t}</A>}
            </For>
          </nav>
        )}
      </header>
      {abstract && <section class="abstract" innerHTML={abstract} />}
      {body && <section class="body" innerHTML={body} />}
    </article>
  )
}

export default CodeDetail
