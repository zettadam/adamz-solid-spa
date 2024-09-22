import { A, type RouteSectionProps } from '@solidjs/router'

import SearchForm from '~/components/SearchForm'
import './code-layout.css'

const CodeLayout = (props: RouteSectionProps) => {
  return (
    <div class="code-layout">
      <nav class="page">
        <A href="/code" end>
          Index
        </A>
        <span class="divider" />
        <A href="/code/archive">Archive</A>
        <span class="divider" />
        <A href="/code/tags">Tags</A>
        <span class="divider" />
        <SearchForm name="code" />
      </nav>

      {props.children}
    </div>
  )
}

export default CodeLayout
