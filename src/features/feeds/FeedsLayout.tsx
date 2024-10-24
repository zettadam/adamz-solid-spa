import { A, type RouteSectionProps } from '@solidjs/router'

import './feeds-layout.css'

const FeedsLayout = (props: RouteSectionProps) => {
  return (
    <div class="feeds-layout">
      <nav class="page">
        <A href="/feeds" end>
          Newsfeed
        </A>
        <input
          type="search"
          name="keyword"
          placeholder="Search feeds"
          disabled
        />
      </nav>

      {props.children}
    </div>
  )
}

export default FeedsLayout
