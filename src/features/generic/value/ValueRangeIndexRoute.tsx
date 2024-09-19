import { createMemo, createResource, onCleanup } from 'solid-js'
import { Title } from '@solidjs/meta'
import { type RouteSectionProps } from '@solidjs/router'

import { getAllRecords, type CollectionName } from '~/lib/api'
import Loading from '~/components/Loading'
import Error from '~/components/Error'
import ValueRangeMatrix from '~/components/ValueRangeMatrix'

import PageNotFound from '../PageNotFound'

const ValueRangeIndexRoute = (props: RouteSectionProps) => {
  const section = createMemo(() => props.location.pathname.split('/')[1] ?? '')

  if (!section()) return <PageNotFound />

  const [data] = createResource(async () => {
    const ac = new AbortController()
    onCleanup(() => ac.abort())

    const data = await getAllRecords({
      name: section() as CollectionName,
      options: {
        fields: `significance`,
        filter: `published != null`,
        perPage: 1000000,
        sort: `-published`,
      },
    })
    return data
  })

  return (
    <>
      <Title>Value range index in {section()}—Adam Ziolkowski</Title>
      <div class="page archive">
        <h2>Value Range: Index</h2>
        <main id="content">
          {data.loading ? (
            <Loading name={section()} />
          ) : data.error ? (
            <Error message={data.error} name={section()} />
          ) : (
            <ValueRangeMatrix data={data} name={section() as CollectionName} />
          )}
        </main>
      </div>
    </>
  )
}

export default ValueRangeIndexRoute
