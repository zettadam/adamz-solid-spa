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
            <A href="/me">@ me</A>
          </li>
          <li class="meta">
            <A href="/site">@ site</A>
          </li>
        </menu>
      </nav>
    </header>
  )
}

export default MainHeader
