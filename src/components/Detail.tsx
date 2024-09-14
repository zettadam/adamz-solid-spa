import {
  createResource,
  Match,
  onCleanup,
  Suspense,
  Switch,
  type Component,
  type JSX,
} from 'solid-js'
import { Title } from '@solidjs/meta'
import { client } from '~/lib/pocketbase'
import { formatDatetime } from '~/lib/helpers/datetime'
import type { CollectionName } from '~/lib/api'

import Error from './Error'
import Loading from './Loading'
import sanitize from 'sanitize-html'
import { RecordModel } from 'pocketbase'

import { sectionTitleMap } from '~/features/generic/constants'

const Detail: Component<{
  identifier: string
  name: CollectionName
}> = (props): JSX.Element => {
  const [data] = createResource(async () => {
    const ac = new AbortController()
    onCleanup(() => ac.abort())
    const data = await client.collection(props.name).getOne(props.identifier)
    return data
  })

  return (
    <main class={`${props.name} detail`} id="content">
      <Suspense fallback={<Loading name={props.name} detail />}>
        <Switch>
          <Match when={data.error}>
            <Error message={data.error.message} name={props.name} />
          </Match>
          <Match when={data()}>
            <Title>
              {data()?.title || data()?.name}— {sectionTitleMap[props.name]}—
              Adam Ziolkowski
            </Title>
            {'posts' === props.name && <PostDetail data={data()} />}
            {'notes' === props.name && <NoteDetail data={data()} />}
            {'labs' === props.name && <LabDetail data={data()} />}
            {'code' === props.name && <CodeDetail data={data()} />}
            {'events' === props.name && <EventDetail data={data()} />}
          </Match>
        </Switch>
      </Suspense>
    </main>
  )
}

export default Detail

function PostDetail(props: { data?: RecordModel }): JSX.Element | null {
  if (!props?.data || Object.keys(props?.data).length < 1) return null
  const item = props.data

  const published = item.published
    ? formatDatetime(item.published, 'long')
    : null
  const abstract = item.abstract ? sanitize(item.abstract) : null
  const body = item.body
    ? sanitize(item.body, {
        allowedAttributes: {
          '*': ['id', 'class', 'style', 'href', 'target'],
        },
      })
    : null

  return (
    <article>
      <header>
        <h1>{item.title}</h1>
        {published && <time>{published}</time>}
      </header>
      {abstract && <section class="abstract" innerHTML={abstract} />}
      {body && <section class="body" innerHTML={body} />}
    </article>
  )
}

function NoteDetail(props: { data?: RecordModel }): JSX.Element | null {
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
      </header>
      {abstract && <section class="abstract" innerHTML={abstract} />}
      {body && <section class="body" innerHTML={body} />}
    </article>
  )
}

function LabDetail(props: { data?: RecordModel }): JSX.Element | null {
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
        <h1>{props.data.title}</h1>
        {published && <time>{published}</time>}
      </header>
      {abstract && <section class="abstract" innerHTML={abstract} />}
      {body && <section class="body" innerHTML={body} />}
    </article>
  )
}

function CodeDetail(props: { data?: RecordModel }): JSX.Element | null {
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
        <h1>{props.data.title}</h1>
        {published && <time>{published}</time>}
      </header>
      {abstract && <section class="abstract" innerHTML={abstract} />}
      {body && <section class="body" innerHTML={body} />}
    </article>
  )
}

function EventDetail(props: { data?: RecordModel }): JSX.Element | null {
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
        <h1>{props.data.title}</h1>
        {published && <time>{published}</time>}
      </header>
      {abstract && <section class="abstract" innerHTML={abstract} />}
      {body && <section class="body" innerHTML={body} />}
    </article>
  )
}
