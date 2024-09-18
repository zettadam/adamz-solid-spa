import { A } from '@solidjs/router'
import type { JSX, ParentComponent } from 'solid-js'

import SearchForm from '~/components/SearchForm'

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
        <A href="/links/value">Value</A>
        <span class="divider" />
        <SearchForm name="links" />
      </nav>

      {props.children}
    </div>
  )
}

export default LinksLayout
