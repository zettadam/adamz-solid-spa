import { createMemo, createResource, onCleanup } from 'solid-js'
import { Meta, Title } from '@solidjs/meta'
import { type RouteSectionProps } from '@solidjs/router'

import { getAllRecords, type CollectionName } from '~/lib/api'
import Loading from '~/components/Loading'
import Error from '~/components/Error'
import ArchiveMatrix from '~/components/ArchiveMatrix'

import PageNotFound from '../PageNotFound'

const ArchiveIndexRoute = (props: RouteSectionProps) => {
  const section = createMemo(() => props.location.pathname.split('/')[1] ?? '')

  if (!section()) return <PageNotFound />

  const [data] = createResource(async () => {
    const ac = new AbortController()
    onCleanup(() => ac.abort())

    const data = await getAllRecords({
      name: section() as CollectionName,
      options: {
        fields: `published`,
        filter: `published != null`,
        perPage: 1000000,
        sort: `-published`,
      },
    })
    return data
  })

  return (
    <>
      <Title>Archived {section()}—Adam Ziolkowski</Title>
      <Meta name="description" content={`Matrix of archived ${section()}`} />
      <div class="page archive">
        <h2>Archive Index</h2>
        <main class="full-width" id="content">
          {data.loading ? (
            <Loading name={section()} />
          ) : data.error ? (
            <Error message={data.error} name={section()} />
          ) : (
            <ArchiveMatrix data={data} name={section() as CollectionName} />
          )}
        </main>
      </div>
    </>
  )
}

export default ArchiveIndexRoute
