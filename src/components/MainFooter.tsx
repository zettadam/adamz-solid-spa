import { Show } from 'solid-js'

import Elsewhere from './Elsewhere'
import MainNavigation from './MainNavigation'

function MainFooter(props: { section?: string }) {
  return (
    <footer class={props.section || 'home'}>
      <Show when={props.section}>
        <Elsewhere />
        <p id="copyright">
          &copy; 2024 <span>Adam Z.</span>
        </p>
        <p>
          <small>
            Written entirely by hand with{' '}
            <a href="https://www.solidjs.com/" target="_blank">
              SolidJS
            </a>
            ,{' '}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/HTML"
              target="_blank">
              HTML
            </a>
            ,{' '}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/CSS"
              target="_blank">
              CSS
            </a>{' '}
            and{' '}
            <a href="https://pocketbase.io/" target="blank">
              PocketBase
            </a>
          </small>
        </p>
      </Show>
      <MainNavigation />
    </footer>
  )
}

export default MainFooter
