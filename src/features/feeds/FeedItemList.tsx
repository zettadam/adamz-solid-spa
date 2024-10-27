import { createResource, For, onCleanup, Show } from 'solid-js'

import { getManyRecords, type FeedItem } from '~/lib/api'
import { groupByDatetime, groupByTimePeriod } from '~/lib/helpers/array'

async function queryFn({
  expand,
  feedId,
  query,
  page,
}: {
  expand?: string
  feedId?: string
  query?: string
  page?: string
}) {
  const ac = new AbortController()
  onCleanup(() => ac.abort())

  const _page = page ? parseInt(page, 10) : 1

  let filter = ` published != null`

  if (feedId) {
    filter += ` && feed = "${feedId}"`
  }

  if (query) {
    const d = decodeURI(query)
    const q = d ? d.replace(/\s+/g, ' ').replace(/[^a-zA-Z0-9 -]/g, '') : ''
    if (q) {
      filter += ` && (title ?~ "${q}" || description ?~ "${q}")`
    }
  }

  const options: {
    expand?: string
    fields?: string
    filter: string
    sort: string
  } = {
    fields:
      'id, title, link, published, seen, expand.feed.id,expand.feed.title',
    filter,
    sort: `-published`,
  }
  if (expand) options.expand = expand

  const data = await getManyRecords({
    name: 'feeds_items',
    options,
    page: _page,
    size: 1000,
  })

  return data
}

function FeedItemList(props: { feedId?: string }) {
  const [data] = createResource(
    () => ({
      expand: props.feedId ? undefined : 'feed',
      feedId: props.feedId,
    }),
    queryFn,
  )

  return (
    <div class="feeditem-list">
      <Show when={data.loading}>
        <p>Loading newsfeed items…</p>
      </Show>
      <Show when={data.error}>
        <div class="error">
          <h4>Ooops, we got a problem</h4>
          {data.error.message && <p>{data.error.message}</p>}
        </div>
      </Show>
      <Show when={'ready' === data.state}>
        {!props.feedId ? (
          <GroupedListPeriod data={data} />
        ) : (
          <GroupedListDate data={data} />
        )}
      </Show>
    </div>
  )
}

export default FeedItemList

function GroupedListDate(props: { data?: any }) {
  if (!props.data || !props.data() || !props.data().items.length)
    return <p>No newsfeed items found.</p>

  const items = groupByDatetime(props.data().items, 'published')

  return (
    <ul>
      <For each={Object.entries(items)}>
        {([key, values]) => (
          <li>
            <time datetime={key}>{key}</time>
            <ul>
              <For each={values as FeedItem[]}>
                {(item) => (
                  <li>
                    {item?.expand?.feed && (
                      <a
                        href={`/feeds/feed/${item.expand.feed.id}`}
                        class="feed">
                        {item.expand.feed.title}
                      </a>
                    )}
                    <a href={item.link} target="_blank">
                      {item.title}
                    </a>
                  </li>
                )}
              </For>
            </ul>
          </li>
        )}
      </For>
    </ul>
  )
}

const PERIOD_LABELS: Record<string, string> = {
  week: 'Previous week',
  month: 'Previous month',
  quarter: 'Previous quarter',
  year: 'Previous year',
}

function GroupedListPeriod(props: { data?: any }) {
  if (!props.data || !props.data() || !props.data().items.length)
    return <p>No newsfeed items found.</p>

  const items = groupByTimePeriod(props.data().items, 'published')

  return (
    <div>
      <For each={[...items.keys()]}>
        {(key) => (
          <details open={key === 'week'}>
            <summary>{PERIOD_LABELS[key] || key}</summary>
            <ul>
              <For each={items.get(key) as FeedItem[]}>
                {(item) => (
                  <li>
                    {item?.expand?.feed && (
                      <a
                        href={`/feeds/feed/${item.expand.feed.id}`}
                        class="feed">
                        {item.expand.feed.title}
                      </a>
                    )}
                    <a href={item.link} target="_blank">
                      {item.title}
                    </a>
                  </li>
                )}
              </For>
            </ul>
          </details>
        )}
      </For>
    </div>
  )
}
