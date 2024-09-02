import {
  createResource,
  Match,
  Suspense,
  Switch,
  type Component,
  type JSX,
} from 'solid-js'

import { client } from '~/lib/pocketbase'
import { formatDate } from '~/lib/helpers/datetime'
import type { CollectionName } from '~/lib/api'

import Error from './Error'
import Loading from './Loading'
import sanitize from 'sanitize-html'
import { RecordModel } from 'pocketbase'

const Detail: Component<{
  identifier: string
  name: CollectionName
}> = (props): JSX.Element => {
  const [data] = createResource(() =>
    client.collection(props.name).getOne(props.identifier),
  )

  return (
    <div class={`${props.name} detail`}>
      <Suspense fallback={<Loading name={props.name} detail />}>
        <Switch>
          <Match when={data.error}>
            <Error message={data.error.message} name={props.name} />
          </Match>
          <Match when={data()}>
            {'posts' === props.name && <PostDetail data={data()} />}
            {'notes' === props.name && <NoteDetail data={data()} />}
            {'labs' === props.name && <LabDetail data={data()} />}
            {'links' === props.name && <LinkDetail data={data()} />}
            {'code' === props.name && <CodeDetail data={data()} />}
            {'events' === props.name && <EventDetail data={data()} />}
          </Match>
        </Switch>
      </Suspense>
    </div>
  )
}

export default Detail

function PostDetail(props: { data?: RecordModel }): JSX.Element | null {
  if (!props?.data || Object.keys(props?.data).length < 1) return null
  const item = props.data

  const published = item.published ? formatDate(item.published, 'long') : null
  const abstract = item.abstract ? sanitize(item.abstract) : null
  const body = item.body ? sanitize(item.body) : null

  return (
    <article>
      <header>
        {published && <time>{published}</time>}
        <h1>{item.title}</h1>
      </header>
      {abstract && (
        <>
          <h2>Abstract</h2>
          <section class="abstract" innerHTML={abstract} />
        </>
      )}
      {body && <section class="body" innerHTML={body} />}
    </article>
  )
}

function NoteDetail(props: { data?: RecordModel }): JSX.Element | null {
  if (!props?.data || Object.keys(props?.data).length < 1) return null
  const item = props.data

  const published = item.published ? formatDate(item.published, 'long') : null
  const abstract = item.abstract ? sanitize(item.abstract) : null
  const body = item.body ? sanitize(item.body) : null

  return (
    <article>
      <header>
        <h1>{item.title}</h1>
        {published && <time>{published}</time>}
      </header>
      {abstract && (
        <>
          <h2>Abstract</h2>
          <section class="abstract" innerHTML={abstract} />
        </>
      )}
      {body && <section class="body" innerHTML={body} />}
    </article>
  )
}

function LabDetail(props: { data?: RecordModel }): JSX.Element | null {
  if (!props?.data || Object.keys(props?.data).length < 1) return null
  const item = props.data

  const published = item.published ? formatDate(item.published, 'long') : null
  const description = item.description ? sanitize(item.description) : null
  const body = item.body ? sanitize(item.body) : null

  return (
    <article>
      <header>
        <h1>{props.data.title}</h1>
        {published && <time>{published}</time>}
      </header>
      {description && <section class="description" innerHTML={description} />}
      {body && <section class="body" innerHTML={body} />}
    </article>
  )
}

function LinkDetail(props: { data?: RecordModel }): JSX.Element | null {
  if (!props?.data || Object.keys(props?.data).length < 1) return null
  const item = props.data

  const published = item.published ? formatDate(item.published, 'long') : null
  const description = item.description ? sanitize(item.description) : null
  const body = item.body ? sanitize(item.body) : null

  return (
    <article>
      <header>
        <h1>{props.data.title}</h1>
        {published && <time>{published}</time>}
      </header>
      {description && <section class="description" innerHTML={description} />}
      {body && <section class="body" innerHTML={body} />}
    </article>
  )
}

function CodeDetail(props: { data?: RecordModel }): JSX.Element | null {
  if (!props?.data || Object.keys(props?.data).length < 1) return null
  const item = props.data

  const published = item.published ? formatDate(item.published, 'long') : null
  const description = item.description ? sanitize(item.description) : null
  const body = item.body ? sanitize(item.body) : null

  return (
    <article>
      <header>
        <h1>{props.data.title}</h1>
        {published && <time>{published}</time>}
      </header>
      {description && <section class="description" innerHTML={description} />}
      {body && <section class="body" innerHTML={body} />}
    </article>
  )
}

function EventDetail(props: { data?: RecordModel }): JSX.Element | null {
  if (!props?.data || Object.keys(props?.data).length < 1) return null
  const item = props.data

  const published = item.published ? formatDate(item.published, 'long') : null
  const description = item.description ? sanitize(item.description) : null
  const body = item.body ? sanitize(item.body) : null

  return (
    <article>
      <header>
        <h1>{props.data.title}</h1>
        {published && <time>{published}</time>}
      </header>
      {description && <section class="description" innerHTML={description} />}
      {body && <section class="body" innerHTML={body} />}
    </article>
  )
}
