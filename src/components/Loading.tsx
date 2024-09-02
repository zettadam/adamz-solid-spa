import { CollectionName } from '~/lib/api'

export default function Loading({
  detail = false,
  name = 'posts',
}: {
  detail?: boolean
  name: CollectionName
}) {
  return (
    <div class={`${name} loading`}>
      <p>Loading {detail ? 'detail' : name}</p>
    </div>
  )
}
