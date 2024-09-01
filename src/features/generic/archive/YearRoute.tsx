import { A, useLocation, useParams } from '@solidjs/router'
import type { JSX, Component } from 'solid-js'

const YearRoute: Component = (): JSX.Element => {
  const l = useLocation()
  const { year } = useParams()

  const s = l.pathname.split('/')[1]

  return (
    <main>
      <h3>Year: {year}</h3>
      <p>Year page will be rendered here.</p>
      <nav>
        <A href={`/${s}/archive`}>Archive</A>
        <A href={`/${s}/archive/${year}/jan`}>January</A>
        <A href={`/${s}/archive/${year}/feb`}>February</A>
        <A href={`/${s}/archive/${year}/mar`}>March</A>
        <A href={`/${s}/archive/${year}/apr`}>April</A>
        <A href={`/${s}/archive/${year}/may`}>May</A>
        <A href={`/${s}/archive/${year}/jun`}>June</A>
        <A href={`/${s}/archive/${year}/jul`}>July</A>
        <A href={`/${s}/archive/${year}/aug`}>August</A>
        <A href={`/${s}/archive/${year}/sep`}>September</A>
        <A href={`/${s}/archive/${year}/oct`}>October</A>
        <A href={`/${s}/archive/${year}/nov`}>November</A>
        <A href={`/${s}/archive/${year}/dec`}>December</A>
      </nav>
    </main>
  )
}

export default YearRoute
