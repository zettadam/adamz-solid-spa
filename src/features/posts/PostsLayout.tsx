import { A } from '@solidjs/router'
import type { JSX, ParentComponent } from 'solid-js'

import './posts-layout.css'

const PostsLayout: ParentComponent = (props): JSX.Element => {
  return (
    <div class="posts-layout">
      <nav class="page">
        <A href="/posts" end>
          Index
        </A>
        <span class="divider" />
        <A href="/posts/archive">Archive</A>
        <span class="divider" />
        <input
          type="search"
          name="keyword"
          placeholder="Search posts"
          disabled
        />
      </nav>

      {props.children}
    </div>
  )
}

export default PostsLayout
