import { A, useLocation } from '@solidjs/router'
import type { JSX, ParentComponent } from 'solid-js'

const ArchiveLayout: ParentComponent = (props): JSX.Element => {
  const l = useLocation()
  const s = l.pathname.split('/')[1]

  return (
    <div class="page archive">
      <h2>Archive</h2>

      <main id="content">{props.children}</main>

      <aside>
        <nav>
          <A href={`/${s}/archive`}>Archive</A>
          <A href={`/${s}/archive/2024`}>2024</A>
          <A href={`/${s}/archive/2023`}>2023</A>
        </nav>
      </aside>
    </div>
  )
}

export default ArchiveLayout
