import { For } from 'solid-js'
import { A } from '@solidjs/router'
import { RecordModel } from 'pocketbase'

function FeedSelection(props: {
  data: { [key: string]: RecordModel[] }
  feedId?: string
}) {
  if (!props.data) return null

  const entries = Object.entries(props.data)
  if (!entries.length) return <p>No feeds found.</p>

  return (
    <For each={entries}>
      {([tag, feeds]) => {
        const open =
          props.feedId && feeds.find((f) => f.id === props.feedId)
            ? true
            : false
        return (
          <details open={open}>
            <summary>
              {tag}: {feeds.length}
            </summary>
            <menu>
              <For each={feeds}>
                {(f) => (
                  <li>
                    {f.id !== props.feedId ? (
                      <A href={`/feeds/feed/${f.id}`}>{f.title}</A>
                    ) : (
                      <b>{f.title}</b>
                    )}
                  </li>
                )}
              </For>
            </menu>
          </details>
        )
      }}
    </For>
  )
}

export default FeedSelection
