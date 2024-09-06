export default function Loading({
  detail = false,
  name = 'posts',
}: {
  detail?: boolean
  name: string
}) {
  return (
    <div class={`${name} loading`}>
      <p>Loading {detail ? 'detail' : name}</p>
    </div>
  )
}
