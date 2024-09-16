import { A } from '@solidjs/router'
import type { JSX, ParentComponent } from 'solid-js'

import './links-layout.css'

const LinksLayout: ParentComponent = (props): JSX.Element => {
  return (
    <div class="links-layout">
      <nav class="page">
        <A href="/links" end>
          Index
        </A>
        <span class="divider" />
        <A href="/links/archive">Archive</A>
        <span class="divider" />
        <A href="/links/tags">Tags</A>
        <span class="divider" />
        <input
          type="search"
          name="keyword"
          placeholder="Search links"
          disabled
        />
      </nav>

      {props.children}
    </div>
  )
}

export default LinksLayout
