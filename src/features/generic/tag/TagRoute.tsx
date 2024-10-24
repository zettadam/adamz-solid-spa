import { createMemo } from 'solid-js'
import { Title } from '@solidjs/meta'
import { type RouteSectionProps } from '@solidjs/router'

import PaginatedList from '~/components/PaginatedList'
import ArchiveAside from '~/components/ArchiveAside'
import { type CollectionName } from '~/lib/api'

import PageNotFound from '../PageNotFound'

const TagRoute = (props: RouteSectionProps) => {
  const section = createMemo(() => props.location.pathname.split('/')[1] ?? '')

  if (!section()) return <PageNotFound />

  return (
    <>
      <Title>
        Latest {section()} tagged "{props.params.tag}"—Adam Ziolkowski
      </Title>
      <div class="page index">
        <h2>Tag</h2>
        <main id="content">
          <PaginatedList name={section()} />
        </main>
        <aside>
          <ArchiveAside name={section() as CollectionName} />
        </aside>
      </div>
    </>
  )
}

export default TagRoute
