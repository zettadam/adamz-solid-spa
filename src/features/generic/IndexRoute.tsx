import { createMemo, type Accessor, type JSX, type Component } from 'solid-js'
import { Title } from '@solidjs/meta'
import { useLocation } from '@solidjs/router'

import { CollectionName } from '~/lib/api'
import PaginatedListBasic from '~/components/PaginatedListBasic'
import ArchiveAside from '~/components/ArchiveAside'
import PageNotFound from './PageNotFound'

const IndexRoute: Component = (): JSX.Element => {
  const location = useLocation()
  const section: Accessor<string> = createMemo(
    () => location.pathname.split('/')[1] ?? '',
  )

  if (!section()) return <PageNotFound />

  return (
    <>
      <Title>Latest {section()}— Adam Ziolkowski</Title>
      <div class="page index">
        <h2>Latest</h2>
        <main id="content">
          {section() && <PaginatedListBasic name={section()} />}
        </main>
        <aside>
          <ArchiveAside name={section() as CollectionName} />
        </aside>
      </div>
    </>
  )
}

export default IndexRoute
