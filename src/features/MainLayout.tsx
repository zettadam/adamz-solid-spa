import { createMemo, Show, type ParentProps } from 'solid-js'
import { useLocation } from '@solidjs/router'

import MainHeader from '~/components/MainHeader'
import MainFooter from '~/components/MainFooter'

const STATIC_PAGES = ['me', 'site']

function MainLayout(props: ParentProps) {
  const location = useLocation()
  const section = createMemo(() => location.pathname.split('/')[1] ?? '')

  const isDynamic = createMemo(() => STATIC_PAGES.indexOf(section()) < 0)

  return (
    <div class="main-layout">
      <Show when={isDynamic()}>
        <MainHeader section={section()} />
      </Show>

      {props.children}

      <Show when={isDynamic()}>
        <MainFooter section={section()} />
      </Show>
    </div>
  )
}

export default MainLayout
