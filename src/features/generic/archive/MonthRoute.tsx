import { A, useLocation, useParams } from '@solidjs/router'
import type { JSX, Component } from 'solid-js'

const MonthRoute: Component = (): JSX.Element => {
  const l = useLocation()
  const { year, month } = useParams()

  const s = l.pathname.split('/')[1]

  return (
    <main>
      <h3>
        Archive Month:{' '}
        {year ? <A href={`/${s}/archive/${year}`}>{year}</A> : null}
        {month ? ` / ${month}` : null}
      </h3>
      <p>Month page will be rendered here.</p>
    </main>
  )
}

export default MonthRoute
