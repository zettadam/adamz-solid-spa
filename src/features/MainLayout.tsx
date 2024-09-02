import {
  type JSX,
  type ParentComponent,
  createEffect,
  createMemo,
  createSignal,
} from 'solid-js'
import { A, useLocation } from '@solidjs/router'

const MainLayout: ParentComponent = (props): JSX.Element => {
  const [section, setSection] = createSignal('')
  const l = useLocation()
  const p = createMemo(() => l.pathname)

  createEffect(() => {
    const s = p().split('/')[1]
    setSection(s ?? '')
  })

  return (
    <div class="main-layout">
      <header class={section() || 'home'}>
        <hgroup>
          <h1>Adam Ziolkowski</h1>
          {section() && <h2>{section()}</h2>}
        </hgroup>
        <nav class="secondary">
          <menu>
            <li class="news">
              <A href="/news">News</A>
            </li>
            <li class="feeds">
              <A href="/feeds">Feeds</A>
            </li>
            <li class="auth">
              <A href="/sign-in">Sign in</A>
            </li>
            <li class="about">
              <A href="/about">About</A>
            </li>
          </menu>
        </nav>
      </header>

      {props.children}

      <footer>
        <nav>
          <span>
            <A href="/posts" class="posts">
              Posts
            </A>
            <A href="/notes" class="notes">
              Notes
            </A>
            <A href="/links" class="links">
              Links
            </A>
          </span>
          <A href="/" class="home">
            Home
          </A>
          <span>
            <A href="/code" class="code">
              Code
            </A>
            <A href="/labs" class="labs">
              Labs
            </A>
            <A href="/events" class="events">
              Events
            </A>
          </span>
        </nav>
      </footer>
    </div>
  )
}

export default MainLayout
