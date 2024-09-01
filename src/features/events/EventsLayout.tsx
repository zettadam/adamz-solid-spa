import { A } from '@solidjs/router'
import type { JSX, ParentComponent } from 'solid-js'

import './events-layout.css'

const EventsLayout: ParentComponent = (props): JSX.Element => {
  return (
    <div class="events-layout">
      <nav class="page">
        <A href="/events" end>
          Index
        </A>
        <span class="divider" />
        <A href="/events/new" class="create">
          + New event
        </A>
        <span class="divider" />
        <input type="search" name="keyword" placeholder="Search events" />
      </nav>

      {props.children}
    </div>
  )
}

export default EventsLayout
