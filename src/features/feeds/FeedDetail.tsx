import { type RecordModel } from 'pocketbase'

import { formatDatetime } from '~/lib/helpers/datetime'

const FeedDetail = (props: { data?: RecordModel }) => {
  if (!props?.data || Object.keys(props?.data).length < 1) return null
  const item = props.data

  const created = item.created ? formatDatetime(item.created, 'long') : null

  return (
    <article>
      <header>
        <h1>{props.data.title}</h1>
        {created && <time>{created}</time>}
      </header>
    </article>
  )
}

export default FeedDetail
