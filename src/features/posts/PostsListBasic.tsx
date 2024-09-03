import { A } from '@solidjs/router'
import type { Component, JSX } from 'solid-js'
import type { ListResult, RecordModel } from 'pocketbase'

import { formatDate } from '~/lib/helpers/datetime'

const PostsBasicList: Component<{
  data?: ListResult<RecordModel>
}> = (props): JSX.Element => {
  if (!props.data) return null

  const { items } = props.data

  return (
    <ul>
      {Array.isArray(items) && items.length > 0 ? (
        items.map((d) => (
          <li>
            <time>{formatDate(d.published, 'medium')}</time>
            <A href={`/posts/detail/${d.id}`}>{d.title}</A>
          </li>
        ))
      ) : (
        <li>Nothing posted yet</li>
      )}
    </ul>
  )
}

export default PostsBasicList
