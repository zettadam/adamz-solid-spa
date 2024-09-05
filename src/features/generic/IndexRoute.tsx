import {
  createEffect,
  createMemo,
  createSignal,
  type JSX,
  type Component,
} from 'solid-js'
import { Title } from '@solidjs/meta'
import { useLocation } from '@solidjs/router'

import type { CollectionName } from '~/lib/api'
import PaginatedListBasic from '~/components/PaginatedListBasic'

const IndexRoute: Component = (): JSX.Element => {
  const [section, setSection] = createSignal('')
  const l = useLocation()
  const p = createMemo(() => l.pathname)

  createEffect(() => {
    const s = p().split('/')[1]
    setSection(s ?? '')
  })

  return (
    <>
      <Title>Latest {section()} — Adam Ziolkowski</Title>
      <div classList={{ page: true, index: true }}>
        <h2>Latest</h2>
        {section() && (
          <PaginatedListBasic
            name={section() as CollectionName}
            page={1}
            size={10}
          />
        )}
      </div>
    </>
  )
}

export default IndexRoute
