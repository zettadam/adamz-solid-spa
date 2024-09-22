import { For, onMount } from 'solid-js'
import { Link, Meta } from '@solidjs/meta'
import { A } from '@solidjs/router'
import sanitize from 'sanitize-html'
import { type RecordModel } from 'pocketbase'

import { formatDatetime } from '~/lib/helpers/datetime'

const CodeDetail = (props: { data?: RecordModel }) => {
  if (!props?.data || Object.keys(props?.data).length < 1) return null

  onMount(() => {
    import('highlight.js').then((module) => {
      const hljs = module.default
      const nodes = document.querySelectorAll('pre code')
      nodes.forEach((n) => hljs.highlightBlock(n as HTMLElement))
    })
  })

  const item = props.data

  const published = item.published
    ? formatDatetime(item.published, 'long')
    : null
  const abstract = item.abstract ? sanitize(item.abstract) : null
  const body = item.body ? sanitize(item.body) : null

  return (
    <>
      <Meta>
        <Link
          rel="stylesheet"
          type="text/css"
          href="/css/highlightjs/github.css"
        />
      </Meta>
      <article>
        <header>
          <h1>{props.data.title}</h1>
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
    </>
  )
}

export default CodeDetail
