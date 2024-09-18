import { type Component, type JSX } from 'solid-js'
import { useNavigate, useParams } from '@solidjs/router'

import { type CollectionName } from '~/lib/api'

const SearchForm: Component<{
  name: CollectionName
}> = (props): JSX.Element => {
  const navigate = useNavigate()
  const params = useParams()

  const handleSubmit = (e: Event) => {
    e.preventDefault()
    console.log('event', e)
    const d = new FormData(e.target as HTMLFormElement)
    const q = d.get('q')
    const s = q
      ? (q as string).replace(/\s+/g, ' ').replace(/[^a-zA-Z0-9 -]/g, '')
      : ''

    if (s) {
      const k = encodeURI(s)
      navigate(`/${props.name}/search/${k}`)
    }
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <input
        type="search"
        name="q"
        value={params.query ? decodeURI(params.query) : ''}
        placeholder={`Search ${props.name}…`}
      />
    </form>
  )
}

export default SearchForm
