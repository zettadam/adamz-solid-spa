import { A } from '@solidjs/router'
import type { JSX, ParentComponent } from 'solid-js'

import './notes-layout.css'

const NotesLayout: ParentComponent = (props): JSX.Element => {
  return (
    <div class="notes-layout">
      <nav class="page">
        <A href="/notes" end>
          Index
        </A>
        <span class="divider" />
        <A href="/notes/archive">Archive</A>
        <span class="divider" />
        <input
          type="search"
          name="keyword"
          placeholder="Search notes"
          disabled
        />
      </nav>

      {props.children}
    </div>
  )
}

export default NotesLayout
