export default function Loading({
  archive = false,
  detail = false,
  name = 'posts',
}: {
  archive?: boolean
  detail?: boolean
  name: string
}) {
  return (
    <div class={`${name} loading`}>
      <p>Loading {archive ? 'archive' : detail ? 'detail' : name}</p>
    </div>
  )
}
