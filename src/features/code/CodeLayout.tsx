import { A, type RouteSectionProps } from '@solidjs/router'

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
        <input
          type="search"
          name="keyword"
          placeholder="Search code snippets"
          disabled
        />
      </nav>

      {props.children}
    </div>
  )
}

export default CodeLayout
