import { createMemo, type ParentProps } from 'solid-js'
import { useLocation } from '@solidjs/router'

import MainHeader from '~/components/MainHeader'
import MainFooter from '~/components/MainFooter'

function MainLayout(props: ParentProps) {
  const location = useLocation()
  const section = createMemo(() => location.pathname.split('/')[1] ?? '')

  return (
    <div class="main-layout">
      <MainHeader section={section()} />

      {props.children}

      <MainFooter section={section()} />
    </div>
  )
}

export default MainLayout
