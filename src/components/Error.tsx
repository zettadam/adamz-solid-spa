import { CollectionName } from '~/lib/api'

export default function Error({
  message = '',
  name = 'posts',
}: {
  message?: string
  name: CollectionName
}) {
  return (
    <div class={`${name} error`}>
      <h4>Ooops, we got a problem</h4>
      {message && <p>{message}</p>}
    </div>
  )
}
