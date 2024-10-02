import { createMemo, createResource, onCleanup } from 'solid-js'
import { Title } from '@solidjs/meta'
import { type RouteSectionProps } from '@solidjs/router'

import { getAllRecords, type CollectionName } from '~/lib/api'
import Loading from '~/components/Loading'
import Error from '~/components/Error'
import TagMatrix from '~/components/TagMatrix'
import PageNotFound from '../PageNotFound'

const queryFn = async ({ name }: { name: CollectionName }) => {
  const ac = new AbortController()
  onCleanup(() => ac.abort())

  const data = await getAllRecords({
    name,
    options: {
      fields: `tags`,
      filter: `published != null`,
      perPage: 1000000,
      sort: `-published`,
    },
  })

  return data
}

const TagIndexRoute = (props: RouteSectionProps) => {
  const section = createMemo(() => props.location.pathname.split('/')[1] ?? '')

  if (!section()) return <PageNotFound />

  const [data] = createResource(
    () => ({ name: section() as CollectionName }),
    queryFn,
  )

  return (
    <>
      <Title>Tags in {section()}—Adam Ziolkowski</Title>
      <div class="page archive">
        <h2>Tag Index</h2>
        <main id="content">
          {data.loading ? (
            <Loading name={section()} />
          ) : data.error ? (
            <Error message={data.error} name={section()} />
          ) : (
            <TagMatrix data={data} name={section() as CollectionName} />
          )}
        </main>
      </div>
    </>
  )
}

export default TagIndexRoute
