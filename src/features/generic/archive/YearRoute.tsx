import {
  createEffect,
  createMemo,
  createSignal,
  type Component,
  type JSX,
} from 'solid-js'
import { Title } from '@solidjs/meta'
import { A, useLocation, useParams } from '@solidjs/router'

const YearRoute: Component = (): JSX.Element => {
  const [section, setSection] = createSignal('')
  const { year } = useParams()
  const l = useLocation()
  const p = createMemo(() => l.pathname)

  createEffect(() => {
    const s = p().split('/')[1]
    setSection(s ?? '')
  })

  return (
    <>
      <Title>
        Archived {section()} in {year} – Adam Ziolkowski
      </Title>
      <main>
        <h3>{year}</h3>
        <p>Year page will be rendered here.</p>
        <nav>
          <A href={`/${section()}/archive`}>Archive</A>
          <A href={`/${section()}/archive/${year}/01`}>January</A>
          <A href={`/${section()}/archive/${year}/02`}>February</A>
          <A href={`/${section()}/archive/${year}/03`}>March</A>
          <A href={`/${section()}/archive/${year}/04`}>April</A>
          <A href={`/${section()}/archive/${year}/05`}>May</A>
          <A href={`/${section()}/archive/${year}/06`}>June</A>
          <A href={`/${section()}/archive/${year}/07`}>July</A>
          <A href={`/${section()}/archive/${year}/08`}>August</A>
          <A href={`/${section()}/archive/${year}/09`}>September</A>
          <A href={`/${section()}/archive/${year}/10`}>October</A>
          <A href={`/${section()}/archive/${year}/11`}>November</A>
          <A href={`/${section()}/archive/${year}/12`}>December</A>
        </nav>
      </main>
    </>
  )
}

export default YearRoute
