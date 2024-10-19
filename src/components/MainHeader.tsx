import { A } from '@solidjs/router'

function MainHeader(props: { section?: string }) {
  return (
    <header role="banner" class={props.section || 'home'}>
      <hgroup>
        {props.section ? (
          <>
            <h1>
              <A href="/">adamz.one</A>
            </h1>
            <h2>{props.section}</h2>
          </>
        ) : (
          <h1>adamz.one</h1>
        )}
      </hgroup>
      <nav class="secondary">
        <menu>
          <li class="me">
            <a href="/me">@ me</a>
          </li>
          <li class="meta">
            <a href="/site">@ site</a>
          </li>
        </menu>
      </nav>
    </header>
  )
}

export default MainHeader
