import {
  createEffect,
  createMemo,
  createSignal,
  type JSX,
  type Component,
} from 'solid-js'
import { useLocation, useParams } from '@solidjs/router'

import Detail from '~/components/Detail'
import type { CollectionName } from '~/lib/api'

const DetailRoute: Component = (): JSX.Element => {
  const [section, setSection] = createSignal('')
  const { id } = useParams()
  const l = useLocation()
  const p = createMemo(() => l.pathname)

  createEffect(() => {
    const s = p().split('/')[1]
    setSection(s ?? '')
  })

  return (
    <>
      {section() && (
        <div class="page detail">
          <h2>In detail</h2>
          <Detail identifier={id} name={section() as CollectionName} />
          <aside>Aside</aside>
        </div>
      )}
    </>
  )
}

export default DetailRoute
