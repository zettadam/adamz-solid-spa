import { createMemo } from 'solid-js'
import { Title } from '@solidjs/meta'
import { type RouteSectionProps } from '@solidjs/router'

import PaginatedListBasic from '~/components/PaginatedListBasic'
import ArchiveAside from '~/components/ArchiveAside'
import { type CollectionName } from '~/lib/api'

import PageNotFound from '../PageNotFound'

const TagRoute = (props: RouteSectionProps) => {
  const section = createMemo(() => props.location.pathname.split('/')[1] ?? '')

  if (!section()) return <PageNotFound />

  return (
    <>
      <Title>
        Values {section()} as "{props.params.value}"—Adam Ziolkowski
      </Title>
      <div class="page index">
        <h2>Value Range: {props.params.value}</h2>
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
