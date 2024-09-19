import { A, type RouteSectionProps } from '@solidjs/router'

import SearchForm from '~/components/SearchForm'

import './notes-layout.css'

const NotesLayout = (props: RouteSectionProps) => {
  return (
    <div class="notes-layout">
      <nav class="page">
        <A href="/notes" end>
          Index
        </A>
        <span class="divider" />
        <A href="/notes/archive">Archive</A>
        <span class="divider" />
        <SearchForm name="notes" />
      </nav>

      {props.children}
    </div>
  )
}

export default NotesLayout
