import { useLocation } from '@solidjs/router'
import type { JSX, Component } from 'solid-js'

import type { CollectionName } from '~/lib/api'

import PaginatedListBasic from '~/components/PaginatedListBasic'

const IndexRoute: Component = (): JSX.Element => {
  const l = useLocation()
  const s = l.pathname.split('/')[1]

  return (
    <div classList={{ page: true, index: true }}>
      <h2>Latest</h2>
      <PaginatedListBasic name={s as CollectionName} page={1} size={10} />
    </div>
  )
}

export default IndexRoute
