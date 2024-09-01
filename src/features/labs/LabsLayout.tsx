import { A } from '@solidjs/router'
import type { JSX, ParentComponent } from 'solid-js'

import './labs-layout.css'

const LabsLayout: ParentComponent = (props): JSX.Element => {
  return (
    <div class="labs-layout">
      <nav class="page">
        <A href="/labs" end>
          Index
        </A>
        <span class="divider" />
        <A href="/labs/new" class="create">
          + New task
        </A>
        <span class="divider" />
        <input type="search" name="keyword" placeholder="Search labs" />
      </nav>

      {props.children}
    </div>
  )
}

export default LabsLayout
