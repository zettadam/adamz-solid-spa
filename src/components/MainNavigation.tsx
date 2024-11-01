import { A } from '@solidjs/router'

function MainNavigation() {
  return (
    <nav id="main-navigation">
      <menu>
        <li>
          <A href="/posts" class="posts">
            Posts
          </A>
        </li>
        <li>
          <A href="/notes" class="notes">
            Notes
          </A>
        </li>
        <li>
          <A href="/links" class="links">
            Links
          </A>
        </li>
      </menu>
      <A href="/" class="home">
        Home
      </A>
      <menu>
        <li>
          <A href="/code" class="code">
            Code
          </A>
        </li>
        <li>
          <A href="/labs" class="labs">
            Labs
          </A>
        </li>
        <li>
          <A href="/feeds" class="feeds">
            Feeds
          </A>
        </li>
      </menu>
    </nav>
  )
}

export default MainNavigation
