import { createMemo, type Accessor, type JSX, type Component } from 'solid-js'
import { Title } from '@solidjs/meta'
import { useLocation } from '@solidjs/router'

import PaginatedListBasic from '~/components/PaginatedListBasic'

const IndexRoute: Component = (): JSX.Element => {
  const location = useLocation()
  const s: Accessor<string> = createMemo(() => location.pathname.split('/')[1])

  return (
    <>
      <Title>Latest {s()} — Adam Ziolkowski</Title>
      <div classList={{ page: true, index: true }}>
        <h2>Latest</h2>
        <main id="content">{s() && <PaginatedListBasic name={s()} />}</main>
        <aside>Aside</aside>
      </div>
    </>
  )
}

export default IndexRoute
