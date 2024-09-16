import { createMemo, type Accessor, type JSX, type Component } from 'solid-js'
import { Title } from '@solidjs/meta'
import { useLocation, useParams } from '@solidjs/router'

import { CollectionName } from '~/lib/api'
import PaginatedListBasic from '~/components/PaginatedListBasic'
import ArchiveAside from '~/components/ArchiveAside'
import PageNotFound from '../PageNotFound'

const TagRoute: Component = (): JSX.Element => {
  const location = useLocation()
  const params = useParams()
  const section: Accessor<string> = createMemo(
    () => location.pathname.split('/')[1] ?? '',
  )

  if (!section()) return <PageNotFound />

  return (
    <>
      <Title>
        Latest {section()} tagged "{params.tag}"— Adam Ziolkowski
      </Title>
      <div class="page index">
        <h2>Tag</h2>
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

export default TagRoute
