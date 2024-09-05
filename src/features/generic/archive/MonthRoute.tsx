import {
  createEffect,
  createMemo,
  createSignal,
  type Component,
  type JSX,
} from 'solid-js'
import { Title } from '@solidjs/meta'
import { A, useLocation, useParams } from '@solidjs/router'

import { monthNamesLong } from '../constants'

const MonthRoute: Component = (): JSX.Element => {
  const [section, setSection] = createSignal('')
  const { month, year } = useParams()
  const l = useLocation()
  const p = createMemo(() => l.pathname)

  createEffect(() => {
    const s = p().split('/')[1]
    setSection(s ?? '')
  })

  return (
    <>
      <Title>
        Archived {section()} in {monthNamesLong[month]} {year} — Adam Ziolkowski
      </Title>
      <main>
        <h3>
          {year ? <A href={`/${section()}/archive/${year}`}>{year}</A> : null}
          {month ? ` / ${monthNamesLong[month]}` : null}
        </h3>
        <p>Month page will be rendered here.</p>
      </main>
    </>
  )
}

export default MonthRoute
