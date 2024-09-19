import { A, type RouteSectionProps } from '@solidjs/router'

import SearchForm from '~/components/SearchForm'
import './posts-layout.css'

const PostsLayout = (props: RouteSectionProps) => {
  return (
    <div class="posts-layout">
      <nav class="page">
        <A href="/posts" end>
          Index
        </A>
        <span class="divider" />
        <A href="/posts/archive">Archive</A>
        <span class="divider" />
        <SearchForm name="posts" />
      </nav>

      {props.children}
    </div>
  )
}

export default PostsLayout
