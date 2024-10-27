import { createMemo, createResource, onCleanup, Show } from 'solid-js'
import { Meta, Title } from '@solidjs/meta'
import { type RouteSectionProps } from '@solidjs/router'
import { type RecordModel } from 'pocketbase'

import { getAllRecords } from '~/lib/api'

import FeedItemList from './FeedItemList'
import FeedSelection from './FeedSelection'

async function queryFn() {
  const ac = new AbortController()
  onCleanup(() => ac.abort())

  const data = await getAllRecords({
    name: 'feeds',
    options: {
      fields: 'id, title, website, tags, crawled',
      perPage: 1000000,
      sort: `title`,
    },
  })

  return data
}

function NewsfeedRoute(props: RouteSectionProps) {
  const [feeds] = createResource(queryFn)

  const feed = createMemo(() =>
    props.params.feedId && feeds.state === 'ready'
      ? feeds.latest.find((f) => f.id === props.params.feedId)
      : undefined,
  )

  return (
    <>
      <Title>Adam's Newsfeed</Title>
      <Meta name="description"></Meta>
      <div class="page">
        <h2>{feed() ? 'Feed Detail' : 'Latest'}</h2>
        <main id="content">
          {feed() ? (
            <header>
              <h3>{feed()?.title}</h3>
            </header>
          ) : null}
          <FeedItemList feedId={props.params.feedId} />
        </main>
        <aside>
          <h3>Feed selection</h3>
          <Show when={feeds.loading}>
            <p>Loading feeds…</p>
          </Show>
          <Show when={feeds.error}>
            <div class="error">
              <h4>Error loading feeds.</h4>
              {feeds.error.message && <p>{feeds.error.message}</p>}
            </div>
          </Show>
          <Show when={feeds.state === 'ready'}>
            <FeedSelection
              data={groupFeeds(feeds.latest)}
              feedId={props.params.feedId}
            />
          </Show>
        </aside>
      </div>
    </>
  )
}

export default NewsfeedRoute

function groupFeeds(data: RecordModel[] = []) {
  return data.reduce((acc: { [k: string]: RecordModel[] }, f: RecordModel) => {
    const tags: string[] =
      Array.isArray(f.tags) && f.tags.length ? f.tags : ['uncategorized']

    tags.forEach((t) => {
      if (t in acc) {
        acc[t].push(f)
      } else {
        acc[t] = [f]
      }
    })

    return acc
  }, {})
}
