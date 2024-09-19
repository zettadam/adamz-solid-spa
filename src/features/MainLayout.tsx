import { createMemo, type JSX, type ParentComponent } from 'solid-js'
import { A, useLocation } from '@solidjs/router'

const MainLayout: ParentComponent = (props): JSX.Element => {
  const location = useLocation()
  const section = createMemo(() => location.pathname.split('/')[1] ?? '')

  return (
    <div class="main-layout">
      <header role="banner" class={section() || 'home'}>
        <hgroup>
          {section() ? (
            <>
              <h1>
                <A href="/">Adam Ziolkowski</A>
              </h1>
              <h2>{section()}</h2>
            </>
          ) : (
            <h1>Adam Ziolkowski</h1>
          )}
        </hgroup>
        <nav class="secondary">
          <menu>
            <li class="news">
              <A href="/news">News</A>
            </li>
            <li class="about">
              <A href="/about">About</A>
            </li>
          </menu>
        </nav>
      </header>

      {props.children}

      <footer class={section() || 'home'}>
        <p id="copyright">
          &copy; 2024 <a href="mailto:zett.adam@gmail.com">Adam Z.</a>
        </p>
        <nav id="main-navigation">
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
