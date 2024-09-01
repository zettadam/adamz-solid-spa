import { A, useLocation, useParams } from '@solidjs/router'
import type { JSX, Component } from 'solid-js'

const DayRoute: Component = (): JSX.Element => {
  const l = useLocation()
  const { year, month, day } = useParams()

  const s = l.pathname.split('/')[1]

  return (
    <main>
      <h3>
        Archive Month:{' '}
        {year ? <A href={`/${s}/archive/${year}`}>{year}</A> : null}
        {year && month ? (
          <A href={`/${s}/archive/${year}/${month}`}>{month.toUpperCase()}</A>
        ) : null}
        {day ? ` / ${day}` : null}
      </h3>
      <p>Day page will be rendered here.</p>
    </main>
  )
}

export default DayRoute
