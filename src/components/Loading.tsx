import { CollectionName } from '~/lib/api'

export default function Loading({ name = 'posts' }: { name: CollectionName }) {
  return (
    <div class={`${name} loading`}>
      <p>Loading {name}</p>
    </div>
  )
}
