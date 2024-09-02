import {
  createEffect,
  createMemo,
  createSignal,
  type Component,
  type JSX,
} from 'solid-js'
import { Title } from '@solidjs/meta'
import { A, useLocation, useParams } from '@solidjs/router'

const DayRoute: Component = (): JSX.Element => {
  const [section, setSection] = createSignal('')
  const { day, month, year } = useParams()
  const l = useLocation()
  const p = createMemo(() => l.pathname)

  createEffect(() => {
    const s = p().split('/')[1]
    setSection(s ?? '')
  })

  return (
    <>
      <Title>
        Archived {section()} on {month} {day}, {year} – Adam Ziolkowski
      </Title>
      <main>
        <h3>
          {year ? <A href={`/${section()}/archive/${year}`}>{year}</A> : null}
          {year && month ? (
            <A href={`/${section()}/archive/${year}/${month}`}>{month}</A>
          ) : null}
          {day ? ` / ${day}` : null}
        </h3>
        <p>Day page will be rendered here.</p>
      </main>
    </>
  )
}

export default DayRoute
