import { Show } from 'solid-js'
import { A } from '@solidjs/router'

import MastodonIcon from '~/components/icons/MastodonIcon'
import GithubIcon from '~/components/icons/GithubIcon'
import LinkedInIcon from '~/components/icons/LinkedInIcon'
import CodepenIcon from '~/components/icons/CodepenIcon'
import CodeSandboxIcon from '~/components/icons/CodeSandboxIcon'
import StackblitzIcon from '~/components/icons/StackblitzIcon'
import PinterestIcon from '~/components/icons/PinterestIcon'

function MainFooter(props: { section?: string }) {
  return (
    <footer class={props.section || 'home'}>
      <Show when={props.section}>
        <ul class="elsewhere">
          <li class="github">
            <a
              href="https://github.com/zettadam"
              rel="me"
              title="Adam at Github"
              target="_blank">
              <GithubIcon size={32} />
            </a>
          </li>
          <li class="codepen">
            <a
              href="https://codepen.io/zettadam"
              rel="me"
              title="Adam at Codepen"
              target="_blank">
              <CodepenIcon size={32} />
            </a>
          </li>
          <li class="codesandbox">
            <a
              href="https://codesandbox.io/u/zettadam"
              rel="me"
              title="Adam at CodeSandbox"
              target="_blank">
              <CodeSandboxIcon size={32} />
            </a>
          </li>
          <li class="stackblitz">
            <a
              href="https://stackblitz.com/@zettadam"
              rel="me"
              title="Adam at Stackblitz"
              target="_blank">
              <StackblitzIcon size={32} />
            </a>
          </li>
          <li class="pinterest">
            <a
              href="https://www.pinterest.com/zettadam/"
              rel="me"
              title="Adam at Pinterest"
              target="_blank">
              <PinterestIcon size={32} />
            </a>
          </li>
          <li class="mastodon">
            <a
              href="https://mastodon.social/@adamzett"
              rel="me"
              title="Adam at Mastodon"
              target="_blank">
              <MastodonIcon size={32} />
            </a>
          </li>
          <li class="linkedin">
            <a
              href="https://www.linkedin.com/in/adam-ziolkowski-9513581b/"
              rel="me"
              title="Adam at LinkedIn"
              target="_blank">
              <LinkedInIcon size={32} />
            </a>
          </li>
        </ul>
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
  )
}

export default MainFooter
