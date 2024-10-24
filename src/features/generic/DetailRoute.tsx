import { createMemo, Show } from 'solid-js'
import { type RouteSectionProps } from '@solidjs/router'

import Detail from '~/components/Detail'
import ArchiveAside from '~/components/ArchiveAside'
import type { CollectionName } from '~/lib/api'

import PageNotFound from './PageNotFound'

const DetailRoute = (props: RouteSectionProps) => {
  const section = createMemo(() => props.location.pathname.split('/')[1] ?? '')

  if (!section() || !props.params.id) return <PageNotFound />

  return (
    <div class="page detail">
      <h2>In detail</h2>
      <Detail identifier={props.params.id} name={section() as CollectionName} />
      <aside>
        <Show when={section() !== 'feeds'}>
          <ArchiveAside name={section() as CollectionName} />
        </Show>
      </aside>
    </div>
  )
}

export default DetailRoute
