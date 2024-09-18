import {
  createMemo,
  createResource,
  onCleanup,
  type Component,
  type JSX,
} from 'solid-js'
import { Meta, Title } from '@solidjs/meta'
import { useLocation, useParams } from '@solidjs/router'

import { getAllRecords, type CollectionName } from '~/lib/api'
import Error from '~/components/Error'
import Loading from '~/components/Loading'
import ArchiveMatrix from '~/components/ArchiveMatrix'
import { getTimezoneOffset } from '~/lib/helpers/datetime'
import PageNotFound from '../PageNotFound'

const YearRoute: Component = (): JSX.Element => {
  const location = useLocation()
  const { year } = useParams()

  const section = createMemo(() => location.pathname.split('/')[1] ?? '')

  if (!section() || !year) return <PageNotFound />

  const tzOffset = getTimezoneOffset()

  const startTime = `${year}-01-01 00:00:00.000 ${tzOffset}`
  const endTime = `${year}-12-31 23:59:59.999 ${tzOffset}`

  const [data] = createResource(async () => {
    const ac = new AbortController()
    onCleanup(() => ac.abort())

    const data = await getAllRecords({
      name: section() as CollectionName,
      options: {
        fields: `published`,
        filter: `published != null && published >= "${startTime}" && published <= "${endTime}"`,
        perPage: 1000000,
        sort: `-published`,
      },
    })
    return data
  })

  return (
    <>
      <Title>Archived {section()}—Adam Ziolkowski</Title>
      <Meta
        name="description"
        content={`Matrix of archived ${section()} in ${year}`}
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
