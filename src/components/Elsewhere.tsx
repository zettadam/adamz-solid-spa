import MastodonIcon from '~/components/icons/MastodonIcon'
import GithubIcon from '~/components/icons/GithubIcon'
import LinkedInIcon from '~/components/icons/LinkedInIcon'
import CodepenIcon from '~/components/icons/CodepenIcon'
import CodeSandboxIcon from '~/components/icons/CodeSandboxIcon'
import StackblitzIcon from '~/components/icons/StackblitzIcon'
import BlueskyIcon from '~/components/icons/BlueskyIcon'

function Elsewhere() {
  return (
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
      <li class="bluesky">
        <a
          href="https://bsky.app/profile/adamz.one"
          rel="me"
          title="Adam at Bluesky"
          target="_blank">
          <BlueskyIcon size={32} />
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
  )
}

export default Elsewhere
