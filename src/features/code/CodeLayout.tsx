import { A } from '@solidjs/router'
import type { JSX, ParentComponent } from 'solid-js'

import './code-layout.css'

const CodeLayout: ParentComponent = (props): JSX.Element => {
  return (
    <div class="code-layout">
      <nav class="page">
        <A href="/code" end>
          Index
        </A>
        <span class="divider" />
        <A href="/code/archive">Archive</A>
        <span class="divider" />
        <A href="/code/new" class="create">
          + New code snippet
        </A>
        <span class="divider" />
        <input
          type="search"
          name="keyword"
          placeholder="Search code snippets"
        />
      </nav>

      {props.children}
    </div>
  )
}

export default CodeLayout
