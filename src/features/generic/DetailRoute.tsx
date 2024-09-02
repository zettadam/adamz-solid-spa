import {
  createEffect,
  createMemo,
  createSignal,
  type JSX,
  type Component,
} from 'solid-js'
import { Title } from '@solidjs/meta'
import { useLocation, useParams } from '@solidjs/router'

import Detail from '~/components/Detail'
import type { CollectionName } from '~/lib/api'

import { sectionTitleMap } from './constants'

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
      <Title>
        {id} – {sectionTitleMap[section()]} – Adam Ziolkowski
      </Title>
      {section() && (
        <div class="page detail">
          <h2>In detail</h2>
          <Detail identifier={id} name={section() as CollectionName} />
        </div>
      )}
    </>
  )
}

export default DetailRoute
