import {
  createEffect,
  createMemo,
  createSignal,
  type Component,
  type JSX,
} from 'solid-js'
import { Title } from '@solidjs/meta'
import { useLocation } from '@solidjs/router'

const ArchiveIndexRoute: Component = (): JSX.Element => {
  const [section, setSection] = createSignal('')
  const l = useLocation()
  const p = createMemo(() => l.pathname)

  createEffect(() => {
    const s = p().split('/')[1]
    setSection(s ?? '')
  })

  return (
    <>
      <Title>Archived {section()} — Adam Ziolkowski</Title>
      <main>
        <p>Archive index page will be rendered here.</p>
      </main>
    </>
  )
}

export default ArchiveIndexRoute
