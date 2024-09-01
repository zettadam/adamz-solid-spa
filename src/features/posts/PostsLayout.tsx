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
        <A href="/posts/new" class="create">
          + New post
        </A>
        <span class="divider" />
        <input type="search" name="keyword" placeholder="Search posts" />
      </nav>

      {props.children}
    </div>
  )
}

export default PostsLayout
