import { useParams } from '@solidjs/router'
import type { JSX, Component } from 'solid-js'

const DetailRoute: Component = (): JSX.Element => {
  const { id } = useParams()
  return (
    <div class="page detail">
      <h2>Detail</h2>
      <p>Detail ({id}) page will be rendered here.</p>
    </div>
  )
}

export default DetailRoute
