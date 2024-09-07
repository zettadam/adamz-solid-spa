import type { Component, JSX } from 'solid-js'
import { Title } from '@solidjs/meta'

const PageNotFound: Component = (): JSX.Element => {
  return (
    <>
      <Title>404 (Unknown route)</Title>
      <div class="not-found">
        <h3>404</h3>
        <p>Oops, looks like I cannot find the page you are looking for.</p>
      </div>
    </>
  )
}

export default PageNotFound