import { A, type RouteSectionProps } from '@solidjs/router'

import './events-layout.css'

const EventsLayout = (props: RouteSectionProps) => {
  return (
    <div class="events-layout">
      <nav class="page">
        <A href="/events" end>
          Index
        </A>
        <span class="divider" />
        <A href="/events/archive">Archive</A>
        <span class="divider" />
        <input
          type="search"
          name="keyword"
          placeholder="Search events"
          disabled
        />
      </nav>

      {props.children}
    </div>
  )
}

export default EventsLayout
