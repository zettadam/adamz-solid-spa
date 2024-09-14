import { createMemo, type JSX, type Component } from 'solid-js'
import { useLocation, useParams } from '@solidjs/router'

import Detail from '~/components/Detail'
import ArchiveAside from '~/components/ArchiveAside'
import type { CollectionName } from '~/lib/api'

import PageNotFound from './PageNotFound'

const DetailRoute: Component = (): JSX.Element => {
  const location = useLocation()
  const { id } = useParams()

  const section = createMemo(() => location.pathname.split('/')[1] ?? '')

  if (!section() || !id) return <PageNotFound />

  return (
    <div class="page detail">
      <h2>In detail</h2>
      <Detail identifier={id} name={section() as CollectionName} />
      <aside>
        <ArchiveAside name={section() as CollectionName} />
      </aside>
    </div>
  )
}

export default DetailRoute
