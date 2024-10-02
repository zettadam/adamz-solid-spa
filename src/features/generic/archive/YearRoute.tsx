import { createMemo, createResource, onCleanup } from 'solid-js'
import { Meta, Title } from '@solidjs/meta'
import { type RouteSectionProps } from '@solidjs/router'

import { getAllRecords, type CollectionName } from '~/lib/api'
import { getTimezoneOffset } from '~/lib/helpers/datetime'
import Error from '~/components/Error'
import Loading from '~/components/Loading'
import ArchiveMatrix from '~/components/ArchiveMatrix'

import PageNotFound from '../PageNotFound'

const queryFn = async ({
  name,
  year,
}: {
  name: CollectionName
  year: string
}) => {
  const ac = new AbortController()
  onCleanup(() => ac.abort())

  const tzOffset = getTimezoneOffset()
  const startTime = `${year}-01-01 00:00:00.000 ${tzOffset}`
  const endTime = `${year}-12-31 23:59:59.999 ${tzOffset}`

  const data = await getAllRecords({
    name,
    options: {
      fields: `published`,
      filter: `published != null && published >= "${startTime}" && published <= "${endTime}"`,
      perPage: 1000000,
      sort: `-published`,
    },
  })
  return data
}

const YearRoute = (props: RouteSectionProps) => {
  const section = createMemo(() => props.location.pathname.split('/')[1] ?? '')
  const p = props.params

  if (!section() || !p.year) return <PageNotFound />

  const [data] = createResource(
    () => ({
      name: section() as CollectionName,
      year: p.year,
    }),
    queryFn,
  )

  return (
    <>
      <Title>
        Archived {section()} in {p.year}—Adam Ziolkowski
      </Title>
      <Meta
        name="description"
        content={`Matrix of archived ${section()} in ${p.year}`}
      />
      <div class="page archive">
        <h2>Year Archive</h2>
        <main id="content">
          {data.loading ? (
            <Loading name={section()} />
          ) : data.error ? (
            <Error message={data.error} name={section()} />
          ) : (
            <ArchiveMatrix
              data={data}
              name={section() as CollectionName}
              year
            />
          )}
        </main>
      </div>
    </>
  )
}

export default YearRoute
